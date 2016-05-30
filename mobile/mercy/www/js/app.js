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
app.factory('speechService',function(){
   var isAndroid = ionic.Platform.isAndroid(), recognition;
     if(isAndroid)
        recognition = new SpeechRecognition(); // For Android /
      else
        recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    
    
  return {
     speechApi : recognition
  };
});
app.factory('stateMachineService',['$window',function($window){
  var rosaryPrayers = $window.rosary;
   var stateMachine;
       return {
         init : function(mystery){
            var code;
            if(mystery === 'Glorious'){
               code = 'GM';
            } else if(mystery === 'Joyful'){
              code = 'JM';
            } else if(mystery === 'Sorrowful'){
              code = 'SM'
            }
            else {
              code = 'LM';
            }
            stateMachine = new state(code,rosaryPrayers);
            return stateMachine;
         }
         
       };
}]);
app.controller('AppCtrl',function($scope,mysteryData, speechService, stateMachineService){

 var day = new Date();
  $scope.selectedMystery  = mysteryData.getMysteryByDay(day.getDay());
  $scope.allMysteries = mysteryData.mysteries;
  $scope.speechApi = speechService.speechApi;
  $scope.stateMachineService = stateMachineService;

  //console.log('All',$scope.allMysteries,$scope.defaultMystery);
  $scope.rosaryInProgress = false;
  $scope.start = function(){
       $scope.rosaryInProgress = true;
        $scope.sm = stateMachineService.init($scope.selectedMystery);
       console.log('State M',$scope.sm);
       console.log('Init State',$scope.sm.current);
       
  };
  var goNext = function(){
     var prevTitle = $scope.sm.current.title;
     $scope.sm.current = $scope.sm.next();
     if($scope.sm.current.title === prevTitle &&  !$scope.sm.current.switch){
        $scope.hmCount  +=1;
     }
     else{
       $scope.hmCount = 0;
     }
     $scope.error = '';
              
              if($scope.sm.current == {}){
                $scope.rosaryInProgress = false;
              }
  };
  $scope.record = function() {
      $scope.speechApi.onresult = function(event) {
        if (event.results.length > 0) {
            $scope.recognizedText = event.results[0][0].transcript;
            console.log('Recognized text',$scope.recognizedText);
            var score = $scope.sm.current.text.score($scope.recognizedText,0.5);
            
            
            console.log('Match score',score);
            if(true){
               goNext();
            }
            else {
              console.error('Print error message');
              $scope.error = 'Please try again';
            }
        }
    };
    $scope.speechApi.start();
  };

  $scope.next = function(){
    goNext();
  };
});