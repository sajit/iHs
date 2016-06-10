//var rosary = require("./prayers.js");
//var enRosary = rosary('en');
//console.log('En Rosary',enRosary);
var state = function(mystery,rosaryPrayer){

     var _current = rosaryPrayer.SOTC;
     var _hmCount = 0,_mysterCount = 0;
     var _next = function(){
          if(_current == rosaryPrayer.SOTC){
             _current = rosaryPrayer.CREED;
          	 return _current;
          }
          if(_current == rosaryPrayer.CREED){
             _current = rosaryPrayer.OF;
             _current.title =  rosaryPrayer.FHC
              _current.showIntention = false;
             return _current ;
          }
          if(_current == rosaryPrayer.OF){
             _current = rosaryPrayer.HM;
             if(_mysterCount == 0) {
              _current.title = rosaryPrayer.FHC;
             }
             else {
              _current.title = rosaryPrayer[mystery+_mysterCount];

             }
             _current.mysterCount = _mysterCount;
             return _current;
          }

          //if current is HM
          if(_current == rosaryPrayer.HM){
            if(_mysterCount == 0 ){
              if(_hmCount<2){
                _hmCount= _hmCount + 1;
                _current = rosaryPrayer.HM;

              }
              else {
                _hmCount = 0;

                _current = rosaryPrayer.GB;
                _current.switch = true;
              }
               _current.title = rosaryPrayer.FHC;
               return _current;
            }
            else{
                if(_hmCount<9){
                _hmCount= _hmCount + 1;
                _current = rosaryPrayer.HM;


              }
              else {
                _hmCount = 0;
                _current = rosaryPrayer.GB;
                 _current.switch = true;
              }
              _current.mysterCount = _mysterCount;
              _current.title = rosaryPrayer[mystery+_mysterCount];
              return  _current;
            }

           }

           if(_current == rosaryPrayer.GB){

            if(_mysterCount == 0 ){
              _mysterCount = 1;
              _current = rosaryPrayer.OF;
              _current.mysterCount = _mysterCount;
              _current.title = rosaryPrayer[mystery+_mysterCount];
               _current.showIntention = true;
            }
            else{
             _current = rosaryPrayer.FP;

            }
            return _current;
           }

           //FP
           if(_current == rosaryPrayer.FP){

            if(_mysterCount==5){
              return {};
            }
            _mysterCount = _mysterCount + 1;
             _current = rosaryPrayer.OF;
             _current.title = rosaryPrayer[mystery+_mysterCount];
             _current.showIntention = true;
            return _current;
           } //end FP


     };
     return {
        next : _next,
        current: _current
     };
};
//state1 = state('JM',enRosary);
//console.log('start',state1.current);

// for(var i=0;i<83;i++){
//   console.log('Next',state1.next());
//   console.log('******');
// }
