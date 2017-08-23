(function() {
  'use strict';

  function customValidator(){
    var numberValidator = new RegExp('^[0-9]+$', 'i')
    var textValidator = new RegExp('^[a-zA-Z]+$', 'i');
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl){
        var result = false;
        ctrl.$validators.customValidator = function(modelValue, viewValue){
          console.log("VMT DEBUG: inside customValidator");
          console.log(attrs.type);
          //console.log("model: "+modelValue+" view: "+viewValue);
          if(!ctrl.$isEmpty(viewValue)){
            if(attrs.type=='text'){
              result = textValidator.test(viewValue);
            }else if(attrs.type=='number'){
              result = numberValidator.test(viewValue);
            }
            console.log("VMT DEBUG: returning validation result as "+result);
          }
          return result;
        }
//        return result;
      }
    }
  }

    /*
    * Questa è la modalità da evitare secondo le best practices
    * in quanto viene dichiarata una nuova variabile per la
    * nostra applicazione invece che settarla e riutilizzarla
    */
    var firstApp = angular.module('formValidateApp', [])
    firstApp.controller('FormValidateController', FormValidateController);
    firstApp.directive('customValidator', customValidator);

  /** @ngInject */
  function FormValidateController($scope) {
    var vm = $scope;
    console.log("VMT DEBUG: FormValidateController inizializzato correttamente");

    vm.api = {
      hello: hello
    };

    function hello(formData){
      console.log("VMT DEBUG: inside hello funciton of FormController");
    }

      (function () {
        /* put here init code */
      })()

  };



})();
