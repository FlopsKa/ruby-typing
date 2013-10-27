var speed = 0;
var timer_running = false;
var time = 60;
var all_words = [];
var input_words = [];
var curr_word = 0;
var input_field = document.getElementById('speedtest_input');

$.ajax({ 
  type: "GET",
  dataType: "json",
  url: "/words",
  success: function(data){        
    for(word in data.words) {
      all_words += data.words[word].word + " ";
    }
    all_words = all_words.split(" ");
    print_task();
  }
});

function show_timer() {
  $('.timer').text(time >= 10 ? time : "0" + time);
}

function calculate_speed() {
  console.log("Current speed: " + speed);
}

function check_word() {
  var input = input_field.value;
  input_words[curr_word] = input.trim();

  // go to next word on <space>
  if(input.slice(-1) == ' ') {
    curr_word += 1;
    input_field.value = '';
  } 

  if(time === 60 && !timer_running) {
    timer_running = true;
    setInterval(function() { if(time > 0) time -= 1; show_timer() }, 1000);
  }
  print_task();
}
$().ready(show_timer());

function print_task() {
  var wordlist = document.getElementById('speedtest_wordlist');
  var output = "";
  var right_words = 0;
  for(var i = 0; i < input_words.length; i++) {
    if(i === curr_word) continue;
    if(check_current_word(input_words[i], i)) {
      output += "<span style=\"color: #0c0;\">" + all_words[i] + "</span> ";
      right_words += 1;
    } else {
      output += "<span style=\"color: #f00;\">" + all_words[i] + "</span> ";
    }
  }
  output += all_words.slice(curr_word, all_words.length).join(" ");
  wordlist.innerHTML = output;
  document.getElementById('speedtest_result').innerHTML = "Right Words: " + right_words;
}

function check_current_word(word, word_position) {
  if(all_words[word_position] === word)
    return true;
  else
    return false;
}
