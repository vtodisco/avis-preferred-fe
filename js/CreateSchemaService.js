(function () {
  'use strict';

  angular
    .module('createSchemaApp')
    .service('CreateSchemaService', CreateSchemaService);

    /** @ngInject */
    function CreateSchemaService($q, $http) {

      console.log("VMT DEBUG: Servizio inizializzato correttamente");

      return {
        createSchema: createSchema,
        getUsers: getUsers,
        addUser: addUser,
        deleteUser: deleteUser
      }

      function createSchema(){
        console.log("VMT DEBUG: inside function createSchema from the CreateSchemaService with promise and HTTP")
        var deferred = $q.defer();
        $http.get('http://localhost:1111/create-schema')
        .then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
      }

      function deleteUser(userId){
        console.log("VMT DEBUG: inside CreateSchemaService.deleteUser() with id = "+userId);
        var deferred = $q.defer();
        $http({
          method: 'GET',
          url: 'http://localhost:1111/delete-user?id='+userId
        })
        .then(function(data){
          console.log("user deleted");
          deferred.resolve(data.data);
        },function(){
          console.log("error")
        });
        return deferred.promise;
      }

      function addUser(user){
        console.log("VMT DEBUG: inside CreateSchemaService.addUser()");
        var deferred = $q.defer();
        var config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
          }
        };
        $http.post(
          'http://localhost:1111/add-user',
          user,
          config
        ).then(function(data){
          console.log("VMT DEBUG: add-user executed");
          deferred.resolve(data.data);
        },function(){
          console.log("VMT DEBUG: error during addUser");
        });
        return deferred.promise;
      }
      function getUsers(){
        console.log("VMT DEBUG: inside function getUsers from the CreateSchemaService with promise and HTTP")
        var deferred = $q.defer();
        $http.get('http://localhost:1111/get-users')
        .then(function(data){
          deferred.resolve(data.data);
        },function(){
          console.log("error");
        });
        return deferred.promise;
      }
    }
})();
