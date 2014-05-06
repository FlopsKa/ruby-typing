require './app'
require 'sinatra/activerecord/rake'

task :default => 'ci:build'

namespace :ci do
  desc "Used for CI. Set up the database."
  task :build do
    Rake::Task['db:migrate'].invoke
    #Rake::Task['db:test:prepare'].invoke
    #Rake::Task['test:units'].invoke
  end

  task :deploy do
    # sh "cap staging deploy"
  end

  desc "Used for CI. Set up the database."
  task :run => ['ci:build'] do

  end

end
