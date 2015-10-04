angular.module('myApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assignment/assignment.html',
    "<ion-view view-title=\"Assignment\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"taskContainer\" wait-to-load=\"{{loaded_assignable_users}}\">\n" +
    "\n" +
    "      <div class=\"task-header clear\">\n" +
    "        <div class=\"single-col-wrapper\">\n" +
    "          <div class=\"back-link\">\n" +
    "            <div back-button class=\"ng-clickable\">\n" +
    "              <h6>\n" +
    "                <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n" +
    "                <span class=\"ng-clickable-text\">Go Back</span>\n" +
    "              </h6>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div task-editor class=\"edit-buttons-top\" ng-hide=\"assignment.editing\">\n" +
    "            <button class=\"btn btn-default\" ng-click=\"editAssignment($index)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit This Task</button>\n" +
    "          </div>\n" +
    "          <div task-editor class=\"edit-buttons-top\" ng-show=\"assignment.editing\">\n" +
    "            <button class=\"btn btn-success\" ng-click=\"saveAssignment($index)\"><span class=\"glyphicon glyphicon-ok\"></span> Save Task</button>\n" +
    "            <button class=\"btn btn-danger btn-sm\" ng-click=\"cancelEditAssignment($index)\"><span class=\"glyphicon glyphicon-remove\"></span> Cancel</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"single-col-wrapper clear\">\n" +
    "        <div class=\"assignment--left\">\n" +
    "          <div class=\"task-content\" ng-hide=\"assignment.editing\">\n" +
    "            <h4><span class=\"bold\">{{assignment.title}}</span></h4>\n" +
    "            <h6 class=\"wysiwyg-output\" ng-bind-html=\"assignment.description\"></h6>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"task-content\" ng-show=\"assignment.editing\">\n" +
    "            <div class=\"form-wrapper\">\n" +
    "              <label><h5>Task Name:</h5></label>\n" +
    "              <input class=\"form-control\" ng-model=\"assignment.new_title\" placeholder=\"Title\" autofocus=\"true\">\n" +
    "            </div>\n" +
    "\n" +
    "              <label><h5>Details:</h5></label>\n" +
    "              <text-angular ta-toolbar=\"[]\" name=\"taskDescription\" ng-model=\"assignment.new_description\" placeholder=\"Description\"></text-angular>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <ul class=\"users-not-completed\" ng-if=\"user_assignments_incomplete.length != 0\">\n" +
    "            <h6 class=\"bold red\" ng-if=\"user_assignments_incomplete.length == 1\">{{user_assignments_incomplete.length}} user has not completed this task</h6>\n" +
    "            <h6 class=\"bold red\" ng-if=\"user_assignments_incomplete.length != 1\">{{user_assignments_incomplete.length}} users have not completed this task</h6>\n" +
    "            <li class=\"medium-circle-pictures\" ng-repeat=\"user_assignment in user_assignments_incomplete | orderBy: 'user.last_name'\">\n" +
    "              <a href=\"#/app/user_assignment/{{user_assignment.id}}\">\n" +
    "                <div class=\"medium-circle-picture\">\n" +
    "                  <img ng-src=\"{{user_assignment.user.square_avatar_url}}\" alt=\"Last updated: {{user_assignment.updated_at | formatMDY}}\" />\n" +
    "                </div>\n" +
    "                <span class=\"bold\">{{user_assignment.user.first_last_initial}}</span>\n" +
    "              </a>\n" +
    "              <ul class=\"circle-subnav\" ng-hide=\"assignment.editing\">\n" +
    "                <li class=\"subnav-button\">\n" +
    "                  <button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"setUserAssignmentStatus(user_assignment, 1)\">Mark Complete</button>\n" +
    "                </li>\n" +
    "                <li class=\"subnav-button\">\n" +
    "                  <button class=\"btn btn-info btn-xs\" ng-click=\"go('/app/user_assignment/' + user_assignment.id)\">View Comments</button>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "              <div class=\"edit-buttons subnav-button\" ng-show=\"assignment.editing\">\n" +
    "                <button class=\"btn btn-danger btn-xs\" ng-click=\"deleteUserAssignment(assignment, user_assignment)\">Remove From<br>Task</button>\n" +
    "              </div>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <ul class=\"users-completed\" ng-if=\"user_assignments_completed.length != 0\">\n" +
    "            <h6 class=\"bold green\" ng-if=\"user_assignments_completed.length == 1 && user_assignments_incomplete.length != 0\">{{user_assignments_completed.length}} user has completed this task</h6>\n" +
    "            <h6 class=\"bold green\" ng-if=\"user_assignments_completed.length != 1 && user_assignments_incomplete.length != 0\">{{user_assignments_completed.length}} users have completed this task</h6>\n" +
    "            <h6 class=\"bold green\" ng-if=\"user_assignments_completed.length != 0 && user_assignments_incomplete.length == 0\">Nice! All assigned users have completed this task.</h6>\n" +
    "            <li class=\"medium-circle-pictures\" ng-repeat=\"user_assignment in user_assignments_completed | orderBy: 'updated_at'\">\n" +
    "              <a href=\"#/app/user_assignment/{{user_assignment.id}}\">\n" +
    "                <div class=\"medium-circle-picture\">\n" +
    "                  <img ng-src=\"{{user_assignment.user.square_avatar_url}}\" alt=\"Last updated: {{user_assignment.updated_at | formatMDY}}\" />\n" +
    "                </div>\n" +
    "                <span class=\"bold\">{{user_assignment.user.first_last_initial}}</span>\n" +
    "              </a>\n" +
    "              <ul class=\"circle-subnav\" ng-hide=\"assignment.editing\">\n" +
    "                <li>Completed: {{user_assignment.updated_at | formatMDY}}</li>\n" +
    "                <li class=\"subnav-button\">\n" +
    "                  <button type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"setUserAssignmentStatus(user_assignment, 0)\">Mark<br>Incomplete</button>\n" +
    "                </li>\n" +
    "                <li class=\"subnav-button\">\n" +
    "                  <button class=\"btn btn-info btn-xs\" ng-click=\"go('/app/user_assignment/' + user_assignment.id)\">View Comments</button>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "              <div class=\"edit-buttons subnav-button\" ng-show=\"assignment.editing\">\n" +
    "                <button class=\"btn btn-danger btn-xs\" ng-click=\"deleteUserAssignment(assignment, user_assignment)\">Remove From<br>Task</button>\n" +
    "              </div>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <div class=\"form-wrapper\" ng-show=\"assignment.editing\">\n" +
    "            <div class=\"add-button\" ng-click=\"assignment.assigning_users=true\" ng-hide=\"assignment.assigning_users || assignment.assignees.length == assignable_users.length\">\n" +
    "              <div class=\"glyphicon glyphicon-plus-sign\"></div>\n" +
    "              <h6 class=\"bold\">Assign Users</h6>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"assigning-students\" ng-show=\"assignment.assigning_users\">\n" +
    "\n" +
    "              <h5 class=\"list-header-imua\"><span class=\"bold\">Assign Users</span></h5>\n" +
    "\n" +
    "              <div class=\"list-container\">\n" +
    "\n" +
    "                <div ng-repeat=\"group in assignable_user_groups\" ng-if=\"group.group_users.length > 0\">\n" +
    "                  <h4>{{group.group_name}}</h4>\n" +
    "                  <div class=\"medium-circle-pictures assigned\" ng-repeat=\"user in group.group_users | orderBy: 'last_name'\">\n" +
    "\n" +
    "                    <!-- TODO Switch statement -->\n" +
    "                    <div ng-if=\"isUnassigned(assignment, user)\">\n" +
    "                      <div class=\"medium-circle-picture\">\n" +
    "                        <img ng-src=\"{{user.square_avatar_url}}\" alt=\"Assign {{user.first_last_initial}} to this Task\" class=\"avatar-block__img avatar-block__img--thumbnail\" />\n" +
    "                      </div>\n" +
    "                      <h6 class=\"bold\">{{user.first_last_initial}}</h6>\n" +
    "                      <div class=\"assigning-buttons\">\n" +
    "                        <button class=\"btn btn-default btn-xs showing-button\">Not Assigned</button>\n" +
    "                        <button class=\"btn btn-success btn-xs hidden-button\" ng-click=\"assignAssignee(user, assignment)\"><span class=\"glyphicon glyphicon-plus\"></span> Assign User</button>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div ng-if=\"isPendingAssignment(assignment, user)\">\n" +
    "                      <div class=\"medium-circle-picture\">\n" +
    "                        <img ng-src=\"{{user.square_avatar_url}}\" alt=\"Remove {{user.first_last_initial}}\">\n" +
    "                      </div>\n" +
    "                      <h6 class=\"bold\">{{user.first_last_initial}}</h6>\n" +
    "                      <div class=\"assigning-buttons\">\n" +
    "                        <button class=\"btn btn-success btn-xs showing-button\"><span class=\"glyphicon glyphicon-ok\"></span> Assigning</button>\n" +
    "                        <button class=\"btn btn-danger btn-xs hidden-button\" ng-click=\"unassignAssignee(user, assignment)\"><span class=\"glyphicon glyphicon-remove\"></span> Remove</button>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div ng-if=\"isAssigned(assignment, user)\">\n" +
    "                      <div class=\"medium-circle-picture\">\n" +
    "                        <img ng-src=\"{{user.square_avatar_url}}\" alt=\"Remove {{user.first_last_initial}}\">\n" +
    "                      </div>\n" +
    "                      <h6 class=\"bold\">{{user.first_last_initial}}</h6>\n" +
    "                      <div class=\"assigning-buttons\">\n" +
    "                        <button class=\"btn btn-danger btn-xs\" ng-click=\"deleteUserFromAssignment(assignment, user)\">Remove From<br>Task</button>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                  </div>\n" +
    "                </div> <!-- ng-repeat=\"(group, group_users) in assignable_users\" -->\n" +
    "\n" +
    "                <div class=\"add-button\" ng-click=\"assignAllAssignableUsers(assignment)\" ng-hide=\"assignable_users.length == (assignment.assignees.length + user_assignments_completed.length + user_assignments_incomplete.length)\">\n" +
    "                  <div class=\"glyphicon glyphicon-plus-sign green\"></div>\n" +
    "                  <div>Assign All Users</div>\n" +
    "                </div>\n" +
    "\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"edit-buttons-top\" ng-show=\"assignment.editing\">\n" +
    "            <button class=\"btn btn-success\" ng-click=\"saveAssignment()\"><span class=\"glyphicon glyphicon-ok\"></span> Save Task</button>\n" +
    "            <button class=\"btn btn-danger btn-sm\" ng-click=\"cancelEditAssignment()\"><span class=\"glyphicon glyphicon-remove\"></span> Cancel</button>\n" +
    "          </div>\n" +
    "\n" +
    "          <div task-editor class=\"edit-buttons\" ng-hide=\"assignment.editing\">\n" +
    "            <button class=\"btn btn-default\" ng-click=\"editAssignment()\"><span class=\"glyphicon glyphicon-edit\"></span> Edit This Task</button>\n" +
    "            <button class=\"btn btn-danger\" ng-click=\"deleteAssignment()\"><span class=\"glyphicon glyphicon-trash\"></span> Delete this Task</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"assignment--right\">\n" +
    "          <ul>\n" +
    "            <li>\n" +
    "              <h5>\n" +
    "                <span ng-if=\"_.where(assignment.user_assignments, {status: 1}).length != assignment.user_assignments.length\">\n" +
    "                  <span class=\"label label-primary\" ng-if=\"!isDueSoon(assignment) && !isPastDue(assignment)\"><span class=\"glyphicon glyphicon-record\"></span> Open</span>\n" +
    "                  <span class=\"label label-warning\" ng-if=\"isDueSoon(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Due Soon</span>\n" +
    "                  <span class=\"label label-danger\" ng-if=\"isPastDue(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Past Due</span>\n" +
    "                </span>\n" +
    "                <span class=\"label label-success\" ng-if=\"_.where(assignment.user_assignments, {status: 1}).length == assignment.user_assignments.length\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok-circle\"></span> Complete\n" +
    "                </span>\n" +
    "              </h5>\n" +
    "            </li>\n" +
    "            <li ng-if=\"assignment.due_datetime != null\" ng-hide=\"assignment.editing\">\n" +
    "              <h6>Due by</h6>\n" +
    "              <h5 class=\"bold\">{{assignment.due_datetime | formatMDY}}</h5>\n" +
    "            </li>\n" +
    "            <li class=\"form-wrapper\" ng-show=\"assignment.editing\">\n" +
    "              <label><h6>Due Date:</h6></label>\n" +
    "              <imua-datepicker date=\"assignment.new_due_datetime\"></imua-datepicker>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <h6>Users Assigned</h6>\n" +
    "              <h5 class=\"bold\">{{assignment.user_assignments.length}}</h5>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <h6>Created by</h6>\n" +
    "              <a href=\"#/app/profile/{{user.id}}\">\n" +
    "                <div class=\"tiny-circle-picture\">\n" +
    "                  <img ng-src=\"{{user.square_avatar_url}}\" alt=\"{{user.first_name}} {{user.last_name}}\" />\n" +
    "                </div>\n" +
    "                <h6 class=\"bold\">{{user.first_name}} {{user.last_name}}</h6>\n" +
    "              </a>\n" +
    "              <p>on {{assignment.created_at | formatMDY}}</p>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('assignment/assignments.html',
    "<ion-view view-title=\"Assignments\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"assignmentsContainer clear\">\n" +
    "\n" +
    "      <div class=\"assignments-header\">\n" +
    "        <div class=\"assignments-header--wrapper\">\n" +
    "          <div class=\"greeting\">\n" +
    "            <h4 class=\"bold\">{{user.first_last_initial}}'s Tasks</h4>\n" +
    "          </div>\n" +
    "          <div class=\"task-button-container\">\n" +
    "            <a no-click-propagation href=\"#/app/assignment/-1\"><button class=\"btn btn-default\">New Task</button></a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"assignments-content clear\" wait-to-load=\"{{loaded_data}}\">\n" +
    "        <div class=\"assignments-nav\">\n" +
    "          <div ng-include=\"'assignment/widgets/assignments_nav.html'\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"assignments-pane\">\n" +
    "          <div ng-include=\"'assignment/widgets/assignments_list.html'\"></div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('assignment/incoming_assignments.html',
    "<div class=\"incomingAssignmentsContainer tasksListContainer\" wait-to-load=\"{{loaded_incoming_assignments}}\">\n" +
    "  <!-- On initial view, show all incoming assignments -->\n" +
    "  <div class=\"single-col-wrapper tasks--list--container\">\n" +
    "\n" +
    "    <h4>{{user.first_last_initial}}'s Tasks:</h4>\n" +
    "\n" +
    "    <ul class=\"tasks--list\">\n" +
    "      <li class=\"tasks--list--item clear\">\n" +
    "        <div class=\"tasks--list--item--left\">\n" +
    "          <span class=\"bold\">Open Tasks</span>\n" +
    "        </div>\n" +
    "        <div class=\"tasks--list--item--middle\">\n" +
    "          Status\n" +
    "        </div>\n" +
    "        <div class=\"tasks--list--item--right\">\n" +
    "          Due\n" +
    "        </div>\n" +
    "      </li>\n" +
    "\n" +
    "      <li class=\"tasks--list--item\" ng-repeat=\"assignment in incoming_assignments | orderBy:sortIncompleteAssignments\" ng-if=\"assignment.status == 0\" ng-click=\"assignment.expanded = !assignment.expanded\">\n" +
    "        <div class=\"clear\" ng-hide=\"assignment.expanded\">\n" +
    "          <div class=\"tasks--list--item--left\">\n" +
    "            <h6 class=\"bold\"><a no-click-propagation href=\"#/app/user_assignment/{{assignment.id}}\">{{assignment.title}}</a></h6>\n" +
    "            <span class=\"subtext\">\n" +
    "              <a no-click-propagation href=\"#/app/profile/{{assignment.assigner.id}}\">\n" +
    "                <span ng-if=\"current_user.id == assignment.assigner.id\">You </span>\n" +
    "                <span ng-if=\"current_user.id != assignment.assigner.id\">{{assignment.assigner.first_last_initial}} </span>\n" +
    "              </a>\n" +
    "              created this task on {{assignment.created_at | formatMDY}}\n" +
    "            </span>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--middle\">\n" +
    "            <h6>\n" +
    "              <span ng-if=\"_.where(assignment.user_assignments, {status: 1}).length != assignment.user_assignments.length\">\n" +
    "                <span class=\"label label-primary\" ng-if=\"!isDueSoon(assignment) && !isPastDue(assignment)\"><span class=\"glyphicon glyphicon-record\"></span> Open</span>\n" +
    "                <span class=\"label label-warning\" ng-if=\"isDueSoon(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Due Soon</span>\n" +
    "                <span class=\"label label-danger\" ng-if=\"isPastDue(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Past Due</span>\n" +
    "              </span>\n" +
    "            </h6>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--right\">\n" +
    "            <h6 ng-if=\"assignment.due_datetime != null\">{{assignment.due_datetime | formatMDY}}</h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"tasks--list--item--expanded\" ng-show=\"assignment.expanded\">\n" +
    "          <h5 class=\"bold\"><a no-click-propagation href=\"#/app/user_assignment/{{assignment.id}}\">{{assignment.title}}</a></h5>\n" +
    "          <h6 class=\"wysiwyg-output\" ng-bind-html=\"assignment.description\"></h6>\n" +
    "          <span class=\"subtext\">\n" +
    "            <span class=\"label label-primary\" ng-if=\"!isDueSoon(assignment) && !isPastDue(assignment)\"><span class=\"glyphicon glyphicon-record\"></span> Open</span>\n" +
    "            <span class=\"label label-warning\" ng-if=\"isDueSoon(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Due Soon</span>\n" +
    "            <span class=\"label label-danger\" ng-if=\"isPastDue(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Past Due</span>\n" +
    "          </span>\n" +
    "          <a no-click-propagation href=\"#/app/profile/{{assignment.assigner.id}}\">\n" +
    "            <span ng-if=\"current_user.id == assignment.assigner.id\">You </span>\n" +
    "            <span ng-if=\"current_user.id != assignment.assigner.id\">{{assignment.assigner.first_last_initial}} </span>\n" +
    "          </a>\n" +
    "          created this task on {{assignment.created_at | formatMDY}}.\n" +
    "          <span ng-if=\"assignment.due_datetime != null\">It's due on {{assignment.due_datetime | formatMDY}}.</span>\n" +
    "\n" +
    "          <div class=\"edit-buttons\">\n" +
    "            <button class=\"btn btn-success\" ng-click=\"setUserAssignmentStatus(assignment, 1)\">I Did This</button>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "      </li>\n" +
    "\n" +
    "    </ul>\n" +
    "\n" +
    "  </div>\n" +
    "  <div class=\"single-col-wrapper tasks--list--container\">\n" +
    "\n" +
    "    <ul class=\"tasks--list completed-tasks\">\n" +
    "      <li class=\"tasks--list--item clear\">\n" +
    "        <div class=\"tasks--list--item--left\">\n" +
    "          <span class=\"bold\">Completed Tasks</span>\n" +
    "        </div>\n" +
    "        <div class=\"tasks--list--item--middle\">\n" +
    "          Status\n" +
    "        </div>\n" +
    "        <div class=\"tasks--list--item--right\">\n" +
    "          Due\n" +
    "        </div>\n" +
    "      </li>\n" +
    "\n" +
    "      <li class=\"tasks--list--item\" ng-repeat=\"assignment in incoming_assignments | orderBy:sortCompletedAssignments\" ng-if=\"assignment.status == 1\" ng-click=\"assignment.expanded = !assignment.expanded\">\n" +
    "        <div class=\"clear\" ng-hide=\"assignment.expanded\">\n" +
    "          <div class=\"tasks--list--item--left\">\n" +
    "            <h6 class=\"bold\"><a no-click-propagation href=\"#/app/user_assignment/{{assignment.id}}\">{{assignment.title}}</a></h6>\n" +
    "            <span class=\"subtext\">\n" +
    "              <a no-click-propagation href=\"#/app/profile/{{assignment.assigner.id}}\">\n" +
    "                <span ng-if=\"current_user.id == assignment.assigner.id\">You </span>\n" +
    "                <span ng-if=\"current_user.id != assignment.assigner.id\">{{assignment.assigner.first_last_initial}} </span>\n" +
    "              </a>\n" +
    "              created this task on {{assignment.created_at | formatMDY}}\n" +
    "            </span>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--middle\">\n" +
    "            <h6>\n" +
    "              <span class=\"label label-success\">\n" +
    "                <span class=\"glyphicon glyphicon-ok-circle\"></span> Complete\n" +
    "              </span>\n" +
    "            </h6>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--right\">\n" +
    "            <h6 ng-if=\"assignment.due_datetime != null\">{{assignment.due_datetime | formatMDY}}</h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"tasks--list--item--expanded\" ng-show=\"assignment.expanded\">\n" +
    "          <h5 class=\"bold\"><a no-click-propagation href=\"#/app/user_assignment/{{assignment.id}}\">{{assignment.title}}</a></h5>\n" +
    "          <h6 class=\"wysiwyg-output\" ng-bind-html=\"assignment.description\"></h6>\n" +
    "          <span class=\"subtext\">\n" +
    "            <span class=\"label label-success\">\n" +
    "              <span class=\"glyphicon glyphicon-ok-circle\"></span> Complete\n" +
    "            </span>\n" +
    "            <a no-click-propagation href=\"#/app/profile/{{assignment.assigner.id}}\">\n" +
    "              <span ng-if=\"current_user.id == assignment.assigner.id\">You </span>\n" +
    "              <span ng-if=\"current_user.id != assignment.assigner.id\">{{assignment.assigner.first_last_initial}} </span>\n" +
    "            </a>\n" +
    "            created this task on {{assignment.created_at | formatMDY}}.\n" +
    "            <span ng-if=\"assignment.due_datetime != null\">It's due on {{assignment.due_datetime | formatMDY}}.</span>\n" +
    "          </span>\n" +
    "\n" +
    "          <div class=\"edit-buttons\">\n" +
    "            <button class=\"btn btn-danger\" ng-click=\"setUserAssignmentStatus(assignment, 0)\">I Didn't Finish This Yet</button>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "      </li>\n" +
    "\n" +
    "    </ul>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('assignment/outgoing_assignments.html',
    "<div class=\"tasksListContainer\" wait-to-load=\"{{loaded_outgoing_assignments}}\">\n" +
    "\n" +
    "  <div class=\"single-col-wrapper tasks--list--container\">\n" +
    "\n" +
    "    <ul class=\"tasks--list\">\n" +
    "      <li class=\"tasks--list--item clear\">\n" +
    "        <div class=\"tasks--list--item--left\">\n" +
    "          <span class=\"bold\">Open Tasks</span>\n" +
    "        </div>\n" +
    "        <div class=\"tasks--list--item--middle\">\n" +
    "          Students Completed\n" +
    "        </div>\n" +
    "        <div class=\"tasks--list--item--right\">\n" +
    "          Due\n" +
    "        </div>\n" +
    "      </li>\n" +
    "      <li class=\"tasks--list--item\" ng-repeat=\"assignment in outgoing_assignments | orderBy:sortIncompleteAssignments\" ng-if=\"!isComplete(assignment)\" ng-click=\"assignment.expanded = !assignment.expanded\">\n" +
    "        <div class=\"clear\" ng-hide=\"assignment.expanded\">\n" +
    "          <div class=\"tasks--list--item--left\">\n" +
    "            <h6 class=\"bold\"><a no-click-propagation href=\"#/app/assignment/{{assignment.id}}\">{{assignment.title}}</a></h6>\n" +
    "            <span class=\"subtext\">\n" +
    "              <span ng-if=\"!isComplete(assignment)\">\n" +
    "                <span class=\"label label-primary\" ng-if=\"!isDueSoon(assignment) && !isPastDue(assignment)\"><span class=\"glyphicon glyphicon-record\"></span> Open</span>\n" +
    "                <span class=\"label label-warning\" ng-if=\"isDueSoon(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Due Soon</span>\n" +
    "                <span class=\"label label-danger\" ng-if=\"isPastDue(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Past Due</span>\n" +
    "              </span>\n" +
    "              <a no-click-propagation href=\"#/app/profile/{{user.id}}\">\n" +
    "                <span ng-if=\"current_user.id == assignment.user_id\">You </span>\n" +
    "                <span ng-if=\"current_user.id != assignment.user_id\">{{assignment.user.first_last_initial}} </span>\n" +
    "              </a>\n" +
    "              created this task on {{assignment.created_at | formatMDY}}\n" +
    "            </span>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--middle\">\n" +
    "            <h6>{{_.where(assignment.user_assignments, {status: 1}).length}}/{{assignment.user_assignments.length}}</h6>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--right\">\n" +
    "            <h6 ng-if=\"assignment.due_datetime != null\">{{assignment.due_datetime | formatMDY}}</h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"tasks--list--item--expanded\" ng-show=\"assignment.expanded\">\n" +
    "          <h5><span class=\"bold\"><a no-click-propagation href=\"#/app/assignment/{{assignment.id}}\">{{assignment.title}}</a></span></h5>\n" +
    "          <h6>{{assignment.description}}</h6>\n" +
    "          <span class=\"subtext\">\n" +
    "            <span ng-if=\"!isComplete(assignment)\">\n" +
    "              <span class=\"label label-primary\" ng-if=\"!isDueSoon(assignment) && !isPastDue(assignment)\"><span class=\"glyphicon glyphicon-record\"></span> Open</span>\n" +
    "              <span class=\"label label-warning\" ng-if=\"isDueSoon(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Due Soon</span>\n" +
    "              <span class=\"label label-danger\" ng-if=\"isPastDue(assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Past Due</span>\n" +
    "            </span>\n" +
    "            <a no-click-propagation href=\"#/app/profile/{{user.id}}\">\n" +
    "              <span ng-if=\"current_user.id == assignment.user_id\">You </span>\n" +
    "              <span ng-if=\"current_user.id != assignment.user_id\">{{assignment.user.first_last_initial}} </span>\n" +
    "            </a>\n" +
    "            created this task on {{assignment.created_at | formatMDY}}.\n" +
    "            <span ng-if=\"assignment.due_datetime != null\">It's due on {{assignment.due_datetime | formatMDY}}.</span>\n" +
    "          </span>\n" +
    "\n" +
    "          <div class=\"clear\" ng-if=\"!isComplete(assignment) && _.where(assignment.user_assignments, {status: 1}).length != 0\">\n" +
    "            <div class=\"expanded--complete\">\n" +
    "              <div class=\"tiny-circle-picture\" ng-repeat=\"user_assignment in assignment.user_assignments\" ng-if=\"user_assignment.status == 1\">\n" +
    "                <a no-click-propagation href=\"#/app/user_assignment/{{user_assignment.id}}\">\n" +
    "                  <img ng-src=\"{{user_assignment.user.square_avatar_url}}\" alt=\"{{user_assignment.user.first_last_initial}}\" class=\"avatar-block__img avatar-block__img--thumbnail\" />\n" +
    "                </a>\n" +
    "              </div>\n" +
    "              <div class=\"complete-title green\">\n" +
    "                <span ng-if=\"_.where(assignment.user_assignments, {status: 1}).length == 1\">Has </span>\n" +
    "                <span ng-if=\"_.where(assignment.user_assignments, {status: 1}).length != 1\">Have </span>\n" +
    "                Completed the Task\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"expanded--not-complete\">\n" +
    "              <div class=\"tiny-circle-picture\" ng-repeat=\"user_assignment in assignment.user_assignments\" ng-if=\"user_assignment.status == 0\">\n" +
    "                <a no-click-propagation href=\"#/app/user_assignment/{{user_assignment.id}}\">\n" +
    "                  <img ng-src=\"{{user_assignment.user.square_avatar_url}}\" alt=\"{{user_assignment.user.first_last_initial}}\" class=\"avatar-block__img avatar-block__img--thumbnail\" />\n" +
    "                </a>\n" +
    "              </div>\n" +
    "              <div class=\"complete-title red\">\n" +
    "                <span ng-if=\"_.where(assignment.user_assignments, {status: 0}).length == 1\">Has </span>\n" +
    "                <span ng-if=\"_.where(assignment.user_assignments, {status: 0}).length != 1\">Have </span>\n" +
    "                Not Completed the Task\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"expanded--solo\" ng-if=\"_.where(assignment.user_assignments, {status: 1}).length == 0\">\n" +
    "            <div class=\"complete-title red\">None of your students have completed the task yet.</div>\n" +
    "            <div class=\"tiny-circle-picture\" ng-repeat=\"user_assignment in assignment.user_assignments\" ng-if=\"user_assignment.status == 0\">\n" +
    "              <a no-click-propagation href=\"#/app/user_assignment/{{user_assignment.id}}\">\n" +
    "                <img ng-src=\"{{user_assignment.user.square_avatar_url}}\" alt=\"{{user_assignment.user.first_last_initial}}\" class=\"avatar-block__img avatar-block__img--thumbnail\" />\n" +
    "              </a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"edit-buttons\">\n" +
    "            <a no-click-propagation href=\"#/app/assignment/{{assignment.id}}\"><button class=\"btn btn-default\">View Full Details</button></a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <div class=\"tasks--list--topper\">\n" +
    "      <a no-click-propagation href=\"#/app/assignment/-1\"><button class=\"btn btn-default\">New Task</button></a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"single-col-wrapper tasks--list--container\">\n" +
    "    <ul class=\"tasks--list completed-tasks\">\n" +
    "      <li class=\"tasks--list--item clear\">\n" +
    "        <div class=\"tasks--list--item--left\">\n" +
    "          <span class=\"bold\">Completed Tasks</span>\n" +
    "        </div>\n" +
    "      </li>\n" +
    "      <li class=\"tasks--list--item\" ng-repeat=\"assignment in outgoing_assignments | orderBy:sortCompletedAssignments\" ng-if=\"isComplete(assignment)\" ng-click=\"assignment.expanded = !assignment.expanded\">\n" +
    "        <div class=\"clear\" ng-hide=\"assignment.expanded\">\n" +
    "          <div class=\"tasks--list--item--left\">\n" +
    "            <h6><span class=\"bold\"><a no-click-propagation href=\"#/app/assignment/{{assignment.id}}\">{{assignment.title}}</a></span></h6>\n" +
    "            <span class=\"subtext\">\n" +
    "              <span class=\"label label-success\">\n" +
    "                <span class=\"glyphicon glyphicon-ok-circle\"></span> Complete\n" +
    "              </span>\n" +
    "              <a no-click-propagation href=\"#/app/profile/{{user.id}}\">\n" +
    "                <span ng-if=\"current_user.id == assignment.user_id\">You </span>\n" +
    "                <span ng-if=\"current_user.id != assignment.user_id\">{{assignment.user.first_last_initial}} </span>\n" +
    "              </a>\n" +
    "              created this task on {{assignment.created_at | formatMDY}}\n" +
    "            </span>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--middle\">\n" +
    "            <h6>{{_.where(assignment.user_assignments, {status: 1}).length}}/{{assignment.user_assignments.length}}</h6>\n" +
    "          </div>\n" +
    "          <div class=\"tasks--list--item--right\">\n" +
    "            <span ng-if=\"assignment.due_datetime != null\"><h6>{{assignment.due_datetime | formatMDY}}</h6>\n" +
    "            </span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"tasks--list--item--expanded\" ng-show=\"assignment.expanded\">\n" +
    "          <h5><span class=\"bold\"><a no-click-propagation href=\"#/app/assignment/{{assignment.id}}\">{{assignment.title}}</a></span></h5>\n" +
    "          <h6>{{assignment.description}}</h6>\n" +
    "          <span class=\"subtext\">\n" +
    "            <span class=\"label label-success\">\n" +
    "              <span class=\"glyphicon glyphicon-ok-circle\"></span> Complete\n" +
    "            </span>\n" +
    "            <a no-click-propagation href=\"#/app/profile/{{user.id}}\">\n" +
    "              <span ng-if=\"current_user.id == user.id\">You </span>\n" +
    "              <span ng-if=\"current_user.id != user.id\">{{user.first_last_initial}} </span>\n" +
    "            </a>\n" +
    "            created this task on {{assignment.created_at | formatMDY}}.\n" +
    "            <span ng-if=\"assignment.due_datetime != null\">It's due on {{assignment.due_datetime | formatMDY}}.</span>\n" +
    "          </span>\n" +
    "\n" +
    "          <div class=\"expanded--solo\" ng-if=\"isComplete(assignment)\">\n" +
    "            <div class=\"complete-title green\">All students have completed this task.</div>\n" +
    "            <div class=\"tiny-circle-picture\" ng-repeat=\"user_assignment in assignment.user_assignments\" ng-if=\"user_assignment.status == 1\">\n" +
    "              <a no-click-propagation href=\"#/app/user_assignment/{{user_assignment.id}}\">\n" +
    "                <img ng-src=\"{{user_assignment.user.square_avatar_url}}\" alt=\"{{user_assignment.user.first_last_initial}}\" class=\"avatar-block__img avatar-block__img--thumbnail\" />\n" +
    "              </a>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"edit-buttons\">\n" +
    "            <a no-click-propagation href=\"#/app/assignment/{{assignment.id}}\"><button class=\"btn btn-default\">View Full Details</button></a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('assignment/user_assignment.html',
    "<ion-view view-title=\"Assignment\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"taskContainer\">\n" +
    "\n" +
    "      <div class=\"task-header clear\">\n" +
    "        <div class=\"single-col-wrapper\">\n" +
    "          <div class=\"back-link\">\n" +
    "\n" +
    "            <div back-button class=\"ng-clickable\">\n" +
    "              <h6>\n" +
    "                <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n" +
    "                <span class=\"ng-clickable-text\">Go Back</span>\n" +
    "              </h6>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"single-col-wrapper clear\" wait-to-load=\"{{loaded}}\">\n" +
    "        <div class=\"assignment--left\">\n" +
    "          <div class=\"task-content\">\n" +
    "            <h4><span class=\"bold\">{{user_assignment.title}}</span></h4>\n" +
    "            <h6 class=\"wysiwyg-output\" ng-bind-html=\"user_assignment.description\"></h6>\n" +
    "          </div>\n" +
    "          <!-- Open Task Status Block -->\n" +
    "          <table class=\"status-block\" ng-if=\"!isDueSoon(user_assignment) && !isPastDue(user_assignment) && user_assignment.status != 1\">\n" +
    "            <tr>\n" +
    "              <td class=\"status-message\">\n" +
    "                <h5 class=\"bold\" ng-if=\"current_user.id == user_assignment.user.id\">{{user_assignment.user.first_name}}, you haven't completed this task yet.</h5>\n" +
    "                <h5 class=\"bold\" ng-if=\"current_user.id != user_assignment.user.id\">{{user_assignment.user.first_name}} hasn't completed this task yet.</h5>\n" +
    "                <h6 ng-if=\"user_assignment.due_datetime != null\">It's due {{user_assignment.due_datetime | fromNow}}.</h6>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </table>\n" +
    "          <!-- Due Soon Status Block -->\n" +
    "          <table class=\"status-block due-soon clear\" ng-show=\"isDueSoon(user_assignment) && user_assignment.status != 1\">\n" +
    "            <tr>\n" +
    "              <td class=\"status-message\">\n" +
    "                <div ng-if=\"current_user.id == user_assignment.user.id\">\n" +
    "                  <h5 class=\"bold\">{{user_assignment.user.first_name}}, this task is due soon!</h5>\n" +
    "                  <h6>It looks like you haven't completed it yet.</h6>\n" +
    "                </div>\n" +
    "                <div ng-if=\"current_user.id != user_assignment.user.id\">\n" +
    "                  <h5 class=\"bold\">{{user_assignment.user.first_name}} hasn't completed this task yet.</h5>\n" +
    "                  <h6>It's due {{user_assignment.due_datetime | fromNow}}!</h6>\n" +
    "                </div>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </table>\n" +
    "          <!-- Past Due Status Block -->\n" +
    "          <table class=\"status-block past-due clear\" ng-show=\"isPastDue(user_assignment) && user_assignment.status != 1\">\n" +
    "            <tr>\n" +
    "              <td class=\"status-message\">\n" +
    "                <div ng-if=\"current_user.id == user_assignment.user.id\">\n" +
    "                  <h5 class=\"bold\">{{user_assignment.user.first_name}}, this task was due on {{user_assignment.due_datetime | formatMDY}}!</h5>\n" +
    "                  <h6>Please complete it as soon as possible.</h6>\n" +
    "                </div>\n" +
    "                <div ng-if=\"current_user.id != user_assignment.user.id\">\n" +
    "                  <h5 class=\"bold\">{{user_assignment.user.first_name}} hasn't completed this task yet.</h5>\n" +
    "                  <h6>This task is past due!</h6>\n" +
    "                </div>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </table>\n" +
    "          <!-- Complete Status Block -->\n" +
    "          <table class=\"status-block complete clear\" ng-show=\"user_assignment.status == 1\">\n" +
    "            <tr>\n" +
    "              <td class=\"status-message\">\n" +
    "                <div ng-if=\"current_user.id == user_assignment.user.id\">\n" +
    "                  <h5 class=\"bold\">Nice work {{user_assignment.user.first_name}}!</h5>\n" +
    "                  <h6>You completed this task {{user_assignment.updated_at | fromNow}}.</h6>\n" +
    "                </div>\n" +
    "                <div ng-if=\"current_user.id != user_assignment.user.id\">\n" +
    "                  <h5 class=\"bold\">{{user_assignment.user.first_name}} completed this task.</h5>\n" +
    "                  <h6>{{user_assignment.updated_at | fromNow}}</h6>\n" +
    "                </div>\n" +
    "              </td>\n" +
    "            </tr>\n" +
    "          </table>\n" +
    "          <comments current-user=\"current_user\" commentable-object-route=\"user_assignment\" commentable-object-id=\"user_assignment.id\"></comments>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"assignment--right\">\n" +
    "          <ul>\n" +
    "            <li>\n" +
    "              <h5>\n" +
    "                <span ng-if=\"user_assignment.status == 0\">\n" +
    "                  <span class=\"label label-primary\" ng-if=\"!isDueSoon(user_assignment) && !isPastDue(user_assignment)\"><span class=\"glyphicon glyphicon-record\"></span> Open</span>\n" +
    "                  <span class=\"label label-warning\" ng-if=\"isDueSoon(user_assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Due Soon</span>\n" +
    "                  <span class=\"label label-danger\" ng-if=\"isPastDue(user_assignment)\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> Past Due</span>\n" +
    "                </span>\n" +
    "                <span class=\"label label-success\" ng-if=\"user_assignment.status == 1\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok-circle\"></span> Complete\n" +
    "                </span>\n" +
    "              </h5>\n" +
    "            </li>\n" +
    "            <li ng-if=\"user_assignment.due_datetime != null\">\n" +
    "              <h6>Due by</h6>\n" +
    "              <h5 class=\"bold\">{{user_assignment.due_datetime | formatMDY}}</h5>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <h6>Created by</h6>\n" +
    "              <a href=\"#/app/profile/{{assigner.id}}\">\n" +
    "                <div class=\"tiny-circle-picture\">\n" +
    "                  <img ng-src=\"{{assigner.square_avatar_url}}\" alt=\"{{assigner.first_name}} {{assigner.last_name}}\" />\n" +
    "                </div>\n" +
    "                <h6 class=\"bold\">{{assigner.first_name}} {{assigner.last_name}}</h6>\n" +
    "              </a>\n" +
    "              <p>on {{user_assignment.created_at | formatMDY}}</p>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"complete-buttons\">\n" +
    "          <button class=\"btn btn-success btn-lg\" ng-if=\"user_assignment.status == 0\" ng-click=\"setUserAssignmentStatus(user_assignment, 1)\"><span class=\"glyphicon glyphicon-ok-circle\"></span> Mark this task Complete</button>\n" +
    "          <button class=\"btn btn-danger btn-lg\" ng-if=\"user_assignment.status == 1\" ng-click=\"setUserAssignmentStatus(user_assignment, 0)\"><span class=\"glyphicon glyphicon-remove-circle\"></span> I Didn't Do This Yet</button>\n" +
    "        </div>\n" +
    "        \n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('assignment/widgets/assignments_list.html',
    "<div class=\"widget\">\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\"><div class=\"color--dot\"></div> {{selected_task_list_title}}</h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table\">\n" +
    "      <div class=\"table--cell breakalways pas\">\n" +
    "        <span class=\"bold\">Incomplete</span>\n" +
    "      </div>\n" +
    "      <div ng-if=\"incompleteAssignments().length == 0\" class=\"table--cell breakalways\">\n" +
    "        <div class=\"cell--padding\">No incomplete tasks</div>\n" +
    "      </div>\n" +
    "      <div class=\"task-item task-item--incomplete table--cell no-border-right breakalways\"\n" +
    "        ng-repeat=\"assignment in incompleteAssignments() | orderBy:sortIncompleteAssignments\"\n" +
    "        ng-click=\"viewTask(assignment)\">\n" +
    "        <div class=\"widget--content--table ng-clickable\">\n" +
    "          <div class=\"task-item-info table--cell\">\n" +
    "            <div ng-if=\"selected_task_list == CONSTANTS.TASK_NAV.assigned_to_me\" class=\"task-item__check-box\">\n" +
    "              <input type=\"checkbox\" ng-checked=\"false\" no-click-propagation ng-click=\"markComplete(assignment)\" />\n" +
    "            </div>\n" +
    "            <div class=\"task-item__title\">\n" +
    "              <div class=\"title__main\"> {{assignment.title}}</div>\n" +
    "              <div class=\"title__info\">\n" +
    "                Created {{assignment.created_at | fromNow}} by\n" +
    "                <span ng-if=\"assignment.user.id != current_user.id\">{{assignment.user.first_last_initial}}</span>\n" +
    "                <span ng-if=\"assignment.user.id == current_user.id\">Me</span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div ng-if=\"selected_task_list != CONSTANTS.TASK_NAV.assigned_to_me\"\n" +
    "              class=\"task-item__completed table--cell\">\n" +
    "            <div class=\"title__main\">\n" +
    "              <span class=\"bold\">{{_.where(assignment.user_assignments, {status: 1}).length}}</span>\n" +
    "              out of {{assignment.user_assignments.length}}\n" +
    "            </div>\n" +
    "            <div class=\"title__info\">completed</div>\n" +
    "          </div>\n" +
    "          <div class=\"task-item__date table--cell\"\n" +
    "            ng-class=\"{'task-item__date--pastdue': isPastDue(assignment)}\">\n" +
    "            <span ng-if=\"assignment.due_datetime\" class=\"title__main mrm\">\n" +
    "              Due {{assignment.due_datetime | fromNow}}\n" +
    "            </span>\n" +
    "            <span ng-if=\"!assignment.due_datetime\" class=\"title__main mrm\">No Due Date</span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"table--cell breakalways pas\">\n" +
    "        <span class=\"bold\">Completed</span>\n" +
    "      </div>\n" +
    "      <div ng-if=\"completedAssignments().length == 0\" class=\"table--cell breakalways task-item--incomplete\">\n" +
    "        <div class=\"cell--padding\">No completed tasks</div>\n" +
    "      </div>\n" +
    "      <div class=\"task-item task-item--completed table--cell no-border-right breakalways\"\n" +
    "        ng-repeat=\"assignment in completedAssignments() | orderBy:sortCompletedAssignments\"\n" +
    "        ng-click=\"viewTask(assignment)\">\n" +
    "        <div class=\"widget--content--table ng-clickable\">\n" +
    "          <div class=\"task-item-info table--cell\">\n" +
    "            <div ng-if=\"selected_task_list == CONSTANTS.TASK_NAV.assigned_to_me\" class=\"task-item__check-box\">\n" +
    "              <input type=\"checkbox\" ng-checked=\"true\" no-click-propagation ng-click=\"markIncomplete(assignment)\" />\n" +
    "            </div>\n" +
    "            <div class=\"task-item__title\">\n" +
    "              <div class=\"title__main\"> {{assignment.title}}</div>\n" +
    "              <div class=\"title__info\">\n" +
    "                Created {{assignment.created_at | fromNow}} by {{created_by_str(assignment)}}\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div ng-if=\"selected_task_list != CONSTANTS.TASK_NAV.assigned_to_me\"\n" +
    "              class=\"task-item__completed table--cell\">\n" +
    "            <div class=\"title__main\">\n" +
    "              <span class=\"bold\">{{_.where(assignment.user_assignments, {status: 1}).length}}</span>\n" +
    "              out of {{assignment.user_assignments.length}}\n" +
    "            </div>\n" +
    "            <div class=\"title__info\">completed</div>\n" +
    "          </div>\n" +
    "          <div class=\"task-item__date table--cell\"\n" +
    "            ng-class=\"{'task-item__date--pastdue': isPastDue(assignment)}\">\n" +
    "            <span ng-if=\"assignment.due_datetime\" class=\"title__main mrm\">\n" +
    "              Due {{assignment.due_datetime | fromNow}}\n" +
    "            </span>\n" +
    "            <span ng-if=\"!assignment.due_datetime\" class=\"title__main mrm\">No Due Date</span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('assignment/widgets/assignments_nav.html',
    "<div class=\"widget widget--nav\">\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\"><div class=\"color--dot\"></div> Tasks</h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table\">\n" +
    "      <div class=\"widget--content--cell ng-clickable breakalways\"\n" +
    "        ng-class=\"{selected: selected_task_list == CONSTANTS.TASK_NAV.assigned_to_me}\"\n" +
    "        ng-click=\"selectNav(CONSTANTS.TASK_NAV.assigned_to_me)\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <div class=\"setting-icon\"><span class=\"glyphicon glyphicon-user\"></span></div>\n" +
    "          <div class=\"setting-text\">Assigned to Me</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"widget--content--cell ng-clickable breakalways\"\n" +
    "        ng-class=\"{selected: selected_task_list == CONSTANTS.TASK_NAV.assigned_by_me}\"\n" +
    "        ng-click=\"selectNav(CONSTANTS.TASK_NAV.assigned_by_me)\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <div class=\"setting-icon\"><span class=\"glyphicon glyphicon-user\"></span></div>\n" +
    "          <div class=\"setting-text\">I've Assigned</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"widget--content--cell ng-clickable breakalways\"\n" +
    "        ng-class=\"{selected: selected_task_list == CONSTANTS.TASK_NAV.assigned_to_others}\"\n" +
    "        ng-click=\"selectNav(CONSTANTS.TASK_NAV.assigned_to_others)\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <div class=\"setting-icon\"><span class=\"glyphicon glyphicon-user\"></span></div>\n" +
    "          <div ng-if=\"current_user.is_mentor\" class=\"setting-text\">Assigned to My Students</div>\n" +
    "          <div ng-if=\"current_user.is_org_admin\" class=\"setting-text\">All Tasks</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('authentication/login.html',
    "<ion-view view-title=\"Login\" class=\"login-wrapper\">\n" +
    "    <div>\n" +
    "\n" +
    "      <div class=\"login-form\">\n" +
    "\n" +
    "        <div class=\"logo\">\n" +
    "\n" +
    "          <a href=\"/\">\n" +
    "            <img alt=\"Imua\" src=\"assets/logo-blue.png\">\n" +
    "          </a>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <form ng-hide=\"forgot_password\" name=\"loginForm\" imua-form=\"login(user)\" novalidate>\n" +
    "\n" +
    "          <div class=\"element\">\n" +
    "\n" +
    "            <!-- <label-with-errors label=\"\" form=\"loginForm\" formfield=\"loginForm.email\"></label-with-errors> -->\n" +
    "            <input ng-model=\"user.email\" autofocus=\"autofocus\" class=\"form-field-imua\" name=\"email\" placeholder=\"Email\" size=\"30\" type=\"email\" value=\"\" required>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"element\">\n" +
    "\n" +
    "            <!-- <label-with-errors label=\"\" form=\"loginForm\" formfield=\"loginForm.password\"></label-with-errors> -->\n" +
    "            <input ng-model=\"user.password\" class=\"form-field-imua\" name=\"password\" placeholder=\"Password\" size=\"30\" type=\"password\" required>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"element\">\n" +
    "\n" +
    "            <input class=\"button\" name=\"commit\" type=\"submit\" value=\"Log In\">\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "        <!-- Reset password form -->\n" +
    "        <form ng-show=\"forgot_password\" name=\"resetPasswordForm\" imua-form=\"resetPassword(user)\" novalidate>\n" +
    "\n" +
    "          <div class=\"element\">\n" +
    "\n" +
    "            <!-- <label-with-errors label=\"\" form=\"loginForm\" formfield=\"loginForm.email\"></label-with-errors> -->\n" +
    "            <input ng-model=\"user.email\" autofocus=\"autofocus\" class=\"form-field\" name=\"email\" placeholder=\"Email\" size=\"30\" type=\"email\" value=\"\">\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"element\">\n" +
    "\n" +
    "            <input class=\"button\" name=\"commit\" type=\"submit\" value=\"Reset Password\">\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"login-links\">\n" +
    "\n" +
    "        <div ng-hide=\"forgot_password\" class=\"link\" ng-click=\"forgotPassword()\">Forgot your password?</div>\n" +
    "        <div ng-show=\"forgot_password\" class=\"link\" ng-click=\"backToLogin()\">Back to Log In</div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"pbxl blog-link\">\n" +
    "        <h6> Check out our <a href=\"http://blog.myimua.org\"> blog </a> to learn more about what we're building </h6>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</ion-view>\n" +
    "\n" +
    "<script>\n" +
    "  $(function() { $('input, textarea').placeholder();});\n" +
    "</script>\n"
  );


  $templateCache.put('circles/progress_bar_default.html',
    "<a ng-href=\"#/app/progress/{{student.id}}\" title=\"View {{student.first_name}}'s' Progress\">\n" +
    "  <div class=\"student-progress-bar student-progress-bar--default clear\" ng-class=\"{'needsAttention': {{student.id | existsInArray: attention_students}}}\">\n" +
    "    <div class=\"progress-bar--left\">\n" +
    "      <div class=\"tiny-circle-picture\">\n" +
    "        <img ng-src=\"{{student.square_avatar_url}}\" alt=\"{{student.first_name}} {{student.last_name}}\" />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"progress-bar--right\">\n" +
    "      <h6 class=\"bold\">{{student.first_last_initial}}</h6>\n" +
    "      <div class=\"bar-size\">\n" +
    "        <horizontal-progress-bar parentclass=\"bar-size\" identifier=\"default\" student=\"student\"></horizontal-progress-bar>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</a>\n"
  );


  $templateCache.put('circles/progress_circle_assigned.html',
    "<div class=\"progress-circle progress-circle--default\" ng-class=\"{'needsAttention': {{student.id | existsInArray: attention_students}}}\">\n" +
    "  <a ng-href=\"#/app/progress/{{student.id}}\" title=\"View {{student.first_name}}'s' Progress\">\n" +
    "    <div class=\"circle-size\">\n" +
    "      <progress-circle parentclass=\"circle-size\" identifier=\"assigned\" student=\"student\"></progress-circle>\n" +
    "    </div>\n" +
    "  </a>\n" +
    "  <h6 class=\"bold\"><a ng-href=\"#/app/progress/{{student.id}}\" title=\"View {{student.first_name}}'s Progress\">{{student.first_last_initial}}</a></h6>\n" +
    "  <ul class=\"circle-nav\">\n" +
    "    <li><a ng-href=\"#/app/profile/{{student.id}}\" title=\"View {{student.first_name}}'s Profile\"><span class=\"glyphicon glyphicon-user\"></span> Profile</a></li>\n" +
    "    <li>\n" +
    "      <a class=\"unassign\" ng-click=\"unassign(student)\">\n" +
    "        Remove {{student.first_name}} from {{mentor.first_name}}'s students\n" +
    "        <br>\n" +
    "        <span class=\"glyphicon glyphicon-remove-circle\" title=\"Unassign\"></span>\n" +
    "      </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('circles/progress_circle_default.html',
    "<div class=\"progress-circle progress-circle--default\" ng-class=\"{'needsAttention': {{student.id | existsInArray: attention_students}}}\">\n" +
    "  <a ng-href=\"#/app/progress/{{student.id}}\" title=\"View {{student.first_name}}'s' Progress\">\n" +
    "    <div class=\"circle-size\">\n" +
    "      <progress-circle drawduration=\"0\" parentclass=\"circle-size\" identifier=\"default\" student=\"student\"></progress-circle>\n" +
    "    </div>\n" +
    "  </a>\n" +
    "  <h6 class=\"bold\"><a ng-href=\"#/app/progress/{{student.id}}\" title=\"View {{student.first_name}}'s Progress\">{{student.first_last_initial}}</a></h6>\n" +
    "  <ul class=\"circle-nav\">\n" +
    "    <li><a ng-href=\"#/app/profile/{{student.id}}\" title=\"View {{student.first_name}}'s Profile\"><span class=\"glyphicon glyphicon-user\"></span> Profile</a></li>\n" +
    "    <li class=\"extra-info\" ng-if=\"student.last_login == 'Has not logged in yet'\">Last Login: {{student.last_login}}</li>\n" +
    "    <li class=\"extra-info\" ng-if=\"student.last_login != 'Has not logged in yet'\">Last Login: {{student.last_login | formatMDY}}</li>\n" +
    "    <li class=\"extra-info\">Login Count: {{student.login_count}}</li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('circles/progress_circle_mentor.html',
    "<div class=\"progress-circle progress-circle--default\">\n" +
    "  <a ng-href=\"#/app/mentor/{{mentor.id}}\" title=\"View {{mentor.first_name}}'s Students\">\n" +
    "    <div class=\"circle-size\">\n" +
    "      <progress-circle parentclass=\"circle-size\" identifier=\"default\" student=\"mentor\"></progress-circle>\n" +
    "    </div>\n" +
    "  </a>\n" +
    "  <h6 class=\"bold\"><a ng-href=\"#/app/mentor/{{mentor.id}}\" title=\"View {{mentor.first_name}}'s Page'\">{{fullName(mentor)}}</a></h6>\n" +
    "  <ul class=\"circle-nav\">\n" +
    "    <li>{{mentor.title}}</li>\n" +
    "    <li><a ng-href=\"#/app/profile/{{mentor.id}}\" title=\"View {{mentor.first_name}}'s Profile\"><span class=\"glyphicon glyphicon-user\"></span> Profile</a></li>\n" +
    "    <li class=\"extra-info\" ng-if=\"mentor.last_login == 'Has not logged in yet'\">Last Login: {{mentor.last_login}}</li>\n" +
    "    <li class=\"extra-info\" ng-if=\"mentor.last_login != 'Has not logged in yet'\">Last Login: {{mentor.last_login | formatMDY}}</li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('circles/progress_circle_mentorattention.html',
    "<div class=\"progress-circle progress-circle--default\">\n" +
    "  <a ng-href=\"#/app/mentor/{{mentor.id}}\" title=\"View {{mentor.first_name}}'s Students\">\n" +
    "    <div class=\"mentorattention-circle-size\">\n" +
    "      <progress-circle parentclass=\"circle-size\" identifier=\"attention\" student=\"mentor\"></progress-circle>\n" +
    "    </div>\n" +
    "  </a>\n" +
    "  <h6 class=\"bold\"><a ng-href=\"#/app/mentor/{{mentor.id}}\" title=\"View {{mentor.first_name}}'s Page\">{{fullName(mentor)}}</a></h6>\n" +
    "  <ul class=\"circle-nav\">\n" +
    "    <li>{{mentor.title}}</li>\n" +
    "    <li><a ng-href=\"#/app/profile/{{mentor.id}}\" title=\"View {{mentor.first_name}}'s Profile\"><span class=\"glyphicon glyphicon-user\"></span> Profile</a></li>\n" +
    "    <li class=\"extra-info\" ng-if=\"mentor.last_login == 'Has not logged in yet'\">Last Login: {{mentor.last_login}}</li>\n" +
    "    <li class=\"extra-info\" ng-if=\"mentor.last_login != 'Has not logged in yet'\">Last Login: {{mentor.last_login | formatMDY}}</li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('circles/progress_circle_needs_attention.html',
    "<div class=\"progress-circle--needs-attention\">\n" +
    "  <div class=\"attention-circle\">\n" +
    "    <a href=\"#/app/progress/{{student.id}}\"><progress-circle width=\"170\" student=\"student\" identifier=\"attention\" parentclass=\"attention-circle\"></progress-circle></a>\n" +
    "  </div>\n" +
    "  <div class=\"attention-text\">\n" +
    "    <a href=\"#/app/profile/{{student.id}}\"><h5 class=\"bold student-name\">{{student.first_last_initial}}</h5></a>\n" +
    "    <a href=\"#/app/expectations/{{student.id}}\">\n" +
    "      <div class=\"attention-description\">\n" +
    "        <!-- This should be replaced with a directive or something that allows us to insert custom messages and button links. -->\n" +
    "        <h6>isn't meeting their expectations.</h6>\n" +
    "        <button class=\"btn btn-default\">View Problem</button>\n" +
    "      </div>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('common/class_of_dd.html',
    "<div class=\"pbs\">\n" +
    "  <label>Class Of</label>\n" +
    "  <span ng-messages=\"form.classOf.$error\" ng-if=\"form.$submitted\">\n" +
    "   <div ng-messages-include=\"forms/error_messages.html\"></div>\n" +
    "   </span>\n" +
    "</div>\n" +
    "<select class=\"form-control\" ng-init=\"model.class_of = model.class_of || class_of[0].value\"\n" +
    "  name=\"classOf\" required ng-model=\"model.class_of\"\n" +
    "  ng-options=\"classOf.value as classOf.name for classOf in class_of\">\n" +
    "</select>\n"
  );


  $templateCache.put('common/comment_list.html',
    "<div class=\"comments-content\" wait-to-load=\"{{loaded_comments}}\">\n" +
    "  <div style=\"border-bottom: 1px solid;\"></div>\n" +
    "\n" +
    "  <div class=\"comments-list clear\" ng-repeat=\"comment in comments | orderBy: 'created_at'\">\n" +
    "\n" +
    "    <div class=\"comment-avatar tiny-circle-picture left\">\n" +
    "      <img ng-src=\"{{comment.user.square_avatar_url}}\" alt=\"{{comment.user.first_name}} {{comment.user.last_name}}\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"comment-item\">\n" +
    "      <div class=\"comment-item__header\" ng-hide=\"isNewComment(comment)\">{{comment.user.first_last_initial}} commented on this {{comment.created_at | fromNow}}</div>\n" +
    "      <div class=\"comment-item__body\">\n" +
    "        <h6 ng-hide=\"comment.editing\" class=\"wysiwyg-output\" ng-bind-html=\"comment.comment\"></h6>\n" +
    "\n" +
    "        <div class=\"comments-list__item--editing\" ng-show=\"comment.editing\">\n" +
    "          <form name=\"commentsForm\" imua-form=\"saveComment(comment)\" novalidate>\n" +
    "            <div class=\"pbm\">\n" +
    "              <label-with-errors form=\"commentsForm\" formfield=\"commentsForm.comment\"></label-with-errors>\n" +
    "              <text-angular ta-toolbar=\"[]\" ng-model=\"comment.new_comment\" placeholder=\"Leave a comment\" required></text-angular>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"commentsForm.$submitted && commentsForm.$invalid\">{{error}}</div>\n" +
    "\n" +
    "            <div class=\"button-container\">\n" +
    "              <span class=\"cancel\" ng-click=\"cancelEditComment(comment)\">Cancel</span>\n" +
    "              <button class=\"submit\" type=\"submit\">Update Comment</button>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"comment-item__icons\" ng-hide=\"comment.editing\">\n" +
    "        <span class=\"glyphicon glyphicon-pencil prs\" title=\"Edit\" ng-click=\"editComment(comment)\" ng-if=\"canEditComment(comment)\"></span>\n" +
    "        <span class=\"glyphicon glyphicon-trash\" title=\"Delete\" ng-click=\"deleteComment(comment)\" ng-if=\"canDeleteComment(comment)\"></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"comments-list__item--new\">\n" +
    "    <form name=\"commentsFormNew\" imua-form=\"saveComment()\" novalidate>\n" +
    "      <div class=\"pbm\">\n" +
    "        <label-with-errors form=\"commentsFormNew\" formfield=\"commentsFormNew.comment\"></label-with-errors>\n" +
    "        <text-angular ta-toolbar=\"[]\" rows=\"4\" ng-model=\"new_comment.comment\" placeholder=\"Leave a comment\" name=\"comment\" required></text-angular>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"commentsForm.$submitted && commentsForm.$invalid\">{{error}}</div>\n" +
    "\n" +
    "      <div class=\"button-container\">\n" +
    "        <button class=\"submit\" type=\"submit\">Comment</button>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- <div class=\"edit-buttons-top\" ng-hide=\"editingNewComment()\">\n" +
    "    <br>\n" +
    "    <button class=\"btn btn-default\" ng-click=\"addNewComment()\">Add a Comment</button>\n" +
    "  </div> -->\n" +
    "</div>\n"
  );


  $templateCache.put('common/form_datepicker.html',
    "<span>\n" +
    "<span class=\"input-group datepicker-label\">\n" +
    "    <label>{{label}}</label>\n" +
    "    <span ng-messages=\"form.datepicker.$error\" ng-if=\"form.$submitted\">\n" +
    "    <div ng-messages-include=\"forms/error_messages.html\"></div>\n" +
    "    </span>\n" +
    "</span>\n" +
    "<span class=\"input-group\">\n" +
    "  <input name=\"datepicker\" required class=\"imua-form-editor form-control ng-pristine ng-valid \" type=\"text\" ng-model=\"date\" placeholder=\"Date\" datepicker-popup='MM/dd/yyyy' datepicker-append-to-body=\"true\" is-open=\"opened\" show-button-bar=\"false\" ng-click=\"opened=false\">\n" +
    "  <span class=\"input-group-btn\">\n" +
    "    <button type=\"button\" class=\"imua-datepicker-btn btn btn-default\" ng-click=\"open($event)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "  </span>\n" +
    "</span>\n" +
    "</span>\n"
  );


  $templateCache.put('common/imua_datepicker.html',
    "<span class=\"input-group\">\n" +
    "  <input name=\"datepicker\" required class=\"imua-form-editor form-control ng-pristine ng-valid \" type=\"text\" ng-model=\"date\" placeholder=\"Date\" datepicker-popup='MM/dd/yyyy' datepicker-append-to-body=\"true\" is-open=\"opened\" show-button-bar=\"false\" ng-click=\"opened=false\">\n" +
    "  <span class=\"input-group-btn\">\n" +
    "    <button type=\"button\" class=\"imua-datepicker-btn btn btn-default\" ng-click=\"open($event)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "  </span>\n" +
    "</span>\n"
  );


  $templateCache.put('common/label_with_errors.html',
    "<div class=\"pbs\">\n" +
    "  <label>{{label}}</label>\n" +
    "  <span ng-messages=\"formfield.$error\" ng-if=\"form.$submitted\">\n" +
    "  <div ng-messages-include=\"forms/error_messages.html\"></div>\n" +
    "  </span>\n" +
    "</div>\n"
  );


  $templateCache.put('common/loading_animation.html',
    "<div class=\"spinner\" ng-hide=\"watchedObject\">\n" +
    "  <div class=\"bounce1\"></div>\n" +
    "  <div class=\"bounce2\"></div>\n" +
    "  <div class=\"bounce3\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div ng-transclude ng-show=\"watchedObject\"></div>"
  );


  $templateCache.put('common/menu.html',
    "<ion-side-menus enable-menu-with-back-views=\"true\">\n" +
    "  <ion-side-menu-content>\n" +
    "    <ion-nav-bar class=\"bar-stable\">\n" +
    "      <ion-nav-back-button ng-show=\"false\">\n" +
    "      </ion-nav-back-button>\n" +
    "      <ion-nav-buttons side=\"left\">\n" +
    "        <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\">\n" +
    "        </button>\n" +
    "      </ion-nav-buttons>\n" +
    "    </ion-nav-bar>\n" +
    "    <ion-nav-view name=\"menuContent\">\n" +
    "    </ion-nav-view>\n" +
    "  </ion-side-menu-content>\n" +
    "\n" +
    "  <ion-side-menu side=\"left\">\n" +
    "    <ion-header-bar class=\"bar-stable\">\n" +
    "      <h4 class=\"title\">Menu</h4>\n" +
    "    </ion-header-bar>\n" +
    "    <ion-view>\n" +
    "    <ion-content class=\"sidebar-nav\">\n" +
    "\n" +
    "      <div ng-controller=\"NavController\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "          <li>\n" +
    "            <div></div>\n" +
    "          </li>\n" +
    "          <li class=\"sidebar-brand\">\n" +
    "            <a menu-close href=\"#/app/\">\n" +
    "              <img ng-src=\"assets/logo-blue-small.png\" alt=\"IMUA\" height=\"22px\" width=\"22px\">\n" +
    "                <span class=\"pls\" ng-if=\"current_user.is_super_admin\">Collective Progress</span>\n" +
    "                <span class=\"pls\" ng-if=\"!current_user.is_super_admin\">{{ current_user.organization_name }}</span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "\n" +
    "          <li ng-if=\"current_user.is_super_admin\">\n" +
    "            <a menu-close href=\"#/app/sa/organizations\">Organizations</a>\n" +
    "          </li>\n" +
    "\n" +
    "          <div ng-if=\"current_user.is_org_admin\">\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/dashboard/{{ current_user.id }}\">Dashboard</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/organization/{{ current_user.organization_id }}\">Mentors</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/students/{{ current_user.organization_id }}\">Students</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "                <a menu-close href=\"#/app/assignments/{{ current_user.id }}\">Tasks</a>\n" +
    "              </li>\n" +
    "              <li>\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/setup/{{ current_user.organization_id }}\">Organization Setup</a>\n" +
    "            </li>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"current_user.is_mentor\">\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/dashboard/{{ current_user.id }}\">My Students</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/assignments/{{ current_user.id }}\">Tasks</a>\n" +
    "            </li>\n" +
    "            <!-- TODO: Mentors shouldn't go to old roadmap page - Create new page\n" +
    "                  for accessing milestone and expectation view for both\n" +
    "                  admins and mentors to see -->\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/setup/{{ current_user.organization_id }}\">Organization</a>\n" +
    "            </li>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"current_user.is_student\">\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/dashboard/{{ current_user.id }}\">Dashboard</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/progress/{{ current_user.id }}\">My Progress</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/expectations/{{ current_user.id }}\">Expectations</a>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <a menu-close href=\"#/app/user_assignments/{{ current_user.id }}\">Tasks</a>\n" +
    "            </li>\n" +
    "          </div>\n" +
    "\n" +
    "          <li class=\"dropdown cog js-cog\">\n" +
    "            <div class=\"profile-dropdown\">\n" +
    "              <span>{{ current_user.first_last_initial }}</span>\n" +
    "              <span class=\"glyphicon glyphicon-cog\"></span>\n" +
    "            </div>\n" +
    "            <div class=\"submenu js-submenu\">\n" +
    "              <div class=\"submenu__link\">\n" +
    "                <a menu-close href=\"#/app/profile/{{ current_user.id }}\">Profile</a>\n" +
    "              </div>\n" +
    "              <div class=\"submenu__link\">\n" +
    "                <a menu-close href=\"\" ng-click=\"logout()\">Logout</a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </li>\n" +
    "\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "    </ion-content>\n" +
    "    </ion-view>\n" +
    "  </ion-side-menu>\n" +
    "</ion-side-menus>\n" +
    "\n"
  );


  $templateCache.put('dashboard/dashboard.html',
    "<ion-view view-title=\"Dashboard\">\n" +
    "  <ion-content class=\"dashboard-content dashboard-content--orgadmin\">\n" +
    "\t<div class=\"dashboardContainer\">\n" +
    "\t\t<div ng-include=\"loadDashboard(user.role)\"></div>\n" +
    "\t</div>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n" +
    "\n"
  );


  $templateCache.put('dashboard/mentor_dashboard.html',
    "<div ng-controller=\"MentorDashboardController\" id=\"mentorDashboard\">\n" +
    "  <div class=\"dashboard-header dashboard-header--mentor\">\n" +
    "    <div class=\"mentor-header--wrapper clear\">\n" +
    "      <div class=\"greeting\">\n" +
    "        <h5>Hey there {{user.first_name}},</h5>\n" +
    "        <h2 class=\"bold\">Welcome back!</h2>\n" +
    "      </div>\n" +
    "      <div class=\"circle-attention\">\n" +
    "\n" +
    "\t\t  \t<div class=\"circle\">\n" +
    "\n" +
    "\t\t\t  \t<div class=\"text\">\n" +
    "\n" +
    "\t\t\t\t    <h2 class=\"bold\">{{attention_students.length}}</h2>\n" +
    "\t          <span ng-if=\"attention_students.length != 1\" class=\"subhead\">students need<br>your attention!</span>\n" +
    "            <span ng-if=\"attention_students.length == 1\" class=\"subhead\">student needs<br>your attention!</span>\n" +
    "\n" +
    "\t\t\t  \t</div>\n" +
    "\n" +
    "\t\t  \t</div>\n" +
    "\n" +
    "\t    </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"dashboard-content dashboard-content--mentor\">\n" +
    "\n" +
    "    <div class=\"dashboard-attention dashboard-attention--mentor\" ng-hide=\"attention_students.length == 0\">\n" +
    "      <div ng-if=\"attention_students.length == 1\" class=\"list-header-imua\">\n" +
    "        <h4>This student <span class=\"bold\">needs your attention!</span></h4>\n" +
    "      </div>\n" +
    "      <div ng-if=\"attention_students.length != 1\" class=\"list-header-imua\">\n" +
    "        <h4>These students <span class=\"bold\">need your attention!</span></h4>\n" +
    "      </div>\n" +
    "      <div class=\"list-container progress-circle--list\">\n" +
    "        <progress-circle-needs-attention ng-repeat=\"student in attention_students\"></progress-circle-needs-attention>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"list-header-imua\">\n" +
    "    \t<h4 ng-if=\"assigned_students.length == 1\">Your <span class=\"bold\">Student</span></h4>\n" +
    "      <h4 ng-if=\"assigned_students.length != 1\">Your <span class=\"bold\">Students</span></h4>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"assigned_students.length > 0\">\n" +
    "      <h5 style=\"font-style: italic\">Hey {{user.first_name}}, it looks like you don't have any students assigned to you yet.</h5>\n" +
    "    </div>\n" +
    "    <div class=\"list-container progress-circle--list\">\n" +
    "      <progress-circle-default ng-repeat=\"student in assigned_students | orderBy: 'last_name'\"></progress-circle-default>\n" +
    "      <!-- <progress-bar-default ng-repeat=\"student in assigned_students | orderBy: 'last_name'\"></progress-circle-default> -->\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- <button class=\"btn btn-default\" ng-click=\"addAssignment()\">Send Assignment To Students</button> -->\n" +
    "</div>\n"
  );


  $templateCache.put('dashboard/orgadmin_dashboard.html',
    "<div ng-controller=\"OrgAdminDashboardController\" id=\"OrgAdminDashboard\">\n" +
    "\n" +
    "  <div class=\"dashboard-header dashboard-header--orgadmin\">\n" +
    "    <div class=\"orgadmin-header--wrapper\">\n" +
    "      <div class=\"greeting\">\n" +
    "        <h2 class=\"bold\">Hey there, {{user.first_name}}</h2>\n" +
    "        <h5>Here's a look at how {{current_organization}} is doing today:</h5>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"dashboard-attention dashboard-attention--orgadmin\" ng-hide=\"true\">Placeholder for Alerts</div>\n" +
    "\n" +
    "  <div class=\"dashboard-content dashboard-content--orgadmin\" wait-to-load=\"{{loaded_users}}\">\n" +
    "    <div class=\"module-container clear\">\n" +
    "\n" +
    "      <div class=\"module module--mentor-activity\" modulecolor=\"no_category\">\n" +
    "        <div class=\"module--header\">Mentor Activity</div>\n" +
    "        <div class=\"module--content\">\n" +
    "          <h2>{{active_mentors}}</h2>\n" +
    "          <h5 ng-if=\"active_mentors != 1\">Active Mentors</h5>\n" +
    "          <h5 ng-if=\"active_mentors == 1\">Active Mentor</h5>\n" +
    "          <p>This Week</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"module module--student-activity\" modulecolor=\"no_category\">\n" +
    "        <div class=\"module--header\">Student Activity</div>\n" +
    "        <div class=\"module--content\">\n" +
    "          <h2>{{active_students}}</h2>\n" +
    "          <h5 ng-if=\"active_students != 1\">Active Students</h5>\n" +
    "          <h5 ng-if=\"active_students == 1\">Active Student</h5>\n" +
    "          <p>This Week</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- ONEGOAL_HACK -->\n" +
    "      <div class=\"module module--avg-gpa\" modulecolor=\"academics\"  ng-if=\"current_organization != 'OneGoal'\">\n" +
    "        <div class=\"module--header\">Grades</div>\n" +
    "        <div class=\"module--content\">\n" +
    "          <p>Your students have a</p>\n" +
    "          <h2>{{average_gpa}}</h2>\n" +
    "          <h5>Average GPA</h5>\n" +
    "        </div>\n" +
    "        <!-- <div class=\"module--content coming-soon\">\n" +
    "          <h4>Coming Soon!</h4>\n" +
    "          <h6>Average GPA for your Organization</h6>\n" +
    "        </div> -->\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- ONEGOAL_HACK -->\n" +
    "      <div class=\"module module--avg-service\" modulecolor=\"service\" ng-if=\"current_organization != 'OneGoal'\">\n" +
    "        <div class=\"module--header\">Service Hours</div>\n" +
    "        <div class=\"module--content\">\n" +
    "          <p>On average, your students have completed</p>\n" +
    "          <h2>{{average_serviceHours}}</h2>\n" +
    "          <h5>Service Hours</h5>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- ONEGOAL_HACK -->\n" +
    "      <div class=\"module module--activities\" modulecolor=\"extracurricular\" ng-if=\"current_organization != 'OneGoal'\">\n" +
    "        <div class=\"module--header\">Extracurricular</div>\n" +
    "        <div class=\"module--content\">\n" +
    "          <h2>{{percent_students_with_one_activity}}%</h2>\n" +
    "          <p>of your students participate in at least 1</p>\n" +
    "          <h5>Extracurricular Activity</h5>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <!-- ONEGOAL_HACK -->\n" +
    "      <div class=\"module module--activities\" modulecolor=\"testing\" ng-if=\"current_organization != 'OneGoal'\">\n" +
    "        <div class=\"module--header\">Testing</div>\n" +
    "        <div class=\"module--content\">\n" +
    "          <p>Your students average</p>\n" +
    "          <h2>{{average_testsTaken}}</h2>\n" +
    "          <h5>Tests Taken</h5>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('dashboard/student_dashboard.html',
    "<div ng-controller=\"StudentDashboardController\" id=\"studentDashboard\" class=\"studentDashboardContainer\">\n" +
    "  <div wait-to-load=\"{{loaded_data}}\">\n" +
    "\n" +
    "    <div class=\"dashboard-header dashboard-header--student\">\n" +
    "\n" +
    "      <div class=\"student-header--wrapper\">\n" +
    "\n" +
    "        <div class=\"student-header--content clear\">\n" +
    "\n" +
    "          <div class=\"progressCircle-big--container\">\n" +
    "\n" +
    "            <a class=\"js-nav-link\" ng-href=\"#/app/progress/{{current_user.id}}\">\n" +
    "\n" +
    "              <div class=\"progressCircle-big\">\n" +
    "              \t<div class=\"big-progress-circle\">\n" +
    "              \t\t<progress-circle width=\"240\" student=\"student_with_modules_progress\" ng-if=\"student_with_modules_progress\"></progress-circle>\n" +
    "              \t</div>\n" +
    "              </div>\n" +
    "\n" +
    "            </a>\n" +
    "\n" +
    "          </div> <!-- progressCircle-big--container -->\n" +
    "\n" +
    "          <div class=\"greeting big-text\">\n" +
    "            <h5 class=\"greeting__small\">Hey there {{student.first_name}},</h5>\n" +
    "            <h2 class=\"bold\">Welcome back!</h2>\n" +
    "          </div>\n" +
    "\n" +
    "        </div> <!-- /student-header--content -->\n" +
    "\n" +
    "      </div> <!-- student-header--wrapper -->\n" +
    "\n" +
    "    </div><!-- dashboard-header--student -->\n" +
    "\n" +
    "    <div class=\"dashboard-attention dashboard-attention--student\" ng-hide=\"user_assignments.length == 0\">\n" +
    "      <!-- This is where things that need attention go -->\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"dashboard-content dashboard-content--student clear\">\n" +
    "\n" +
    "      <div class=\"module-container clear\">\n" +
    "\n" +
    "        <div class=\"module module--upcoming-milestones\" modulecolor=\"no_category\">\n" +
    "          <div class=\"module--header\">Upcoming <span class=\"bold\">Milestones</span></div>\n" +
    "          <div class=\"module--content\">\n" +
    "            <div class=\"module-milestones\" ng-if=\"milestones.length > 0\">\n" +
    "              <div class=\"milestones-unsatisfied section--subsection clear\">\n" +
    "                <div class=\"milestone-item\" ng-repeat=\"milestone in milestones | orderBy: '-points'\" ng-if=\"!milestone.earned\">\n" +
    "                  <div class=\"milestone-item-unstatisfied\">\n" +
    "                    <a href=\"#/app/progress/{{student.id}}\">\n" +
    "                      <div class=\"milestone--point-circle\" modulecolor=\"{{milestone.module | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "                        <div class=\"point-circle--inside\">\n" +
    "                          <h5 class=\"bold\">{{milestone.points}}</h5>\n" +
    "                          <p>Points</p>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "                    </a>\n" +
    "                    <h6>{{milestone | printMilestone}}</h6>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <a href=\"#/app/progress/{{student.id}}\"><button class=\"btn btn-default\">Check out your Progress</button></a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"module module--expectations\" modulecolor=\"no_category\">\n" +
    "          <div class=\"module--header\">Your <span class=\"bold\">Expectations</span></div>\n" +
    "          <div class=\"module--content\">\n" +
    "            <div class=\"expectations-met-message\" ng-if=\"meetingExpectations\">\n" +
    "              <h5 class=\"bold\">Nice work {{student.first_name}}!</h5> <h6>You're meeting all of the Expectations!</h6>\n" +
    "            </div>\n" +
    "            <div class=\"dashboard-expectations--list clear\">\n" +
    "              <div class=\"expectations-met-message\" ng-if=\"!meetingExpectations\"><h6>You have expectations that need work<h6></div>\n" +
    "\n" +
    "              <div class=\"dashboard-expectations--list-item\" ng-repeat=\"expectation in expectations\" ng-if=\"expectation.user_expectation.status > 0\">\n" +
    "                <a href=\"#/app/user/{{student.id}}/user_expectation/{{expectation.user_expectation.id}}\">\n" +
    "                  <div class=\"dashboard-expectation warn\" ng-if=\"expectation.user_expectation.status == 1\">\n" +
    "                    <h6 class=\"bold\"><span class=\"glyphicon glyphicon-warning-sign\"></span> {{expectation.title}}</h6>\n" +
    "                  </div>\n" +
    "                  <div class=\"dashboard-expectation bad\" ng-if=\"expectation.user_expectation.status == 2\">\n" +
    "                    <h6 class=\"bold\"><span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{expectation.title}}</h6>\n" +
    "                  </div>\n" +
    "                </a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <a href=\"#/app/expectations/{{student.id}}\"><button class=\"btn btn-default\">See All Expectations</button></a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"module module--upcoming--tasks\" modulecolor=\"no_category\">\n" +
    "          <div class=\"module--header\">Upcoming <span class=\"bold\">Tasks</span></div>\n" +
    "          <div class=\"module--content\">\n" +
    "            <ul>\n" +
    "              <li class=\"tasks--list--item\" ng-repeat=\"assignment in user_assignments | orderBy:sortIncompleteAssignments\" ng-if=\"assignment.status == 0\">\n" +
    "                <a no-click-propagation href=\"#/app/user_assignment/{{assignment.id}}\">\n" +
    "                  <h6 class=\"bold\">{{assignment.title}}</h6>\n" +
    "                  <div class=\"subtext\" ng-if=\"assignment.due_datetime != null\">\n" +
    "                    Due {{assignment.due_datetime | fromNow}}\n" +
    "                  </div>\n" +
    "                </a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "            <a href=\"#/app/user_assignments/{{student.id}}\"><button class=\"btn btn-default\">See All Tasks</button></a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div><!-- dashboard-content--student -->\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('expectation/expectation.html',
    "<ion-view view-title=\"Expectations\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"taskContainer\" wait-to-load=\"{{loaded_data}}\">\n" +
    "\n" +
    "      <div class=\"task-header clear\">\n" +
    "        <div class=\"single-col-wrapper\">\n" +
    "          <div class=\"back-link\">\n" +
    "            <div back-button class=\"ng-clickable\">\n" +
    "              <h6>\n" +
    "                <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n" +
    "                <span class=\"ng-clickable-text\">Go Back</span>\n" +
    "              </h6>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"single-col-wrapper clear\">\n" +
    "        <div class=\"assignment--left\">\n" +
    "\n" +
    "          <div class=\"task-content\">\n" +
    "            <h4 class=\"bold\">{{expectation.title}}</h4>\n" +
    "            <h6 class=\"wysiwyg-output\" ng-bind-html=\"expectation.description\"></h6>\n" +
    "            <div class=\"expectation--comment-box\" ng-show=\"expectation.assigning\">\n" +
    "              <h6 class=\"bold\">Why are you changing these students' statuses?</h6>\n" +
    "              <text-angular ta-toolbar=\"[]\" ta-toolbar=\"[]\" ng-model=\"expectation.new_comment\" rows=\"4\" placeholder=\"Leave a Comment\"></text-angular>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <ul class=\"users-not-completed\" ng-if=\"users_not_meeting.length != 0\">\n" +
    "            <h6 class=\"bold red\" ng-if=\"users_not_meeting.length == 1\">{{users_not_meeting.length}} student is not meeting this expectation</h6>\n" +
    "            <h6 class=\"bold red\" ng-if=\"users_not_meeting.length != 1\">{{users_not_meeting.length}} students are not meeting this expectation</h6>\n" +
    "            <li class=\"medium-circle-pictures\" ng-repeat=\"user in users_not_meeting | orderBy: 'last_name'\">\n" +
    "              <a href=\"#/app/user/{{user.id}}/user_expectation/{{user.user_expectations[0].id}}\">\n" +
    "                <div class=\"medium-circle-picture\">\n" +
    "                  <img ng-src=\"{{user.square_avatar_url}}\"/>\n" +
    "                </div>\n" +
    "                <span class=\"bold\">{{user.first_last_initial}}</span>\n" +
    "              </a>\n" +
    "              <ul class=\"circle-subnav\" ng-show=\"expectation.assigning\">\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedMeeting(user)}\"><button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.meeting)\">Meeting</button></li>\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedNeedsWork(user)}\"><button type=\"button\" class=\"btn btn-warning btn-xs selected\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.needs_work)\">Needs Work</button></li>\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedNotMeeting(user)}\"><button type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.not_meeting)\">Not Meeting</button></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <ul class=\"users-not-completed\" ng-if=\"users_need_work.length != 0\">\n" +
    "            <h6 class=\"bold yellow\" ng-if=\"users_need_work.length == 1\">{{users_need_work.length}} student needs to work on this expectation</h6>\n" +
    "            <h6 class=\"bold yellow\" ng-if=\"users_need_work.length != 1\">{{users_need_work.length}} students need to work on this expectation</h6>\n" +
    "            <li class=\"medium-circle-pictures\" ng-repeat=\"user in users_need_work | orderBy: 'last_name'\">\n" +
    "              <a href=\"#/app/user/{{user.id}}/user_expectation/{{user.user_expectations[0].id}}\">\n" +
    "                <div class=\"medium-circle-picture\">\n" +
    "                  <img ng-src=\"{{user.square_avatar_url}}\"/>\n" +
    "                </div>\n" +
    "                <span class=\"bold\">{{user.first_last_initial}}</span>\n" +
    "              </a>\n" +
    "              <ul class=\"circle-subnav\" ng-show=\"expectation.assigning\">\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedMeeting(user)}\"><button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.meeting)\">Meeting</button></li>\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedNeedsWork(user)}\"><button type=\"button\" class=\"btn btn-warning btn-xs selected\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.needs_work)\">Needs Work</button></li>\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedNotMeeting(user)}\"><button type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.not_meeting)\">Not Meeting</button></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <ul class=\"users-completed\" ng-if=\"users_meeting.length != 0\">\n" +
    "            <h6 class=\"bold green\" ng-if=\"users_meeting.length == 1 && users_meeting.length != 0\">{{users_meeting.length}} student is meeting this expectation</h6>\n" +
    "            <h6 class=\"bold green\" ng-if=\"users_meeting.length != 1 && users_meeting.length != 0\">{{users_meeting.length}} students are meeting this expectation</h6>\n" +
    "            <h6 class=\"bold green\" ng-if=\"users_meeting.length != 0 && users_meeting.length == 0\">Nice! All students are meeting this expectation.</h6>\n" +
    "            <li class=\"medium-circle-pictures\" ng-repeat=\"user in users_meeting | orderBy: 'last_name'\">\n" +
    "              <a href=\"#/app/user/{{user.id}}/user_expectation/{{user.user_expectations[0].id}}\">\n" +
    "                <div class=\"medium-circle-picture\">\n" +
    "                  <img ng-src=\"{{user.square_avatar_url}}\"/>\n" +
    "                </div>\n" +
    "                <span class=\"bold\">{{user.first_last_initial}}</span>\n" +
    "              </a>\n" +
    "              <ul class=\"circle-subnav\" ng-show=\"expectation.assigning\">\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedMeeting(user)}\"><button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.meeting)\">Meeting</button></li>\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedNeedsWork(user)}\"><button type=\"button\" class=\"btn btn-warning btn-xs selected\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.needs_work)\">Needs Work</button></li>\n" +
    "                <li class=\"subnav-button\" ng-class=\"{'selected': isAssignedNotMeeting(user)}\"><button type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"assignUserExpectationStatus(user, CONSTANTS.EXPECTATION_STATUS.not_meeting)\">Not Meeting</button></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <br>\n" +
    "          <div task-editor class=\"edit-buttons-top\" ng-hide=\"expectation.assigning\">\n" +
    "            <button class=\"btn btn-default\" ng-click=\"setExpectationStatus()\"><span class=\"glyphicon glyphicon-edit\"></span> Set Expectation Status</button>\n" +
    "          </div>\n" +
    "          <div task-editor class=\"edit-buttons-top\" ng-show=\"expectation.assigning\">\n" +
    "            <button class=\"btn btn-default\" ng-click=\"cancelSetExpectationStatus()\"><span class=\"glyphicon glyphicon-edit\"></span> Cancel</button>\n" +
    "            <button class=\"btn btn-success\" ng-click=\"saveExpectationStatus()\"><span class=\"glyphicon glyphicon-ok\"></span> Save</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"assignment--right\">\n" +
    "          <ul>\n" +
    "            <li class=\"column-title\">\n" +
    "              <h5 class=\"bold\">Expectation Info</h5>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <h6> Across your organization </h6>\n" +
    "              <h5><span class=\"label label-danger\">\n" +
    "              <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{percent_not_meeting}}% Not Meeting\n" +
    "            </span></h5></li>\n" +
    "            <li><h5><span class=\"label label-warning\">\n" +
    "              <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{percent_need_work}}% Need Work\n" +
    "            </span></h5></li>\n" +
    "            <li><h5><span class=\"label label-success\">\n" +
    "              <span class=\"glyphicon glyphicon-ok-circle\"></span> {{percent_meeting}}% Meeting\n" +
    "            </span></h5></li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('expectation/student_expectations.html',
    "<ion-view view-title=\"Expectations\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"studentExpectationContainer\">\n" +
    "\n" +
    "      <div class=\"upper expectationUpper\">\n" +
    "\n" +
    "        <ul class=\"clear\">\n" +
    "\n" +
    "          <li class=\"studentProgress narrow addBorderright\">\n" +
    "            <a class=\"js-nav-link\" ng-href=\"#/app/progress/{{student.id}}\">{{student.first_name}}'s Progress</a>\n" +
    "          </li>\n" +
    "\n" +
    "          <li class=\"studentExpectations wideSpecial\">\n" +
    "                <h5><a ng-href=\"#/app/profile/{{student.id}}\" class=\"bold\">{{student.first_last_initial}}'s</a> Expectations</h5>\n" +
    "          </li>\n" +
    "\n" +
    "          <li class=\"studentProfile narrow addBorderleft\">\n" +
    "            <a class=\"js-nav-link\" ng-href=\"#/app/profile/{{student.id}}\">{{student.first_name}}'s Profile</a>\n" +
    "          </li>\n" +
    "\n" +
    "        </ul>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"expectationMiddle clear\">\n" +
    "\n" +
    "        <div class=\"progressCircle-big--container\">\n" +
    "\n" +
    "          <div class=\"progressCircle-big\">\n" +
    "            <a ng-href=\"#/app/profile/{{student.id}}\" alt=\"View {{student.first_name}}'s Profile\">\n" +
    "              <div class=\"big-progress-circle\" ng-class=\"{'needsAttention': needs_attention}\" ng-if=\"student_with_modules_progress\">\n" +
    "                <progress-circle width=\"240\" student=\"student_with_modules_progress\" identifier=\"big\" ng-if=\"student_with_modules_progress\"></progress-circle>\n" +
    "              </div>\n" +
    "            </a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div> <!-- progressCircle-big--container -->\n" +
    "\n" +
    "        <div class=\"meetingExpectations\">\n" +
    "          <div class=\"expectations-message\" wait-to-load=\"{{loaded_data}}\">\n" +
    "            <div ng-if=\"current_user.is_student\">\n" +
    "              <div class=\"expectations-met-message\" ng-hide=\"!meetingExpectations\">\n" +
    "                <h3 class=\"bold\">Nice work {{student.first_name}}!</h3>\n" +
    "                <h5>You're meeting all of the Expectations!</h5>\n" +
    "              </div>\n" +
    "              <div class=\"expectations-not-met-message\" ng-hide=\"meetingExpectations\">\n" +
    "                <h3 class=\"bold\">Hey {{student.first_name}},</h3>\n" +
    "                <h5>you aren't currently meeting all of your expectations.</h5>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div ng-if=\"!current_user.is_student\">\n" +
    "              <div class=\"expectations-met-message\" ng-hide=\"!meetingExpectations\">\n" +
    "                <h3 class=\"bold\">{{student.first_name}} is meeting</h3>\n" +
    "                <h5>all of the expectations.</h5>\n" +
    "              </div>\n" +
    "              <div class=\"expectations-not-met-message\" ng-hide=\"meetingExpectations\">\n" +
    "                <h3 class=\"bold\">{{student.first_name}} is not meeting</h3>\n" +
    "                <h5>all of the expectations.</h5>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"expectationLower\">\n" +
    "\n" +
    "        <div class=\"expectationLower--container\">\n" +
    "\n" +
    "        <div class=\"module-header\">\n" +
    "            <h4 class=\"bold\">\n" +
    "              {{student.first_name}}'s Expectations\n" +
    "            </h4>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"expectations-list\" wait-to-load=\"{{loaded_data}}\">\n" +
    "            <div class=\"expectations-list-item\" ng-repeat=\"expectation in expectations\" ng-click=\"viewExpectation(expectation.user_expectation.id)\"\n" +
    "                  ng-class=\"{'bad': expectation.user_expectation.status == CONSTANTS.EXPECTATION_STATUS.not_meeting,\n" +
    "                             'warn': expectation.user_expectation.status == CONSTANTS.EXPECTATION_STATUS.needs_work,\n" +
    "                             'good': expectation.user_expectation.status == CONSTANTS.EXPECTATION_STATUS.meeting}\">\n" +
    "              <h5 class=\"bold\">{{expectation.title}}</h5>\n" +
    "\n" +
    "              <div ng-if=\"expectation.user_expectation.status == CONSTANTS.EXPECTATION_STATUS.meeting\">\n" +
    "                <h2><span class=\"glyphicon glyphicon-star\"></span></h2>\n" +
    "                <h6 class=\"bold\">You're meeting this expectation.</h6>\n" +
    "              </div>\n" +
    "\n" +
    "              <div ng-if=\"expectation.user_expectation.status == CONSTANTS.EXPECTATION_STATUS.needs_work\">\n" +
    "                <h2><span class=\"glyphicon glyphicon-warning-sign\"></span></h2>\n" +
    "                <h6 class=\"bold\">You need some work on this expectation.</h6>\n" +
    "              </div>\n" +
    "\n" +
    "              <div ng-if=\"expectation.user_expectation.status == CONSTANTS.EXPECTATION_STATUS.not_meeting\">\n" +
    "                <h2><span class=\"glyphicon glyphicon-exclamation-sign\"></span></h2>\n" +
    "                <h6 class=\"bold\">You are not meeting this expectation!</h6>\n" +
    "              </div>\n" +
    "              <span ng-if=\"expectation.user_expectation.comment\" class=\"wysiwyg-output\" ng-bind-html=\"expectation.user_expectation.comment\"></span>\n" +
    "              <div class=\"updated-text\" ng-if=\"expectation.user_expectation.modified_by_name\">Last Updated {{expectation.user_expectation.updated_at | fromNow}}</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('expectation/user_expectation.html',
    "<ion-view view-title=\"Expectations\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"userExpectationContainer\">\n" +
    "\n" +
    "      <div class=\"expectation-header\">\n" +
    "        <div class=\"single-col-wrapper\">\n" +
    "          <div class=\"back-link\">\n" +
    "            <div back-button class=\"ng-clickable\">\n" +
    "              <h6>\n" +
    "                <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n" +
    "                <span class=\"ng-clickable-text\">Go Back</span>\n" +
    "              </h6>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"single-col-wrapper expectation-content\">\n" +
    "        <a href=\"#/app/expectation/{{user_expectation.expectation_id}}\">\n" +
    "          <h4 class=\"bold\" style=\"text-align: center;\">{{user_expectation.title}}</h4>\n" +
    "        </a>\n" +
    "        <h6 class=\"wysiwyg-output\" ng-bind-html=\"user_expectation.description\"></h6>\n" +
    "        <div class=\"expectation--current-status\" ng-hide=\"editing\" ng-class=\"{'bad': user_expectation.status == CONSTANTS.EXPECTATION_STATUS.not_meeting,\n" +
    "                                                                             'warn': user_expectation.status == CONSTANTS.EXPECTATION_STATUS.needs_work,\n" +
    "                                                                             'good': user_expectation.status == CONSTANTS.EXPECTATION_STATUS.meeting}\">\n" +
    "          <div class=\"circle-pictures\">\n" +
    "            <a href=\"#/app/profile/{{student.id}}\">\n" +
    "              <div class=\"circle-picture\">\n" +
    "                <img ng-src=\"{{student.square_avatar_url}}\" alt=\"{{student.first_last_name}}\" />\n" +
    "              </div>\n" +
    "            </a>\n" +
    "          </div>\n" +
    "\n" +
    "          <h5 class=\"bold\" ng-if=\"user_expectation.status == CONSTANTS.EXPECTATION_STATUS.meeting && current_user.role <= CONSTANTS.USER_ROLES.mentor\">\n" +
    "            <span class=\"glyphicon glyphicon-star\"></span> Nice! {{student.first_name}} is meeting this expectation.\n" +
    "          </h5>\n" +
    "          <h5 class=\"bold\" ng-if=\"user_expectation.status == CONSTANTS.EXPECTATION_STATUS.meeting && current_user.role >= CONSTANTS.USER_ROLES.student\">\n" +
    "            <span class=\"glyphicon glyphicon-star\"></span> Nice Job! You're meeting this expectation.\n" +
    "          </h5>\n" +
    "\n" +
    "          <h5 class=\"bold\" ng-if=\"user_expectation.status == CONSTANTS.EXPECTATION_STATUS.needs_work && current_user.role <= CONSTANTS.USER_ROLES.mentor\">\n" +
    "            <span class=\"glyphicon glyphicon-warning-sign\"></span> {{student.first_name}} needs to work on this expectation.\n" +
    "          </h5>\n" +
    "          <h5 class=\"bold\" ng-if=\"user_expectation.status == CONSTANTS.EXPECTATION_STATUS.needs_work && current_user.role >= CONSTANTS.USER_ROLES.student\">\n" +
    "            <span class=\"glyphicon glyphicon-warning-sign\"></span> Hey {{student.first_name}}, you have some work to do on this expectation.\n" +
    "          </h5>\n" +
    "\n" +
    "          <h5 class=\"bold\" ng-if=\"user_expectation.status == CONSTANTS.EXPECTATION_STATUS.not_meeting && current_user.role <= CONSTANTS.USER_ROLES.mentor\">\n" +
    "            <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{student.first_name}} is not meeting this expectation.\n" +
    "          </h5>\n" +
    "          <h5 class=\"bold\" ng-if=\"user_expectation.status == CONSTANTS.EXPECTATION_STATUS.not_meeting && current_user.role >= CONSTANTS.USER_ROLES.student\">\n" +
    "            <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{student.first_name}}, you are not meeting this expectation.\n" +
    "          </h5>\n" +
    "\n" +
    "          <h6 class=\"inline-head wysiwyg-output\" ng-hide=\"edit_comment\" ng-bind-html=\"user_expectation.comment\"></h6>\n" +
    "          <span ng-hide=\"edit_comment\" class=\"glyphicon glyphicon-edit ng-clickable \" ng-click=\"editComment()\" ng-if=\"user_expectation.comment && (current_user.is_mentor || current_user.is_org_admin)\"></span>\n" +
    "\n" +
    "          <text-angular ta-toolbar=\"[]\" rows=\"4\" cols=\"40\" ng-model=\"user_expectation.edit_comment\" ng-show=\"edit_comment\"></text-angular>\n" +
    "          <span ng-show=\"edit_comment\" class=\"ng-clickable glyphicon glyphicon-ok\" ng-click=\"updateComment()\"></span>\n" +
    "          <span ng-show=\"edit_comment\" class=\"ng-clickable glyphicon glyphicon-remove\" ng-click=\"cancelCommentEdit()\"></span>\n" +
    "\n" +
    "          <div ng-if=\"user_expectation_history.length != 1 && user_expectation.modified_by_name\">\n" +
    "            Updated\n" +
    "            <span title=\"{{user_expectation.updated_at | formatMDY }}\">{{user_expectation.updated_at | fromNow}} </span>\n" +
    "            by {{user_expectation.modified_by_name}}\n" +
    "          </div>\n" +
    "          <div class=\"status-buttons\" ng-if=\"current_user.role <= CONSTANTS.USER_ROLES.mentor\">\n" +
    "            <button class=\"btn btn-default\" ng-click=\"editExpectation()\"><span class=\"glyphicon glyphicon-edit\"></span> Change {{student.first_name}}'s Status</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"status-block\" ng-show=\"editing\" ng-if=\"current_user.role <= CONSTANTS.USER_ROLES.mentor\">\n" +
    "          <div class=\"status-message\">\n" +
    "            <h5 class=\"bold\" style=\"text-align: center;\">How is {{student.first_name}} doing on this expectation?</h5>\n" +
    "                      <div class=\"expectation--status-changer clear\">\n" +
    "            <div class=\"expectation--status\">\n" +
    "              <div class=\"expectation--status-inner good\" ng-class=\"{'selected': user_expectation.status == CONSTANTS.EXPECTATION_STATUS.meeting}\" ng-click=\"user_expectation.status = CONSTANTS.EXPECTATION_STATUS.meeting\">\n" +
    "                <h2><span class=\"glyphicon glyphicon-star\"></span></h2>\n" +
    "                <h5 class=\"bold\">Doing Great!</h5>\n" +
    "                <p>{{student.first_name}} is doing well with meeting this expectation.</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"expectation--status\">\n" +
    "              <div class=\"expectation--status-inner warn\" ng-class=\"{'selected': user_expectation.status == CONSTANTS.EXPECTATION_STATUS.needs_work}\" ng-click=\"user_expectation.status = CONSTANTS.EXPECTATION_STATUS.needs_work\">\n" +
    "                <h2><span class=\"glyphicon glyphicon-warning-sign\"></span></h2>\n" +
    "                <h5 class=\"bold\">Needs Work</h5>\n" +
    "                <p>{{student.first_name}} has a few things to work on to meet this expectation.</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"expectation--status\">\n" +
    "              <div class=\"expectation--status-inner bad\" ng-class=\"{'selected': user_expectation.status == CONSTANTS.EXPECTATION_STATUS.not_meeting}\" ng-click=\"user_expectation.status = CONSTANTS.EXPECTATION_STATUS.not_meeting\">\n" +
    "                <h2><span class=\"glyphicon glyphicon-exclamation-sign\"></span></h2>\n" +
    "                <h5 class=\"bold\">Not Meeting</h5>\n" +
    "                <p>{{student.first_name}} is not meeting this expectation at all.</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"expectation--comment-box\">\n" +
    "            <h6 class=\"bold\">Why are you changing {{student.first_name}}'s status?</h6>\n" +
    "            <text-angular ta-toolbar=\"[]\" ng-model=\"user_expectation.new_comment\" rows=\"4\" placeholder=\"Leave a Comment\"></text-angular>\n" +
    "          </div>\n" +
    "          <div class=\"status-buttons buttonGroup\">\n" +
    "            <button class=\"btn btn-success\" ng-click=\"updateExpectation()\"><span class=\"glyphicon glyphicon-ok\"></span> Save {{student.first_name}}'s Status</button>\n" +
    "            <button class=\"btn btn-danger btn-sm\" ng-click=\"cancelEditing()\"><span class=\"glyphicon glyphicon-remove\"></span> Cancel</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"single-col-wrapper expectation-history\" ng-if=\"user_expectation_history.length != 1\">\n" +
    "\n" +
    "        <h6 class=\"bold list-header-imua\">Previous Updates</h6>\n" +
    "\n" +
    "        <table class=\"status-block history-block\" ng-repeat=\"history in user_expectation_history\" ng-show=\"!$first\">\n" +
    "          <tr ng-if=\"!$last\">\n" +
    "            <td class=\"status-picture expectation-dot\">\n" +
    "              <div class=\"expectation-history-status\" ng-class=\"getHistoryColor(history.status)\"></div>\n" +
    "            </td>\n" +
    "            <td class=\"status-message\">\n" +
    "              <h6>{{history.modified_by_name}} changed the status of {{student.first_name}}'s expectation to <span class=\"bold\">{{getStatusText(history.status)}}</span> <span ng-if=\"history.comment\">and left a comment:</span></h6>\n" +
    "              <p class=\"history-comment wysiwyg-output\" ng-if=\"history.comment\" ng-bind-html=\"history.comment\"></p>\n" +
    "              <div title=\"{{history.created_on | formatMDY }}\">{{history.created_on | fromNow }}</div>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          <tr ng-if=\"$last\">\n" +
    "            <td class=\"status-picture expectation-dot\">\n" +
    "              <div class=\"expectation-history-status\" ng-class=\"getHistoryColor(history.status)\"></div>\n" +
    "            </td>\n" +
    "            <td class=\"status-message\">\n" +
    "              <h6>Initial state: <span class=\"bold\">{{getStatusText(history.status)}}</span></h6>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('forms/error_messages.html',
    "<span class=\"errorText errorMessage\" ng-message=\"required\">*This field is required</span>\n" +
    "<span class=\"errorText errorMessage\" ng-message=\"minlength\">*Too few characters</span>\n" +
    "<span class=\"errorText errorMessage\" ng-message=\"email\">*Not a valid email address</span>\n" +
    "<span class=\"errorText errorMessage\" ng-message=\"number\">*Not a valid number</span>\n" +
    "<span class=\"errorText errorMessage\" ng-message=\"maxlength\">*Too many characters</span>\n" +
    "<span class=\"errorText errorMessage\" ng-message=\"min\">*Number is too small</span>\n" +
    "<span class=\"errorText errorMessage\" ng-message=\"max\">*Number is too large</span>\n"
  );


  $templateCache.put('mentor/mentor.html',
    "<ion-view view-title=\"Mentor\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"mentorContainer\">\n" +
    "\n" +
    "      <div class=\"mentor-header\">\n" +
    "\n" +
    "        <div class=\"mentor--pic\">\n" +
    "          <a href=\"#/app/profile/{{mentor.id}}\" alt=\"View {{mentor.first_name}}'s full profile\"><img ng-src=\"{{mentor.square_avatar_url}}\" alt=\"{{mentor.first_name}}'s Profile Picture\"></a>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"mentor--primary-info\">\n" +
    "\n" +
    "          <h3 class=\"bold\">{{mentor.first_name}} {{mentor.last_name}}</h3>\n" +
    "          <h5>{{mentor.title}}</h5>\n" +
    "          <div class=\"view-profile-button\">\n" +
    "            <a href=\"#/app/profile/{{mentor.id}}\" alt=\"View {{mentor.first_name}}'s full profile\"><button class=\"btn submit\">View Full Profile</button></a>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"mentor-mid\" ng-hide=\"attention_students.length == 0\">\n" +
    "        <div class=\"students-attention\">\n" +
    "          <div ng-if=\"attention_students.length == 1\" class=\"list-header-imua\">\n" +
    "            <h5>Student assigned to {{mentor.first_name}} who <span class=\"bold\">needs attention</span></h5>\n" +
    "          </div>\n" +
    "          <div ng-if=\"attention_students.length != 1\" class=\"list-header-imua\">\n" +
    "            <h5>Students assigned to {{mentor.first_name}} <span class=\"bold\">who need attention</span></h5>\n" +
    "          </div>\n" +
    "          <div class=\"list-container progress-circle--list no-bottom\">\n" +
    "            <progress-circle-needs-attention ng-repeat=\"student in attention_students\"></progress-circle-needs-attention>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"mentor-lower\">\n" +
    "        <h4 class=\"list-header-imua\"><span class=\"bold\">{{mentor.first_name}}'s</span> Students</h4>\n" +
    "\n" +
    "        <div class=\"list-container progress-circle--list\">\n" +
    "\n" +
    "          <progress-circle-assigned ng-repeat=\"student in assigned_students | orderBy: 'last_name'\"></progress-circle-assigned>\n" +
    "\n" +
    "          <div class=\"add-button\" ng-click=\"assigning=true\" ng-hide=\"assigning || assigned_students.length == all_students.length\">\n" +
    "            <div class=\"glyphicon glyphicon-plus-sign\"></div>\n" +
    "            <h6 class=\"bold\">Assign Students</h6>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"add-button\" ng-show=\"assigning\">\n" +
    "            <h6 class=\"bold\">Scroll Down to Assign Students</h6>\n" +
    "          </div>\n" +
    "\n" +
    "        <div ng-show=\"assigning\">\n" +
    "\n" +
    "          <h4 class=\"list-header-imua\" ng-hide=\"all_students.length == assigned_students.length\"><span class=\"bold\">Assign Students</span> to {{mentor.first_name}}</h4>\n" +
    "\n" +
    "          <h6 class=\"search-label\">Search for Students: </h6>\n" +
    "          <input class=\"student-search form-inline form-field\" type=\"text\" ng-model=\"search.name\">\n" +
    "\n" +
    "          <div class=\"list-container\">\n" +
    "            <div class=\"circle-pictures assign-student-circles\" ng-class=\"{ assigned: isAssigned(student)}\" ng-click=\"assign(student)\" ng-repeat=\"student in all_students | orderBy: 'last_name' | filter: { full_name: search.name }\">\n" +
    "                <div class=\"circle-picture\">\n" +
    "                  <img ng-src=\"{{student.square_avatar_url}}\" alt=\"Avatar\" class=\"avatar-block__img avatar-block__img--thumbnail\" />\n" +
    "                </div>\n" +
    "                <div class=\"student-name\">\n" +
    "                  <h6 class=\"bold\">{{student.first_last_initial}}</h6>\n" +
    "                </div>\n" +
    "                <div class=\"add-student-name\">\n" +
    "                  <h6 class=\"bold\"><span class=\"glyphicon glyphicon-plus-sign green\"></span> {{student.first_last_initial}}</h6>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"add-button\" ng-click=\"assigning=false\">\n" +
    "              <div class=\"glyphicon glyphicon-ok-sign green\"></div>\n" +
    "              <div>Done Assigning</div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <h5 ng-show=\"all_students.length == assigned_students.length\">No students left to assign!</h5>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('milestone/milestone.html',
    "<ion-view view-title=\"Milestone\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "  <div class=\"taskContainer\" wait-to-load=\"{{loaded_data}}\">\n" +
    "\n" +
    "    <div class=\"task-header clear\">\n" +
    "      <div class=\"single-col-wrapper\">\n" +
    "        <div class=\"back-link\">\n" +
    "          <div back-button class=\"ng-clickable\">\n" +
    "            <h6>\n" +
    "              <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n" +
    "              <span class=\"ng-clickable-text\">Go Back</span>\n" +
    "            </h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"single-col-wrapper clear\">\n" +
    "      <div class=\"assignment--left\">\n" +
    "\n" +
    "        <div class=\"task-content\">\n" +
    "          <h4>{{milestone | printMilestone}}</h4>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"num_students_in_semester == 0\">\n" +
    "          <h5 ng-if=\"current_user.is_org_admin\" class=\"italic\">There are no students currently in {{milestone.time_unit_name}}</h5>\n" +
    "          <h5 ng-if=\"current_user.is_mentor\" class=\"italic\">None of your students are currently in {{milestone.time_unit_name}}</h5>\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"users-not-completed\" ng-if=\"users_incomplete.length != 0\">\n" +
    "          <h6 class=\"bold red\" ng-if=\"users_incomplete.length == 1\">{{users_incomplete.length}} student has not completed this milestone</h6>\n" +
    "          <h6 class=\"bold red\" ng-if=\"users_incomplete.length != 1\">{{users_incomplete.length}} students have not completed this milestone</h6>\n" +
    "          <li class=\"medium-circle-pictures\" ng-repeat=\"user in users_incomplete | orderBy: 'last_name'\">\n" +
    "            <a href=\"#/app/progress/{{user.id}}\">\n" +
    "              <div class=\"medium-circle-picture\">\n" +
    "                <img ng-src=\"{{user.square_avatar_url}}\"/>\n" +
    "              </div>\n" +
    "              <span class=\"bold\">{{user.first_last_initial}}</span>\n" +
    "            </a>\n" +
    "            <ul class=\"circle-subnav\">\n" +
    "              <li class=\"subnav-button\" ng-show=\"userMilestonesAreEditable(milestone)\">\n" +
    "                <button type=\"button\" class=\"btn btn-success btn-xs\" ng-click=\"setUserMilestone(user)\">Mark Complete</button>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <ul class=\"users-completed\" ng-if=\"users_complete.length != 0\">\n" +
    "          <h6 class=\"bold green\" ng-if=\"users_complete.length == 1 && users_incomplete.length != 0\">{{users_complete.length}} student has completed this milestone</h6>\n" +
    "          <h6 class=\"bold green\" ng-if=\"users_complete.length != 1 && users_incomplete.length != 0\">{{users_complete.length}} students have completed this milestone</h6>\n" +
    "          <h6 class=\"bold green\" ng-if=\"users_complete.length != 0 && users_incomplete.length == 0\">Nice! All students have completed this milestone.</h6>\n" +
    "          <li class=\"medium-circle-pictures\" ng-repeat=\"user in users_complete | orderBy: 'last_name'\">\n" +
    "            <a href=\"#/app/progress/{{user.id}}\">\n" +
    "              <div class=\"medium-circle-picture\">\n" +
    "                <img ng-src=\"{{user.square_avatar_url}}\"/>\n" +
    "              </div>\n" +
    "              <span class=\"bold\">{{user.first_last_initial}}</span>\n" +
    "            </a>\n" +
    "            <ul class=\"circle-subnav\">\n" +
    "              <!-- <li>Completed: {{user.completed_at | formatMDY}}</li> -->\n" +
    "              <li class=\"subnav-button\" ng-show=\"userMilestonesAreEditable(milestone)\">\n" +
    "                <button type=\"button\" class=\"btn btn-danger btn-xs\" ng-click=\"unsetUserMilestone(user)\">Mark<br>Incomplete</button>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"assignment--right\">\n" +
    "        <ul>\n" +
    "          <li class=\"column-title\">\n" +
    "            <h5 class=\"bold\">Milestone Info</h5>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <h6 class=\"bold\">{{milestone.title}}</h6>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <h6>{{milestone.time_unit_name}}</h6>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <h6>Students currently in {{milestone.time_unit_name}}</h6>\n" +
    "            <h5 class=\"bold\">{{users_total.length}}</h5>\n" +
    "            <h6>\n" +
    "              ({{percent_complete}}% Complete)\n" +
    "            </h6>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <!-- <h6>Created by</h6>\n" +
    "            <a href=\"#/app/profile/{{user.id}}\">\n" +
    "              <div class=\"tiny-circle-picture\">\n" +
    "                <img ng-src=\"{{user.square_avatar_url}}\" alt=\"{{user.first_name}} {{user.last_name}}\" />\n" +
    "              </div>\n" +
    "              <h6 class=\"bold\">{{user.first_name}} {{user.last_name}}</h6>\n" +
    "            </a> -->\n" +
    "            <!-- <p>Created on</p>\n" +
    "            <p>{{milestone.created_at | formatMDY}}</p> -->\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('navbar/navbar.html',
    "<div ng-controller=\"NavController\">\n" +
    "  <ul class=\"sidebar-nav\">\n" +
    "    <li class=\"sidebar-brand\">\n" +
    "      <a href=\"#/app/\">\n" +
    "        <img ng-src=\"assets/logo-blue-small.png\" alt=\"IMUA\" height=\"22px\" width=\"22px\">\n" +
    "          <span class=\"pls\" ng-if=\"current_user.is_super_admin\">Collective Progress</span>\n" +
    "          <span class=\"pls\" ng-if=\"!current_user.is_super_admin\">{{ current_user.organization_name }}</span>\n" +
    "      </a>\n" +
    "    </li>\n" +
    "\n" +
    "    <li ng-if=\"current_user.is_super_admin\">\n" +
    "      <a href=\"#/app/sa/organizations\">Organizations</a>\n" +
    "    </li>\n" +
    "\n" +
    "    <div ng-if=\"current_user.is_org_admin\">\n" +
    "      <li>\n" +
    "        <a href=\"#/app/dashboard/{{ current_user.id }}\">Dashboard</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#/app/organization/{{ current_user.organization_id }}\">Mentors</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#/app/students/{{ current_user.organization_id }}\">Students</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "          <a href=\"#/app/assignments/{{ current_user.id }}\">Tasks</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "      <li>\n" +
    "        <a href=\"#/app/setup/{{ current_user.organization_id }}\">Organization Setup</a>\n" +
    "      </li>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"current_user.is_mentor\">\n" +
    "      <li>\n" +
    "        <a href=\"#/app/dashboard/{{ current_user.id }}\">My Students</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#/app/assignments/{{ current_user.id }}\">Tasks</a>\n" +
    "      </li>\n" +
    "      <!-- TODO: Mentors shouldn't go to old roadmap page - Create new page\n" +
    "            for accessing milestone and expectation view for both\n" +
    "            admins and mentors to see -->\n" +
    "      <li>\n" +
    "        <a href=\"#/app/setup/{{ current_user.organization_id }}\">Organization</a>\n" +
    "      </li>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"current_user.is_student\">\n" +
    "      <li>\n" +
    "        <a href=\"#/app/dashboard/{{ current_user.id }}\">Dashboard</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#/app/progress/{{ current_user.id }}\">My Progress</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#/app/expectations/{{ current_user.id }}\">Expectations</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a href=\"#/app/user_assignments/{{ current_user.id }}\">Tasks</a>\n" +
    "      </li>\n" +
    "    </div>\n" +
    "\n" +
    "    <li class=\"dropdown cog js-cog\">\n" +
    "      <div class=\"profile-dropdown\">\n" +
    "        <span>{{ current_user.first_last_initial }}</span>\n" +
    "        <span class=\"glyphicon glyphicon-cog\"></span>\n" +
    "      </div>\n" +
    "      <div class=\"submenu js-submenu\">\n" +
    "        <div class=\"submenu__link\">\n" +
    "          <a href=\"#/app/profile/{{ current_user.id }}\">Profile</a>\n" +
    "        </div>\n" +
    "        <div class=\"submenu__link\">\n" +
    "          <a href=\"\" ng-click=\"logout()\">Logout</a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "\n" +
    "  </ul>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('organization/add_user_modal.html',
    "<div class=\"modal-body paxl user-modal\">\n" +
    "  <!--<h3 class=\"pbl\">Add User</h3>\n" +
    "  <h5>Organization Admin</h5> -->\n" +
    "  <form name=\"newUserForm\" imua-form=\"add($event)\" class=\"form form--user\" ng-hide=\"editingPassword\" novalidate>\n" +
    "\n" +
    "    <div class=\"pbl\">\n" +
    "      <label-with-errors label=\"Email\" form=\"newUserForm\" formfield=\"newUserForm.email\"></label-with-errors>\n" +
    "      <input name=\"email\" required type=\"email\" class=\"form-control\" ng-model=\"user.email\" placeholder=\"Email\" autofocus=\"true\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pbl\">\n" +
    "      <label-with-errors label=\"First Name\" form=\"newUserForm\" formfield=\"newUserForm.firstName\"></label-with-errors>\n" +
    "      <input name=\"firstName\" required class=\"form-control\" ng-model=\"user.first_name\" placeholder=\"First Name\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"pbs\">\n" +
    "      <label-with-errors label=\"Last Name\" form=\"newUserForm\" formfield=\"newUserForm.lastName\"></label-with-errors>\n" +
    "      <input name=\"lastName\" required class=\"form-control\" ng-model=\"user.last_name\" placeholder=\"Last Name\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"user.is_student\" class=\"ptm pbs\">\n" +
    "      <class-of-dropdown form=\"newUserForm\" model=\"user\"></class-of-dropdown>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"user.is_student\" class=\"ptm pbs\">\n" +
    "      <label-with-errors label=\"Semester\" form=\"newUserForm\" formfield=\"newUserForm.semester\"></label-with-errors>\n" +
    "      <select name=\"semester\" required class=\"form-control\" ng-options=\"time_unit.id as time_unit.name for time_unit in organization.time_units\" ng-model=\"user.time_unit_id\">\n" +
    "        <option value=\"\">--Choose a Semester--</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Only for Super Admins to create Ghost Users -->\n" +
    "    <!-- ToDo: If this is something regular orgs want to create\n" +
    "          make this accessible to org admins with better dropdown values -->\n" +
    "    <div ng-if=\"current_user.is_super_admin\"  class=\"ptm pbs\">\n" +
    "      <label-with-errors label=\"Status\" form=\"newUserForm\" formfield=\"newUserForm.status\"></label-with-errors>\n" +
    "      <select name=\"status\" required class=\"form-control\" ng-model=\"user.status\">\n" +
    "        <option value=\"0\">Active</option>\n" +
    "        <option value=\"-1\">Ghost</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"buttonGroup ptl\">\n" +
    "\n" +
    "      <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"newUserForm.$submitted && newUserForm.$invalid\">\n" +
    "      {{error}}</div>\n" +
    "\n" +
    "      <button class=\"ladda-button submit\" type=\"submit\" data-style=\"expand-right\" data-size=\"s\" data-color=\"blue\"><span class=\"ladda-label\">Add</span></button>\n" +
    "\n" +
    "      <span class=\"cancel\" ng-click=\"cancel()\"><span>Cancel</span></span>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "  </form>\n" +
    "</div>\n"
  );


  $templateCache.put('organization/org_test_manager.html',
    "<div ng-controller=\"OrgTestController\" class=\"orgTestContainer\">\n" +
    "\n" +
    "  <div class=\"orgTests-title\">\n" +
    "    <h4 class=\"bold\">Tests</h4>\n" +
    "  </div>\n" +
    "  <div class=\"orgTests-list\" wait-to-load=\"{{loaded_orgTests}}\">\n" +
    "\n" +
    "    <div class=\"orgTests-list__item\" ng-repeat=\"orgTest in orgTests\">\n" +
    "      <div class=\"orgTests-list__item__title\">\n" +
    "        <h5 ng-hide=\"orgTest.editing\">{{orgTest.title}}</h5>\n" +
    "        <input ng-show=\"orgTest.editing\" class=\"form-field\" ng-model=\"orgTest.new_title\" placeholder=\"Test Title\" name=\"orgTest_title\">\n" +
    "      </div>\n" +
    "      <div class=\"orgTests-list__item__score_type\">\n" +
    "        <span ng-hide=\"orgTest.editing\">{{orgTest.score_type}}</span>\n" +
    "        <select ng-show=\"orgTest.editing\" ng-options=\"scoreType as scoreType for scoreType in TestScoreTypes\" ng-model=\"orgTest.new_score_type\">\n" +
    "          <option value=\"\">--- Score Type ---</option>\n" +
    "        </select>\n" +
    "      </div>\n" +
    "      <div class=\"orgTests-list__item__icons\" org-setup-editor>\n" +
    "        <div ng-hide=\"orgTest.editing\">\n" +
    "          <span class=\"glyphicon glyphicon-pencil prs\" title=\"Edit\" ng-click=\"editOrgTest($index)\"></span>\n" +
    "          <span class=\"glyphicon glyphicon-trash\" title=\"Delete\" ng-click=\"deleteOrgTest($index)\"></span>\n" +
    "        </div>\n" +
    "        <div ng-show=\"orgTest.editing\">\n" +
    "          <span class=\"editing_icon glyphicon glyphicon-ok prs green\" title=\"Save\" ng-click=\"saveOrgTest($index)\"></span>\n" +
    "          <span class=\"editing_icon glyphicon glyphicon-remove red\" title=\"Cancel\" ng-click=\"cancelEditOrgTest($index)\"></span>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"add-orgTest\" org-setup-editor>\n" +
    "      <div class=\"add-orgTest__button-placeholder\" ng-hide=\"current_user.role < CONSTANTS.USER_ROLES.mentor && !orgTests.editing\"></div>\n" +
    "      <button type=\"submit\" class=\"submit add-orgTest__button\" ng-show=\"current_user.role < CONSTANTS.USER_ROLES.mentor && !orgTests.editing\" ng-click=\"addOrgTest()\">Add a Test</button>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('organization/organization.html',
    "<ion-view view-title=\"Organization\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "\t<div class=\"organizationContainer userListContainer\" wait-to-load=\"{{loaded_users}}\">\n" +
    "\n" +
    "\t  <div class=\"organization-header\">\n" +
    "\t\t\t<ul class=\"mentor-stats clear\">\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<h4 class=\"bold\">Mentors</h4>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<div class=\"stat-wrapper clear\">\n" +
    "\t\t\t\t\t\t<div class=\"count\"><h4><span class=\"bold\">{{organization.mentors.length}}</span></h4></div>\n" +
    "\t\t\t\t\t\t<div ng-if=\"organization.mentors.length !== 1\" class=\"descript\">Total <br>Mentors</div>\n" +
    "\t          <div ng-if=\"organization.mentors.length == 1\" class=\"descript\">Mentor</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<div class=\"stat-wrapper ngclickable clear\">\n" +
    "\t\t\t\t\t\t<div class=\"count\"><h4><span class=\"bold\">{{active_mentors}}</span></h4></div>\n" +
    "\t\t\t\t\t\t<div ng-if=\"active_mentors !== 1\" class=\"descript\">Mentors Active <br>This Week</div>\n" +
    "\t          <div ng-if=\"active_mentors == 1\" class=\"descript\">Mentor Active <br>This Week</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t\t<!-- <li>\n" +
    "\t\t\t\t  <div class=\"stat-wrapper clear\">\n" +
    "\t\t\t\t    <div class=\"count\"><h4><span class=\"bold\">{{mentor_needs_help}}</span></h4></div>\n" +
    "\t\t\t\t    <div ng-if=\"mentor_needs_help !== 1\" class=\"descript\">Mentors <br>Need Help</div>\n" +
    "\t\t\t\t          <div ng-if=\"mentor_needs_help == 1\" class=\"descript\">Mentor <br>Needs Help</div>\n" +
    "\t\t\t\t  </div>\n" +
    "\t\t\t\t</li> -->\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<div class=\"stat-wrapper ngclickable temp-clickable clear\" ng-click=\"attentionList = !attentionList\">\n" +
    "\t\t\t\t\t\t<div class=\"count\"><h4><span class=\"bold\">{{mentors_with_attention_students.length}}</span></h4></div>\n" +
    "\t\t\t\t\t\t<div ng-if=\"true\" class=\"descript\">Mentors have students <br>that need attention</div>\n" +
    "\t          <div ng-if=\"false\" class=\"descript\">Mentor has students <br>that need attention</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t</ul>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t  <div class=\"organization-mid\" ng-if=\"mentors_with_attention_students.length != 0\" ng-show=\"attentionList\">\n" +
    "\t    <div class=\"mentors-attention\">\n" +
    "\t      <div ng-if=\"mentors_with_attention_students.length == 1\" class=\"list-header-imua\">\n" +
    "\t        <h5>This mentor has students who <span class=\"bold\">need attention</span></h5>\n" +
    "\t      </div>\n" +
    "\t      <div ng-if=\"mentors_with_attention_students.length != 1\" class=\"list-header-imua\">\n" +
    "\t        <h5>Mentors with students who <span class=\"bold\">need attention</span></h5>\n" +
    "\t      </div>\n" +
    "\t      <div class=\"list-container progress-circle--list\">\n" +
    "\t        <progress-circle-mentorattention ng-repeat=\"mentor in mentors_with_attention_students\"></progress-circle-mentorattention>\n" +
    "\t      </div>\n" +
    "\t    </div>\n" +
    "\t  </div>\n" +
    "\n" +
    "\t\t<div class=\"organization-lower\">\n" +
    "\n" +
    "\t    <div ng-hide=\"mentors_with_attention_students.length == 0\">\n" +
    "\t      <h4 class=\"list-header-imua\">All <span class=\"bold\">Mentors</span></h4>\n" +
    "\t    </div>\n" +
    "\n" +
    "\t    <div class=\"list-container progress-circle--list\">\n" +
    "\n" +
    "\t      <progress-circle-mentor ng-repeat=\"mentor in organization.mentors | orderBy: 'last_name'\"></progress-circle-mentor>\n" +
    "\n" +
    "\t    </div>\n" +
    "\n" +
    "\t    <div class=\"add-button\" ng-click=\"addMentor()\">\n" +
    "\t      <div class=\"glyphicon glyphicon-plus-sign\"></div>\n" +
    "\t      <h6 class=\"bold\">Add a Mentor</h6>\n" +
    "\t    </div>\n" +
    "\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t</div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('profile/profile.html',
    "<ion-view view-title=\"Profile\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"profileContainer\">\n" +
    "\n" +
    "      <div class=\"profile-header student-bg\">\n" +
    "\n" +
    "        <div class=\"profile--pic\">\n" +
    "          <img ng-src=\"{{user.square_avatar_url}}\" alt=\"{{user.first_name}}'s Profile Picture\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-hide=\"editingInfo || editingPassword\">\n" +
    "\n" +
    "          <h3 class=\"bold\">{{user.first_name}} {{user.last_name}}</h3>\n" +
    "          <h5 ng-if=\"user.is_mentor\">{{user.title}}</h5>\n" +
    "\n" +
    "          <ul class=\"profile--primary-info\">  \n" +
    "            <li><span class=\"glyphicon glyphicon-envelope\"></span> <a href=\"mailto:{{user.email}}\" target=\"_blank\" alt=\"Send {{user.first_name}} an Email\">{{user.email}}</a></li>\n" +
    "            <li><span class=\"glyphicon glyphicon-phone\"></span> {{user.phone ? user.phone : \"No Phone Number Added\"}}</li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <div class=\"edit-buttons\">\n" +
    "            <a href=\"#/app/progress/{{user.id}}\" ng-if=\"!current_user.is_student && user.is_student\" alt=\"See {{user.first_name}}'s Progress\"><button class=\"submit\">See {{user.first_name}}'s Progress</button></a>\n" +
    "            <a href=\"#/app/mentor/{{user.id}}\" ng-if=\"!current_user.is_student && !current_user.is_mentor\" ng-show=\"user.is_mentor\" alt=\"See {{user.first_name}}'s Students\"><button class=\"btn submit\">{{user.first_name}}'s Students</button></a>\n" +
    "            <button class=\"btn btn-default\" ng-if=\"editable()\" ng-click=\"editUserInfo()\">Edit Profile</button>\n" +
    "            <button class=\"btn btn-default\" ng-if=\"editablePassword()\" ng-click=\"editUserPassword()\">Change Password</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"primary-editing\" ng-show=\"editingInfo\">\n" +
    "          <form name=\"profileForm\" imua-form=\"updateUserInfo($event)\" novalidate>\n" +
    "\n" +
    "            <div ng-if=\"!current_user.is_student\">\n" +
    "              <span class=\"form-wrapper half\">\n" +
    "              <label-with-errors label=\"First Name\" form=\"profileForm\" formfield=\"profileForm.firstName\"></label-with-errors>\n" +
    "              <input name=\"firstName\" class=\"form-control\" ng-model=\"user.first_name\" placeholder=\"First Name\" required>\n" +
    "              </span>\n" +
    "              <span class=\"form-wrapper half\">\n" +
    "              <label-with-errors label=\"Last Name\" form=\"profileForm\" formfield=\"profileForm.lastName\"></label-with-errors>\n" +
    "                <input name=\"lastName\" class=\"form-control\" ng-model=\"user.last_name\" placeholder=\"Last Name\" required>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"!current_user.is_student && user.is_mentor\">\n" +
    "              <span class=\"form-wrapper\">\n" +
    "                <label>Title</label>\n" +
    "                <input class=\"form-control\" ng-model=\"user.title\" placeholder=\"Title\">\n" +
    "              </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"student-exception\" ng-if=\"current_user.is_student\">\n" +
    "              <h3 class=\"bold\">{{user.first_name}} {{user.last_name}}</h3>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-wrapper\">\n" +
    "              <label>Change Profile Picture</label>\n" +
    "              <input class=\"js-upload\" type=\"file\" file-input=\"files\" />\n" +
    "            </div>\n" +
    "\n" +
    "            <span class=\"form-wrapper\">\n" +
    "              <label-with-errors label=\"Email Address\" form=\"profileForm\" formfield=\"profileForm.email\"></label-with-errors>\n" +
    "              <input name=\"email\" type=\"email\" class=\"form-control\" ng-model=\"user.email\" placeholder=\"Email\" autofocus=\"true\" required>\n" +
    "            </span>\n" +
    "            <span class=\"form-wrapper\">\n" +
    "              <label>Phone Number</label>\n" +
    "              <input class=\"form-control\" ng-model=\"user.phone\" placeholder=\"Phone Number\">\n" +
    "            </span>\n" +
    "\n" +
    "            <div class=\"edit-buttons\">\n" +
    "              <div ng-repeat=\"error in errors\" class=\"errorText errorListing\" ng-if=\"profileForm.$submitted && profileForm.$invalid\">{{error}}</div>\n" +
    "              <button type=\"submit\" class=\"ladda-button submit\" data-style=\"expand-right\" data-size=\"s\" data-color=\"blue\"><span class=\"ladda-label\">Save</span></button>\n" +
    "              <span class=\"delete\" ng-click=\"cancelUpdateUserInfo()\"><span>Cancel</span></span>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"primary-editing\" ng-show=\"editingPassword\">\n" +
    "\n" +
    "          <div class=\"student-exception\" ng-if=\"current_user.is_student\">\n" +
    "            <h3 class=\"bold\">{{user.first_name}} {{user.last_name}}</h3>\n" +
    "          </div>\n" +
    "\n" +
    "          <ul class=\"errorText ptm\" ng-show=\"errors\">\n" +
    "            <li ng-repeat=\"error in errors\">{{error}}</li>\n" +
    "          </ul>\n" +
    "\n" +
    "          <input type=\"password\" class=\"form-control\" ng-model=\"password.current\" placeholder=\"Current Password\" name=\"current\" required>\n" +
    "          <input type=\"password\" class=\"form-control\" ng-model=\"password.new\" placeholder=\"New Password\" name=\"new\" required>\n" +
    "          <input type=\"password\" class=\"form-control\" ng-model=\"password.confirm\" placeholder=\"Confirm New Password\" name=\"confirm\" required>\n" +
    "\n" +
    "          <div class=\"edit-buttons\">\n" +
    "            <button ng-click=\"updateUserPassword($event)\" class=\"submit\" data-style=\"expand-right\" data-size=\"s\" data-color=\"blue\">Save</button>\n" +
    "            <button class=\"cancel\" ng-click=\"cancelUpdatePassword()\">Cancel</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"profile-lower\">\n" +
    "\n" +
    "        <div class=\"module-container clear\">\n" +
    "\n" +
    "          <div class=\"module module--class-info\" modulecolor=\"no_category\" ng-if=\"user.is_student\">\n" +
    "            <div class=\"module--header\">Class Info</div>\n" +
    "            <div class=\"module--content\">\n" +
    "              <ul ng-if=\"current_user.is_student\">\n" +
    "                <li>\n" +
    "                  <h5>{{_.findWhere(time_units, { id: user.time_unit_id }).name}}</h5>\n" +
    "                  <h6>Student</h6>\n" +
    "                </li>\n" +
    "\n" +
    "                <li>\n" +
    "                  <h6>Class of</h6>\n" +
    "                  <h4>{{user.class_of}}</h4>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <ul ng-if=\"!current_user.is_student\" ng-hide=\"editingInfo\">\n" +
    "                <li>\n" +
    "                  <h5>{{_.findWhere(time_units, { id: user.time_unit_id }).name}}</h5>\n" +
    "                  <h6>Student</h6>\n" +
    "                </li>\n" +
    "\n" +
    "                <li>\n" +
    "                  <h6>Class of</h6>\n" +
    "                  <h4>{{user.class_of}}</h4>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <div ng-if=\"!current_user.is_student\">\n" +
    "\n" +
    "                <div class=\"edit-buttons\" ng-hide=\"editingInfo\">\n" +
    "                  <button class=\"submit\" ng-if=\"editable()\" ng-click=\"editUserInfo()\">Edit</button>\n" +
    "                  <button class=\"btn btn-default\" ng-if=\"editablePassword()\" ng-click=\"editUserPassword()\">Change Password</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-show=\"editingInfo\">\n" +
    "                  <span class=\"form-wrapper\">\n" +
    "                    <label>Imua Semester</label>\n" +
    "                    <select class=\"form-control\" ng-options=\"time_unit.id as time_unit.name for time_unit in time_units\" ng-model=\"user.time_unit_id\"></select>\n" +
    "                  </span>\n" +
    "                  <span class=\"form-wrapper\">\n" +
    "                    <class-of-dropdown ng-show=\"editingInfo\" model=\"user\"></class-of-dropdown>\n" +
    "                  </span>\n" +
    "                  <div class=\"edit-buttons\">\n" +
    "                    <button ng-click=\"updateUserInfo($event)\" class=\"ladda-button submit\" data-style=\"expand-right\" data-size=\"s\" data-color=\"blue\"><span class=\"ladda-label\">Update</span></button>\n" +
    "                    <button class=\"delete\" ng-click=\"cancelUpdateUserInfo()\"><span>Cancel</span></button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"module module--guardians\" modulecolor=\"no_category\" ng-if=\"user.is_student\">\n" +
    "            <div class=\"module--header\">Parents & Guardians</div>\n" +
    "            <div class=\"module--content\">\n" +
    "              <ul class=\"guardian-list\">\n" +
    "                <li ng-repeat=\"contact in contacts\">\n" +
    "\n" +
    "                  <div ng-hide=\"contact.editing\">\n" +
    "                    <h5><span class=\"bold\">{{contact.name}}</span> ({{contact.relationship}})</h5>\n" +
    "                    <p>{{contact.email}}</p>\n" +
    "                    <p>{{contact.phone}}</p>\n" +
    "                    <div class=\"edit-buttons\">\n" +
    "                      <button class=\"btn btn-default\" ng-click=\"editParentGuardianContact($index)\">Update</button>\n" +
    "                      <button class=\"delete\" ng-click=\"deleteParentGuardianContact($index)\">Remove</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-show=\"contact.editing\">\n" +
    "                    <div class=\"form-wrapper\">\n" +
    "                      <label>Parent or Guardian Name</label>\n" +
    "                      <input class=\"form-control\" ng-model=\"contact.new_name\" placeholder=\"Name\" autofocus=\"true\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-wrapper\">\n" +
    "                      <label>Relationship</label>\n" +
    "                      <input class=\"form-control\" ng-model=\"contact.new_relationship\" placeholder=\"Relationship\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-wrapper\">\n" +
    "                      <label>Email Address</label>\n" +
    "                      <input class=\"form-control\" ng-model=\"contact.new_email\" placeholder=\"Email\">\n" +
    "                    </div>\n" +
    "                    <div class=\"form-wrapper\">\n" +
    "                      <label>Phone Number</label>\n" +
    "                      <input class=\"form-control\" ng-show=\"contact.editing\" ng-model=\"contact.new_phone\" placeholder=\"Phone\">\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"edit-buttons\">\n" +
    "                      <button class=\"submit\" ng-click=\"saveParentGuardianContact($index)\">Save</button>\n" +
    "                      <button class=\"btn btn-default\" ng-click=\"cancelEditParentGuardianContact($index)\">Cancel</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "\n" +
    "              <div class=\"edit-buttons\">\n" +
    "                <button class=\"submit\" ng-click=\"addParentGuardianContact()\">Add Parent or Guardian</button>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"module module--your-mentors\" modulecolor=\"no_category\" ng-if=\"user.is_student\">\n" +
    "            <div class=\"module--header\">{{user.first_name}}'s <span class=\"bold\">Mentors</span></div>\n" +
    "            <div class=\"module--content\">\n" +
    "              <div class=\"circle-pictures\" ng-repeat=\"mentor in student_mentors\" wait-to-load=\"loaded_student_mentors\">\n" +
    "                <a ng-href=\"#/app/profile/{{mentor.id}}\" title=\"View mentor info\">\n" +
    "                  <div class=\"circle-picture\">\n" +
    "                    <img ng-src=\"{{mentor.square_avatar_url}}\">\n" +
    "                  </div>\n" +
    "                    <h6 class=\"bold\">{{mentor.first_name}} {{mentor.last_name}}</h6>\n" +
    "                    <h6 class=\"bold\">{{mentor.title}}</h6>\n" +
    "                </a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "        </div> <!-- /.module-container -->\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('progress/academics_progress.html',
    "<div ng-controller=\"AcademicsProgressController\" class=\"academicsProgressContainer\" modulecolor=\"{{selected_module.module_title}}\">\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/gpa.html'\"></div>\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/grades.html'\"></div>\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/milestones.html'\"></div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('progress/college_prep_progress.html',
    "<div ng-controller=\"CollegePrepProgressController\" class=\"collegePrepProgressContainer\" modulecolor=\"{{selected_module.module_title | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/milestones.html'\"></div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('progress/extracurricular_progress.html',
    "<div ng-controller=\"ExtracurricularProgressController\" class=\"extracurricularProgressContainer\" modulecolor=\"{{selected_module.module_title}}\">\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/extracurricular_activities.html'\"></div>\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/milestones.html'\"></div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('progress/progress.html',
    "<ion-view view-title=\"Progress\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"progressContainer\" modulecolor=\"bg-{{selected_module.module_title}}\">\n" +
    "\n" +
    "      <div class=\"progress-header\" ng-if=\"selected_module.module_title != null\">\n" +
    "\n" +
    "        <div ng-include=\"'progress/widgets/module_circles_nav.html'\"></div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"progressLower\">\n" +
    "\n" +
    "        <div class=\"progressLowerDefault\" ng-if=\"selected_module.module_title == null\">\n" +
    "\n" +
    "          <div class='progressLower--header'>\n" +
    "\n" +
    "            <h4 class=\"progressLower-title\">\n" +
    "              <a ng-href=\"#/app/profile/{{student.id}}\" class=\"bold\">{{student.first_last_initial}}'s</a> Progress\n" +
    "              <select ng-options=\"sem.name for sem in semesters\" ng-model=\"new_selected_semester\" ng-change=\"selectSemester(new_selected_semester)\"></select>\n" +
    "            </h4>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"progressLower--content\">\n" +
    "\n" +
    "            <div class=\"widget overall-progress\">\n" +
    "\n" +
    "              <div class=\"widget--header\">\n" +
    "                <h6 class=\"bold\"><div class=\"color--dot\"></div> Overall Progress</h6>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"widget--content\">\n" +
    "                <div class=\"widget--content--table\">\n" +
    "                  <div class=\"table--cell\">\n" +
    "                    <div class=\"cell--padding\">\n" +
    "                      <div class=\"points points-earned\">\n" +
    "                        <h3 class=\"bold\">{{points_earned}}</h3>\n" +
    "                        <h6>Points Earned</h6>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"points points-circle progressCircle-big--container\">\n" +
    "                        <div class=\"big-progress-circle\">\n" +
    "                          <a ng-href=\"#/app/profile/{{student.id}}\" alt=\"View {{student.first_name}}'s Profile\">\n" +
    "                            <div class=\"big-circle-size\">\n" +
    "                              <progress-circle parentclass=\"big-circle-size\" student=\"student_with_modules_progress\" identifier=\"big\" ng-if=\"student_with_modules_progress\"></progress-circle>\n" +
    "                            </div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"points points-available\">\n" +
    "                        <h5>{{total_points}}</h5>\n" +
    "                        <h6>Points Available</h6>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"temp-buttons\">\n" +
    "                        <a href=\"#/app/expectations/{{student.id}}\"><button class=\"btn btn-primary btn-lg\">See {{student.first_name}}'s Expectations</button></a>\n" +
    "                      </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-include=\"'progress/widgets/module_circles.html'\"></div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"selected_module.module_title != null\">\n" +
    "          <div class=\"progressLower--header\">\n" +
    "            <h4 class=\"progressLower-title\" ng-if=\"!current_user.is_student\">\n" +
    "              <span class=\"bold\">{{student.first_name}}'s</span> {{selected_module.module_title | underscoresToSpaces}}\n" +
    "              <span class=\"bold\" ng-if=\"organization.name == 'OneGoal'\">progress</span>\n" +
    "              <select ng-options=\"sem.name for sem in semesters\" ng-model=\"new_selected_semester\" ng-change=\"selectSemester(new_selected_semester)\"></select>\n" +
    "            </h4>\n" +
    "            <h4 class=\"progressLower-title\" ng-if=\"current_user.is_student\">\n" +
    "              <span class=\"bold\">Your {{selected_module.module_title | underscoresToSpaces}}</span>\n" +
    "              <span class=\"bold\" ng-if=\"organization.name == 'OneGoal'\">progress</span>\n" +
    "              <select ng-options=\"sem.name for sem in semesters\" ng-model=\"new_selected_semester\" ng-change=\"selectSemester(new_selected_semester)\"></select>\n" +
    "            </h4>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"progressLower--no-content\" ng-show=\"selected_module.points.total == 0\">\n" +
    "            <h4>Looks like there aren't any {{selected_module.module_title | underscoresToSpaces}} milestones for this semester.</h4>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"progressLower--content\">\n" +
    "            <div ng-include=\"getModuleTemplate(selected_module.module_title)\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('progress/service_progress.html',
    "<div ng-controller=\"ServiceProgressController\" class=\"serviceProgressContainer\" modulecolor=\"{{selected_module.module_title}}\">\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/service_hours.html'\"></div>\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/service_log.html'\"></div>\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/milestones.html'\"></div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('progress/testing_progress.html',
    "<div ng-controller=\"TestingProgressController\" class=\"testingProgressContainer\" modulecolor=\"{{selected_module.module_title}}\">\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/tests_taken.html'\"></div>\n" +
    "\n" +
    "  <div ng-include=\"'progress/widgets/milestones.html'\"></div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/extracurricular_activities.html',
    "<div class=\"widget extracurricular-activities\">\n" +
    "\n" +
    "  <div class=\"widget--header\">\n" +
    "\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\" ng-if=\"!current_user.is_student\"><div class=\"color--dot\"></div> {{student.first_name}}'s Activities</h6>\n" +
    "      <h6 class=\"bold\" ng-if=\"current_user.is_student\"><div class=\"color--dot\"></div> Your Activities</h6>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"widget--header--right\">\n" +
    "      <div progress-editor class=\"widget--options ng-clickable\" collapse-accordion=\"extracurricularAccordion\"\n" +
    "          ng-hide=\"editingActivities()\" ng-click=\"editorClick()\">\n" +
    "        <div ng-hide=\"ecEditor\">\n" +
    "          <div class=\"showing--text\">Add or Remove Activities</div>\n" +
    "          <div class=\"showing--icon glyphicon glyphicon-edit\"></div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"ecEditor\">\n" +
    "          <button class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-ok\"></span> Done Editing</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"widget--content\">\n" +
    "\n" +
    "    <div class=\"widget--content--table table--fixed\">\n" +
    "      <div class=\"table--cell break900\" wait-to-load=\"{{loaded_data}}\">\n" +
    "        <div progress-editor class=\"table--cell ng-clickable breakalways\" ng-click=\"editorClick()\"\n" +
    "            ng-show=\"applicableActivities().length == 0 && !ecEditor\">\n" +
    "          <div class=\"cell--padding clear\">\n" +
    "            <div class=\"class-name\">\n" +
    "              <h5 ng-if=\"current_user.is_student\">You haven't added any extracurricular activities yet.</h5>\n" +
    "              <h5 ng-if=\"!current_user.is_student\">{{student.first_name}} hasn't added any extracurricular activities yet.</h5>\n" +
    "              <h5 class=\"bold\">Click here to begin</h5>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"extracurricularAccordion\" imua-accordion class=\"widget--content--table table--fixed\">\n" +
    "\n" +
    "          <div class=\"table--cell no-border-right breakalways\"\n" +
    "                ng-repeat=\"user_extracurricular_activity in applicableActivities()\">\n" +
    "\n" +
    "            <div accordion-header class=\"widget--content--table ng-clickable\" ng-hide=\"user_extracurricular_activity.editing\">\n" +
    "\n" +
    "              <div class=\"table--cell\">\n" +
    "                <div class=\"cell--padding\">\n" +
    "\n" +
    "                  <div class=\"clear\">\n" +
    "                    <div class=\"activity-name\">\n" +
    "                      <h4 class=\"bold\">{{user_extracurricular_activity.name}}</h4>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div progress-editor class=\"delete-button\" ng-show=\"ecEditor\">\n" +
    "                    <button no-click-propagation class=\"btn btn-danger\" ng-click=\"deleteActivity(user_extracurricular_activity)\"><span class=\"glyphicon glyphicon-trash\"></span> Delete </button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div accordion-body class=\"widget--content--table widget--pane--cell\" ng-hide=\"user_extracurricular_activity.editing\">\n" +
    "              <div class=\"table--cell breakalways\">\n" +
    "                <div class=\"cell--padding\">\n" +
    "                  <div class=\"subtext\">\n" +
    "                    Last updated {{lastUpdated(user_extracurricular_activity) | fromNow}}\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"table--cell breakalways\" ng-if=\"user_extracurricular_activity.details[0].leadership != ''\">\n" +
    "                <div class=\"cell--padding\">\n" +
    "                  <h6 class=\"bold\"><span class=\"glyphicon glyphicon-star\"></span> {{user_extracurricular_activity.details[0].leadership}} <span class=\"glyphicon glyphicon-star\"></span></h6>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"table--cell breakalways\" ng-if=\"user_extracurricular_activity.details[0].description != ''\">\n" +
    "                <div class=\"cell--padding wysiwyg-output\" ng-bind-html=\"user_extracurricular_activity.details[0].description\">\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div progress-editor class=\"table--cell breakalways\">\n" +
    "                <div class=\"cell--padding\">\n" +
    "                  <button class=\"btn btn-default btn-sm\" ng-click=\"editActivity(user_extracurricular_activity); edit_ec_activity_focus_trigger=true\"><span class=\"glyphicon glyphicon-edit\"></span> Edit {{user_extracurricular_activity.name}}</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div progress-editor class=\"widget--content--table widget--pane--cell\" ng-show=\"user_extracurricular_activity.editing\">\n" +
    "\n" +
    "              <form imua-form=\"saveActivity(user_extracurricular_activity)\" name=\"editActivityForm\" novalidate>\n" +
    "                <div class=\"table--cell breakalways\">\n" +
    "                  <span class=\"input-group\">\n" +
    "                    <label-with-errors label=\"What Activity did you participate in?\" form=\"editActivityForm\" formfield=\"editActivityForm.activityName\"></label-with-errors>\n" +
    "                    <input autocomplete=\"off\" required name=\"activityName\" type=\"text\" autocomplete=\"off\" focus-me=\"edit_ec_activity_focus_trigger\" ng-model=\"user_extracurricular_activity.new_name\" typeahead=\"activityName for activityName in org_current_activity_list | filter: $viewValue | limitTo:8\" class=\"form-control\" placeholder=\"Extracurricular Activity Name\">\n" +
    "                  </span>\n" +
    "                </div>\n" +
    "                <div class=\"table--cell breakalways\">\n" +
    "                  <div class=\"cell-padding\">\n" +
    "                    <span class=\"input-group\">\n" +
    "                      <label>Leadership Role (Optional)</label>\n" +
    "                      <input class=\"form-control\" ng-model=\"user_extracurricular_activity.details[0].new_leadership\" placeholder=\"Leadership (optional)\" name=\"extracurricularEventLeadership\">\n" +
    "                    </span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"table--cell breakalways\">\n" +
    "                  <div class=\"cell-padding\">\n" +
    "                    <span class=\"input-group\">\n" +
    "                      <label>Description (Optional)</label>\n" +
    "                      <text-angular ta-toolbar=\"[]\" ng-model=\"user_extracurricular_activity.details[0].new_description\" placeholder=\"Description (optional)\" name=\"extracurricularEventDescription\"></text-angular>\n" +
    "                    </span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div progress-editor class=\"table--cell breakalways\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"editActivityForm.$submitted && editActivityForm.$invalid\">\n" +
    "                    {{error}}</div>\n" +
    "                    <div class=\"edit-buttons\">\n" +
    "                      <button class=\"submit\" type=\"submit\" title=\"Confirm\">Confirm</button>\n" +
    "                      <span class=\"cancel\" title=\"Cancel\" ng-click=\"cancelEditActivity(user_extracurricular_activity)\">Cancel</span>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div progress-editor class=\"cell--padding breakalways ng-clickable\" ng-click=\"editNewActivityEntry(); edit_new_activity_focus_trigger=true\" ng-show=\"ecEditor && !new_activity.editing\" >\n" +
    "            <div class=\"class-name\">\n" +
    "              <h6 class=\"bold\">Add an Activity</h6>\n" +
    "            </div>\n" +
    "            <div class=\"class-grade\">\n" +
    "              <h3><span class=\"glyphicon glyphicon-plus-sign\"></span></h3>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div progress-editor id=\"service--pane\" class=\"table--cell widget--pane--cell break900\" ng-show=\"ecEditor && new_activity.editing\">\n" +
    "          <div class=\"widget--pane\">\n" +
    "            <div class=\"widget--content--table table--fixed\">\n" +
    "              <form imua-form=\"saveNewActivity()\" name=\"newActivityForm\" novalidate>\n" +
    "\n" +
    "                <div class=\"table--cell breakalways\">\n" +
    "                  <span class=\"input-group\">\n" +
    "                    <label-with-errors label=\"What Activity did you participate in?\" form=\"newActivityForm\" formfield=\"newActivityForm.activityName\"></label-with-errors>\n" +
    "                    <input required autocomplete=\"off\" type=\"text\" name=\"activityName\" focus-me=\"edit_new_activity_focus_trigger\" ng-model=\"new_activity.name\" typeahead=\"activityName for activityName in org_current_activity_list | filter: $viewValue | limitTo:8\" class=\"form-control\" placeholder=\"Extracurricular Activity Name\">\n" +
    "                  </span>\n" +
    "                </div>\n" +
    "                <div class=\"table--cell breakalways\">\n" +
    "                  <div class=\"cell-padding\">\n" +
    "                    <span class=\"input-group\">\n" +
    "                      <label>Leadership Role (Optional)</label>\n" +
    "                      <input class=\"form-control\" ng-model=\"new_activity.details[0].leadership\" placeholder=\"Leadership (optional)\">\n" +
    "                    </span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"table--cell breakalways\">\n" +
    "                  <div class=\"cell-padding\">\n" +
    "                    <span class=\"input-group\">\n" +
    "                      <label>Description (Optional)</label>\n" +
    "                      <text-angular ta-toolbar=\"[]\" ng-model=\"new_activity.details[0].description\" placeholder=\"Description (optional)\"></text-angular>\n" +
    "                    </span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div progress-editor class=\"table--cell breakalways\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"newActivityForm.$submitted && newActivityForm.$invalid\">\n" +
    "                    {{error}}</div>\n" +
    "                    <div class=\"edit-buttons\">\n" +
    "                      <button type=\"submit\" class=\"submit\" title=\"Confirm\">Confirm</button>\n" +
    "                      <span class=\"cancel\" title=\"Cancel\" ng-click=\"resetNewActivityEntry()\">Cancel</span>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/gpa.html',
    "<div class=\"widget-group\">\n" +
    "  <div class=\"widget-group--table table--fixed\">\n" +
    "    <div class=\"widget-group--cell break900\">\n" +
    "      <div class=\"widget gpa\">\n" +
    "        <div class=\"widget--header\">\n" +
    "          <div class=\"widget--header--left\">\n" +
    "            <h6 class=\"bold\" ng-if=\"current_user.is_student\"><div class=\"color--dot\"></div> Your GPA</h6>\n" +
    "            <h6 class=\"bold\" ng-if=\"!current_user.is_student\"><div class=\"color--dot\"></div> {{student.first_name}}'s GPA</h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"widget--content\">\n" +
    "          <div class=\"widget--content--table\">\n" +
    "            <div class=\"table--cell\">\n" +
    "              <div class=\"cell--padding\">\n" +
    "                <h1 class=\"bold\">{{gpa}}</h1>\n" +
    "                <h5>GPA</h5>\n" +
    "                <div class=\"subtext\">As of {{last_updated_gpa | fromNow}}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- <div class=\"widget-group--cell break900\">\n" +
    "      <div class=\"widget gpa-ot\">\n" +
    "        <div class=\"widget--header\">\n" +
    "          <div class=\"widget--header--left\">\n" +
    "            <h6 class=\"bold\"><div class=\"color--dot\"></div> GPA Over Time</h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"widget--content\">\n" +
    "          <div class=\"widget--content--table\">\n" +
    "            <div class=\"table--cell\">\n" +
    "              <div class=\"cell--padding\">\n" +
    "                <history-line-chart data=\"gpa_history\"></history-line-chart>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div> -->\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/grades.html',
    "<div class=\"widget grades\">\n" +
    "\n" +
    "  <div class=\"widget--header\">\n" +
    "\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\" ng-if=\"!current_user.is_student\"><div class=\"color--dot\"></div> {{student.first_name}}'s Grades</h6>\n" +
    "      <h6 class=\"bold\" ng-if=\"current_user.is_student\"><div class=\"color--dot\"></div> Your Grades</h6>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"widget--header--right\">\n" +
    "      <div progress-editor class=\"widget--options ng-clickable\" collapse-accordion=\"classAccordion\"\n" +
    "          ng-hide=\"classes.editing\" ng-click=\"editorClick()\">\n" +
    "        <div ng-hide=\"class_editor\">\n" +
    "          <div class=\"showing--text\">Add or Remove Classes</div>\n" +
    "          <div class=\"showing--icon glyphicon glyphicon-edit\"></div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"class_editor\">\n" +
    "          <button class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-ok\"></span> Done Editing</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"widget--content\">\n" +
    "\n" +
    "    <div class=\"widget--content--table table--fixed\">\n" +
    "      <div class=\"table--cell break900\" wait-to-load=\"{{loaded_data}}\">\n" +
    "        <div progress-editor class=\"table--cell ng-clickable breakalways\" ng-click=\"editorClick()\"\n" +
    "            ng-show=\"user_classes.length == 0 && !class_editor\">\n" +
    "          <div class=\"cell--padding clear\">\n" +
    "            <div class=\"class-name\">\n" +
    "              <h5 ng-if=\"current_user.is_student\">You haven't added any classes yet.</h5>\n" +
    "              <h5 ng-if=\"!current_user.is_student\">{{student.first_name}} hasn't added any classes yet.</h5>\n" +
    "              <h5 class=\"bold\">Click here to begin</h5>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"classAccordion\" imua-accordion class=\"widget--content--table table--fixed\">\n" +
    "\n" +
    "          <div class=\"table--cell no-border-right breakalways\" ng-repeat=\"user_class in user_classes\">\n" +
    "\n" +
    "            <div accordion-header ng-dblclick=\"editClass(user_class)\" class=\"widget--content--table ng-clickable\" ng-hide=\"user_class.editing\">\n" +
    "\n" +
    "              <div class=\"table--cell\">\n" +
    "                <div class=\"clear\">\n" +
    "                  <div class=\"class-name\">\n" +
    "                    <h4 class=\"bold\">{{user_class.name}}</h4>\n" +
    "                  </div>\n" +
    "                  <div class=\"subtext pbs\">\n" +
    "                    Last updated {{user_class.updated_at | fromNow}}\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div progress-editor class=\"delete-button pbm\" ng-show=\"class_editor\">\n" +
    "                  <button class=\"btn btn-danger\" ng-click=\"deleteClass(user_class, $event)\"><span class=\"glyphicon glyphicon-trash\"></span> Delete </button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div id=\"cell--grades\" class=\"table--cell\">\n" +
    "                <h4 class=\"bold\">{{user_class.grade_value}}</h4>\n" +
    "              </div>\n" +
    "\n" +
    "              <div id=\"cell--grades\" class=\"table--cell\">\n" +
    "                <h4 class=\"bold\">{{user_class.grade}}</h4>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"table--cell advanced plm\">\n" +
    "                  <span no-click-propagation class=\"mrm glyphicon glyphicon-pencil\" title=\"Edit Class\" ng-click=\"editClass(user_class)\"></span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div accordion-body class=\"widget--content--table widget--pane--cell\" ng-hide=\"user_class.editing\">\n" +
    "              <div class=\"widget--content--table breakalways\">\n" +
    "                <div class=\"table--cell advanced\" ng-if=\"user_class.period != null\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <p>Period</p>\n" +
    "                    <h5 class=\"bold\">{{user_class.period}}</h5>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"table--cell advanced\" ng-if=\"user_class.room != null\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <p>Room</p>\n" +
    "                    <h5 class=\"bold\">{{user_class.room}}</h5>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"table--cell advanced\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <p>Credit Hours</p>\n" +
    "                    <h5 class=\"bold\">{{user_class.credit_hours}}</h5>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"table--cell advanced\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <p>Level</p>\n" +
    "                    <h5 class=\"bold\">{{user_class.level}}</h5>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"table--cell advanced\" ng-if=\"user_class.subject != null\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <p>Subject</p>\n" +
    "                    <h5 class=\"bold\">{{user_class.subject}}</h5>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div progress-editor class=\"table--cell breakalways\">\n" +
    "                <div class=\"cell--padding\">\n" +
    "                  <button class=\"btn btn-default btn-sm\" ng-click=\"editClassAdvanced(user_class)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit {{user_class.name}}</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div progress-editor class=\"widget--content--table table-fixed widget--pane--cell\" ng-show=\"user_class.editing\">\n" +
    "              <form name=\"gradesForm\" imua-form=\"saveClass(user_class)\" novalidate>\n" +
    "\n" +
    "                <div class=\"widget--content--table breakalways\">\n" +
    "                  <div class=\"table--cell break600\" ng-class=\"{'has-error': gradesForm.classname.$invalid && gradesForm.$submitted}\">\n" +
    "                    <span class=\"input-group\">\n" +
    "                      <label-with-errors label=\"Class\" form=\"gradesForm\" formfield=\"gradesForm.classname\"></label-with-errors>\n" +
    "                      <input autocomplete=\"off\" type=\"text\" class=\"form-control\" ng-model=\"user_class.new_name\" placeholder=\"Class Name\" name=\"classname\" typeahead=\"className for className in org_class_titles | filter: $viewValue | limitTo:10\" required>\n" +
    "                    </span>\n" +
    "                  </div>\n" +
    "                  <div class=\"table--cell cell--grades\"  ng-class=\"{'has-error': gradesForm.grade.$invalid && gradesForm.$submitted}\">\n" +
    "                   <span class=\"input-group\">\n" +
    "                       <label-with-errors label=\"Letter Grade\" form=\"gradesForm\" formfield=\"gradesForm.grade\"></label-with-errors>\n" +
    "                       <select class=\"form-control\" ng-model=\"user_class.new_grade\" name=\"grade\" required>\n" +
    "                        <option value=\"A\">A</option>\n" +
    "                        <option value=\"A-\">A-</option>\n" +
    "                        <option value=\"B+\">B+</option>\n" +
    "                        <option value=\"B\">B</option>\n" +
    "                        <option value=\"B-\">B-</option>\n" +
    "                        <option value=\"C+\">C+</option>\n" +
    "                        <option value=\"C\">C</option>\n" +
    "                        <option value=\"C-\">C-</option>\n" +
    "                        <option value=\"D+\">D+</option>\n" +
    "                        <option value=\"D\">D</option>\n" +
    "                        <option value=\"D-\">D-</option>\n" +
    "                        <option value=\"F\">F</option>\n" +
    "                      </select>\n" +
    "                   </span>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"table--cell cell--grades\"  ng-class=\"{'has-error': gradesForm.gradeValue.$invalid && gradesForm.$submitted}\">\n" +
    "                    <span class=\"input-group\">\n" +
    "                        <label-with-errors label=\"Grade (Value)\" form=\"gradesForm\" formfield=\"gradesForm.gradeValue\"></label-with-errors>\n" +
    "                        <input type=\"number\" min=\"0\" max=\"100\" class=\"form-control\" placeholder=\"Grade Value - e.g. 94\" ng-model=\"user_class.new_grade_value\" name=\"gradeValue\" required>\n" +
    "                    </span>\n" +
    "                  </div>\n" +
    "                  <div ng-hide=\"user_class.seeAdvanced\" ng-click=\"toggleAdvanced(user_class)\" class=\"table--cell advanced\">\n" +
    "                    <div class=\"input-group advanced--toggle\">\n" +
    "                      <span class=\"btn btn-sm btn-default\">See Advanced</span>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div ng-show=\"user_class.seeAdvanced\" ng-click=\"toggleAdvanced(user_class)\" class=\"table--cell advanced\">\n" +
    "                    <div class=\"input-group advanced--toggle\">\n" +
    "                      <span class=\"btn btn-sm btn-default\">Hide Advanced</span>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-show=\"user_class.seeAdvanced\" class=\"widget--content--table breakalways\">\n" +
    "                  <div class=\"table--cell advanced break900\">\n" +
    "                      <span class=\"input-group\">\n" +
    "                          <label>Subject</label>\n" +
    "                          <select class=\"form-control\" ng-model=\"user_class.new_subject\" ng-options=\"v as v for (k,v) in CONSTANTS.CLASS_SUBJECTS\">\n" +
    "                              <option value=\"\">--Select Subject--</option>\n" +
    "                          </select>\n" +
    "                      </span>\n" +
    "                  </div>\n" +
    "                  <div class=\"table--cell advanced\">\n" +
    "                    <span class=\"input-group\">\n" +
    "                      <label>Credit Hours</label>\n" +
    "                      <input class=\"form-control\" ng-model=\"user_class.new_credit_hours\" ng-init=\"user_class.new_credit_hours = 1\" placeholder=\"Credit Hours\" name=\"credithours\">\n" +
    "                    </span>\n" +
    "                  </div>\n" +
    "                  <div class=\"table--cell advanced\">\n" +
    "                      <span class=\"input-group\">\n" +
    "                          <label>Level</label>\n" +
    "                          <select class=\"form-control\" ng-model=\"user_class.new_level\" ng-init=\"user_class.new_level = 'Regular'\" ng-options=\"v as v for (k,v) in CONSTANTS.CLASS_LEVELS\"></select>\n" +
    "                      </span>\n" +
    "                  </div>\n" +
    "                  <div class=\"table--cell advanced\">\n" +
    "                      <span class=\"input-group\">\n" +
    "                          <label>Period</label>\n" +
    "                          <input class=\"form-control\" ng-model=\"user_class.new_period\" placeholder=\"Period (optional)\" name=\"period\">\n" +
    "                      </span>\n" +
    "                  </div>\n" +
    "                  <div class=\"table--cell advanced\">\n" +
    "                      <span class=\"input-group\">\n" +
    "                          <label>Room</label>\n" +
    "                          <input class=\"form-control\" ng-model=\"user_class.new_room\" placeholder=\"Room (optional)\" name=\"room\">\n" +
    "                      </span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div progress-editor class=\"table--cell breakalways\">\n" +
    "                  <div class=\"cell--padding\">\n" +
    "                    <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"gradesForm.$submitted && gradesForm.$invalid\">\n" +
    "                    {{error}}</div>\n" +
    "                    <div class=\"edit-buttons\">\n" +
    "                      <button type=\"submit\" class=\"submit\" title=\"Confirm\">Confirm</button>\n" +
    "                      <a class=\"cancel\" title=\"Cancel\" ng-click=\"cancelEdit(user_class)\">Cancel</a>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "              </form>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div progress-editor class=\"cell--padding breakalways ng-clickable\" ng-click=\"addClass()\" ng-show=\"class_editor\" >\n" +
    "            <div class=\"class-name\">\n" +
    "              <h6 class=\"bold\">Add a Class</h6>\n" +
    "            </div>\n" +
    "            <div class=\"class-grade\">\n" +
    "              <h3><span class=\"glyphicon glyphicon-plus-sign\"></span></h3>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/milestones.html',
    "<div class=\"widget-group\">\n" +
    "  <div class=\"widget-group--table table--fixed\">\n" +
    "    <div class=\"widget-group--cell break1200\" ng-if=\"!milestone.earned.length != 0\">\n" +
    "      <div class=\"widget milestones\">\n" +
    "        <div class=\"widget--header\">\n" +
    "          <h6 class=\"bold\"><div class=\"color--dot\"></div> Next Milestones</h6>\n" +
    "        </div>\n" +
    "        <div class=\"widget--content\">\n" +
    "          <div class=\"widget--content--table\">\n" +
    "            <div class=\"table--cell\">\n" +
    "              <div class=\"milestone-item\" ng-repeat=\"milestone in milestones\" ng-if=\"!milestone.earned\">\n" +
    "                <div class=\"milestone-item-unstatisfied\">\n" +
    "\n" +
    "                  <a ng-if=\"!current_user.is_student\" title=\"Milestone View\" ng-href=\"#/app/milestone/{{milestone.id}}\">\n" +
    "                    <div class=\"milestone--point-circle\">\n" +
    "                      <div class=\"point-circle--inside\">\n" +
    "                        <h5 class=\"bold\">{{milestone.points}}</h5>\n" +
    "                        <p>Points</p>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </a>\n" +
    "\n" +
    "                  <div ng-if=\"current_user.is_student\" class=\"milestone--point-circle\">\n" +
    "                    <div class=\"point-circle--inside\">\n" +
    "                      <h5 class=\"bold\">{{milestone.points}}</h5>\n" +
    "                      <p>Points</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <input type=\"checkbox\" ng-if=\"milestone.submodule === 'YesNo'\"\n" +
    "                    ng-model=\"milestone.earned\" ng-change=\"toggleYesNoMilestone(milestone)\"\n" +
    "                    ng-disabled=\"!editable(current_user, selected_semester)\">\n" +
    "                  <h6>{{milestone | printMilestone}}</h6>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"widget-group--cell break1200\" ng-if=\"milestone.earned.length != 0\">\n" +
    "      <div class=\"widget milestones\">\n" +
    "        <div class=\"widget--header\">\n" +
    "          <h6 class=\"bold\"><div class=\"color--dot\"></div> Completed Milestones</h6>\n" +
    "        </div>\n" +
    "        <div class=\"widget--content\">\n" +
    "          <div class=\"widget--content--table\">\n" +
    "            <div class=\"table--cell\">\n" +
    "              <div class=\"milestone-item\" ng-repeat=\"milestone in milestones\" ng-if=\"milestone.earned\">\n" +
    "                <div class=\"milestone-item-statisfied\">\n" +
    "\n" +
    "                  <a ng-if=\"!current_user.is_student\" title=\"Milestone View\" ng-href=\"#/app/milestone/{{milestone.id}}\">\n" +
    "                    <div class=\"milestone--point-circle\">\n" +
    "                      <div class=\"point-circle--inside\">\n" +
    "                        <h4 class=\"bold\">✓</h4>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </a>\n" +
    "\n" +
    "                  <div ng-if=\"current_user.is_student\" class=\"milestone--point-circle\">\n" +
    "                    <div class=\"point-circle--inside\">\n" +
    "                      <h4 class=\"bold\">✓</h4>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <input type=\"checkbox\" ng-if=\"milestone.submodule === 'YesNo'\"\n" +
    "                    ng-model=\"milestone.earned\" ng-change=\"toggleYesNoMilestone(milestone)\"\n" +
    "                    ng-disabled=\"!editable(current_user, selected_semester)\">\n" +
    "                  <h6>{{milestone | printMilestone}}</h6>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/module_circles.html',
    "<div class=\"widget module-circle-breakdown\">\n" +
    "\n" +
    "  <div class=\"widget--header\">\n" +
    "    <h6 class=\"bold\"><div class=\"color--dot\"></div> Categories</h6>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table table--fixed\">\n" +
    "      <div class=\"table--cell break900 ng-clickable\" ng-repeat=\"mod in modules_progress\" ng-class=\"{inactive: mod.points.total == 0, selectedCircle: mod == selected_module, notSelectedCircle: mod !== selected_module}\" ng-click=\"selectModule(mod)\">\n" +
    "\n" +
    "        <div class=\" module-circle cell--padding\">\n" +
    "          <h6 class=\"module-circle__title bold\">{{mod.module_title | underscoresToSpaces}}</h6>\n" +
    "          <div class=\"circle-size\">\n" +
    "            <module-progress-circle module=\"mod\" parentclass=\"circle-size\"></module-progress-circle>\n" +
    "          </div>\n" +
    "          <div class=\"module-circle--meta\">\n" +
    "            <div class=\"click-to-view\">Click to view {{mod.module_title | underscoresToSpaces}}</div>\n" +
    "            <div class=\"updated-on subtext\" ng-if=\"mod.last_updated != null\">Last updated {{mod.last_updated | fromNow}}</div>\n" +
    "            <div class=\"updated-on subtext\" ng-if=\"mod.last_updated == null && current_user.organization_name != 'OneGoal'\">Never Updated</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"module-bar cell--padding clear\">\n" +
    "          <div class=\"module-bar--full\">\n" +
    "            <h6 class=\"bold\">{{mod.module_title | underscoresToSpaces}}</h6>\n" +
    "            <div class=\"bar-size\">\n" +
    "              <horizontal-module-progress-bar module=\"mod\" parentclass=\"bar-size\"></horizontal-module-progress-bar>\n" +
    "            </div>\n" +
    "            <div class=\"bar-points\">\n" +
    "              <h7>{{mod.points.user}}/{{mod.points.total}} points</h7>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/module_circles_nav.html',
    "<div class=\"widget module-circle-breakdown\">\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table table--fixed\">\n" +
    "\n" +
    "      <div class=\"table--cell break900 ng-clickable\" ng-click=\"selectModule('null')\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <div class=\"progress-circle-nav\">\n" +
    "            <h6 class=\"module-circle__title bold\">All Progress</h6>\n" +
    "            <progress-circle width=\"150\" student=\"student_with_modules_progress\" identifier=\"big\" ng-if=\"student_with_modules_progress\"></progress-circle>\n" +
    "            <a href=\"#/app/expectations/{{student.id}}\"><button class=\"btn btn-primary btn-sm\">See {{student.first_name}}'s Expectations</button></a>\n" +
    "          </div>\n" +
    "          <div class=\"progress-bar-nav clear\">\n" +
    "\n" +
    "            <div class=\"progress-bar--full\">\n" +
    "              <h6 class=\"bold\">{{student.first_name}}'s Total Progress</h6>\n" +
    "              <div class=\"progress-bar-size\">\n" +
    "                <horizontal-progress-bar student=\"student_with_modules_progress\" identifier=\"big\" parentclass=\"progress-bar-size\"></progress-circle>\n" +
    "              </div>\n" +
    "              <div class=\"bar-expectation\">\n" +
    "               <a class=\"pts\" href=\"#/app/expectations/{{student.id}}\"><button class=\"btn btn-primary btn-sm\">See {{student.first_name}}'s Expectations</button></a>\n" +
    "             </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"table--cell break900 ng-clickable\" ng-repeat=\"mod in modules_progress\" ng-class=\"{inactive: mod.points.total == 0, selectedCircle: mod == selected_module, notSelectedCircle: mod !== selected_module}\" ng-click=\"selectModule(mod)\">\n" +
    "        <div class=\"module-circle cell--padding\">\n" +
    "          <h6 class=\"module-circle__title bold\">{{mod.module_title | underscoresToSpaces}}</h6>\n" +
    "          <div class=\"circle-size\">\n" +
    "            <module-progress-circle module=\"mod\" parentclass=\"circle-size\"></module-progress-circle>\n" +
    "          </div>\n" +
    "          <div class=\"module-circle--meta\">\n" +
    "            <div class=\"click-to-view\">Click to view {{mod.module_title | underscoresToSpaces}}</div>\n" +
    "            <div class=\"updated-on subtext\" ng-if=\"mod.last_updated != null\">Last updated {{mod.last_updated | fromNow}}</div>\n" +
    "            <div class=\"updated-on subtext\" ng-if=\"mod.last_updated == null && current_user.organization_name != 'OneGoal'\">Never Updated</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"module-bar cell--padding clear\">\n" +
    "          <div class=\"module-bar--full\">\n" +
    "            <h6 class=\"bold\">{{mod.module_title | underscoresToSpaces}}</h6>\n" +
    "            <div class=\"bar-size\">\n" +
    "              <horizontal-module-progress-bar module=\"mod\" parentclass=\"bar-size\"></horizontal-module-progress-bar>\n" +
    "            </div>\n" +
    "            <div class=\"bar-points\">\n" +
    "              <h7>{{mod.points.user}}/{{mod.points.total}} points</h7>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/service_hours.html',
    "<div class=\"widget-group\">\n" +
    "  <div class=\"widget-group--table table--fixed\">\n" +
    "    <div class=\"widget-group--cell break900\">\n" +
    "      <div class=\"widget service--hours\">\n" +
    "        <div class=\"widget--header\">\n" +
    "          <div class=\"widget--header--left\">\n" +
    "            <h6 class=\"bold\" ng-if=\"current_user.is_student\"><div class=\"color--dot\"></div> Your Service Hours</h6>\n" +
    "            <h6 class=\"bold\" ng-if=\"!current_user.is_student\"><div class=\"color--dot\"></div> {{student.first_name}}'s Service Hours</h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"widget--content\" wait-to-load=\"{{loaded_data}}\">\n" +
    "          <div class=\"widget--content--table\">\n" +
    "            <div class=\"table--cell\">\n" +
    "              <div class=\"cell--padding\">\n" +
    "                <h1 class=\"bold\">{{semester_service_hours}}</h1>\n" +
    "                <h5 ng-if=\"semester_service_hours != 1\">Total Service Hours</h5>\n" +
    "                <h5 ng-if=\"semester_service_hours == 1\">Service Hour</h5>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <!-- <div class=\"widget-group--cell break900\">\n" +
    "      <div class=\"widget service--hours--ot\">\n" +
    "        <div class=\"widget--header\">\n" +
    "          <div class=\"widget--header--left\">\n" +
    "            <h6 class=\"bold\"><div class=\"color--dot\"></div> Service Hours Over Time</h6>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"widget--content\">\n" +
    "          <div class=\"widget--content--table\">\n" +
    "            <div class=\"table--cell\">\n" +
    "              <div class=\"cell--padding\">\n" +
    "                <p>Placeholder for Service Hours Chart</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div> -->\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/service_log.html',
    "<div class=\"widget service-log\">\n" +
    "\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header-container clear\">\n" +
    "      <div class=\"widget--header--title widget--header--noleft\">\n" +
    "        <h6 class=\"bold\" ng-if=\"!current_user.is_student\"><div class=\"color--dot\"></div> {{student.first_name}}'s Service Log</h6>\n" +
    "        <h6 class=\"bold\" ng-if=\"current_user.is_student\"><div class=\"color--dot\"></div> Your Service Log</h6>\n" +
    "      </div>\n" +
    "      <div class=\"widget--header--right\">\n" +
    "        <div progress-editor class=\"widget--options ng-clickable\" collapse-accordion=\"serviceAccordion\"\n" +
    "            ng-hide=\"editingServices()\" ng-click=\"editorClick()\">\n" +
    "          <div ng-hide=\"serviceEditor\">\n" +
    "            <div class=\"showing--text\">Add or Remove Organizations</div>\n" +
    "            <div class=\"showing--icon glyphicon glyphicon-edit\"></div>\n" +
    "          </div>\n" +
    "          <div ng-show=\"serviceEditor\">\n" +
    "            <button ng-show=\"serviceEditor\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-ok\"></span> Done Editing</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"widget--content\">\n" +
    "\n" +
    "    <div class=\"widget--content--table table--fixed\">\n" +
    "\n" +
    "      <div class=\"table--cell break900\" wait-to-load=\"{{loaded_data}}\">\n" +
    "        <div progress-editor class=\"table--cell ng-clickable breakalways\" ng-click=\"editorClick()\"\n" +
    "            ng-show=\"applicableServiceOrganizations().length == 0 && !serviceEditor\">\n" +
    "          <div class=\"cell--padding clear\">\n" +
    "            <div class=\"class-name\">\n" +
    "              <h5 ng-if=\"current_user.is_student\">You haven't added any service hours yet.</h5>\n" +
    "              <h5 ng-if=\"!current_user.is_student\">{{student.first_name}} hasn't added any service hours yet.</h5>\n" +
    "              <h5 class=\"bold\">Click here to begin</h5>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"serviceAccordion\" imua-accordion class=\"widget--content--table table--fixed\">\n" +
    "\n" +
    "          <div class=\"table--cell no-border-right breakalways\"\n" +
    "                ng-repeat=\"user_service_organization in applicableServiceOrganizations()\">\n" +
    "\n" +
    "            <!-- Org Name -->\n" +
    "            <div accordion-header class=\"widget--content--table ng-clickable\">\n" +
    "              <div class=\"table--cell\">\n" +
    "                <div class=\"service-org-header\" ng-hide=\"user_service_organization.editing\">\n" +
    "                  <h4 class=\"bold\">{{user_service_organization.name}}</h4>\n" +
    "                  <div progress-editor class=\"edit-buttons\" ng-show=\"serviceEditor\">\n" +
    "                    <button no-click-propagation class=\"btn btn-default\" ng-click=\"editOrganization(user_service_organization)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button>\n" +
    "                    <button no-click-propagation class=\"btn btn-danger\" ng-click=\"deleteOrganization(user_service_organization)\"><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div progress-editor class=\"service-org-header--editing cell--padding\" ng-show=\"user_service_organization.editing\">\n" +
    "                  <form imua-form=\"saveOrganization(user_service_organization)\" name=\"editOrganizationForm\" novalidate>\n" +
    "                    <span class=\"input-group\">\n" +
    "                      <h4>Who was the service for?</h4>\n" +
    "                      <label-with-errors label=\"Organization Name\" form=\"editOrganizationForm\" formfield=\"editOrganizationForm.orgName\"></label-with-errors>\n" +
    "                      <input autocomplete=\"off\" type=\"text\" required name=\"orgName\" no-click-propagation focus-me=\"edit_new_service_organization_focus_trigger\" ng-model=\"user_service_organization.new_name\" typeahead=\"orgName for orgName in org_current_organization_list | filter: $viewValue | limitTo:8\" class=\"form-control\" placeholder=\"Organization Name\">\n" +
    "                    </span>\n" +
    "                    <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"editOrganizationForm.$submitted && editOrganizationForm.$invalid\">\n" +
    "                    {{error}}</div>\n" +
    "                    <button type=\"submit\" class=\"btn btn-primary\" no-click-propagation title=\"Confirm\">Save</button>\n" +
    "                    <span class=\"btn btn-default\" no-click-propagation title=\"Cancel\" ng-click=\"cancelEditOrganization(user_service_organization)\">Cancel</span>\n" +
    "                  </form>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"table--cell cell--hours\">\n" +
    "                <h5 class=\"bold\">{{getServiceOrganizationTotalHours(user_service_organization)}}</h5>\n" +
    "                <p>Total Hours</p>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Org hour details -->\n" +
    "            <div accordion-body>\n" +
    "              <div class=\"widget--content--table widget--pane--cell\"\n" +
    "                    ng-repeat=\"service_org_hour in user_service_organization.hours\">\n" +
    "                <div class=\"table--cell clear breakalways\">\n" +
    "                  <div ng-hide=\"service_org_hour.editing\">\n" +
    "                    <div class=\"cell--padding log--details\">\n" +
    "                      <h6 class=\"wysiwyg-output\" ng-bind-html=\"service_org_hour.description\"></h6>\n" +
    "                      <p>Completed on {{service_org_hour.date | formatMDY}}</p>\n" +
    "                      <div progress-editor class=\"small-edit-button\">\n" +
    "                        <button class=\"btn btn-default btn-xs\" ng-click=\"editHour(service_org_hour)\"><span class=\"glyphicon glyphicon-edit\"></span> Edit</button>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"log--hours\">\n" +
    "                      <h5>{{service_org_hour.hours | parseFloat}}</h5>\n" +
    "                      <p ng-show=\"service_org_hour.hours != 1\">Hours</p>\n" +
    "                      <p ng-show=\"service_org_hour.hours == 1\">Hour</p>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <!-- Editing -->\n" +
    "                  <div progress-editor class=\"cell--padding\" ng-show=\"service_org_hour.editing\">\n" +
    "                    <form imua-form=\"saveHour(service_org_hour)\" name=\"editHourForm\" novalidate>\n" +
    "                      <span class=\"input-group\">\n" +
    "                        <label ng-show=\"current_user.is_student\">What type of service did you do?</label>\n" +
    "                        <label ng-show=\"!current_user.is_student\">What type of service did {{student.first_name}} do?</label>\n" +
    "                        <text-angular ta-toolbar=\"[]\" ng-model=\"service_org_hour.new_description\" placeholder=\"Description\"></text-angular>\n" +
    "                      </span>\n" +
    "                      <form-datepicker class=\"full-width\" form=\"editHourForm\" label=\"When did you do it?\" date=\"service_org_hour.new_date\"></form-datepicker>\n" +
    "                      <span class=\"input-group\">\n" +
    "                        <label-with-errors label=\"How many hours?\" form=\"editHourForm\" formfield=\"editHourForm.serviceEventHours\"></label-with-errors>\n" +
    "                        <input required class=\"form-control\" ng-model=\"service_org_hour.new_hours\" placeholder=\"Hours\" name=\"serviceEventHours\">\n" +
    "                      </span>\n" +
    "                      <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"editHourForm.$submitted && editHourForm.$invalid\">\n" +
    "                      {{error}}</div>\n" +
    "                      <button progress-editor type=\"submit\" class=\"btn btn-primary\" title=\"Confirm\">Save</button>\n" +
    "                      <span progress-editor class=\"btn btn-default\" title=\"Cancel\" ng-click=\"cancelEditHour(user_service_organization, service_org_hour)\">Cancel</span>\n" +
    "                      <span progress-editor class=\"btn btn-danger btn-sm\" ng-hide=\"service_org_hour.id == null\" ng-click=\"deleteHour(user_service_organization, service_org_hour)\">Delete</span>\n" +
    "                    </form>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <div progress-editor class=\"widget--pane--cell table--cell cell--service--hours breakalways ng-clickable\" ng-click=\"addHour(user_service_organization)\" ng-hide=\"editingServiceOrganization(user_service_organization)\">\n" +
    "                <div class=\"cell--padding\">\n" +
    "                  <h6 class=\"bold\"><span class=\"glyphicon glyphicon-plus-sign\"></span> Add more hours for {{user_service_organization.name}}</h6>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div progress-editor class=\"table--cell no-border-right breakalways ng-clickable\" ng-show=\"serviceEditor && !new_service_organization.editing\" ng-click=\"editNewServiceEntry(); edit_new_service_organization_focus_trigger=true\">\n" +
    "            <div class=\"cell--padding\">\n" +
    "              <h3><span class=\"glyphicon glyphicon-plus-sign\"></span></h3>\n" +
    "              <h6 class=\"bold\">Add a Service Organization</h6>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div progress-editor class=\"table--cell breakalways\" ng-show=\"new_service_organization.editing\">\n" +
    "            <div class=\"widget--pane\">\n" +
    "              <div class=\"widget--content--table table--fixed\">\n" +
    "                <form imua-form=\"saveNewServiceEntry()\" name=\"serviceForm\" novalidate>\n" +
    "\n" +
    "                  <div class=\"table--cell breakalways\">\n" +
    "                    <div class=\"cell--padding\">\n" +
    "                      <span class=\"input-group\">\n" +
    "                        <h4>Who was the service for?</h4>\n" +
    "                        <label-with-errors label=\"Organization Name\" form=\"serviceForm\" formfield=\"serviceForm.orgName\"></label-with-errors>\n" +
    "                        <input required name=\"orgName\" type=\"text\" focus-me=\"edit_new_service_organization_focus_trigger\" ng-model=\"new_service_organization.name\" typeahead=\"orgName for orgName in org_current_organization_list | filter: $viewValue | limitTo:8\" class=\"form-control\" placeholder=\"Organization Name\">\n" +
    "                      </span>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"table--cell breakalways\">\n" +
    "                    <div class=\"cell--padding\">\n" +
    "                      <span class=\"input-group\">\n" +
    "                        <h4>Let's add your first hours:</h4>\n" +
    "                      </span>\n" +
    "                      <div ng-repeat=\"user_service_hour in new_service_organization.hours\">\n" +
    "                        <span class=\"input-group pbs\">\n" +
    "                          <label ng-if=\"current_user.is_student\">What type of service did you do?</label>\n" +
    "                          <label ng-if=\"!current_user.is_student\">What type of service did {{student.first_name}} do?</label>\n" +
    "                          <text-angular ta-toolbar=\"[]\" ng-model=\"user_service_hour.description\" placeholder=\"Description\"></text-angular>\n" +
    "                        </span>\n" +
    "                        <form-datepicker form=\"serviceForm\" label=\"When did you do it?\" date=\"user_service_hour.date\"></form-datepicker>\n" +
    "                        <span class=\"input-group\">\n" +
    "                          <label-with-errors label=\"How many hours?\" form=\"serviceForm\" formfield=\"serviceForm.serviceEventHours\"></label-with-errors>\n" +
    "                          <input required class=\"form-control\" ng-model=\"user_service_hour.hours\" placeholder=\"Hours\" name=\"serviceEventHours\">\n" +
    "                        </span>\n" +
    "                        <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"serviceForm.$submitted && serviceForm.$invalid\">\n" +
    "                        {{error}}</div>\n" +
    "                        <button progress-editor type=\"submit\" class=\"btn btn-primary\" title=\"Confirm\">Add Organization</button>\n" +
    "                        <span progress-editor class=\"btn btn-default\" title=\"Cancel\" ng-click=\"resetNewServiceEntry()\">Cancel</span>\n" +
    "                      </div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </form>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('progress/widgets/tests_taken.html',
    "<div class=\"widget tests-taken\">\n" +
    "\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header-container clear\">\n" +
    "      <div class=\"widget--header--title widget--header--noleft\">\n" +
    "        <h6 class=\"bold\" ng-if=\"!current_user.is_student\"><div class=\"color--dot\"></div> {{student.first_name}}'s Tests</h6>\n" +
    "        <h6 class=\"bold\" ng-if=\"current_user.is_student\"><div class=\"color--dot\"></div> Your Tests</h6>\n" +
    "      </div>\n" +
    "      <div progress-editor class=\"widget--header--right\" ng-hide=\"userTests.editing\">\n" +
    "        <div class=\"widget--options ng-clickable\" ng-hide=\"testsEditor\" ng-click=\"editorClick()\">\n" +
    "          <div class=\"showing--text\">Add or Remove Tests</div>\n" +
    "          <div class=\"showing--icon glyphicon glyphicon-edit\"></div>\n" +
    "        </div>\n" +
    "        <button ng-show=\"testsEditor\" class=\"btn btn-primary\" ng-click=\"editorClick()\"><span class=\"glyphicon glyphicon-ok\"></span> Done</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table table--fixed\">\n" +
    "\n" +
    "      <div class=\"table--cell break900\" wait-to-load=\"{{loaded_data}}\">\n" +
    "\n" +
    "        <div progress-editor class=\"table--cell breakalways cell--padding clear  ng-clickable\" ng-click=\"editorClick()\" ng-show=\"userTests.length == 0 && !testsEditor\">\n" +
    "          <div class=\"class-name\">\n" +
    "            <h5 ng-if=\"current_user.is_student\">You haven't added any tests yet.</h5>\n" +
    "            <h5 ng-if=\"!current_user.is_student\">{{student.first_name}} hasn't added any tests yet.</h5>\n" +
    "            <h5 class=\"bold\">Click here to begin</h5>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"widget--content--table table--fixed\">\n" +
    "\n" +
    "          <div class=\"table--cell no-border-right breakalways\" ng-repeat=\"userTest in userTests\">\n" +
    "            <div class=\"widget--content--table\">\n" +
    "              <div class=\"table--cell test-taken-header\" ng-hide=\"userTest.editing\">\n" +
    "                <h4 class=\"bold\">{{userTest.orgTest.title}}</h4>\n" +
    "                <div progress-editor class=\"edit-buttons\" ng-show=\"testsEditor\">\n" +
    "                  <button class=\"btn btn-default btn-sm\" ng-click=\"editUserTest(userTest)\">Edit this Test</button>\n" +
    "                  <button class=\"btn btn-danger btn-sm\" ng-click=\"deleteUserTest(userTest)\">Delete This Test</button>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"table--cell cell--test--score cell--padding\"  ng-hide=\"userTest.editing\">\n" +
    "                <p>Score</p>\n" +
    "                <h5 class=\"bold\">{{userTest.score}}</h5>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div progress-editor class=\"widget--content--cell\" ng-show=\"userTest.editing\">\n" +
    "              <form imua-form=\"saveUserTest(userTest)\" name=\"newTestForm\" novalidate>\n" +
    "                <div class=\"cell--padding\">\n" +
    "                  <span class=\"input-group\">\n" +
    "                    <label-with-errors label=\"Test Taken: \" form=\"newTestForm\" formfield=\"newTestForm.testName\"></label-with-errors>\n" +
    "                    <select required name=\"testName\" class=\"form-control\" ng-options=\"orgTest as orgTest.title for orgTest in orgTests\" ng-model=\"userTest.new_orgTest\">\n" +
    "                      <option value=\"\">--- Select Test ---</option>\n" +
    "                    </select>\n" +
    "                  </span>\n" +
    "\n" +
    "                  <form-datepicker class=\"full-width\" form=\"newTestForm\" label=\"Date Taken:\" date=\"userTest.new_date\"></form-datepicker>\n" +
    "\n" +
    "                  <span ng-show=\"userTest.new_orgTest.score_type != 'Letter Grade' && userTest.new_orgTest != null\" class=\"input-group\">\n" +
    "                    <label>Score:</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"userTest.new_score\" placeholder=\"Score\"></input>\n" +
    "                  </span>\n" +
    "\n" +
    "                  <span ng-show=\"userTest.new_orgTest.score_type == 'Letter Grade' && userTest.new_orgTest != null\" class=\"input-group\">\n" +
    "                    <label>Grade:</label>\n" +
    "                    <select class=\"form-control\" ng-model=\"userTest.new_score\">\n" +
    "                      <option value=\"A\">A</option>\n" +
    "                      <option value=\"A-\">A-</option>\n" +
    "                      <option value=\"B+\">B+</option>\n" +
    "                      <option value=\"B\">B</option>\n" +
    "                      <option value=\"B-\">B-</option>\n" +
    "                      <option value=\"C+\">C+</option>\n" +
    "                      <option value=\"C\">C</option>\n" +
    "                      <option value=\"C-\">C-</option>\n" +
    "                      <option value=\"D+\">D+</option>\n" +
    "                      <option value=\"D\">D</option>\n" +
    "                      <option value=\"D-\">D-</option>\n" +
    "                      <option value=\"F\">F</option>\n" +
    "                    </select>\n" +
    "                  </span>\n" +
    "                  <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"newTestForm.$submitted && newTestForm.$invalid\">\n" +
    "                  {{error}}</div>\n" +
    "                  <button progress-editor type=\"submit\" class=\"submit\" title=\"Confirm\">Confirm</button>\n" +
    "                  <span progress-editor class=\"cancel\" title=\"Cancel\" ng-click=\"cancelEditUserTest(userTest)\">Cancel</span>\n" +
    "                </div>\n" +
    "              </form>\n" +
    "            </div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div progress-editor class=\"table--cell no-border-right breakalways ng-clickable\" ng-show=\"testsEditor\" ng-if=\"!userTests.editing\" ng-click=\"addUserTest()\">\n" +
    "            <div class=\"cell--padding\">\n" +
    "              <h3><span class=\"glyphicon glyphicon-plus-sign\"></span></h3>\n" +
    "              <h6 class=\"bold\">Add A Test</h6>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('roadmap/add_milestone_modal.html',
    "<div class=\"modal-body\">\n" +
    "  <div class=\"modal-body__title\"><h5>Add New Milestone</h5></div>\n" +
    "  <div class=\"milestone_modules\" modulecolor=\"{{selected.module.title | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "    <div class=\"milestone_module\" ng-repeat=\"module in modules\"\n" +
    "          ng-class=\"{selected: selected.module.title == module.title}\"\n" +
    "          ng-click=\"selectModule(module)\"\n" +
    "          modulecolor=\"{{module.title | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "      <span class=\"module_title\">{{module.title | underscoresToSpaces}}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"milestone_submodules\" ng-hide=\"selected.submodule\">\n" +
    "    <h6>Select a {{selected.module.title | underscoresToSpaces}} milestone:</h6>\n" +
    "    <div class=\"milestone_submodule\" ng-repeat=\"submodule in selected.module.submodules\"\n" +
    "        ng-click=\"selectSubmodule(submodule)\"\n" +
    "        ng-class=\"{selected: selected.submodule.title == submodule.title}\">\n" +
    "      <div class=\"milestone_submodule__title bold pbs\"\n" +
    "          modulecolor=\"{{selected.module.title | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "        {{submodule.title}}</div>\n" +
    "      <div class=\"milestone_submodule__description\">{{submodule.milestone_description}}</div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div ng-show=\"selected.submodule\" class=\"milestone_edit phm ptm\">\n" +
    "    <div class=\"pbs\">\n" +
    "      <span class=\"glyphicon glyphicon-circle-arrow-left\"></span>\n" +
    "      <a ng-click=\"clearSubmoduleSelection()\">Back to milestones</a>\n" +
    "    </div>\n" +
    "    <div class=\"milestone_submodule selected\">\n" +
    "      <div class=\"milestone_submodule__title bold pbs\"\n" +
    "            modulecolor=\"{{selected.module.title | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "        {{selected.submodule.title}}</div>\n" +
    "      <div class=\"milestone_submodule__description\">{{selected.submodule.milestone_description}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"milestone_submodule__form\">\n" +
    "      <div class=\"pbs\">\n" +
    "        <div class=\"milestone-description\">{{selected.submodule.description}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"pbs\">\n" +
    "        <input class=\"form-control\" ng-model=\"selected.submodule.value\" placeholder=\"Value\">\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"milestone_advanced\">\n" +
    "        <a class=\"milestone_advanced__toggle\" ng-click=\"toggleAdvanced()\">{{advancedPrefix}} Advanced</a>\n" +
    "        <div class=\"milestone_advanced__hidden\" ng-show=\"showAdvanced\">\n" +
    "          <div class=\"pbs\">\n" +
    "            <span class=\"milestone-weight\">Weight:</span>\n" +
    "          </div>\n" +
    "          <div class=\"pbs\">\n" +
    "            <input class=\"form-field\" ng-model=\"selected.submodule.points\" placeholder=\"Weight\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <ul class=\"errorText ptm\" ng-show=\"errors\">\n" +
    "        <li ng-repeat=\"error in errors\">{{error}}</li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"buttonGroup pvm\">\n" +
    "    <button type=\"submit\" class=\"submit\" ng-show=\"selected.submodule\" ng-click=\"add()\"><span>Add</span></button>\n" +
    "    <button class=\"cancel\" ng-click=\"cancel()\"><span>Cancel</span></button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('roadmap/edit_milestone_modal.html',
    "<div class=\"modal-body\">\n" +
    "  <div class=\"modal-body__title\"><h5>Edit Milestone</h5></div>\n" +
    "\n" +
    "  <div class=\"milestone_modules\" modulecolor=\"{{milestone.module | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"milestone_edit phm ptm\">\n" +
    "    <h6>{{milestone.module | underscoresToSpaces}}</h6>\n" +
    "    <div class=\"milestone_submodule selected\">\n" +
    "      <div class=\"milestone_submodule__title bold pbs\"\n" +
    "           modulecolor=\"{{milestone.module | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "        {{milestone.title}}</div>\n" +
    "      <div class=\"milestone_submodule__description\">{{milestone.milestone_description}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"milestone_submodule__form\">\n" +
    "      <div class=\"pbs\">\n" +
    "        <div class=\"milestone-description\">{{milestone.description}}</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"pbs\">\n" +
    "        <input class=\"form-control\" ng-model=\"milestone.value\" placeholder=\"Value\">\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"milestone_advanced\">\n" +
    "        <a class=\"milestone_advanced__toggle\" ng-click=\"toggleAdvanced()\">{{advancedPrefix}} Advanced</a>\n" +
    "        <div class=\"milestone_advanced__hidden\" ng-show=\"showAdvanced\">\n" +
    "          <div class=\"pbs\">\n" +
    "            <span class=\"milestone-weight\">Weight:</span>\n" +
    "          </div>\n" +
    "          <div class=\"pbs\">\n" +
    "            <input class=\"form-field\" ng-model=\"milestone.points\" placeholder=\"Weight\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <ul class=\"errorText ptm\" ng-show=\"errors\">\n" +
    "        <li ng-repeat=\"error in errors\">{{error}}</li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"buttonGroup pvm\">\n" +
    "    <button type=\"submit\" class=\"submit\" ng-click=\"save()\"><span>Save</span></button>\n" +
    "    <button class=\"cancel\" ng-click=\"cancel()\"><span>Cancel</span></button>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('setup/setup.html',
    "<ion-view view-title=\"Setup\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "\t<div class=\"setupContainer clear\">\n" +
    "\n" +
    "\t  <div class=\"orgsetup-content clear\">\n" +
    "\t    <div class=\"orgsetup-nav\">\n" +
    "\t      <div ng-include=\"'setup/widgets/orgsetup_nav.html'\"></div>\n" +
    "\t    </div>\n" +
    "\t    <div class=\"orgsetup-pane\">\n" +
    "\t      <div ng-include=\"getWidgetTemplate(selected_widget)\"></div>\n" +
    "\t    </div>\n" +
    "\t  </div>\n" +
    "\n" +
    "\t</div>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('setup/widgets/orgsetup_admins.html',
    "<div class=\"widget orgsetup--admins\">\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\"><div class=\"color--dot\"></div> Organization Admins</h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table\">\n" +
    "      <div class=\"table--cell\">\n" +
    "        <div class=\"cell--padding align-left\">\n" +
    "          <div class=\"circle-pictures\" ng-repeat=\"orgAdmin in organization.orgAdmins\">\n" +
    "            <a ng-href=\"#/app/profile/{{orgAdmin.id}}\" title=\"View Organization Admin info\">\n" +
    "              <div class=\"circle-picture\">\n" +
    "                <img ng-src=\"{{orgAdmin.square_avatar_url}}\">\n" +
    "              </div>\n" +
    "              <h6 ng-if=\"orgAdmin.id != current_user.id\">{{orgAdmin.full_name}}</h6>\n" +
    "              <h6 ng-if=\"orgAdmin.id == current_user.id\">Me</h6>\n" +
    "            </a>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"add-button\" ng-click=\"addOrgAdmin()\">\n" +
    "            <div class=\"glyphicon glyphicon-plus-sign green\"></div>\n" +
    "            <div>Add Organization Admin</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('setup/widgets/orgsetup_expectations.html',
    "<div ng-controller=\"OrganizationExpectationController\" class=\"widget orgsetup-expectations\">\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\"><div class=\"color--dot\"></div> Student Expectations</h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table\">\n" +
    "      <div class=\"table--cell breakalways\" ng-repeat=\"expectation in expectations\">\n" +
    "        <div class=\"widget--content--table ng-clickable\" ng-hide=\"expectation.editing\" ng-click=\"go('/app/expectation/' + expectation.id)\">\n" +
    "          <div class=\"table--cell pam\">\n" +
    "            <h5 class=\"bold\">{{expectation.title}}</h5>\n" +
    "            <h6 class=\"wysiwyg-output\" ng-bind-html=\"expectation.description\"></h6>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-if=\"is_admin\" class=\"table--cell btns\">\n" +
    "            <span no-click-propagation class=\"mrm glyphicon glyphicon-pencil\" title=\"Edit Expectation\" ng-click=\"editExpectation($index)\"></span>\n" +
    "            <span no-click-propagation class=\"glyphicon glyphicon-trash\" title=\"Delete Expectation\" ng-click=\"deleteExpectation($index)\"></span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"expectation--editing widget--content--cell breakalways\" ng-show=\"expectation.editing\">\n" +
    "          <form name=\"expectationsForm\" imua-form=\"saveExpectation($index)\" novalidate>\n" +
    "            <div class=\"pbm\">\n" +
    "              <label-with-errors label=\"Title\" form=\"expectationsForm\" formfield=\"expectationsForm.title\"> </label-with-errors>\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"expectation.new_title\" placeholder=\"Expectation Title\" name=\"title\" required />\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pbm\">\n" +
    "              <label-with-errors label=\"Description\" form=\"expectationsForm\" formfield=\"expectationsForm.description\"></label-with-errors>\n" +
    "              <text-angular ta-toolbar=\"[]\" rows=\"4\" cols=\"40\"  type=\"text\" ng-model=\"expectation.new_description\" placeholder=\"Criteria for meeting this Expectation\"></text-angular>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"expectationsForm.$submitted && expectationsForm.$invalid\">{{error}}</div>\n" +
    "\n" +
    "            <div>\n" +
    "              <button no-click-propagation class=\"submit\" type=\"submit\">Submit</button>\n" +
    "              <span no-click-propagation class=\"cancel\" ng-click=\"cancelEditExpectation($index)\">Cancel</span>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "        <!-- <div class=\"widget--content--cell breakalways\">\n" +
    "          <div class=\"cell--padding\">{{expectation.description}}</div>\n" +
    "        </div>\n" +
    "        <div class=\"widget--content--table table--fixed\">\n" +
    "          <div class=\"widget--content--cell\">\n" +
    "            <div class=\"cell--padding\">\n" +
    "              <h4>28</h4>\n" +
    "              <p>Students Meeting This Expectation</p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"widget--content--cell\">\n" +
    "            <div class=\"cell--padding\">\n" +
    "              <h4>8</h4>\n" +
    "              <p>Students Need Work</p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"widget--content--cell\">\n" +
    "            <div class=\"cell--padding\">\n" +
    "              <h4>11</h4>\n" +
    "              <p>Students Not Meeting This Expectation</p>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div> -->\n" +
    "\n" +
    "      </div>\n" +
    "      <div ng-if=\"is_admin\" class=\"table--cell ng-clickable breakalways\" ng-click=\"addExpectation()\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <h3><span class=\"glyphicon glyphicon-plus-sign\"></span></h3>\n" +
    "          <h6 class=\"bold\">Add a Student Expectation</h6>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- <div class=\"cell--padding\">\n" +
    "  <div class=\"expectations-list__item\">\n" +
    "    <div class=\"expectations-list__item__title\">\n" +
    "      <h5 ng-hide=\"expectation.editing\">{{expectation.title}}</h5>\n" +
    "      <input ng-show=\"expectation.editing\" class=\"form-field\" ng-model=\"expectation.new_title\" placeholder=\"Expectation Title\" name=\"expectation_title\">\n" +
    "    </div>\n" +
    "    <div class=\"expectations-list__item__icons\" ng-if=\"current_user.role <= CONSTANTS.USER_ROLES.org_admin\">\n" +
    "      <div ng-hide=\"expectation.editing\">\n" +
    "        <span class=\"glyphicon glyphicon-pencil prs\" title=\"Edit\" ng-click=\"editExpectation(\\$index)\"></span>\n" +
    "        <span class=\"glyphicon glyphicon-trash\" title=\"Delete\" ng-click=\"deleteExpectation(\\$index)\"></span>\n" +
    "      </div>\n" +
    "      <div ng-show=\"expectation.editing\">\n" +
    "        <span class=\"editing_icon glyphicon glyphicon-ok prs green\" title=\"Save\" ng-click=\"saveExpectation(\\$index)\"></span>\n" +
    "        <span class=\"editing_icon glyphicon glyphicon-remove red\" title=\"Cancel\" ng-click=\"cancelEditExpectation(\\$index)\"></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"add-expectation\">\n" +
    "    <div class=\"add-expectation__button-placeholder\" ng-hide=\"current_user.role < CONSTANTS.USER_ROLES.mentor && !expectations.editing\"></div>\n" +
    "    <button type=\"submit\" class=\"submit add-expectation__button\" ng-show=\"current_user.role < CONSTANTS.USER_ROLES.mentor && !expectations.editing\" ng-click=\"addExpectation()\">Add a Student Expectation</button>\n" +
    "  </div>\n" +
    "</div> -->\n"
  );


  $templateCache.put('setup/widgets/orgsetup_nav.html',
    "<div class=\"orgsetup-nav-widget widget widget--nav\">\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\">\n" +
    "        <div class=\"color--dot\"></div>\n" +
    "        <span>{{view_obj.setup_widget_title}}</span>\n" +
    "      </h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table\">\n" +
    "      <div ng-repeat=\"nav_item in nav_items_for_setup()\">\n" +
    "        <div ng-if=\"is_admin || nav_item.for_mentors\"\n" +
    "             class=\"widget--content--cell ng-clickable breakalways\"\n" +
    "             ng-click=\"selectWidget(nav_item.widget)\"\n" +
    "             ng-class=\"{'selected': selected_widget == nav_item.widget}\">\n" +
    "          <div class=\"cell--padding\">\n" +
    "            <div class=\"setting-icon\">\n" +
    "              <span class=\"glyphicon glyphicon-user\"></span>\n" +
    "            </div>\n" +
    "            <div class=\"setting-text\">{{nav_item.title}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"orgsetup-nav-widget widget widget--nav\">\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\"><div class=\"color--dot\"></div> Roadmap</h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"widget--content\">\n" +
    "    <div class=\"widget--content--table\"\n" +
    "         ng-repeat=\"year in roadmap.years\"\n" +
    "         ng-class=\"{'selected-year': selected_year == year.id}\">\n" +
    "      <div class=\"widget--content--cell ng-clickable breakalways\"\n" +
    "          ng-click=\"selectWidget('roadmap', {year: year.id})\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <h6 class=\"bold\">{{year.name}}</h6>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"widget--content--cell ng-clickable breakalways\"\n" +
    "           ng-repeat=\"sem in year.semesters\"\n" +
    "           ng-click=\"selectWidget('roadmap', {year: year.id, semester: sem.id})\"\n" +
    "           ng-class=\"{'selected-semester': selected_semester == sem.id}\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <div class=\"setting-icon\"><span class=\"glyphicon glyphicon-time\"></span></div>\n" +
    "          <div class=\"setting-text\">{{sem.name}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"pbxl\">\n" +
    "  <select ng-options=\"nav_item.widget as nav_item.title\n" +
    "                        for nav_item in sub_nav_items\"\n" +
    "          ng-change=\"selectWidget(selected_widget)\"\n" +
    "          ng-model=\"selected_widget\"\n" +
    "          class=\"orgsetup-nav-dropdown form-control\">\n" +
    "  </select>\n" +
    "</div>\n"
  );


  $templateCache.put('setup/widgets/orgsetup_roadmap.html',
    "<div ng-controller=\"RoadmapController\">\n" +
    "  <div ng-repeat=\"year in roadmap.years\" ng-if=\"year.id == selected_year || selected_year == null\">\n" +
    "    <div ng-repeat=\"sem in year.semesters | filter: {id: selected_semester}\">\n" +
    "      <div ng-repeat=\"mod in enabled_modules\">\n" +
    "        <div class=\"widget orgsetup-roadmap\" modulecolor=\"{{mod.title | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "          <div class=\"widget--header\">\n" +
    "            <div class=\"widget--header--left\">\n" +
    "              <h6 class=\"bold\"><div class=\"color--dot\"></div>{{mod.title | underscoresToSpaces}}</h6>\n" +
    "            </div>\n" +
    "            <div class=\"widget--header--right\">\n" +
    "              <div class=\"widget--options\">\n" +
    "                <span class=\"standard--text\">{{year.name}}, {{sem.name}}</span>\n" +
    "                <span class=\"glyphicon glyphicon-time\"></span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"widget--content\">\n" +
    "            <div class=\"widget--content--table\">\n" +
    "              <div class=\"table--cell breakalways ng-clickable\" ng-repeat=\"milestone in sem.semester.milestones | filter: {module: mod.title}\"\n" +
    "                    ng-click=\"viewMilestoneStatus(milestone)\">\n" +
    "                <div class=\"widget--content--table\">\n" +
    "\n" +
    "                  <div class=\"table--cell milestone-description\">\n" +
    "                    <span ng-if=\"milestone.submodule != 'YesNo'\" class=\"milestone__info__value\"><h6>{{milestone.description}} {{milestone.value}}</h6></span>\n" +
    "                    <span ng-if=\"milestone.submodule == 'YesNo'\" class=\"milestone__info__value\"><h6>{{milestone.value}}</h6></span>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"table--cell milestone-points\">\n" +
    "                    <div>Points</div>\n" +
    "                    <div class=\"bold\">{{milestone.points}}</div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div class=\"table--cell milestone-label\" modulecolor=\"{{mod.title | addUnderscoreIfFirstCharIsNum}}\">\n" +
    "                    <div>{{milestone.title}}</div>\n" +
    "                  </div>\n" +
    "\n" +
    "                  <div ng-if=\"is_admin\" class=\"table--cell btns\">\n" +
    "                    <span no-click-propagation class=\"mrm glyphicon glyphicon-pencil\" title=\"Edit Milestone\" ng-click=\"viewMilestone(sem.semester, milestone)\"></span>\n" +
    "                    <span no-click-propagation class=\"glyphicon glyphicon-trash\" title=\"Delete Milestone\" ng-click=\"deleteMilestone(sem.semester, milestone)\"></span>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div ng-if=\"is_admin\" ng-click=\"addMilestone(sem.semester, mod)\" class=\"ptl breakalways ng-clickable\">\n" +
    "                <div>Add Milestone</div>\n" +
    "                <div><h5><span class=\"glyphicon glyphicon-plus-sign\"></span></h5></div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--\n" +
    "<div class=\"roadmapContainer\" ng-controller=\"RoadmapController\">\n" +
    "  <div ng-repeat=\"year in roadmap.years\">\n" +
    "    <div class=\"year\">\n" +
    "\n" +
    "      <div class=\"year__header\">\n" +
    "        <span class=\"name\">{{year.name}}</span>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"year__semester\" ng-repeat=\"sem in year.semesters\">\n" +
    "\n" +
    "        <div ng-if=\"current_user.role >= CONSTANTS.USER_ROLES.mentor\">\n" +
    "          <div class=\"semester__header-title\">{{sem.name}}</div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"current_user.role <= CONSTANTS.USER_ROLES.org_admin\">\n" +
    "          <div class=\"semester__header-title--editable\" ng-hide=\"sem.editing\">\n" +
    "            <span class=\"name\" ng-click=\"addTimeUnit(sem)\">{{sem.name}}</span>\n" +
    "          </div>\n" +
    "\n" +
    "          <div ng-show=\"sem.editing\" class=\"semester__header-title--editing\">\n" +
    "            <form>\n" +
    "              <input class=\"form-field\" ng-model=\"sem.name\" placeholder=\"Time Unit Name\">\n" +
    "\n" +
    "              <button type=\"submit\" class=\"submit\" ng-click=\"saveAddTimeUnit(sem)\"><span>Save</span></button>\n" +
    "              <button class=\"cancel\" ng-click=\"cancelAddTimeUnit(sem)\"><span>Cancel</span></button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"milestone\" modulecolor=\"{{milestone.module}}\" ng-repeat=\"milestone in sem.milestones | orderBy: '-points'\">\n" +
    "          <span class =\"milestone__title\">\n" +
    "            <img ng-src={{milestone.icon}}/>{{milestone.title}}\n" +
    "          </span>\n" +
    "          <span class = \"milestone__info\">\n" +
    "            <span ng-if=\"milestone.submodule != 'YesNo'\" class=\"milestone__info__value\">{{milestone.description}} {{milestone.value}}</span>\n" +
    "            <span ng-if=\"milestone.submodule == 'YesNo'\" class=\"milestone__info__value\">{{milestone.value}}</span>\n" +
    "            <span ng-if=\"current_user.role <= CONSTANTS.USER_ROLES.org_admin\" class=\"milestone__info__icons\">\n" +
    "              <span class=\"glyphicon glyphicon-pencil\" title=\"Edit Milestone\" ng-click=\"viewMilestone(sem, milestone)\"></span>\n" +
    "              <span class=\"glyphicon glyphicon-trash\" title=\"Delete Milestone\" ng-click=\"deleteMilestone(sem, milestone)\"></span>\n" +
    "            </span>\n" +
    "          </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"current_user.role <= CONSTANTS.USER_ROLES.org_admin\" class=\"semester__footer\" ng-click=\"addMilestone(sem)\">\n" +
    "          <div class=\"semester__footer__title\">\n" +
    "            <span class=\"glyphicon glyphicon-plus-sign\"></span>\n" +
    "            <span class=\"text\">Add Another Milestone</span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"year.name != 'Year 4'\" class=\"roadmap-spacer-line\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div> -->\n"
  );


  $templateCache.put('setup/widgets/orgsetup_tests.html',
    "<div ng-controller=\"OrgTestController\" class=\"widget orgsetup-tests\">\n" +
    "\n" +
    "  <div class=\"widget--header\">\n" +
    "    <div class=\"widget--header--left\">\n" +
    "      <h6 class=\"bold\"><div class=\"color--dot\"></div> Tests</h6>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"widget--content\" wait-to-load=\"{{loaded_orgTests}}\">\n" +
    "    <div class=\"widget--content--table table--fixed\">\n" +
    "      <div class=\"table--cell ng-clickable breakalways\" ng-repeat=\"orgTest in orgTests\">\n" +
    "        <div class=\"widget--content--table\" ng-hide=\"orgTest.editing\">\n" +
    "          <div class=\"table--cell tests-title\">\n" +
    "            <h5 class=\"bold\">{{orgTest.title}}</h5>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"table--cell tests-type\">\n" +
    "            <p>Score Type:</p>\n" +
    "            <h6 class=\"bold\">{{orgTest.score_type}}</h6>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"table--cell btns\">\n" +
    "            <span no-click-propagation class=\"mrm glyphicon glyphicon-pencil\" title=\"Edit Test\" ng-click=\"editOrgTest($index)\"></span>\n" +
    "            <span no-click-propagation class=\"glyphicon glyphicon-trash\" title=\"Delete Test\" ng-click=\"deleteOrgTest($index)\"></span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"tests--editing\" ng-show=\"orgTest.editing\">\n" +
    "          <form name=\"testForm\" imua-form=\"saveOrgTest($index)\" novalidate>\n" +
    "            <div class=\"pbm\">\n" +
    "              <label-with-errors label=\"Test Title\" form=\"testForm\" formfield=\"testForm.test_title\"> </label-with-errors>\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"orgTest.new_title\" placeholder=\"Test Title\" name=\"test_title\" required />\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pbm\">\n" +
    "              <label-with-errors label=\"Test Type\" form=\"testForm\" formfield=\"testForm.test_type\"></label-with-errors>\n" +
    "              <select class=\"form-control\" required ng-options=\"scoreType as scoreType for scoreType in TestScoreTypes\" name=\"test_type\" ng-model=\"orgTest.new_score_type\">\n" +
    "                <option value=\"\">--- Score Type ---</option>\n" +
    "              </select>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-repeat=\"error in formErrors\" class=\"errorText errorListing\" ng-if=\"expectationsForm.$submitted && expectationsForm.$invalid\">{{error}}</div>\n" +
    "\n" +
    "            <div>\n" +
    "              <button class=\"submit\" type=\"submit\">Submit</button>\n" +
    "              <span class=\"cancel\" ng-click=\"cancelEditOrgTest($index)\">Cancel</span>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"table--cell ng-clickable breakalways\" ng-click=\"addOrgTest()\">\n" +
    "        <div class=\"cell--padding\">\n" +
    "          <h4><span class=\"glyphicon glyphicon-plus-sign\"></span></h4>\n" +
    "          <h6 class=\"bold\">Add a Test</h6>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('student_view/student_view.html',
    "<ion-view view-title=\"Student\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"progressContainer\" modulecolor=\"bg-{{selected_module.module_title}}\">\n" +
    "\n" +
    "      <div class=\"progress-header\" ng-if=\"selected_module.module_title != null\">\n" +
    "\n" +
    "        <div ng-include=\"'progress/widgets/module_circles_nav.html'\"></div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"progressLower\">\n" +
    "\n" +
    "        <div class=\"progressLowerDefault\" ng-if=\"selected_module.module_title == null\">\n" +
    "\n" +
    "          <div class='progressLower--header'>\n" +
    "\n" +
    "            <h4 class=\"progressLower-title\">\n" +
    "              <a ng-href=\"#/app/profile/{{student.id}}\" class=\"bold\">{{student.first_last_initial}}'s</a> Progress\n" +
    "              <select ng-options=\"sem.name for sem in semesters\" ng-model=\"new_selected_semester\" ng-change=\"selectSemester(new_selected_semester)\"></select>\n" +
    "            </h4>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"progressLower--content\">\n" +
    "\n" +
    "            <div class=\"widget overall-progress\">\n" +
    "\n" +
    "              <div class=\"widget--header\">\n" +
    "                <h6 class=\"bold\"><div class=\"color--dot\"></div> Overall Progress</h6>\n" +
    "              </div>\n" +
    "\n" +
    "              <div class=\"widget--content\">\n" +
    "                <div class=\"widget--content--table\">\n" +
    "                  <div class=\"table--cell\">\n" +
    "                    <div class=\"cell--padding\">\n" +
    "                      <div class=\"points points-earned\">\n" +
    "                        <h3 class=\"bold\">{{points_earned}}</h3>\n" +
    "                        <h6>Points Earned</h6>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"points points-circle progressCircle-big--container\">\n" +
    "                        <div class=\"big-progress-circle\">\n" +
    "                          <a ng-href=\"#/app/profile/{{student.id}}\" alt=\"View {{student.first_name}}'s Profile\">\n" +
    "                            <div class=\"big-circle-size\">\n" +
    "                              <progress-circle parentclass=\"big-circle-size\" student=\"student_with_modules_progress\" identifier=\"big\" ng-if=\"student_with_modules_progress\"></progress-circle>\n" +
    "                            </div>\n" +
    "                          </a>\n" +
    "                        </div>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"points points-available\">\n" +
    "                        <h5>{{total_points}}</h5>\n" +
    "                        <h6>Points Available</h6>\n" +
    "                      </div>\n" +
    "\n" +
    "                      <div class=\"temp-buttons\">\n" +
    "                        <a href=\"#/app/expectations/{{student.id}}\"><button class=\"btn btn-primary btn-lg\">See {{student.first_name}}'s Expectations</button></a>\n" +
    "                      </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-include=\"'progress/widgets/module_circles.html'\"></div>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-if=\"selected_module.module_title != null\">\n" +
    "          <div class=\"progressLower--header\">\n" +
    "            <h4 class=\"progressLower-title\" ng-if=\"!current_user.is_student\">\n" +
    "              <span class=\"bold\">{{student.first_name}}'s</span> {{selected_module.module_title | underscoresToSpaces}}\n" +
    "              <span class=\"bold\" ng-if=\"organization.name == 'OneGoal'\">progress</span>\n" +
    "              <select ng-options=\"sem.name for sem in semesters\" ng-model=\"new_selected_semester\" ng-change=\"selectSemester(new_selected_semester)\"></select>\n" +
    "            </h4>\n" +
    "            <h4 class=\"progressLower-title\" ng-if=\"current_user.is_student\">\n" +
    "              <span class=\"bold\">Your {{selected_module.module_title | underscoresToSpaces}}</span>\n" +
    "              <span class=\"bold\" ng-if=\"organization.name == 'OneGoal'\">progress</span>\n" +
    "              <select ng-options=\"sem.name for sem in semesters\" ng-model=\"new_selected_semester\" ng-change=\"selectSemester(new_selected_semester)\"></select>\n" +
    "            </h4>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"progressLower--no-content\" ng-show=\"selected_module.points.total == 0\">\n" +
    "            <h4>Looks like there aren't any {{selected_module.module_title | underscoresToSpaces}} milestones for this semester.</h4>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"progressLower--content\">\n" +
    "            <div ng-include=\"getModuleTemplate(selected_module.module_title)\"></div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('students/students.html',
    "<ion-view view-title=\"Students\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "\t<div class=\"studentsContainer\" wait-to-load=\"{{loaded_users}}\">\n" +
    "\n" +
    "\t\t<div class=\"students-header\">\n" +
    "\t\t\t<ul class=\"student-stats clear\">\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<h4 class=\"bold\">Students</h4>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<div class=\"stat-wrapper clear\">\n" +
    "\t\t\t\t\t\t<div class=\"count\"><h4><span class=\"bold\">{{organization.students.length}}</span></h4></div>\n" +
    "\t\t\t\t\t\t<div class=\"descript\">Total <br>Students</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<div class=\"stat-wrapper clear\">\n" +
    "\t\t\t\t\t\t<div class=\"count\"><h4><span class=\"bold\">{{active_students}}</span></h4></div>\n" +
    "\t\t\t\t\t\t<div ng-if=\"active_students !== 1\" class=\"descript\">Students Active <br>This Week</div>\n" +
    "\t\t\t\t\t\t<div ng-if=\"active_students == 1\" class=\"descript\">Student Active <br>This Week</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t\t<li>\n" +
    "\t\t\t\t\t<div class=\"stat-wrapper ng-clickable temp-clickable clear\" ng-click=\"attentionList = !attentionList\">\n" +
    "\t\t\t\t\t\t<div class=\"count\"><h4><span class=\"bold\">{{_.where(organization.students, { needs_attention: true }).length}}</span></h4></div>\n" +
    "\t\t\t\t\t\t<div ng-if=\"_.where(organization.students, { needs_attention: true }).length !== 1\" class=\"descript\">Students Need <br>Mentor Attention</div>\n" +
    "\t\t\t\t\t\t<div ng-if=\"_.where(organization.students, { needs_attention: true }).length == 1\" class=\"descript\">Student Needs <br>Mentor Attention</div>\n" +
    "\t\t\t\t\t</div>\n" +
    "\t\t\t\t</li>\n" +
    "\t\t\t</ul>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<div class=\"students-mid\" ng-if=\"attention_students.length != 0\" ng-show=\"attentionList\">\n" +
    "\t\t\t<div class=\"students-attention\">\n" +
    "\t\t\t\t<div ng-if=\"attention_students.length == 1\" class=\"list-header-imua\">\n" +
    "\t\t\t\t\t<h5><span class=\"bold\">One student needs attention</span> from their mentor</h5>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div ng-if=\"attention_students.length != 1\" class=\"list-header-imua\">\n" +
    "\t\t\t\t\t<h5><span class=\"bold\">{{attention_students.length}} students need attention</span> from their mentors</h5>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t\t<div class=\"list-container progress-circle--list\">\n" +
    "\t\t\t\t\t<progress-circle-needs-attention ng-repeat=\"student in attention_students\"></progress-circle-needs-attention>\n" +
    "\t\t\t\t</div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<div class=\"students-mid\">\n" +
    "\t\t\t<h6 class=\"search-label\">Search for Students: </h6>\n" +
    "\t\t\t<input class=\"student-search form-inline form-field\" type=\"text\" ng-model=\"search.name\">\n" +
    "\t\t</div>\n" +
    "\n" +
    "\t\t<div class=\"students-lower\">\n" +
    "\t\t\t<div ng-repeat=\"(group, group_students) in groupedStudents\">\n" +
    "\t\t\t\t<h5 ng-hide=\"search.name\" class=\"list-header-imua\">Class of <span class=\"bold\">{{group}}</span></h5>\n" +
    "\t\t\t\t<div class=\"list-container progress-circle--list\">\n" +
    "\t\t\t\t\t<progress-circle-default ng-repeat=\"student in group_students | orderBy: 'last_name' | filter: { full_name: search.name }\"></progress-circle-default>\n" +
    "\t\t\t\t</div>\n" +
    "\t    </div>\n" +
    "\n" +
    "\t\t\t<div class=\"add-button\" ng-click=\"addStudent()\">\n" +
    "\t\t\t\t<div class=\"glyphicon glyphicon-plus-sign\"></div>\n" +
    "\t\t\t\t<h6>Add a Student</h6>\n" +
    "\t\t\t</div>\n" +
    "\t  </div>\n" +
    "\n" +
    "\t</div>\n" +
    "  </ion-content>\n" +
    "</ion-view>"
  );


  $templateCache.put('superadmin/organizations.html',
    "<ion-view view-title=\"Organizations\" style=\"background-color: rgb(18,19,20);\">\n" +
    "  <ion-content>\n" +
    "    <div class=\"organizationsContainer paxl\" wait-to-load=\"{{organizations}}\">\n" +
    "      <h4 ng-show=\"organizations.length == 0\">No organizations created. Use the REST API to create one</h4>\n" +
    "\n" +
    "      <li ng-repeat=\"org in organizations\">\n" +
    "        {{org.name}} |\n" +
    "        <a ng-href=\"#/app/setup/{{org.id}}\">Org Setup</a> |\n" +
    "        <a ng-href=\"#/app/organization/{{org.id}}\">Mentors</a> |\n" +
    "        <a ng-href=\"#/app/students/{{org.id}}\">Students</a>\n" +
    "      </li>\n" +
    "\n" +
    "      <div style=\"padding-top: 20px;\">\n" +
    "        <input class=\"form-control\" ng-model=\"newOrg.name\" style=\"width: 250px;\"/>\n" +
    "        <button type=\"submit\" class=\"submit\" ng-click=\"addOrganization(newOrg.name)\">Add Organization</button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ion-content>\n" +
    "</ion-view>\n"
  );

}]);
