(function() {
  'use strict';


    /*
    * Questa è la modalità da evitare secondo le best practices
    * in quanto viene dichiarata una nuova variabile per la
    * nostra applicazione invece che settarla e riutilizzarla
    */
    var firstApp = angular.module('formApp', [])
    firstApp.controller('FormController', FormController);

      /*
    var validator = new RegExp('d+', 'i')
    console.log("inside custom directive");
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
          console.log("validation success: "+validator.test(viewValue))
          return true;
        };
      }
    };
  });
  */

  /** @ngInject */
  function FormController($scope) {
    var vm = $scope;
    console.log($scope);
    console.log("VMT DEBUG: FormController inizializzato correttamente");

    vm.api = {
      hello: hello
    };

    function hello(formData){
      console.log("VMT DEBUG: inside hello funciton of FormController");
      console.log(vm.model.nome+" - "+vm.model.cognome);
    }

      (function () {
        /* put here init code */
        console.log(vm.model);
      })()

  };



})();
