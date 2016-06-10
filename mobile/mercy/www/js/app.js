var speechHelper = function(isMobile){
   var recognition;
   if(isMobile)
       recognition = new SpeechRecognition(); // For Android /
   else
       recognition = new webkitSpeechRecognition();

   recognition.lang = 'en-US';
   recognition.continuous = true;

   return recognition;

};
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.factory('mysteryData',function(){
  var _mysteries = ['Glorious','Joyful','Sorrowful','Luminous'];
  var map = {
    0: _mysteries[0],1: _mysteries[1],2:_mysteries[2],3:_mysteries[0],4:_mysteries[3],5:_mysteries[2],6:_mysteries[1]
  };
 return {
    mysteries: _mysteries,
    getMysteryByDay: function(dayIdx){
      return map[dayIdx];
    }
 };
});
app.factory('stateMachineService',['$window',function($window){
  var rosaryPrayers = $window.rosary;
   var stateMachine;
       return {
         init : function(mystery){
            var code;
            if(mystery === 'Glorious'){ code = 'GM';
            } else if(mystery === 'Joyful'){ code = 'JM';
            } else if(mystery === 'Sorrowful'){ code = 'SM'
            } else { code = 'LM';
            }
            stateMachine = new state(code,rosaryPrayers);
            return stateMachine;
         }

       };
}]);
app.factory('intentionData',function(){
  var _intentions = {
    1 : "We pray for the conversion of this unrepentant world which has continuously rejected God's love.",
    2: "We pray for the persecuted Christians throughout the world. We pray that God gives them the courage to be faithful witnesses to Christ. We especially pray for the conversion of their persecutors",
    3: "We pray for Church - everyone from the Pope to the deacons. We pray that they be filled with the Holy Spirit and be zealous shepherds of God's flock",
    4: "We pray for the poor souls in purgatory and especially those souls who have no one to pray for them. May they be welcomed into God's presence",
    5: "We pray for our holy and private intentions"
  };
  return {
    intentions : _intentions
  };

});
app.controller('AppCtrl',function($scope,mysteryData, stateMachineService, intentionData){

  var isAndroid = ionic.Platform.isAndroid();
  $scope.stateMachineService = stateMachineService;

  $scope.rosaryInProgress = false;


  $scope.startRosary = function(mystery){
       $scope.rosaryInProgress = true;
       console.log('Selected Mystery',mystery);
       $scope.sm = stateMachineService.init(mystery);
  };

  var recognition;

  $scope.isSpeaking = false;

    var goNext = function(){
       var prevTitle = $scope.sm.current.title;
       $scope.sm.current = $scope.sm.next();
       if(angular.equals({},$scope.sm.current)){
                  $scope.rosaryInProgress = false;
                  return;
       }
       if($scope.sm.current.title === prevTitle &&  !$scope.sm.current.switch){
          $scope.hmCount  +=1;
       }
       else{
         $scope.hmCount = 0;
       }

       if($scope.sm.current.showIntention){
        $scope.intention = intentionData.intentions[$scope.sm.current.mysterCount];
       }
       else {
         $scope.intention = undefined;
       }


    };
  $scope.toggleSpeak = function() {
     if(!recognition){
        recognition = new speechHelper(isAndroid);


     }

     if($scope.isSpeaking){
        recognition.stop();
        goNext();
     }
     else {
        recognition.start();

     }
     $scope.isSpeaking = !$scope.isSpeaking;



  };

});
