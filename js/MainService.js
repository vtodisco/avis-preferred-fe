(function () {
  'use strict';

  angular
    .module('myApp')
    .service('MainService', MainService);

  /** @ngInject */
  function MainService($q, $http) {
    if(configuration.debug.enabled){
      console.log(configuration);
    }
    var mockValidateSuccess = {
      completed: true,
      result: true,
      message_key: "success",
      cssClass: "alert-success",
      icon: "fa-check-square-o",
      payload: {}
    }

    var mockValidateError = {
      completed: true,
      result: true,
      message_key: "error",
      cssClass: "alert-success",
      icon: "fa-check-square-o",
      payload: {}
    }

    function validate(result) {
      var deferred = $q.defer();
      if(result==true){
        deferred.resolve(mockValidateSuccess);
      }else{
        deferred.resolve(mockValidateError);
      }
      return deferred.promise;
    }

    function messages() {
        var messages = {
          "common": {
            "success": "Operazione riuscita",
            "error": "Operazione non riuscita"
          }
        };
        var deferred = $q.defer();
        deferred.resolve(messages);
        //deferred.resolve(mockApp);
        var config = {
                headers : {
                    'Access-Control-Allow-Origin': '*'
                }
            };

        $http.get('assets/messages.json', config)
        .then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
    }

    function addOrUpdate(data) {
        var postData = new FormData;
        var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
        if(configuration.debug.enabled){
          console.log("VMT DEBUG: submit form service invoked");
        }
        var deferred = $q.defer();

        $http.post(
          configuration.services.url+":"+configuration.services.port+"/add-or-update",
          data,
          config
        ).then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
    }

    function truncate() {
        if(configuration.debug.enabled){
          console.log("VMT DEBUG: truncate service invoked");
        }
        var deferred = $q.defer();
        $http.get(configuration.services.url+":"+configuration.services.port+"/truncate")
        .then(function(data){
          deferred.resolve(data.data);
        },function(error){
          console.log(error);
        });
        return deferred.promise;
    }

    function getBooking(bookingId) {
        if(configuration.debug.enabled){
          console.log("VMT DEBUG: get booking service invoked with bookingId: "+bookingId);
        }
        var deferred = $q.defer();
        $http({
          method: 'GET',
//          url: 'http://localhost:1338/get-booking?bookingId='+bookingId
          url: configuration.services.url+":"+configuration.services.port+"/get-booking?bookingId="+bookingId
        }).then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
    }

    function deleteBooking(bookingId) {
        if(configuration.debug.enabled){
          console.log("VMT DEBUG: delete booking service invoked with bookingId: "+bookingId);
        }
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: configuration.services.url+":"+configuration.services.port+"/delete-booking?bookingId="+bookingId
        }).then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
    }

    function getBookings() {
        if(configuration.debug.enabled){
          console.log("VMT DEBUG: get bookings service invoked");
        }
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: configuration.services.url+":"+configuration.services.port+"/get-bookings"
        }).then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
    }

    function getPagedBookings(limit, offset) {
        if(configuration.debug.enabled){
          console.log("VMT DEBUG: get paged bookings service invoked with limit: "+limit+" and offset: "+offset);
        }
        var deferred = $q.defer();

        $http({
          method: 'GET',
          url: configuration.services.url+":"+configuration.services.port+"/get-paged-bookings?limit="+limit+"&offset="+offset
        }).then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
    }

    function deleteOldBookings(){
      if(configuration.debug.enabled){
        console.log("VMT DEBUG: delete old bookings service invoked ");
      }
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: configuration.services.url+":"+configuration.services.port+"/delete-old-bookings?delay="+configuration.timing.retention
      }).then(function(data){
        deferred.resolve(data.data);
      },function(){
        console.log("error");
      });
      return deferred.promise;
    }

    return {
      validate: validate,
      messages: messages,
      deleteBooking: deleteBooking, // (D)
      getBooking: getBooking, // (R)
      getBookings: getBookings, // (R)
      getPagedBookings: getPagedBookings, // (R)
      addOrUpdate: addOrUpdate, // (C-U) used for add and update
      truncate: truncate,
      deleteOldBookings: deleteOldBookings
    }

  }

})();
