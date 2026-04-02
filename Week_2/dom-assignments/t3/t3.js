const agent = navigator.userAgent;
let browser = "";
let version = "";
let system = "";

if (agent.includes("Edg")) {
    version = agent.split("Edg/")[1].split(".")[0];
    browser = "Microsoft Edge";
}
else if (agent.includes("DuckDuckGo")) {
    version = agent.split("DuckDuckGo/")[1].split(".")[0];
    browser = "DuckDuckGo";
}
else if (agent.includes("Opera")) {
    version = agent.split("Opera/")[1].split(".")[0];
    browser = "Opera";
}
else if (agent.includes("Chrome")) {
    version = agent.split("Chrome/")[1].split(".")[0];
    browser = "Google Chrome";
}
else if (agent.includes("Safari")) {
    version = agent.split("Version/")[1].split(".")[0];
    browser = "Safari";
}
else if (agent.includes("Firefox")) {
    version = agent.split("Firefox/")[1].split(".")[0];
    browser = "Firefox";
}

if(agent.includes("Windows")){
    system = "Windows"
}else if(agent.includes("Mac")){
    system = "macOS"
}else if(agent.includes("Linux")){
    system = "Linux"
}

const target = document.querySelector("#target");

const p1 = document.createElement("p");
p1.textContent = "Browser name: " + browser + ", " + version
target.append(p1)

const p2 = document.createElement("p");
p2.textContent = "Operating system name: " + system;
target.append(p2);

const width = screen.width;
const height = screen.height;

const p3 = document.createElement("p");
p3.textContent = "Width: " + width + " Height: " + height;
target.appendChild(p3)

const availableWidth = screen.availWidth;
const availableHeight = screen.availHeight;
const p4 = document.createElement("p");
p4.textContent = "Available screen space: " + availableWidth + " (width) " + availableHeight + " (height)";
target.appendChild(p4)

const event = new Date();
const options = {
    dateStyle: "long",
    timeStyle: "short",
};


const dateFI = event.toLocaleString("fi-FI", options);
const p5 = document.createElement("p");
p5.textContent = dateFI
target.appendChild(p5)