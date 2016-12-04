angular.module('DaBug', [])
    .controller('BugDetail', bugDetail)
    .controller('BugCtrl', bugControl)
    .factory('BugFactory', bugFactory)
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: '/hom.html' })
            .when('/bugs/:id', { templateUrl: '/bug.html' });
    })

// inject  our own factory
bugControl.$inject = ['BugFactory'];

function bugContol(BugFactory) {
    var bCtrl = this;

    // initialize a list of bugs and a list of messages (empty to start)
    bCtrl.messages = [];
    bCtrl.bugList = [];

    // fill the bugs and bugList with the data that we get back from our get
    bCtrl.getBugs = function () {
        return bCtrl.bugList;
    };

    // create a new bug from the controller
    bCtrl.createBug = function () {
        var bug = {
            name: bCtrl.name,
            file: bCtrl.file,
            lineNumber: bCtrl.lineNumber,
            messages: bCtrl.messages
        };

        bCtrl.bugList.push(bug);
        bCtrl.name = null;
        bCtrl.file = null;
        bCtrl.lineNumber = null;
        bCtrl.messages = [];
        return bug;
    };

    // we use this to add a new message to our list of messages when a new field is requested
    bCtrl.addMessage = function () {
        bCtrl.messages.push('');
    }

    bCtrl.greeting = "Bug Log";
}

bugDetail.$inject = ['$routeParams', 'BugFactory'];

// bug detail controller
function bugDetail($routeParams, BugFactory) {
    var bDetail = this;
    bDetail.greeting = "Bug Detail"

    // get a single bug from the list of bugs
    bDetail.getBug = function () {
        BugFactory.bugs.forEach(function (el, index) {
            if (el.name === $routeParams.id) {
                bDetail.bug = el;
                return el;
            }
        };
    };
}

// create a shared list of bugs
function bugFactory() {
    var bugs = [];
    return {
        bugs: bugs
    };
};