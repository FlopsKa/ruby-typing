require 'active_support/json'
require 'ar_result_calculations'

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

