var tasks = [];

for (let index = 0; index < 100; index++) {
    tasks.push(loop);
}

function loop(){
    console.time('loop');
    var sum = 0;
    for (let index = 0; index < 90000000; index++) {
        sum += index;
    }
    console.log('sum',sum);
    console.timeEnd('loop');
}

requestIdleCallback(myNonEssentialWork);

// function myNonEssentialWork (deadline) {
//     while (deadline.timeRemaining() > 0)
//       doWorkIfNeeded();
// }

function myNonEssentialWork (deadline) {
    var rt = deadline.timeRemaining();
    if ( rt > 0 && tasks.length > 0){
        console.log('timeRemaining', rt);
        tasks.pop().call(null);
    }
  
    if (tasks.length > 0)
      requestIdleCallback(myNonEssentialWork);
}