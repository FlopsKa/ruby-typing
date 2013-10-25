require 'active_support/json'

Camping.goes :Typing

module Typing::Models
  class Words < Base
  end

  class BasicFields < V 5.1
    def self.up
      create_table Words.table_name do |t|
        t.string  :word
        t.integer :frequency
        t.integer :mistakes
        t.timestamps
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
      @words.to_json

    end
  end

  class JavaScript < R '/js/script\.js'
    Words = Typing::Models::Words
    def get
      @words = []
      80.times do 
        id = 1 + rand(Words.count)
        @words << { :word => Words.find(id).word}
      end
      # ugly - should be loaded via ajax
      @words = @words.to_s.gsub(/\[|\]|\{|\}|"|:word=>|,/,'')
      script = File.read(__FILE__).gsub(/.*__END__/m, '').gsub(/var\sall_words.*$/, "var all_words = \"#@words\".split(\" \");")
      @headers['Content-Type'] = "application/javascript"
      script
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
    script :src => "js/script.js"
  end
end

def Typing.create
  Typing::Models.create_schema
end

def Typing.insertData
  File.open("0.txt").each do |word|
    Typing::Models::Words.create(:word => word.chop, :frequency => 0, :mistakes => 0).save
  end
end

__END__

var all_words = "patent original such could who Google key first over these need Oct also time people after using Hofstadter want there most".split(" ");
var input_words = [];
var curr_word = 0;
var input_field = document.getElementById('speedtest_input');
print_task();

function check_word() {
  var input = input_field.value;
  input_words[curr_word] = input.trim();
  console.log(input_words.join());

  //check_current_word(input_field.value, curr_word);

  // go to next word on <space>
  if(input.slice(-1) == ' ') {
    curr_word += 1;
    input_field.value = '';
  } 

    print_task();
}

function print_task() {
  var wordlist = document.getElementById('speedtest_wordlist');
  var output = "";
  for(var i = 0; i < input_words.length; i++) {
    if(i === curr_word) continue;
      if(check_current_word(input_words[i], i)) {
        output += "<span style=\"color: #0c0;\">" + all_words[i] + "</span> ";
      } else {
          output += "<span style=\"color: #f00;\">" + all_words[i] + "</span> ";
        }
  }
    output += all_words.slice(curr_word, all_words.length).join(" ");
    wordlist.innerHTML = output;
}

function check_current_word(word, word_position) {
  if(all_words[word_position].substring(0, word.length) === word)
    return true;
  else
    return false;
}
