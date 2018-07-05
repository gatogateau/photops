var shuffle=require('shuffle-array');
// Db.games.find({id:id.params})
// .then((results)) => {
// add logic in here
// }


// both arrays users and targets are equal
// let users=result.users;

// // randomize targets
// let target=results.users.randomize;
// let userObj=[];
// // randomize targets
// target.sort blaahahahha

var users = ["bob", "sam", "clyde","william","ben","terri","paul","alex","ferdinand"];
var target = ["bob","sam","clyde","william","ben","terri","paul","alex","ferdinand"];
// var target = target.sort();
shuffle(target);
var usertemp;


var userObj = [];

for (let i=0; i<users.length; i++){
    if(users[i]!==target[i]){
        userObj.push({user:users[i], target:target[i]})
    } else if (target[i]==users[i] && users.length<i){
        console.log (i);
        let temp=users[i];
        users[i]=users[i+1];
        users[i+1]=usertemp;
        userObj.push({user:users[i], target:target[i]})
        
    } else if
    (users.length==i){
        
        let temp=users[i];
        users[i]=users[0];
        users[0]=temp,
        i=0;
    } else {
    userObj.push({user:users[i], target:target[i]})

    }
    
};
console.log (userObj);