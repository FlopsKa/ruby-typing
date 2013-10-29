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
  }
};

var task = {
  current_word: 0,

  show: function() {
    var output = "";
    for(var i = 0; i < allWords.words.length; i++) {
      output += "<span class=\"\" wordid=\"" + allWords.words[i].id + "\" wordnum=\"" + i + "\">" + allWords.words[i].word + "</span> ";
      if((i + 1) % 7 == 0 && i > 0) output += "<br />";
    }
    $('#speedtest').html("<div class=\"task\">" + output + "</div>");
    $('#speedtest').append("<div class=\"word_input\">" +
        "<form class=\"input-group\"><input onkeypress=\"setTimeout(task.input, 0)\" autofocus class=\"form-control speedtest_input\" /><span class=\"timer input-group-addon\">00</span>" +
        "</form></div>");
    $('span[wordnum=' + task.current_word + ']').addClass('currentword');
  },
  input: function() {
    var input_field = $('.speedtest_input');
    var input = input_field.val();

    // go to next word on <space>
    if(input.slice(-1) == ' ') {
      input_field.val('');
      task.current_word++;
      task.update();
    }
  },
  update: function() {
    $('.currentword').removeClass('currentword');
    $('span[wordnum=' + task.current_word + ']').addClass('currentword');
  }
};

function run() {
  allWords.loadWords();
}

$(run());
