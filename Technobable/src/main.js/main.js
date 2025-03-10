import randomElement from "./util.js";
let words1;
let words2;
let words3;

let loadBabble = () => {
    const url = "data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        const string = e.target.responseText;
        const json = JSON.parse(string);

        words1 = json.words1;
        words2 = json.words2;
        words3 = json.words3;

        randomize(1);
    }

    xhr.open("GET", url);
    xhr.send();
}

let randomize = (num) => {
    let fiveWords = "";
    for (let i = 0; i < num; i++) {
        fiveWords += `${words1[Math.floor(Math.random() * words1.length)]
        + " " + words2[Math.floor(Math.random() * words2.length)]
        + " " + words3[Math.floor(Math.random() * words3.length)]} \n`;
    }
    document.querySelector("#output").innerHTML = fiveWords;
}

// Call loadBabble to load the data when the document is loaded
document.onload = loadBabble();

// Assign functions as event handlers, not the results of function calls
document.querySelector("#my-Button").onclick = function() {
    randomize(1);
};

document.querySelector("#big-Button").onclick = function() {
    randomize(5);
};

