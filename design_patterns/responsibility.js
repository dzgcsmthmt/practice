function Sender(reciever){
    this.reciever = reciever;
}

Sender.prototype.send = function (request) {
    this.reciever.handler(request);
}

function Reciever(){
    this.next = null;
}

Reciever.prototype.handler = function(request){
    console.log(request.a);
    if(request.a == 2){
        return;
    }
    request.a++;
    this.next && this.next.handler(request);
}

Reciever.prototype.setNext = function(reciever){
    this.next = reciever;
    return reciever;
}

var rec1 = new Reciever();
var rec2 = new Reciever();
var rec3 = new Reciever();

rec1.setNext(rec2).setNext(rec3);

var sender = new Sender(rec1);

sender.send({a:1});
