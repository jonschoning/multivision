angular.module('app').controller('mvUserlistCtrl', function($scope, mvUser) {
  $scope.users = mvUser.query();
});

