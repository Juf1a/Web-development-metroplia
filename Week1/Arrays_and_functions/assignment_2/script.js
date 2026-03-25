let numbers = [];
for(let i = 0; i < 5; i++){
    const askNumber = Number(prompt("Enter Number: "))
    numbers.push(askNumber);
}

document.getElementById("result").innerHTML = numbers

const searchNumber = Number(prompt("Enter a number to search: "));

if(numbers.includes(searchNumber)){
    document.getElementById("result2").innerHTML = "Number " + searchNumber + " is found in the array."
} else{
    document.getElementById("result2").innerHTML = "Number " + searchNumber + " is not found in the array."
}

numbers.pop();
document.getElementById("result3").innerHTML = "Updated Numbers: " + numbers;

numbers.sort(function(a, b){return a - b});
document.getElementById("result4").innerHTML = "Sorted numbers: " + numbers;