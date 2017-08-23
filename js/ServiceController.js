(function() {
  'use strict';


    /*
    * Questa è la modalità da evitare secondo le best practices
    * in quanto viene dichiarata una nuova variabile per la
    * nostra applicazione invece che settarla e riutilizzarla
    */
    var serviceApp = angular.module('serviceApp', [])
    serviceApp.controller('ServiceController', ServiceController);


  /** @ngInject */
  function ServiceController($scope, FirstService) {
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
    console.log("VMT DEBUG: api esposte");
    console.log(vm.api);

    /*
    * Funzione esposta
    */
    function hello(){
      console.log("VMT DEBUG: funzione esposta HELLO");
      FirstService.hello();
    }

  (function () {
    console.log(vm.api);
    hello();
    /* put here init code */
  })()
}

})();
