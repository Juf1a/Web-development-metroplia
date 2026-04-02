const numbers = [];
const evenNumbers = [];
while(true){
    const askUser = prompt("Enter a number (or 'done' to finish): ");

    if(askUser == "done"){
        break
    }else if(!isNaN(askUser)){
        numbers.push(askUser)
    }
}

for(let number of numbers){
    if(number % 2 == 0){
        evenNumbers.push(Number(number))
    }
}
if(evenNumbers.length === 0){
    document.getElementById("result").innerHTML = "Even Numbers: None"
}else{
    document.getElementById("result").innerHTML = "Even numbers: " + evenNumbers;
}