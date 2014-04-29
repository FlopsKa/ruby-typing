require 'sinatra'
require 'sinatra/activerecord'
require './environments'

# require './typing/helpers'
set :views, settings.root + '/typing/views'
require_relative './typing/models/init'
require_relative './typing/routes/init'

# require './typing/views'
# require './typing/controllers'

# def Typing.insertData
	# File.open("all_words.txt").each do |word|
		# Typing::Models::Words.create(:word => word.chop, :frequency => 0, :mistakes => 0).save
	# end
# end


