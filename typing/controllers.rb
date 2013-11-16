require 'active_support/json'
require 'ar_result_calculations'

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
