//dummy variables 

// Import the functions needed
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getDatabase, ref, get, set, child } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js"; //for image stuff in more items


//configuration settings
const firebaseConfig = {
    apiKey: "AIzaSyDQELV2vDKrmhlh_N41Ct5IGxw4LuVw8Ws",
    authDomain: "d-guardian.firebaseapp.com",
    databaseURL: "https://d-guardian-default-rtdb.firebaseio.com",
    projectId: "d-guardian",
    storageBucket: "d-guardian.appspot.com",
    messagingSenderId: "710005762260",
    appId: "1:710005762260:web:b82e8be6a67d398545f341",
    measurementId: "G-JC2939Y8TD"
};

// Initialize Firebase app and db and artist name
const app = initializeApp(firebaseConfig);
const db = getDatabase();
var artistName = "Saad";

getLocation(artistName);

//function to get for artist with artistName as parameter
function getLocation(artistName) {
    const dbref = ref(db);
    get(child(dbref, "project1/"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById("longitude").innerHTML = snapshot.val().lng;
                document.getElementById("latitude").innerHTML = snapshot.val().lat;
            }
            else {
                console.log("No data found");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
