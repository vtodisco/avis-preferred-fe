(function() {
  'use strict';

    /*
    * Questa è la modalità da evitare secondo le best practices
    * in quanto viene dichiarata una nuova variabile per la
    * nostra applicazione invece che settarla e riutilizzarla
    */
    var firstApp = angular.module('createSchemaApp', [])
    firstApp.controller('CreateSchemaController', CreateSchemaController);

  /** @ngInject */
  function CreateSchemaController($scope, CreateSchemaService) {
    var vm = $scope;
    console.log("VMT DEBUG: CreateSchemaController inizializzato correttamente");

    vm.api = {
      createSchema: createSchema,
      getUsers: getUsers,
      addUser: addUser,
      deleteUser: deleteUser
    };

    vm.result = {
      completed: 0,
      code: -1,
      message: "no action executed"
    }

    function createSchema($event){
      console.log("VMT DEBUG: inside createSchema function of CreateSchemaController");
      CreateSchemaService.createSchema().then(function(result){
        vm.result = result;
      });
    }

    function deleteUser(userId){
      console.log("VMT DEBUG: inside CreateSchemaController.deletUser() with id = "+userId);
      CreateSchemaService.deleteUser(userId).then(function(result){
        console.log(result);
        vm.result = result;
      });
    }

    function addUser(){
        CreateSchemaService.addUser(vm.model.user).then(function(data){
          console.log("VMT DEBUG: addUser in CreateSchemaService invoked");
          console.log(data);
        });
    }

    function getUsers($event){
      console.log("VMT DEBUG: inside getUsers function of CreateSchemaController");
      CreateSchemaService.getUsers().then(function(result){
        vm.result = result;
        vm.model =
          {
            users: result.payload
          };
          console.log(vm.result);
      });
    }

      (function () {
        /* put here init code */
        //createSchema();
      })()

  };



})();
