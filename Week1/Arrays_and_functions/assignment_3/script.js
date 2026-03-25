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
        evenNumbers.push(number)
    }
}
console.log(evenNumbers)