var recognition = new webkitSpeechRecognition();
  recognition.interimResults = true;

var  final_transcript;
recognition.onstart = function() { 
	final_transcript = '';
}
  recognition.onresult = function(event) {  

  
     

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } 
    }
    //final_transcript = capitalize(final_transcript);
    final_span.innerHTML = final_transcript;
    
  }
    
    
  

  recognition.onerror = function(event) { console.error('In error',event);
}
  recognition.onend = function() { 

    var ref = 'Hail Mary, full of grace! The Lord is with thee; Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, Pray for us sinners, now and at the hour of our death. Amen.';
    var score = ref.score(final_transcript,0.5);
    console.log('Score',score);
    ref_span.innerHTML = ref;
    score_span.innerHTML = score;
        
  };

function startButton(event) {
  
  final_transcript = '';
  //recognition.lang = select_dialect.value;
  recognition.start();
}


