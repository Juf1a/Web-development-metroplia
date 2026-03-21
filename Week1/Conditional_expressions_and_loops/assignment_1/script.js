const temperature = Number(prompt("Give a temperature in Celsius:"));
const kelvin = temperature + 273.15;
const fahrenheit = (temperature* 9/5) + 32;

document.getElementById("displayresult1").innerHTML = "Kelvin: " + kelvin;
document.getElementById("displayresult2").innerHTML = "Fahrenheit: " + fahrenheit;