let numbers = [5, 2, 9, 1, 7];

function sortArray(numbers){
    const sortedNumbers = numbers.slice()
    return sortedNumbers.sort(function(a, b){return a-b});
}

console.log(numbers)
console.log(sortArray(numbers))