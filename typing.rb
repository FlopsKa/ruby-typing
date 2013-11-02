require 'active_support/json'

Camping.goes :Typing

module Typing::Models
  class Words < Base
  end
  class BasicFields < V 1.0
    def self.up
      create_table Words.table_name do |t|
        t.string  :word
        t.integer :frequency
        t.integer :mistakes
        t.timestamps
      end
      File.open("all_words.txt").each do |word|
        Words.create(:word => word.chop, :frequency => 0, :mistakes => 0).save
      end
    end

    def self.down
      drop_table Words.table_name
    end
  end
end

module Typing::Controllers
  class Index < R '/'
    def get
      render :index
    end
  end

  class Words < R '/words'
    Words = Typing::Models::Words
    def get
      @headers['Content-Type'] = "application/json"
      words = []
      300.times do 
        id = 1 + rand(Words.count)
        words << { :word => Words.find(id).word, :id => id }
      end
      { :words => words }.to_json
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
              div :class => "col-md-8 col-xs-4" do
                a :href => "#" do 
                  img :src => "images/ruby-typist.png"
                end
              end
              div :class => "col-md-4 col-xs-8", :style => "padding-top: 10px" do
                ul class: "nav nav-pills pull-right" do
                  li.active { a "Home", :href => "#" }
                  li { a "Training", :href => "#" }
                  li { a "Fork me on GitHub", :href => "https://github.com/FlopsKa/ruby-typing" }
                end
              end
            end
            self << yield
          end
        end
      end
      div.container do
        div.footer! do
            hr
            p "Example foobar Copyright", :class => "text-muted credit"
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
end

def Typing.create
  Typing::Models.create_schema
end


