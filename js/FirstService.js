(function () {
  'use strict';

  angular
    .module('serviceApp')
    .service('FirstService', FirstService);

    /** @ngInject */
    function FirstService() {

      console.log("VMT DEBUG: Servizio inizializzato correttamente");

      return {
        hello: hello
      }

      function hello(){
        console.log("VMT DEBUG: inside function hello from the FirstService");
      }
    }
})();
