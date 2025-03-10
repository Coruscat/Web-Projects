const prefix = "jml6049";
const searchKey = prefix + "lastsearch";
const airingKey = prefix + "airingPref";
const sortKey = prefix + "sortPref";
const resultsKey = prefix + "resultsPref";

const storedSearch = localStorage.getItem(searchKey);
const storedAirPref = localStorage.getItem(airingKey);
const storedSort = localStorage.getItem(sortKey);
const storedResLeng = localStorage.getItem(resultsKey);



let recommendations = [];
window.onload = (e) => {
    document.querySelector("#searchbutton").onclick = searchButtonClicked

    if (storedSearch)
    {
        document.querySelector("#searchbox").value = storedSearch;
    }
    if(storedAirPref)
    {
        document.querySelector("#airing").value = storedAirPref;
    }
    if(storedSort)
    {
        document.querySelector("#score").value = storedSort;
    }
    if (storedSort)
    {
        document.querySelector("#resultsLength").value = storedResLeng;    
    }

    document.querySelector("#airing").onchange = e =>{ localStorage.setItem(airingKey, e.target.checked);}
    document.querySelector("#score").onchange = e => { localStorage.setItem(sortKey, e.target.value); }
    document.querySelector("#resultsLength").onchange = e => { localStorage.setItem(resultsKey, e.target.value); }

};

function enter(event)
{
    if (event.keyCode == 13)
    {
        document.querySelector("#searchbutton").click();
    }
}

async function searchButtonClicked()
{
    
    

    localStorage.setItem(searchKey, document.querySelector("#searchbox").value);

    //clear the results
    document.querySelector("#results").innerHTML = "";
    recommendations = [];
    // Jikan URLs
    const jikanIDURL = "https://api.jikan.moe/v4/anime?q=";
    
    let url = jikanIDURL;
    // Get term and sanitize
    let term = document.querySelector("#searchbox").value;
    term = encodeURIComponent(term);
    console.log(term);
    url += term;
    let sR = await fetch(url).then(r => r.json());
    dataLoaded(sR);
}
async function dataLoaded(e)
{
    let id;
    // JSON to JS obj
    let results = e.data;
    console.log(results);
    id = results[0].mal_id;
    let jikansearchURL = `https://api.jikan.moe/v4/anime/${id}/recommendations`;
    console.log(id);
    let recs = await fetch(jikansearchURL).then(r => r.json()).then(recsLoaded);
}
async function recsLoaded(e)
{
    // JSON to JS obj
    let results = e.data;
    let bigString = "";
    let smallimgURL = "";
     
    console.log(results);
    let length = document.querySelector("#resultsLength").value;
    console.log(length);
    if (results.length == 0)
    {
        bigString = `<p>There are no recommendations for this title</p><br>`;
        document.querySelector("#results").innerHTML += bigString; 
    }
    if (results.length < length)
    {
        length = results.length;
    }
    for (let i = 0; i < length; i++)
    {
        //Get Stats
        await sleep(400);
        let statsURL = `https://api.jikan.moe/v4/anime/${results[i].entry.mal_id}`;
        let sR = await fetch(statsURL).then(r => r.json());
        sR = sR.data;
        console.log(sR);
        recommendations.push(sR);
    } 
    
    // Filters
    recommendations = recommendations.filter(e => e != undefined && e.airing == document.querySelector('#airing').checked)
        .sort((a,b) => document.querySelector("#score").value == "highest" ? b.score - a.score : a.score - b.score)
    if (recommendations.length == 0)
    {
        bigString = `<p>No results fit your criteria</p><br>`;
        document.querySelector("#results").innerHTML += bigString; 
    }
    recommendations.forEach(sR => {
        bigString = `<div class="result"> <a href=${sR.url}>
        <img src="${sR.images.jpg.image_url}"></a>
        <a href=${sR.url}>
        ${sR.title}</a><p>Airing:&nbsp; ${sR.status}</p><p>Score:&nbsp;${sR.score}</p><p>Episodes:&nbsp; ${sR.episodes}</p><br></div>`;
         document.querySelector("#results").innerHTML += bigString; 
    })
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
