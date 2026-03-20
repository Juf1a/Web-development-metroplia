const enterPositiveInt = Number(prompt("Enter a positive integer: "))
let sum = 0;
if(enterPositiveInt < 0){
    document.getElementById("result").innerHTML = "Please enter a positive integer."
}else{
    for(let i = 0; enterPositiveInt >= i; i++){
        sum += i
    }
    document.getElementById("result").innerHTML = sum;
}