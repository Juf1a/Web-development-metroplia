let fruits = ["apple", "banana", "orange", "grape", "kiwi"];
console.log('Fruits: ["' + fruits.join('", "') + '"]');
console.log("Length of Fruits: " + fruits.length)
console.log('Element at Index 2: "' + fruits[2] + '"');
console.log('Last Element of Fruits: "' + fruits[fruits.length -1] + '"');

let vegetables = [];
for(let i = 0; i < 3; i++){
    const askVegetable = prompt("Add vegetable")
    vegetables.push(askVegetable)
}
console.log('Vegetables: ["' + vegetables.join('", "') + '"]');
console.log("Length of Vegetables: " + vegetables.length);