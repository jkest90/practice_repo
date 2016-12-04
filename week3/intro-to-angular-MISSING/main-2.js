angular.module("MyApp", [])
    .controller("myController", ['$document', MyController]);

function MyController($document) {
    var mCtrl = this;

    mCtrl.changeColor = function (newColor) {
        mCtrl.textColour = { color: newColor };
    };

    mCtrl.exclaim = function () {
        console.log("exclaim");
        var header = $document[0].querySelector("h3")
        var str = $document[0].querySelector("h3").textContent()
    }

    mCtrl.confirm = function () {
        console.log("confirm");
        var isit = alert("Are you sure?")
        console.log(isit)
    }

    mCtrl.removeLink = function () {
        console.log("removeLink");
        // $document[0].
    }
}

app.directive('confirmationNeeded', function () {
    return {
    priority: 1,
    link: function (scope, element, attr) {
      var msg = attr.confirmationNeeded || "Are you sure?";
      var clickAction = attr.ngClick;
      element.bind('click',function (e) {
        scope.$eval(clickAction) if window.confirm(msg)
        e.stopImmediatePropagation();
        e.preventDefault();
       });
     }
    };
});