import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGwjCVSSSB_QgXOQ4fCbYOU6QANdttvTc",
    authDomain: "high-scores-83842.firebaseapp.com",
    projectId: "high-scores-83842",
    storageBucket: "high-scores-83842.appspot.com",
    messagingSenderId: "890660078028",
    appId: "1:890660078028:web:42049ff0cbe28248c45d69"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
// #2 NEW STUFF
const db = getDatabase();

const scoresRef = ref(db, 'favorite');
const scoresChanged = (snapshot) => {
    while (document.querySelector("#parks").firstElementChild) (document.querySelector("#parks").removeChild(document.querySelector("#parks").firstChild));
    const allScores = [];
    snapshot.forEach(score => {
        const childKey = score.key;
        const childData = score.val();
        allScores.push(childData);
    });
    allScores.sort((a,b) => a.score - b.score);
    for (let i = 0; i < allScores.length; i++)
    {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${allScores[i].name} - ${allScores[i].likes}`));
        document.querySelector("#parks").appendChild(li);
    }
}
onValue(scoresRef, scoresChanged);