import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as storage from "./storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyCGwjCVSSSB_QgXOQ4fCbYOU6QANdttvTc",
	authDomain: "high-scores-83842.firebaseapp.com",
	projectId: "high-scores-83842",
	storageBucket: "high-scores-83842.appspot.com",
	messagingSenderId: "890660078028",
	appId: "1:890660078028:web:42049ff0cbe28248c45d69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();
let favRef = ref(db, 'favorites');


// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];
let geojson;
let favoriteIds = ["p20", "p79", "p180", "p43"];
let favDisabled = true;
let delDisabled = true;
let currentId;

// II. Functions
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatNYS);
	};
	
	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45, 0);
		map.flyTo(lnglatNYS);
	};
	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatUSA);
	};

	document.querySelector("#btn-fav").onclick = () => {
		favoriteIds.push(currentId);
		storage.writeToLocalStorage("Favs", favoriteIds);
		document.querySelector("#btn-fav").disabled = true;
		refreshFavorites();
		showFeatureDetails(currentId);
		favRef = ref(db, 'favorite/' + currentId);
		set(favRef, {
			name: getFeatureById(currentId).properties.title,
			likes: increment(1)
		}
		);
	}

	document.querySelector("#btn-del").onclick = () => {
		favoriteIds = favoriteIds.filter(e => e !== currentId)
		storage.writeToLocalStorage("Favs", favoriteIds);
		document.querySelector("#btn-del").disabled = true;
		refreshFavorites();
		showFeatureDetails(currentId);
		favRef = ref(db, 'favorite/' + currentId);
		set(favRef, {
			name: getFeatureById(currentId).properties.title,
			likes: increment(-1)
		}
		);
	}

	document.querySelector("#btn-fav").disabled = favDisabled;
	document.querySelector("#btn-del").disabled = delDisabled;
	refreshFavorites();
}

const init = () => {
	map.initMap(lnglatNYS);
	ajax.downloadFile("data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		console.log(geojson);
		map.addMarkersToMap(geojson, showFeatureDetails);
		setupUI();
	});
	const keys = storage.readFromLocalStorage("Favs");
	if (Array.isArray(keys))
	{
	  favoriteIds = keys;
	}
	else
	{
	  favoriteIds = [];
	}
};

const showFeatureDetails = (id) => {
	currentId = id;
	console.log(`showFeatureDetails - id=${id}`);
	console.log(favoriteIds);
	const feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `<b>${feature.properties.title}</b>
	<p>${feature.properties.address}</p>
	<b>Phone: </b>
	<a href="tel:${feature.properties.phone}">${feature.properties.phone}</a>
	<p></p>
	<b>Website: </b>
	<a href="${feature.properties.url}">${feature.properties.url}</a>`;
	document.querySelector("#details-3").innerHTML = `${feature.properties.description}`;

	if (favoriteIds.length >= 0)
	{
		favDisabled = false;
	}

	for (const i of favoriteIds)
	{
		if (i != id)
		{
			favDisabled = false;
			delDisabled = true;
		}
		else
		{
			favDisabled = true;
			delDisabled = false;
			break;
		}
	}

	document.querySelector("#btn-fav").disabled = favDisabled;
	document.querySelector("#btn-del").disabled = delDisabled;
};

const getFeatureById = (id) => {
	for (let i = 0; i < geojson.features.length; i++) {
		if (geojson.features[i].id === id) { // Check for id directly
			console.log(geojson.features[i]);
			return geojson.features[i];
		}
	}
};

const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for (const id of favoriteIds) {
		favoritesContainer.appendChild(createFavoriteElement(id));
	}
};

const createFavoriteElement = (id) => {
	const feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id;
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
	<span class="panel-icon">
		<i class="fas fa-map-pin"></i>
	</span>
	${feature.properties.title}`;
	return a;
};

init();