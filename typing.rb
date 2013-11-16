require 'rubygems'
require 'camping'
require 'active_support/json'
require 'ar_result_calculations'

Camping.goes :Typing
require './typing/helpers'
require './typing/models'
require './typing/views'
require './typing/controllers'

def Typing.create
	Typing::Models.create_schema
end


def Typing.insertData
	File.open("all_words.txt").each do |word|
		Typing::Models::Words.create(:word => word.chop, :frequency => 0, :mistakes => 0).save
	end
end
