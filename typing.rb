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
      File.open("0.txt").each do |word|
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
      @words = []
      80.times do 
        id = 1 + rand(Words.count)
        @words << { :word => Words.find(id).word, :id => id }
      end
      { :words => @words }.to_json
    end
  end
end

module Typing::Views
  def layout
    html do
      head do
        title { "Ruby Typing Trainer" }
        link :rel => "stylesheet", :type => "text/css", :href => "css/bootstrap.min.css"
      end
      body do
        div :class => "wrap container" do
          div :class => "page-header row" do
            div :class => "col-md-8 col-xs-4" do
              a :href => "#" do 
                img :src => "images/ruby-typist.png"
              end
            end
            div :class => "col-md-4 col-xs-8", :style => "padding-top: 10px" do
              ul class: "nav nav-pills pull-right" do
                li.active { a "Home", :href => "#" }
                li { a "About", :href => "#" }
                li { a "Fork me on GitHub", :href => "https://github.com/FlopsKa/ruby-typing" }
              end
            end
          end
          self << yield
        end
      end
    end
  end

  def index
    div.row do
      div :class => "col-md-8 col-md-offset-2 col-xs-12" do
        form :class => "form-group" do
          p.speedtest_wordlist! "Those are the words you have to enter"
          div.progress do
            div class: "progress-bar", role: "progressbar", :'aria-valuenow' => "60", 
              :'aria-valuemin' => "0", :'aria-valuemax' => "200", :style => "width: 60%;" do
            end
          end
          div class: "input-group" do
            input :autofocus => "", :id => "speedtest_input", :onkeypress => "setTimeout(check_word, 0)", class: "form-control"
            span "00", class: "timer input-group-addon"
          end
        end
        p.speedtest_result! { "Right Words: <br /> Wrong Words:" }
        script :src => "js/jquery-1.10.2.js", type: "text/javascript"
        script :src => "js/typing.js", type: "text/javascript"
      end
    end
  end
end

def Typing.create
  Typing::Models.create_schema
end


