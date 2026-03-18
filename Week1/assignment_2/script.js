const x1 = Number(prompt("Give cordinate of first x: "));
const y1 = Number(prompt("Give cordinate of first y: "));
const x2 = Number(prompt("Give cordinate of second x: "));
const y2 = Number(prompt("Give cordinate of second y: "));

const distance = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
document.getElementById("result").innerHTML = distance