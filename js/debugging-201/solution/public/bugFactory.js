angular.module('DaBug')
    .factory('bugFactory', dabugFactory);

dabugFactory.$inject = ['$http'];

// we create a factory so that these routes can be shared
// between controllers, so that future undead controllers 
// can also access /api/bugs
function dabugFactory($http) {

    // create a get request for the /api/bugs route
    function getBugs() {
        return $http.get('/api/bugs');
    }

    // create a post request for the /api/bugs route
    // BUG: missing parameter
    // MESSAGE: Dev Console: ReferenceError: bugsData is not defined at Object.postBugs [as createBugs] (bugFactory.js:18)
    // FIX: add bugsData as a parameter to postBugs
    //function postBugs() {
    function postBugs(bugsData) {
        return $http.post('/api/bugs', bugsData);
    }

    // return the functions that we will use in the bug controller
    return {
        getBugs:getBugs,
        createBugs:postBugs
    }
};