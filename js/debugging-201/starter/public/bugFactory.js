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
    function postBugs() {
        return $http.post('/api/bugs', bugsData);
    }

    // return the functions that we will use in the bug controller
    return {
        getBugs:getBugs,
        createBugs:postBugs
    }
};