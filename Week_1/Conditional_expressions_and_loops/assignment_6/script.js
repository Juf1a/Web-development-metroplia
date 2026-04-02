const input = prompt("Enter a positive integer: ");
const numberInput = Number(input);

let result = "";

if (isNaN(numberInput) || numberInput < 1) {
    document.getElementById("result").innerHTML = "You must enter a positive integer.";
} else {
    for (let i = 1; i <= numberInput; i++) {
        for (let j = 1; j <= numberInput; j++) {
            result += (i * j) + " ";
        }
        result += "<br>";
    }
    document.getElementById("result").innerHTML = result;
} 