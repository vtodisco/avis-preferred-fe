(function() {
  'use strict';

    function myDirective(){
      var validator = new RegExp('d+', 'i')
      return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
          ctrl.$validators.vmtDirective = function(modelValue, viewValue) {
            if (ctrl.$isEmpty(modelValue)) {
              console.log("empty field");
              // consider empty models to be valid
              return false;
            }

            // it is invalid
            return true;
          };
        }
      };
    }

    /*
    * Questa è la modalità da evitare secondo le best practices
    * in quanto viene dichiarata una nuova variabile per la
    * nostra applicazione invece che settarla e riutilizzarla
    */
    var myApp = angular.module('myApp', [])
    myApp.controller('MainController', MainController);
    myApp.directive('vmtDirective', vmtDirective);//{

  function vmtDirective(){
    var validator = new RegExp('d+', 'i')
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.vmtDirective = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return false;
          }

          // it is invalid
          return true;
        };
      }
    };
  }

  /** @ngInject */
  function MainController($scope, MainService) {
    var vm = $scope;
    vm.paging = {
      current: 0,
      delta: configuration.paging.delta,
      total: -1,
      pages: -1
    };
    vm.api = {
      validate: validate,
      deleteBooking: deleteBooking,
      getBookings: getBookings,
      getBooking: getBooking,
      submitForm: submitForm, // used for add and update
      truncate: truncate,
      manageTime: manageTime,
      getCurrentDate: getCurrentDate,
      deleteOldBookings: deleteOldBookings
    };

    function manageTime(){
      vm.model.booking.bookingTime=vm.model.booking.bookingHour+"h"+vm.model.booking.bookingMin;
      var bd = new Date();
      bd.setHours(parseInt(vm.model.booking.bookingHour));
      bd.setMinutes(parseInt(vm.model.booking.bookingMin));
      bd.setSeconds(59);
      vm.model.booking.bookingDate=bd;
    }
    function submitForm(data){
      MainService.addOrUpdate(vm.model.booking).then(function(data){
        MainService.getBookings().then(function(newData){
          vm.model = {
            bookings: newData.payload
          }
        });
      });
    }

    function deleteBooking(data){
      MainService.deleteBooking(data).then(function(data){
        MainService.getBookings().then(function(data){
          vm.model = {
            bookings: data.payload
          }
        });
      });
    }

    function getBooking(data){
      MainService.getBooking(data).then(function(data){
        var current = vm.model.bookings;
        vm.model = {
          bookings: current,
          booking: data.payload
        };
      });
    }

    function truncate(event){
      MainService.truncate().then(function(data){
        vm.model = data;
        MainService.getBookings().then(function(data){
          vm.model = {
            bookings: data.payload
          }
        }).then(function(){
          MainService.validate(true).then(function(data){
            vm.validation = data;
          });
        });
      });
    }

    function findBooking(){
      if(vm.model.emailAddress!=''){
        MainService.getBooking(vm.model.fullname).then(function(data){
          vm.model = {
            booking: data,
            bookings: [data]
          }
        });
      }
    }

    function deleteOldBookings(){
      if(configuration.timing.retention > -1){
        MainService.deleteOldBookings().then(function(data){
          if(configuration.debug.enabled){
            console.log(data);
          }
        });
      }
    }

    function getBookings(){
      MainService.getBookings().then(function(data){
        vm.model = {
          bookings: data.payload
        }
      });
    }

    function validate(){
      MainService.validate().then(function(data){
        vm.validation = data;
      });
    }

    function getCurrentDate() {
      var data = new Date();
      var ora = data.getHours();
      var minuti = data.getMinutes();
      var secondi = data.getSeconds();
      var giorno = data.getDay();
      var mese = data.getMonth();
      var date = data.getDate();
      var year = data.getYear();
      if(date< 10)date = "0"+date;
      if(minuti< 10)minuti="0"+minuti;
      if(secondi< 10)secondi="0"+secondi;
      if(year<1900)year=year+1900;
      if(ora<10)ora="0"+ora;
      if(giorno == 0) giorno = " Sunday ";
      if(giorno == 1) giorno = " Monday ";
      if(giorno == 2) giorno = " Tuesday ";
      if(giorno == 3) giorno = " Wednesday ";
      if(giorno == 4) giorno = " Thursday ";
      if(giorno == 5) giorno = " Friday ";
      if(giorno == 6) giorno = " Saturday ";
      if(mese == 0) mese = "January ";
      if(mese ==1) mese = "February ";
      if(mese ==2) mese = "March ";
      if(mese ==3) mese = "April ";
      if(mese ==4) mese = "May ";
      if(mese ==5) mese = "June ";
      if(mese ==6) mese = "July ";
      if(mese ==7) mese = "August ";
      if(mese ==8) mese = "September ";
      if(mese ==9) mese = "October ";
      if(mese ==10) mese = "November ";
      if(mese ==11) mese = "December";
      var result = giorno+", "+date+" "+mese+" "+year+" "+ora+":"+minuti;
      vm.currentDate = result;
    }

    function getPagedBookings(){
      if(vm.paging.current >= vm.paging.pages){
        vm.paging.current = 0;
      }
      MainService.getBookings().then(function(totalData){
        vm.paging.total = totalData.payload.length;
        if(vm.paging.total%vm.paging.delta > 0){
          vm.paging.pages = parseInt(vm.paging.total/vm.paging.delta)+1;
        }else {
          vm.paging.pages = parseInt(vm.paging.total/vm.paging.delta);
        }
        var offset;
        if(vm.paging.current==0){
          offset = 0;
        }else{
          offset = vm.paging.current*vm.paging.delta;
        }
        MainService.getPagedBookings(vm.paging.delta, offset).then(function(data){
          vm.model = {
            bookings: data.payload
          };
          vm.paging.current++;
        });
      });
    }

    function activateLoop(){
      setInterval(getCurrentDate, configuration.timing.sleep);
      setInterval(getPagedBookings, configuration.timing.sleep);
      setInterval(deleteOldBookings, configuration.timing.sleep);
    }
    (function () {
      getCurrentDate();
      if(context=='index'){
        activateLoop();
      }else{
        getBookings();
      }
    })()
  }
})();
