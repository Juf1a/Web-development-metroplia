const examScore = Number(prompt("What was your exam score: "));

if(examScore >= 0 && examScore <= 39){
    document.getElementById("result").innerHTML = "You have received grade 0."
} else if(examScore >= 40 && examScore <= 51){
    document.getElementById("result").innerHTML = "You have received grade 1."
}else if(examScore >= 52 && examScore <= 63){
    document,getElementById("result").innerHTML = "You have received grade 2."
}else if(examScore >= 64 && examScore <= 75){
    document.getElementById("result").innerHTML = "You have received grade 3."
}else if(examScore >= 76 && examScore <= 87){
    document.getElementById("result").innerHTML = "You have received grade 4."
}else if(examScore >= 88 && examScore <= 100){
    document.getElementById("result").innerHTML = "You have received grade 5."
}else{
    document.getElementById("result").innerHTML = "Invalid grade."
}