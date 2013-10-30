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

    // go to next word on <space>
    if(input.slice(-1) == ' ') {
      input_field.val('');
      task.update();
    }
  },
  update: function() {
    var current_old = $('.currentword');
    current_old.removeClass('currentword');
    var current = current_old.next('span');
    current.addClass('currentword');

    // move the lines upwards when the cursor jumps to the next line
    if(current_old.offset().top != current.offset().top) {
      // delete the previous spans
      for(var i = 0; i <= current_old.attr("wordnum"); i++) {
        $("[wordnum='" + i + "']").remove();
      }
    }
  }
};

function run() {
  allWords.loadWords();
}

$(run());
