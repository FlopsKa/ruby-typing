var timer = {
  running: false,
  show_in: "",
  time_left: 60,
  timer_ref: "",
  update: function() {
    timer.show_in.text(timer.time_left >= 10 ? timer.time_left : "0" + timer.time_left);
  },
  stop: function() {
    if(timer.running) {
      timer.running = false;
      clearInterval(timer.timer_ref);
      compute.show();
    }
  },
  go: function(show_in) {
    if(timer.running) {
      return;
    } else {
      timer.show_in = show_in;
      timer.running = true;
      timer.timer_ref = setInterval(function() { timer.time_left > 0 ? timer.time_left -= 1 : timer.stop(); timer.update() }, 1000);
    }
  }
};

var allWords = {
  words: [],

  loadWords: function() {
    $.ajax({ 
      type: "GET",
    dataType: "json",
    url: "/words",
    success: function(data){        
      allWords.words = data.words;
      task.show();
    },
    error: function(){        
      console.log("can't reach server");
    }
    });
  },
  checkWord: function(id, input, length) {
    if(allWords.words[id].word.substring(0, length) === input) {
      return true;
    } else {
      return false;
    }
  }
};

var task = {
  show: function() {
    var output = "";
    for(var i = 0; i < allWords.words.length; i++) {
      output += "<span class=\"\" wordid=\"" + allWords.words[i].id + "\" wordnum=\"" + i + "\">" + allWords.words[i].word + "</span> ";
    }
    $('#speedtest').html("<div class=\"task\">" + output + "</div>");
    $('#speedtest').append("<div class=\"word_input\">" +
        "<form class=\"input-group\"><input onkeypress=\"setTimeout(task.input, 0)\" autofocus class=\"form-control speedtest_input\" /><span class=\"timer input-group-addon\">00</span>" +
        "</form></div>");
    $('span[wordnum=0]').addClass('currentword');
  },
  input: function() {
    var input_field = $('.speedtest_input');
    var input = input_field.val();

    timer.go($('.timer'));

    // go to next word on <space> but not on empty string
    if(input.slice(-1) == ' ' ) {
      input_field.val('');
      if(input.trim() != '') {
        task.update(input);
      }
    }

    // show whether the input is right or wrong
    var input = $('input').val();
    var curr_word_span = $('.currentword');
    if(!allWords.checkWord(curr_word_span.attr("wordnum"), input, input.length)) {
      curr_word_span.addClass("wrong");
    } else {
      curr_word_span.removeClass("wrong");
    }
  },
  update: function(input) {
    var current_old = $('.currentword');
    current_old.removeClass('currentword');
    var current = current_old.next('span');
    current.addClass('currentword');

    // give the span the right color
    if(allWords.checkWord(current_old.attr("wordnum"), input.trim(), allWords.words[current_old.attr("wordnum")].length)) {
      current_old.addClass('right');
      compute.right_words++;
      compute.right_keystrokes += input.length;
    } else {
      current_old.addClass('wrong');
      compute.wrong_words++;
    }

    // move the lines upwards when the cursor jumps to the next line
    if(current_old.offset().top != current.offset().top) {
      // delete the previous spans
      for(var i = 0; i <= current_old.attr("wordnum"); i++) {
        $("[wordnum='" + i + "']").remove();
      }
    }

  }
};


var compute = {
  right_words: 0,
  wrong_words: 0,
  right_keystrokes: 0,
  show: function() {
    if($('#speedtest .result').length === 0) {
      $('#speedtest').append("<div class=\"result\"><p>Right words: " +
          compute.right_words + "</p><p>Wrong words: " + compute.wrong_words +
          "</p><p>Right Keystrokes: " + compute.right_keystrokes + "</p><p>WPM: " +
          compute.right_keystrokes / 5 + "</p></div>");
    }
  }
};

function run() {
  allWords.loadWords();
}

$(run());
