var fs=require('fs');
var data=fs.readFileSync('pizza.json');

var pizzaTypes=JSON.parse(data);
console.log(pizzaTypes);

var express=require('express');
var app=express();
var server=app.listen(4000,listening);
function listening(){
    console.log('listening...');
}

app.use(express.static('website'));

app.get('/add/:pizzaType/:rating?',scorePizza);

function scorePizza(request,response){
    var data=request.params;
    var pizzaType=data.pizzaType;
    var rating=Number(data.rating);
    var reply;
    if (!rating){
        var reply={
            msg:"Please score!"
        }
        response.send(reply);
        }else{
            pizzaTypes[pizzaType]=rating;
            var data=JSON.stringify(pizzaTypes,null,2);
            fs.writeFile('pizza.json',data,finished);

            function finished(err){
                console.log('all set');
                 reply={
                    pizzaTypes:pizzaTypes,
                    rating:rating,
                    status:"success",
                    msg: "Thank you for your rating!"
                }
                response.send(reply);
            }
        }
}

app.get('/all',sendAll);
function sendAll(request,response){
    response.send(pizzaTypes);
}

app.get('/search/:pizzaType/',searchPizza);
function searchPizza(request,response){
    var pizzaType=request.params.pizzaType;
    var reply;
    if(pizzaTypes[pizzaType]){
        reply={
        status:"found",
        pizzaType:pizzaType,
        rating:pizzaTypes[pizzaType]
        }
    }else{
        reply={
            status:"not found",
            pizzaType:pizzaType,
        }
    }
    response.send(reply);
}