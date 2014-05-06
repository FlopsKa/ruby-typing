require 'sinatra'
require 'sinatra/activerecord'

set :views, settings.root + '/typing/views'
set :database_file, "config/database.yml"

require_relative './typing/models/init'
require_relative './typing/routes/init'
