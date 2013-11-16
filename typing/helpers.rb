require 'active_support/json'
require 'ar_result_calculations'

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
