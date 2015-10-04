(function() {
  angular.module('myApp').controller('MentorController', [
    '$scope', 'current_user', 'user', 'UsersService', 'ProgressService', 'OrganizationService', function($scope, current_user, user, UsersService, ProgressService, OrganizationService) {
      var load_users;
      $scope.search = {};
      $scope.search.name = "";
      $scope.all_students = [];
      $scope.current_user = current_user;
      $scope.mentor = user;
      $scope.assigned_students = [];
      $scope.attention_students = [];
      load_users = function() {
        return OrganizationService.getOrganizationWithUsers($scope.mentor.organization_id).success(function(data) {
          var user_mentor;
          $scope.organization = OrganizationService.parseOrganizationWithUsers(data.organization);
          user_mentor = _.find($scope.organization.mentors, function(mentor) {
            return mentor.id === $scope.mentor.id;
          });
          if (user_mentor) {
            $scope.assigned_students = _.filter($scope.organization.students, function(student) {
              return _.contains(user_mentor.studentIds, student.id);
            });
            $scope.attention_students = _.where($scope.assigned_students, {
              needs_attention: true
            });
            console.log($scope.assigned_students);
          }
          $scope.all_students = $scope.organization.students;
          return $scope.loaded_users = true;
        });
      };
      load_users();
      $scope.assign = function(student) {
        return UsersService.assign($scope.mentor.id, student.id).success(function(data) {
          $scope.assigned_students.push(data.student);
          data.student.needs_attention = _.some(student.user_expectations, function(ue) {
            return ue.status === 2;
          });
          if (data.student.needs_attention) {
            return $scope.attention_students.push(data.student);
          }
        });
      };
      $scope.unassign = function(student) {
        return UsersService.unassign($scope.mentor.id, student.id).success(function(data) {
          var a_student, i, index, j, len, len1, ref, ref1, results;
          ref = $scope.assigned_students;
          for (index = i = 0, len = ref.length; i < len; index = ++i) {
            a_student = ref[index];
            if (a_student.id === student.id) {
              $scope.assigned_students.splice(index, 1);
              break;
            }
          }
          ref1 = $scope.attention_students;
          results = [];
          for (index = j = 0, len1 = ref1.length; j < len1; index = ++j) {
            a_student = ref1[index];
            if (a_student.id === student.id) {
              $scope.attention_students.splice(index, 1);
              break;
            } else {
              results.push(void 0);
            }
          }
          return results;
        });
      };
      return $scope.isAssigned = function(student) {
        var assigned, i, len, ref, s;
        assigned = false;
        ref = $scope.assigned_students;
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (student.id === s.id) {
            assigned = true;
            break;
          }
        }
        return assigned;
      };
    }
  ]);

}).call(this);
