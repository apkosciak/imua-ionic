(function() {
  angular.module('myApp').controller("DashboardController", [
    "$scope", "$location", "current_user", "user", function($scope, $location, current_user, user) {
      $scope.current_user = current_user;
      if (user) {
        $scope.user = user;
      } else {
        $scope.user = current_user;
      }
      switch ($scope.user.role) {
        case $scope.CONSTANTS.USER_ROLES.super_admin:
          $location.path('/sa/organizations');
      }
      $scope.loadDashboard = function(role) {
        switch (role) {
          case $scope.CONSTANTS.USER_ROLES.org_admin:
            return 'dashboard/orgadmin_dashboard.html';
          case $scope.CONSTANTS.USER_ROLES.mentor:
            return 'dashboard/mentor_dashboard.html';
          case $scope.CONSTANTS.USER_ROLES.student:
            return 'dashboard/student_dashboard.html';
        }
      };
    }
  ]);

}).call(this);
