require 'active_support/json'
require 'ar_result_calculations'

Camping.goes :Typing

module Typing::Models
	class Words < Base
	end

	class Data < Base
	end

	class Mistakes < Base
		serialize :keystrokes
	end

	class BasicFields < V 1.0
		def self.up
			create_table Words.table_name do |t|
				t.string  :word
				t.integer :frequency
				t.integer :mistakes
				t.timestamps
			end
			Typing.insertData
		end

		def self.down
			drop_table Words.table_name
		end
	end

	class BasicData < V 1.1
		def self.up
			create_table Data.table_name do |t|
				t.integer :wpm
				t.integer :words_total
				t.integer :keystrokes_total
			end
		end

		def self.down
			drop_table Data.table_name
		end
	end

	class AddMistakesTable < V 1.2
		def self.up
			create_table Mistakes.table_name do |t|
				t.text :keystrokes
			end
			Mistakes.create(:keystrokes => {}).save
		end

		def self.down
			drop_table Mistakes.table_name
		end
	end
end

module Typing::Helpers
	def generate_wordlist(sort_by_error = false)
		words = Words.all.shuffle

		# finds the most frequent wrongly entered key
		mistake = Mistakes.first.keystrokes.sort_by(&:last).reverse[0][0] unless Mistakes.first.keystrokes.empty?

		ret = []
		words.each do |w|
			if sort_by_error 
				ret << { :word => w.word, :id => w.id } if /#{mistake}/ =~ w.word
			else
				ret << { :word => w.word, :id => w.id } 
			end
		end
		ActiveRecord::Base.connection.close
		ret
	end

	def generate_overview
		alldata = Data.all
		newdata = Data.last(50)
		@avg_wpm = newdata.average('wpm').to_s
		@count = alldata.count
		@sum_words = alldata.sum('words_total')
		@sum_keystrokes = alldata.sum('keystrokes_total')
		@median = newdata.median(:wpm, :already_sorted => false)
		ActiveRecord::Base.connection.close
	end

	def generate_stats
		alldata = Data.all
		newdata = Data.last(50)
		ActiveRecord::Base.connection.close
		{
			:avg_wpm => newdata.average('wpm').to_s,
			:count => alldata.count,
			:sum_words => alldata.sum('words_total'),
			:sum_keystrokes => alldata.sum('keystrokes_total'),
			:median => newdata.median(:wpm, :already_sorted => false)
		}
	end
end

module Typing::Controllers
	class Index < R '/'
		def get
			render :index
		end
	end

	class Reset < R '/reset'
		def get
			Mistakes.first.update(:keystrokes => {})
			ActiveRecord::Base.connection.close
			redirect R(Index)
		end
	end

	class Statistics < R '/stats'
		def get
			@mistakes = Mistakes.first.keystrokes.sort_by(&:last).reverse
			@mistakes_total = @mistakes.map(&:last).sum
			@speed = Data.last(50).inject([]) { |r,e| r << [r.count, e[:wpm]] }
			@speed_max = Data.last(50).max(:wpm)
			generate_overview
			ActiveRecord::Base.connection.close
			render :stats
		end
	end

	class Wordlist < R '/words'
		Words = Typing::Models::Words
		def get
			@headers['Content-Type'] = "application/json"
			{ :words => generate_wordlist }.to_json
		end

		def post
			@headers['Content-Type'] = "application/json"

			# log data
			Data.create(:wpm => @input["wpm"], 
									:words_total => @input["right_words"],
									:keystrokes_total => @input["keystrokes"]).save

			# compute wrong keystrokes
			keys = Mistakes.first.keystrokes
			keys.default = 0
			@input.wrong_keys.each do |e|
				keys[e] = keys[e] + 1
			end
			Mistakes.first.update(:keystrokes => keys)

			ActiveRecord::Base.connection.close

			generate_stats.to_json
		end
	end

	class Training < R '/training'
		def get
			@headers['Content-Type'] = "application/json"
			{ :words => generate_wordlist(true) }.to_json
		end
	end
end

module Typing::Views
	def layout
		html do
			head do
				title { "Ruby Typing Trainer" }
				link :rel => "stylesheet", :type => "text/css", :href => "css/bootstrap.min.css"
				link :rel => "stylesheet", :type => "text/css", :href => "css/words.css"
			end
			body do
				div.wrap! do
					div :class => "container" do
						div :class => "page-header row" do
							div :class => "col-md-6 col-xs-4" do
								a :href => "#" do 
									img :src => "images/ruby-typist.png"
								end
							end
							div :class => "col-md-6 col-xs-8", :style => "padding-top: 10px" do
								ul class: "nav nav-pills pull-right" do
									li { a "Home", :href => "http://localhost:3301/" }
									# li { a "Training", :href => "http://localhost:3301/training" }
									li { a "Statistics", :href => "http://localhost:3301/stats" }
									li { a "Fork me on GitHub", :href => "https://github.com/FlopsKa/ruby-typing" }
								end
							end
						end
						self << yield
					end
				end
				div.container do
					div.footer! do
						hr
						p :class => "text-muted credit" do
							span { "Copyright @flopska. Find me on " }
							a "GitHub", :href =>"http://github.com/flopska"
							span { " and " }

							a "Twitter", :href => "http://twitter.com/flopska"
						end
					end
				end
			end
		end
	end


	def index
		div.row do
			div :class => "col-md-8 col-md-offset-2 col-xs-12" do
				div.speedtest! do
					p { "Loading..." }
				end
				script :src => "js/jquery-1.10.2.js", type: "text/javascript"
				script :src => "js/words.js", type: "text/javascript"
			end
		end
	end

	def stats
		div :class => "col-md-8 col-md-offset-2 col-xs-12" do
			div.row do
				div :class => "col-md-6" do
					table.table do
						thead do
							tr do
								th do
									span "Most common mistakes " 
								end
								th :style => "text-align: right;" do
									a "Reset", :href => "/reset"
								end
							end
						end
						tbody do
							if @mistakes.count >= 6
								6.times do |t|
									tr do
										td @mistakes[t][0]
										td (@mistakes[t][1].to_f / @mistakes_total * 100).round(2).to_s + '%'
									end
								end
							else
								td "Run more tests to see your results"
								td ""
							end
						end
					end
				end
				div :class => "col-md-6", :style => "padding-top: 8px;" do
					p do
						b "Words per minute (last 50 tests)"
					end
					div.placeholder! :style => "height: 200px;" do
					end
				end
			end
			div.row do
				div :class => "col-md-12" do
					table.table do
						thead do
							tr do
								th "Overview"
								th ""
							end
						end
						tbody do
							tr do
								td "Average WPM:"
								td "#@avg_wpm"
							end
							tr do
								td "Tests taken:"
								td "#@count"
							end
							tr do
								td "Total # of words:"
								td "#@sum_words"
							end
							tr do
								td "Total # of keystrokes"
								td "#@sum_keystrokes"
							end
							tr do
								td "Median"
								td "#@median"
							end
						end
					end
				end
			end
		end
		script :src => "js/jquery-1.10.2.js", type: "text/javascript"
		script :src => "js/flot/jquery.flot.js", type: "text/javascript"
		script do
			"var options = { yaxis: { max: #@speed_max + 20 }	, xaxis: { max: 50 }};" +
			"var data = [#@speed];" +
				"$.plot($(\"#placeholder\"), data, options);"
		end
	end
end

def Typing.create
	Typing::Models.create_schema
end


def Typing.insertData
	File.open("all_words.txt").each do |word|
		Typing::Models::Words.create(:word => word.chop, :frequency => 0, :mistakes => 0).save
	end
end
