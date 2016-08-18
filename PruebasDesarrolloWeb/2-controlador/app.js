angular
  .module('acumuladorApp', [])
  .controller("acumuladorAppCtrl", controladorPrincipal);

function controladorPrincipal(){
  //esta función es mi controlador
  var scope = this;
  scope.total = 0;
  scope.cuanto = 0;
  scope.tamTitular = "titularpeq";
  scope.clarooscuro = "claro";

  scope.sumar = function(){
    scope.total += parseInt(scope.cuanto);
  }
  scope.restar = function(){
    scope.total -= parseInt(scope.cuanto);
  }
  scope.avisar = function(){
    console.log("cambié");
  }
};