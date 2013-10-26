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

  class JQuery < R '/js/jquery-1.10.2.js'
    JQUERY = File.read(File.dirname(__FILE__) + '/jquery-1.10.2.js')
    def get
      @headers['Content-Type'] = "application/javascript"
      JQUERY
    end
  end

  class JavaScript < R '/js/script\.js'
    SCRIPT = File.read(File.dirname(__FILE__) + '/script.js')
    def get
      @headers['Content-Type'] = "application/javascript"
      SCRIPT
    end
  end
end

module Typing::Views
  def layout
    html do
      head do
        title { "Ruby Typing Trainer" }
      end
      body { self << yield }
    end
  end

  def index
    p.speedtest_wordlist! { "Those are the words you have to enter" }
    form do
      input.speedtest_input! :onkeypress => "setTimeout(check_word, 0)"
    end
    p.speedtest_result! { "Right Words: <br /> Wrong Words:" }
    script :src => "js/jquery-1.10.2.js"
    script :src => "js/script.js"
  end
end

def Typing.create
  Typing::Models.create_schema
end


