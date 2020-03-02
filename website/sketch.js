var canvas;

function setup(){
canvas= createCanvas(windowWidth,windowHeight);
canvas.position(0,0);
drawData();
console.log("running");

var button=select('#submit');
button.mousePressed(submitPizzaTypes);
}

function drawData(){
    loadJSON('/all',gotData);
}

function submitPizzaTypes(){
    var pizzaTypes=select('#pizzaTypes').value();
    var rating=select('#rating').value();
    console.log(pizzaTypes,rating);
    loadJSON('add/' + pizzaTypes + '/' + rating, finished);

function finished(data){
        console.log(data);
        drawData();
    }
}

function gotData(data){
    console.log(data);
}

function gotData(data){
    clear();
    console.log(data);
    var keys=Object.keys(data);
    for(var i=0; i<keys.length;i++){
        var pizzaType=keys[i];
        var rating=data[pizzaType];
        var x=random(width);
        var y=random(height);
        fill(255,100,0);
        textSize(15);
        textStyle(BOLD);
        textFont('Helvetica');
        text(pizzaType,x,y);
    }
    console.log(keys);
}