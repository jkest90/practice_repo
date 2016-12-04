
angular.module("MyApp", [])
    .controller("myController", ['$document',MyController]);

function MyController ($document){
    var mCtrl = this;

    mCtrl.log = function(str){
        console.log(str)
    }
}
function MyController2 ($document){
    var mCtrl2 = this;

    mCtrl2.log = function(str){
        var node = $document[0].createElement("h1");
        var textnode = $document[0].createTextNode(str); 
        node.appendChild(textnode);   
        $document[0].body.appendChild(node);        
    }    
    
    mCtrl2.addList = function(){
        var ulist = $document[0].createElement("ul");
        for (var i=1;i<=3;i++) {
            var listItem = $document[0].createElement("li")
            var listNode = $document[0].createTextNode("Item"+i); 
            listItem.appendChild(listNode)
            ulist.appendChild(listItem)
        }
        $document[0].body.appendChild(ulist); 
    }
}