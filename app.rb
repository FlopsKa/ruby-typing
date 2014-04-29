require 'sinatra'
require 'sinatra/activerecord'
require './environments'

set :views, settings.root + '/typing/views'
require_relative './typing/models/init'
require_relative './typing/routes/init'
