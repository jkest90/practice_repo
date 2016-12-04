// BUG: did not inject ngRoute into the app
// MESSAGE: angular.js:68 Uncaught Error: [$injector:modulerr] Failed to instantiate module DaBug due to: Error: [$injector:unpr] Unknown provider: $routeProvider
// FIX: inject ngRoute into the app
// angular.module('DaBug', [])
angular.module('DaBug', ['ngRoute'])
    .controller('BugDetail', bugDetail)
    .controller('BugCtrl', bugControl)
    .factory('BugFactory', bugFactory)
    .config(function ($routeProvider) {
        $routeProvider
            // BUG: typo - misspell home.html
            // MESSAGE: angular.js:12011 GET http://localhost:3000/hom.html 404 (Not Found) ... Error: [$compile:tpload] Failed to load template: /hom.html (HTTP status: 404 Not Found)
            // FIX: correct spelling of home.html
            // .when('/', { templateUrl: '/hom.html' })
            .when('/', { templateUrl: '/home.html' })
            .when('/bugs/:id', { templateUrl: '/bug.html' });
    })

// inject  our own factory
bugControl.$inject = ['BugFactory'];
// BUG: typo - misspell buCongtrol
// MESSAGE: Dev Console: bugs.js:8 Uncaught ReferenceError: bugControl is not defined
// FIX: spell bugControl correctly
// function bugContol(BugFactory) {
function bugControl(BugFactory) {
    var bCtrl = this;

    // initialize a list of bugs and a list of messages (empty to start)
    bCtrl.messages = [];
    // BUG: set bugList to empty array instead of using BugFactory.bugs as shared list
    // MESSAGE: No message, bug list is lost when you navigate to the detail page
    // FIX: set the bCtrl.bugList to the BugFactory.bugs list.
    // bCtrl.bugList = [];
    bCtrl.bugList = BugFactory.bugs;

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
            // BUG: Missing parenthesis
            // MESSAGE: Dev Console: bugs.js:76 Uncaught SyntaxError: missing ) after argument list
            // FIX: add the parenthesis back
            // };
        });
    };
}

// create a shared list of bugs
function bugFactory() {
    var bugs = [];
    return {
        bugs: bugs
    };
};