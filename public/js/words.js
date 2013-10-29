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
      output += "<span class=\"\" wordid=\"" + allWords.words[i].id + "\">" + allWords.words[i].word + " </span>";
    }
    $('#speedtest').html("<div class=\"task\">" + output + "</div>");
    $('#speedtest').append("<div class=\"this is the ultimate div\"></div>");
  }
};

function run() {
  allWords.loadWords();
}

$(run());
