require 'active_support/json'
require 'ar_result_calculations'

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
