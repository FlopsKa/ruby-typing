var right_words = 0;
var keystrokes = 1;
var speed = 0;
var timer_running = false;
var time = 60;
var all_words = [];
var input_words = [];
var curr_word = 0;
var input_field = $('#speedtest_input');

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
    // extrapolate keystrokes 
    var strokes_per_minute = keystrokes / (60 - time) * 60;
    var wpm = strokes_per_minute / 5; 
    if(!isNaN(wpm)) {
      $('.progress-bar').css("width", wpm / 200 * 100 + "%");
      $('#speedtest_wpm').text(wpm.toFixed(0) + "wpm");
    }
}
function check_word() {
  var input = input_field.val();
  input_words[curr_word] = input.trim();

  // go to next word on <space>
  if(input.slice(-1) == ' ') {
    curr_word += 1;
    input_field.val('');
  } 

  if(time === 60 && !timer_running) {
    timer_running = true;
    setInterval(function() { time > 0 ? time -= 1 : timer_up(); show_timer() }, 1000);
  }
  print_task();
}

function timer_up() {
  console.log("Keystrokes: " + keystrokes);
  console.log("Right: " + right_words);
  $('#speedtest_result').html("<ul><li>Keystrokes: " + keystrokes + "</li><li>WPM: " + (keystrokes / 5) + 
      "</li><li>Right Words: " + right_words + "</li><li>Wrong words: " + (80 - right_words) + "</li></ul>");
}

$().ready(show_timer());

function print_task() {
  var wordlist = $('#speedtest_wordlist');
  var output = "";
  right_words = 0;
  keystrokes = 0;
  for(var i = 0; i < input_words.length; i++) {
    if(check_current_word(input_words[i], i)) {
      keystrokes += input_words[i].length;
    }
    if(i === curr_word) continue;
    if(check_current_word(input_words[i], i)) {
      output += "<span style=\"color: #0c0;\">" + all_words[i] + "</span> ";
      right_words += 1;
    } else {
      output += "<span style=\"color: #f00;\">" + all_words[i] + "</span> ";
    }
  }
  calculate_speed();
  output += all_words.slice(curr_word, all_words.length).join(" ");
  wordlist.html(output);
}

function check_current_word(word, word_position) {
  if(all_words[word_position] === word)
    return true;
  else
    return false;
}
