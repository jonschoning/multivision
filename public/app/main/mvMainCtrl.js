angular.module('app').controller('mvMainCtrl', function($scope) {
  $scope.courses = [
    {name: 'C# for Non-Sociopaths', featured: false, published: new Date('4/5/2014')},
    {name: 'D  for Non-Sociopaths', featured: false, published: new Date('2/3/2014')},
    {name: 'C  for Sociopaths', featured: true, published: new Date('5/3/2014')},
    {name: 'B  for Non-Sociopaths', featured: false, published: new Date('1/1/2014')},
    {name: 'F# for Sociopaths', featured: true, published: new Date('2/4/2014')}
  ];
});
