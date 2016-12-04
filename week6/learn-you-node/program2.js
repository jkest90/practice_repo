// Baby Steps
var arr = process.argv.slice(2);

var sum = 0;
arr.forEach(function(x){
    sum += Number(x);
});
console.log(sum);