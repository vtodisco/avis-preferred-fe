(function() {
  'use strict';


    /*
    * Questa è la modalità da evitare secondo le best practices
    * in quanto viene dichiarata una nuova variabile per la
    * nostra applicazione invece che settarla e riutilizzarla
    */
    var firstApp = angular.module('firstApp', [])
    firstApp.controller('FirstController', FirstController);

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
  function FirstController($scope) {
    var vm = $scope;
    console.log($scope);
    console.log("VMT DEBUG: controller inizializzato correttamente");

    vm.model = {
      nome: "mario"
    };

      (function () {
        /* put here init code */
        console.log(vm.model);
      })()

    };



})();
