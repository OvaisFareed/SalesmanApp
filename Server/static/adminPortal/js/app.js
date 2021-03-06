angular.module('starter', ['ionic'])
  .config(function($stateProvider, $urlRouterProvider,$httpProvider ){
    
    
    $stateProvider
      .state("login", {
        url : "/",
        templateUrl : "/adminPortal/templates/login.html",
        controller  : "loginCtrl" 
      })
      .state("signup", {
        url : "/signup",
        templateUrl : "/adminPortal/templates/signup.html",
        controller  : "signupCtrl" 
      })
      .state("home", {
        url : "/home",
        templateUrl : "/adminPortal/templates/home.html",
        controller  : "homeCtrl",
        loginCompulsory : true
      })
        .state("home.new", {
        url : "/new-company",
        templateUrl : "/adminPortal/templates/new-company.html",
        controller  : "new-companyCtrl"
      })
        .state("home.view", {
        url : "/view-company",
        templateUrl : "/adminPortal/templates/view-company.html",
        controller  : "view-companyCtrl"
      });
      
      
      $urlRouterProvider.otherwise("/");
      
      
      $httpProvider.interceptors.push('httpInterceptor');
  })
  .run(function($rootScope, $state){
    
    $rootScope.$on("$stateChangeStart", function(event, toState){
      var firebaseLocalToken = localStorage.getItem("token");
        
      if(toState.loginCompulsory && !firebaseLocalToken){ 
        event.preventDefault();
        $state.go("login");
      }
        
    });
    
  })
  .factory("httpInterceptor", function(){
    return {
      request : function(config){
        var token = localStorage.getItem("token");
        if(token){
          config.url = config.url + "?token="+token;
        }
        return config;
      }
    }       
  });