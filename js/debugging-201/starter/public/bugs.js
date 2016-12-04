angular.module('DaBug', ['ngRoute'])
    .contoller('BugCtrl', bugControl)       
    .contoller('BugProfile', bProfile)
    .config(function ($routeProvider) {
        $routeProvider.when('/',
            {
                templateUrl: '/home.html',
                controller: 'BugCtrl',
                controllerAs: 'bugs',
            }).when('/bugs/:id',
            {
                templateUrl: '/bug.html',
                controller: 'BugProfile',
                controllerAs: 'profile',
            });
    })

// inject http and our own factory
bugControl.$inject = ['$http', 'bugFactory'];

function bugControl($http, bugFactory) {
    var bCtrl = this;

    // initialize a list of bugs and a list of powers (empty to start)
    bCtrl.bugList = [];
    bCtrl.messages = [''];

    // fill the bugs and bugList with the data that we get back from our get
    bCtrl.getBugs = function () {
        bugFactory.getBugs()
            .then(function (res) {
                bCtrl.bugList = res.data;
            };
    };

    // get all bugs from database
    bCtrl.getBugs();

    // call the factory method to create a new bug from the controller
    bCtrl.createBug = function () {
        bugFactory.createBugs({
            name: bCtrl.name,
            file: bCtrl.file,
            lineNumber: bCtrl.lineNumber,
            messages: bCtrl.messages,
        })
            .then(function (res) {
                console.log(res.data);
                bCtrl.bugList.push(res.data);
                bCtrl.name = null;
                bCtrl.file = null;
                bCtrl.lineNumber = null;
                bCtrl.messages = [];
            })
    };

    // we use this to add a new message to our list of messages when a new field is requested
    bCtrl.addMessage = function () {
        bCtrl.messages.push('');
    }

    bCtrl.greeting = "Bug Log";
}

bProfile.$inject = ['$routeParams', '$http'];

function bProfile($routeParams, $http) {
    var bProf = this;

    $http.get('/api/bugs/' + $routeParams.id).then(function (res) {
        bProf.bug = res.data;
    })
}