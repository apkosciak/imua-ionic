(function() {
  angular.module('myApp').service('OrganizationService', [
    '$http', '$q', 'CONSTANTS', function($http, $q, CONSTANTS) {
      this.all = function() {
        return $http.get(CONSTANTS.API.base_url + '/api/v1/organization');
      };
      this.getOrganizationWithRoadmap = function(orgId) {
        return $http.get(CONSTANTS.API.base_url + '/api/v1/organization/' + orgId + '/info_with_roadmap');
      };
      this.getOrganizationWithUsers = function(orgId) {
        return $http.get(CONSTANTS.API.base_url + '/api/v1/organization/' + orgId + '/info_with_users');
      };
      this.getTimeUnits = function(orgId) {
        return $http.get(CONSTANTS.API.base_url + '/api/v1/organization/' + orgId + '/time_units');
      };
      this.addOrganization = function(name) {
        return $http.post(CONSTANTS.API.base_url + '/api/v1/organization', {
          name: name
        });
      };
      this.parseOrganizationWithUsers = function(org, timeUnitId) {
        var a, active_user_threshold, assignment, i, j, k, l, len, len1, len10, len11, len12, len2, len3, len4, len5, len6, len7, len8, len9, mentor, mentor_id, mentor_module_progress, module_title, n, new_mentor_module_progress, new_module_progress, num_students, o, orgAdmin, org_milestone, org_milestones_by_module, org_milestones_by_time_unit, p, q, r, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, semester_gpa, student, t, time_unit_id, user_assignment, user_milestone, v, w, x;
        active_user_threshold = (new Date()).getTime() - (1000 * 60 * 60 * 24 * 7);
        org.students = _.each(_.where(org.users, {
          role: 50
        }), function(s) {
          return s.modules_progress = [];
        });
        org.mentors = _.each(_.where(org.users, {
          role: 40
        }), function(m) {
          return m.modules_progress = [];
        });
        org.orgAdmins = _.where(org.users, {
          role: 10
        });
        org.active_students = _.filter(org.students, function(student) {
          return (new Date(student.last_login)).getTime() >= active_user_threshold;
        }).length;
        org.active_mentors = _.filter(org.mentors, function(mentor) {
          return (new Date(mentor.last_login)).getTime() >= active_user_threshold;
        }).length;
        org.attention_studentIds = [];
        _.each(org.milestones, function(m) {
          return m.time_unit_name = _.find(org.time_units, function(tu) {
            return tu.id === m.time_unit_id;
          }).name;
        });
        org.org_milestones = {};
        ref = _.pluck(org.time_units, "id");
        for (i = 0, len = ref.length; i < len; i++) {
          time_unit_id = ref[i];
          org.org_milestones[time_unit_id.toString()] = {};
          org_milestones_by_time_unit = _.filter(org.milestones, function(m) {
            return m.time_unit_id === time_unit_id;
          });
          ref1 = _.pluck(org.enabled_modules, "title");
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            module_title = ref1[j];
            org_milestones_by_module = _.filter(org_milestones_by_time_unit, function(m) {
              return m.module === module_title;
            });
            org.org_milestones[time_unit_id.toString()][module_title] = org_milestones_by_module;
            org.org_milestones[time_unit_id.toString()][module_title].totalPoints = 0;
            for (k = 0, len2 = org_milestones_by_module.length; k < len2; k++) {
              org_milestone = org_milestones_by_module[k];
              org.org_milestones[time_unit_id.toString()][module_title].totalPoints += org_milestone.points;
            }
          }
        }
        org.assignments = _.union(_.flatten(_.pluck(org.users, "assignments")));
        org.assignments = _.without(org.assignments, void 0);
        ref2 = org.assignments;
        for (l = 0, len3 = ref2.length; l < len3; l++) {
          a = ref2[l];
          switch (a.assignment_owner_type) {
            case "User":
              a.user = _.find(org.users, function(u) {
                return a.assignment_owner_id === u.id;
              });
              break;
            case "Milestone":
              a.milestone = _.find(org.milestones, function(m) {
                return a.assignment_owner_id === m.id;
              });
          }
          a.user_assignments = [];
        }
        org.user_assignments = _.union(_.flatten(_.pluck(org.users, "user_assignments"), true));
        org.user_assignments = _.without(org.user_assignments, void 0);
        _.each(org.user_assignments, function(a) {
          return _.each(a.comments, function(c) {
            return c.user = _.find(org.users, function(u) {
              return c.user_id === u.id;
            });
          });
        });
        org.total_gpa = org.semester_gpa = 0;
        org.total_serviceHours = org.semester_serviceHours = 0;
        org.total_ecActivities = org.semester_ecActivities = 0;
        org.total_testsTaken = org.semester_testsTaken = 0;
        org.average_gpa = 0;
        org.average_serviceHours = 0;
        org.average_ecActivities = 0;
        org.average_testsTaken = 0;
        ref3 = org.orgAdmins;
        for (n = 0, len4 = ref3.length; n < len4; n++) {
          orgAdmin = ref3[n];
          if (orgAdmin.user_assignments !== void 0) {
            ref4 = orgAdmin.user_assignments;
            for (o = 0, len5 = ref4.length; o < len5; o++) {
              user_assignment = ref4[o];
              assignment = _.find(org.assignments, function(a) {
                return user_assignment.assignment_id === a.id;
              });
              user_assignment.title = assignment.title;
              user_assignment.due_datetime = assignment.due_datetime;
              user_assignment.description = assignment.description;
              user_assignment.assigner = assignment.user;
              user_assignment.user = orgAdmin;
              assignment.user_assignments.push(user_assignment);
            }
          }
        }
        ref5 = org.mentors;
        for (p = 0, len6 = ref5.length; p < len6; p++) {
          mentor = ref5[p];
          if (mentor.user_assignments !== void 0) {
            ref6 = mentor.user_assignments;
            for (q = 0, len7 = ref6.length; q < len7; q++) {
              user_assignment = ref6[q];
              assignment = _.find(org.assignments, function(a) {
                return user_assignment.assignment_id === a.id;
              });
              user_assignment.title = assignment.title;
              user_assignment.due_datetime = assignment.due_datetime;
              user_assignment.description = assignment.description;
              user_assignment.assigner = assignment.user;
              user_assignment.user = mentor;
              assignment.user_assignments.push(user_assignment);
            }
          }
        }
        ref7 = org.students;
        for (r = 0, len8 = ref7.length; r < len8; r++) {
          student = ref7[r];
          time_unit_id = timeUnitId != null ? timeUnitId : student.time_unit_id;
          student.mentors = [];
          ref8 = _.uniq(_.pluck(student.relationships, "assigned_to_id"));
          for (t = 0, len9 = ref8.length; t < len9; t++) {
            mentor_id = ref8[t];
            mentor = _.findWhere(org.mentors, {
              id: mentor_id
            });
            if (mentor) {
              student.mentors.push(mentor);
              if (!mentor.studentIds) {
                mentor.studentIds = [];
              }
              mentor.studentIds.push(student.id);
            }
          }
          ref9 = org.org_milestones[time_unit_id];
          for (module_title in ref9) {
            org_milestones_by_module = ref9[module_title];
            new_module_progress = {
              module_title: module_title,
              time_unit_id: time_unit_id,
              points: {
                user: 0,
                total: org_milestones_by_module.totalPoints
              }
            };
            ref10 = _.where(student.user_milestones, {
              time_unit_id: time_unit_id,
              module: module_title
            });
            for (v = 0, len10 = ref10.length; v < len10; v++) {
              user_milestone = ref10[v];
              org_milestone = _.findWhere(org_milestones_by_module, {
                id: user_milestone.milestone_id
              });
              if (org_milestone) {
                new_module_progress.points.user += org_milestone.points;
              } else {
                console.log("Error: user_milestone has no matching org_milestone.", user_milestone, org_milestones_by_module, org.org_milestones);
              }
            }
            student.modules_progress.push(new_module_progress);
            ref11 = student.mentors;
            for (w = 0, len11 = ref11.length; w < len11; w++) {
              mentor = ref11[w];
              mentor_module_progress = _.findWhere(mentor.modules_progress, {
                module_title: new_module_progress.module_title
              });
              if (mentor_module_progress !== void 0) {
                mentor_module_progress.points.user += new_module_progress.points.user;
                mentor_module_progress.points.total += new_module_progress.points.total;
              } else {
                new_mentor_module_progress = {
                  module_title: module_title,
                  time_unit_id: null,
                  points: {
                    user: new_module_progress.points.user,
                    total: new_module_progress.points.total
                  }
                };
                mentor.modules_progress.push(new_mentor_module_progress);
              }
            }
          }
          if (student.user_assignments !== void 0) {
            ref12 = student.user_assignments;
            for (x = 0, len12 = ref12.length; x < len12; x++) {
              user_assignment = ref12[x];
              assignment = _.find(org.assignments, function(a) {
                return user_assignment.assignment_id === a.id;
              });
              user_assignment.title = assignment.title;
              user_assignment.due_datetime = assignment.due_datetime;
              user_assignment.description = assignment.description;
              user_assignment.assigner = assignment.user;
              user_assignment.user = student;
              assignment.user_assignments.push(user_assignment);
            }
          }
          student.total_gpa = 0.0;
          student.semester_gpa = 0.0;
          if (!!student.user_gpas && student.user_gpas.length > 0) {
            _.each(student.user_gpas, function(gpa) {
              return student.total_gpa += gpa.regular_unweighted;
            });
            student.total_gpa /= student.user_gpas.length;
          }
          semester_gpa = _.findWhere(student.user_gpas, {
            time_unit_id: time_unit_id
          });
          if (semester_gpa) {
            student.semester_gpa = semester_gpa.regular_unweighted;
          }
          org.total_gpa += student.total_gpa;
          org.semester_gpa += student.semester_gpa;
          student.total_service_hours = student.semester_service_hours = 0;
          _.each(student.user_service_hours, function(ush) {
            student.total_service_hours += parseFloat(ush.hours);
            return student.semester_service_hours += ush.time_unit_id === time_unit_id ? parseFloat(ush.hours) : 0;
          });
          org.total_serviceHours += student.total_service_hours;
          org.semester_serviceHours += student.semester_service_hours;
          student.total_extracurricular_activities = student.user_extracurricular_activity_details ? student.user_extracurricular_activity_details.length : 0;
          student.semester_extracurricular_activities = _.filter(student.user_extracurricular_activity_details, function(detail) {
            return detail.time_unit_id === time_unit_id;
          }).length;
          org.total_ecActivities += student.total_extracurricular_activities;
          org.semester_ecActivities += student.semester_extracurricular_activities;
          student.total_tests = student.user_tests ? student.user_tests.length : 0;
          student.semester_tests = _.filter(student.user_tests, function(test) {
            return test.time_unit_id === time_unit_id;
          }).length;
          org.total_testsTaken += student.total_tests;
          org.semester_testsTaken += student.semester_tests;
          student.needs_attention = _.some(student.user_expectations, function(ue) {
            return ue.status === 2;
          });
          if (student.needs_attention) {
            org.attention_studentIds.push(student.id);
          }
          student.meeting_expectations = _.every(student.user_expectations, function(ue) {
            return ue.status === 0;
          });
        }
        num_students = org.students.length;
        if (num_students > 0) {
          org.average_gpa = (org.semester_gpa / num_students).toFixed(2);
          org.average_serviceHours = (org.semester_serviceHours / num_students).toFixed(2);
          org.average_ecActivities = (org.semester_ecActivities / num_students).toFixed(2);
          org.average_testsTaken = (org.semester_testsTaken / num_students).toFixed(2);
        }
        org.groupedStudents = _.groupBy(org.students, "class_of");
        return org;
      };
      return this;
    }
  ]);

}).call(this);
