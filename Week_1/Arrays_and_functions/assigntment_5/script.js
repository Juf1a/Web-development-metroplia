let numbers = [5, 2, 9, 1, 7];

function sortArray(numbers, order){

    const sortedNumbers = numbers.slice()

    if(order === "desc"){
        return sortedNumbers.sort(function(a, b){return b-a});
    } else if(order === "asc"){
        return sortedNumbers.sort(function(a, b){return a-b});
    }else{
        return console.log("invalid sorting order.")
    }
}

console.log(numbers)
console.log(sortArray(numbers, "asc"))
console.log(sortArray(numbers, "desc"))