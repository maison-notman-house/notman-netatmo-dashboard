/**
 * #HackTheHouse
 * maison-notman-house.github.io
 */


// Constant definitions
UNKNOWN_VALUE_STRING = 'Unknown';
NOTMAN_NETATMO_API_URL = 'http://notman.herokuapp.com/api/netatmo/environment';
NETATMO_MODULE_FLOORS = [
  'Notman-M034',
  'Notman-M134',
  'Notman-M234',
  'Notman-M307'
];



/**
 * dashboard Module
 * All of the JavaScript specific to the dashboard is contained inside this
 * angular module.
 */
angular.module('dashboard', [])

/**
 * DashCtrl Controller
 * Handles the manipulation of all variables accessed by the HTML view.
 */
.controller('DashCtrl', function($scope, $http) {

  // Variables accessible in the HTML scope
  $scope.floors = [ {}, {}, {}, {} ];

  queryAPI();

  function queryAPI() {
    $http.defaults.headers.common.Accept = 'application/json';
    $http.get(NOTMAN_NETATMO_API_URL)
      .success(function(data, status, headers, config) {
        updateStatus(data);
      })
      .error(function(data, status, headers, config) {
        // TODO: handle gracefully
      });
  }

  function updateStatus(netatmos) {
    for(var cNetatmo = 0; cNetatmo < netatmos.length; cNetatmo++) {
      var netatmo = netatmos[cNetatmo];
      var floorIndex = NETATMO_MODULE_FLOORS.indexOf(netatmo.module_name);
      if(floorIndex >= 0) {
        $scope.floors[floorIndex] = netatmo.dashboard_data;
      }
    }
  }

});
