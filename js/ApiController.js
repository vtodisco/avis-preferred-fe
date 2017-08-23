(function() {
  'use strict';


    /*
    * Questa è la modalità da evitare secondo le best practices
    * in quanto viene dichiarata una nuova variabile per la
    * nostra applicazione invece che settarla e riutilizzarla
    */
    var firstApp = angular.module('firstApp', [])
    firstApp.controller('ApiController', ApiController);


  /** @ngInject */
  function ApiController($scope) {
    var vm = $scope;
    console.log($scope);
    console.log("VMT DEBUG: controller inizializzato correttamente");
    /*
    * Export delle api esposte dal controller
    * <Nome api>:<Nome funzione>
    */

    vm.api = {
      hello: hello
    };
    hello("Mario");
    console.log("VMT DEBUG: api esposte");
    console.log(vm.api);
  };

  /*
  *
  */
  function hello(){
    console.log("VMT DEBUG: funzione esposta HELLO");
  }

  (function () {
    /* put here init code */
  })()

})();
