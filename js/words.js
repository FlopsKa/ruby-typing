//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

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
		} else if(timer.time_left > 0) {
			timer.show_in = show_in;
			timer.running = true;
			timer.timer_ref = setInterval(function() { timer.time_left > 0 ? timer.time_left -= 1 : timer.stop(); timer.update() }, 1000);
		}
	}
};

var allWords = {
	words: shuffle([{"word":"online","id":209},{"word":"A","id":108},{"word":"doing","id":308},{"word":"means","id":365},{"word":"social","id":375},{"word":"just","id":54},{"word":"program","id":145},{"word":"how","id":82},{"word":"Mars","id":205},{"word":"time","id":79},{"word":"not","id":24},{"word":"phase","id":422},{"word":"us","id":97},{"word":"instead","id":248},{"word":"features","id":93},{"word":"will","id":42},{"word":"top","id":122},{"word":"design","id":267},{"word":"they","id":50},{"word":"need","id":143},{"word":"different","id":343},{"word":"Firefox","id":238},{"word":"up","id":63},{"word":"branches","id":454},{"word":"commit","id":152},{"word":"photos","id":131},{"word":"whether","id":443},{"word":"three","id":439},{"word":"I","id":20},{"word":"been","id":84},{"word":"text","id":185},{"word":"world","id":380},{"word":"download","id":449},{"word":"needs","id":432},{"word":"missing","id":177},{"word":"performance","id":210},{"word":"other","id":64},{"word":"for","id":7},{"word":"day","id":301},{"word":"print","id":438},{"word":"already","id":223},{"word":"always","id":172},{"word":"short","id":472},{"word":"why","id":201},{"word":"really","id":176},{"word":"want","id":189},{"word":"bookmarks","id":164},{"word":"came","id":457},{"word":"these","id":138},{"word":"write","id":186},{"word":"uses","id":446},{"word":"mode","id":376},{"word":"block","id":452},{"word":"than","id":74},{"word":"our","id":52},{"word":"phone","id":488},{"word":"off","id":195},{"word":"Washington","id":260},{"word":"number","id":250},{"word":"or","id":30},{"word":"each","id":334},{"word":"basic","id":402},{"word":"additional","id":453},{"word":"default","id":197},{"word":"sign","id":458},{"word":"Facebook","id":70},{"word":"adds","id":383},{"word":"option","id":146},{"word":"call","id":354},{"word":"handling","id":468},{"word":"where","id":113},{"word":"did","id":156},{"word":"only","id":81},{"word":"wanted","id":258},{"word":"look","id":215},{"word":"think","id":160},{"word":"run","id":235},{"word":"head","id":476},{"word":"government","id":352},{"word":"else","id":58},{"word":"product","id":129},{"word":"special","id":332},{"word":"provide","id":478},{"word":"update","id":135},{"word":"between","id":276},{"word":"using","id":87},{"word":"of","id":5},{"word":"true","id":417},{"word":"business","id":268},{"word":"worked","id":374},{"word":"great","id":289},{"word":"the","id":1},{"word":"such","id":382},{"word":"single","id":483},{"word":"long","id":255},{"word":"agent","id":466},{"word":"open","id":150},{"word":"abuse","id":405},{"word":"said","id":475},{"word":"sent","id":408},{"word":"since","id":353},{"word":"users","id":207},{"word":"book","id":153},{"word":"Android","id":465},{"word":"use","id":35},{"word":"Windows","id":222},{"word":"things","id":243},{"word":"give","id":256},{"word":"errors","id":364},{"word":"life","id":487},{"word":"power","id":329},{"word":"here","id":240},{"word":"badge","id":370},{"word":"site","id":428},{"word":"last","id":182},{"word":"data","id":110},{"word":"display","id":309},{"word":"most","id":109},{"word":"password","id":324},{"word":"merge","id":167},{"word":"has","id":61},{"word":"following","id":336},{"word":"better","id":239},{"word":"ignore","id":337},{"word":"s","id":107},{"word":"store","id":416},{"word":"do","id":46},{"word":"row","id":414},{"word":"empty","id":294},{"word":"solid","id":51},{"word":"series","id":360},{"word":"make","id":45},{"word":"John","id":425},{"word":"collapse","id":492},{"word":"second","id":392},{"word":"with","id":9},{"word":"during","id":313},{"word":"Jeff","id":202},{"word":"return","id":44},{"word":"user","id":88},{"word":"out","id":71},{"word":"source","id":191},{"word":"year","id":394},{"word":"few","id":220},{"word":"links","id":381},{"word":"hidden","id":485},{"word":"In","id":41},{"word":"important","id":229},{"word":"clear","id":464},{"word":"huge","id":480},{"word":"email","id":120},{"word":"actually","id":393},{"word":"some","id":59},{"word":"must","id":302},{"word":"revision","id":419},{"word":"show","id":161},{"word":"understand","id":429},{"word":"but","id":39},{"word":"version","id":271},{"word":"bookmark","id":123},{"word":"function","id":33},{"word":"secure","id":341},{"word":"work","id":105},{"word":"support","id":65},{"word":"type","id":350},{"word":"take","id":124},{"word":"years","id":231},{"word":"faster","id":431},{"word":"quite","id":494},{"word":"job","id":366},{"word":"full","id":340},{"word":"so","id":60},{"word":"be","id":19},{"word":"another","id":244},{"word":"Korea","id":434},{"word":"like","id":43},{"word":"chat","id":386},{"word":"main","id":435},{"word":"left","id":397},{"word":"latest","id":479},{"word":"start","id":277},{"word":"code","id":114},{"word":"many","id":130},{"word":"As","id":327},{"word":"that","id":11},{"word":"this","id":13},{"word":"unknown","id":348},{"word":"header","id":232},{"word":"complete","id":362},{"word":"comments","id":224},{"word":"all","id":38},{"word":"group","id":330},{"word":"September","id":423},{"word":"multiple","id":462},{"word":"become","id":398},{"word":"never","id":314},{"word":"at","id":25},{"word":"accept","id":447},{"word":"can","id":34},{"word":"created","id":493},{"word":"ever","id":333},{"word":"changes","id":247},{"word":"easy","id":284},{"word":"those","id":219},{"word":"got","id":430},{"word":"output","id":228},{"word":"my","id":78},{"word":"idea","id":474},{"word":"simple","id":217},{"word":"were","id":98},{"word":"same","id":233},{"word":"log","id":297},{"word":"line","id":249},{"word":"improve","id":424},{"word":"read","id":144},{"word":"preserve","id":347},{"word":"normal","id":178},{"word":"device","id":321},{"word":"moving","id":451},{"word":"post","id":90},{"word":"project","id":230},{"word":"while","id":190},{"word":"new","id":31},{"word":"string","id":225},{"word":"old","id":246},{"word":"pull","id":368},{"word":"path","id":226},{"word":"works","id":467},{"word":"against","id":445},{"word":"game","id":148},{"word":"including","id":320},{"word":"table","id":477},{"word":"bottom","id":310},{"word":"South","id":401},{"word":"updated","id":491},{"word":"check","id":116},{"word":"your","id":16},{"word":"history","id":450},{"word":"much","id":112},{"word":"building","id":391},{"word":"Mac","id":497},{"word":"team","id":117},{"word":"Post","id":127},{"word":"started","id":257},{"word":"after","id":118},{"word":"patch","id":335},{"word":"it","id":14},{"word":"no","id":73},{"word":"i","id":216},{"word":"part","id":460},{"word":"based","id":361},{"word":"C","id":158},{"word":"was","id":23},{"word":"an","id":26},{"word":"had","id":68},{"word":"sure","id":281},{"word":"early","id":481},{"word":"Jobs","id":293},{"word":"template","id":420},{"word":"change","id":395},{"word":"security","id":273},{"word":"their","id":53},{"word":"July","id":312},{"word":"problem","id":470},{"word":"process","id":331},{"word":"void","id":357},{"word":"because","id":133},{"word":"name","id":213},{"word":"status","id":280},{"word":"port","id":265},{"word":"handle","id":95},{"word":"personal","id":384},{"word":"access","id":371},{"word":"behind","id":484},{"word":"let","id":206},{"word":"Mozilla","id":162},{"word":"less","id":290},{"word":"extension","id":349},{"word":"command","id":157},{"word":"come","id":296},{"word":"correctly","id":199},{"word":"also","id":66},{"word":"comment","id":208},{"word":"back","id":194},{"word":"feature","id":180},{"word":"making","id":269},{"word":"posts","id":390},{"word":"subscribe","id":495},{"word":"input","id":427},{"word":"more","id":36},{"word":"me","id":204},{"word":"too","id":263},{"word":"him","id":379},{"word":"everyone","id":261},{"word":"null","id":499},{"word":"end","id":187},{"word":"every","id":188},{"word":"itself","id":279},{"word":"seems","id":471},{"word":"stock","id":292},{"word":"and","id":3},{"word":"Nov","id":55},{"word":"home","id":400},{"word":"help","id":141},{"word":"there","id":94},{"word":"stop","id":237},{"word":"possible","id":291},{"word":"add","id":27},{"word":"photo","id":154},{"word":"have","id":37},{"word":"May","id":306},{"word":"switch","id":436},{"word":"company","id":171},{"word":"small","id":367},{"word":"documentation","id":489},{"word":"without","id":128},{"word":"down","id":236},{"word":"through","id":253},{"word":"in","id":6},{"word":"appear","id":440},{"word":"revisions","id":285},{"word":"flag","id":342},{"word":"should","id":72},{"word":"even","id":137},{"word":"find","id":139},{"word":"are","id":17},{"word":"lines","id":415},{"word":"on","id":10},{"word":"what","id":49},{"word":"we'll","id":490},{"word":"added","id":344},{"word":"makes","id":339},{"word":"around","id":282},{"word":"best","id":149},{"word":"fix","id":32},{"word":"used","id":115},{"word":"hard","id":241},{"word":"scroll","id":288},{"word":"release","id":221},{"word":"none","id":259},{"word":"current","id":169},{"word":"his","id":62},{"word":"remove","id":298},{"word":"began","id":498},{"word":"by","id":28},{"word":"would","id":80},{"word":"likes","id":328},{"word":"core","id":461},{"word":"little","id":421},{"word":"point","id":399},{"word":"blog","id":193},{"word":"wrote","id":463},{"word":"don't","id":69},{"word":"under","id":409},{"word":"introduce","id":426},{"word":"file","id":76},{"word":"names","id":433},{"word":"detection","id":388},{"word":"everything","id":315},{"word":"free","id":159},{"word":"get","id":86},{"word":"know","id":119},{"word":"cache","id":345},{"word":"if","id":12},{"word":"past","id":442},{"word":"place","id":274},{"word":"still","id":132},{"word":"remote","id":317},{"word":"is","id":8},{"word":"over","id":100},{"word":"may","id":211},{"word":"copy","id":303},{"word":"page","id":242},{"word":"review","id":319},{"word":"a","id":4},{"word":"try","id":168},{"word":"send","id":307},{"word":"before","id":125},{"word":"service","id":275},{"word":"processes","id":455},{"word":"base","id":459},{"word":"first","id":75},{"word":"often","id":486},{"word":"way","id":121},{"word":"messages","id":403},{"word":"above","id":358},{"word":"local","id":496},{"word":"large","id":363},{"word":"who","id":89},{"word":"into","id":99},{"word":"assertion","id":448},{"word":"then","id":295},{"word":"August","id":304},{"word":"catch","id":369},{"word":"called","id":147},{"word":"avoid","id":175},{"word":"as","id":21},{"word":"writing","id":272},{"word":"options","id":346},{"word":"one","id":57},{"word":"any","id":83},{"word":"share","id":316},{"word":"November","id":126},{"word":"he","id":56},{"word":"April","id":356},{"word":"case","id":174},{"word":"its","id":47},{"word":"message","id":212},{"word":"Google","id":96},{"word":"Twitter","id":165},{"word":"via","id":404},{"word":"from","id":18},{"word":"failed","id":377},{"word":"say","id":355},{"word":"It","id":67},{"word":"well","id":482},{"word":"almost","id":437},{"word":"being","id":170},{"word":"allow","id":101},{"word":"about","id":40},{"word":"view","id":407},{"word":"October","id":351},{"word":"good","id":227},{"word":"enable","id":323},{"word":"again","id":406},{"word":"might","id":264},{"word":"available","id":305},{"word":"Internet","id":104},{"word":"files","id":92},{"word":"abort","id":198},{"word":"could","id":163},{"word":"Apple","id":270},{"word":"able","id":181},{"word":"someone","id":418},{"word":"controlled","id":389},{"word":"which","id":48},{"word":"real","id":500},{"word":"He","id":218},{"word":"space","id":251},{"word":"kind","id":387},{"word":"wrong","id":410},{"word":"information","id":245},{"word":"browser","id":140},{"word":"branch","id":214},{"word":"working","id":106},{"word":"heads","id":300},{"word":"server","id":183},{"word":"Python","id":441},{"word":"million","id":318},{"word":"crash","id":473},{"word":"something","id":262},{"word":"built","id":179},{"word":"More","id":155},{"word":"see","id":142},{"word":"search","id":234},{"word":"keep","id":151},{"word":"characters","id":456},{"word":"style","id":444},{"word":"lot","id":286},{"word":"spent","id":372},{"word":"longer","id":338},{"word":"reading","id":252},{"word":"go","id":254},{"word":"index","id":411},{"word":"going","id":203},{"word":"people","id":77},{"word":"does","id":469},{"word":"now","id":85},{"word":"create","id":311},{"word":"web","id":102},{"word":"directory","id":278},{"word":"right","id":184},{"word":"when","id":22},{"word":"updates","id":385},{"word":"build","id":299},{"word":"clone","id":412},{"word":"put","id":322},{"word":"ensure","id":396},{"word":"ago","id":283},{"word":"given","id":325},{"word":"made","id":173},{"word":"very","id":111},{"word":"you","id":15},{"word":"Amazon","id":103},{"word":"properly","id":373},{"word":"own","id":134},{"word":"active","id":413},{"word":"two","id":136},{"word":"error","id":166},{"word":"them","id":91},{"word":"found","id":192},{"word":"list","id":196},{"word":"set","id":200},{"word":"next","id":266},{"word":"to","id":2},{"word":"iPhone","id":378},{"word":"mission","id":287},{"word":"body","id":359},{"word":"Mobile","id":326},{"word":"we","id":29}]),

	loadWords: function() {
		task.show();
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
	wrong_words_id: [],
	show: function() {
		var output = "";
		for(var i = 0; i < allWords.words.length; i++) {
			output += "<span class=\"\" wordid=\"" + allWords.words[i].id + "\" wordnum=\"" + i + "\">" + allWords.words[i].word + "</span> ";
		}
		$('#speedtest').html("<div class=\"task\">" + output + "</div>");
		$('#speedtest').append("<div class=\"word_input\">" +
				"<form class=\"input-group\"><input onkeypress=\"setTimeout(task.input, 0)\" class=\"form-control speedtest_input\" /><span class=\"timer input-group-addon\">60</span>" +
				"</form><p class=\"hint\"><small><i>Hint: Press \'Ctrl\' + \'R\' to restart.</i></small></p></div>");
		$('span[wordnum=0]').addClass('currentword');
		$('.speedtest_input').focus();
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
			compute.wrong_keys.push(allWords.words[curr_word_span.attr("wordnum")].word[input.length-1]);
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
			task.wrong_words_id.push(current_old.attr("wordid"));
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
	wrong_keys: [],
	show: function() {
		if($('#speedtest .result').length === 0) {
			$('#speedtest').append("<div class=\"result col-md-6\"><table class=\"table\">" +
					"<thead><tr><th style=\"width: 100%\">Results</th><th></th></tr></thead>" +
					"<tbody>" +
					"<tr><td>WPM:</td><td> " + compute.right_keystrokes / 5 + "</td></tr>" +
					"<tr><td>Right words / Keystrokes</td><td><nobr>" + compute.right_words + " / " + compute.right_keystrokes + "</nobr></td></tr>" +
					"<tr><td>Wrong words / Keystrokes</td><td><nobr>" + compute.wrong_words + " / " + compute.wrong_keys.length + "</nobr></td></tr>" +
					"</tbody></table></div>");
		}
	}
};

function run() {
	allWords.loadWords();
}

$(run());
