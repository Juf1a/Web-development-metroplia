const side1 = Number(prompt("First sides length: "));
const side2 = Number(prompt("Seond sides length: "));
const side3 = Number(prompt("Third sides length: "));

if (side1 == side2 && side1 == side3){
    document.getElementById("result").innerHTML = "The triangle is Equilateral."
}else if(side1 == side2 || side1 == side3 || side2 == side3){
    document.getElementById("result").innerHTML = "The triangle is Isosceles."
}else if (!(side1 == side2 || side1 == side3 || side2 == side3)) {
    document.getElementById("result").innerHTML = "The triangle is Scalene.";
}