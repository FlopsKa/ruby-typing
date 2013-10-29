var allWords = {
  words: [],

  loadWords: function() {
    $.ajax({ 
      type: "GET",
    dataType: "json",
    url: "/words",
    success: function(data){        
      allWords.words = data;
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
    $('#speedtest').text("Successfully loaded!");
  }
};

function run() {
  allWords.loadWords();
}

$(run());

console.info(allWords);

