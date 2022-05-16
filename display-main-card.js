//Between line 1 and 10 contains ID of item to fetch from blockchain (this is dummy for now) 
//Later will receive Item ID from the NFC chip

//---------fetch from BLOCKCHAIN CODE-----------------------//
var ID = 25;

//first fetch data from blockchain 
await fetch("blockchain.json")
    .then(function (response) {
        return response.json();
    }
    )
    .then(function (data) {
        // console.log(ID);
        //for each block in the chain
        for (var i = 0; i < data["chain"].length; i++) {
            //check if ID sent is equal to the block's id
            if (ID == data["chain"][i]["id"]) {
                document.getElementById("prodname").innerHTML = data["chain"][i]["data"]["product name"];
                document.getElementById("art-name").innerHTML = data["chain"][i]["data"]["artist name"];
                document.getElementById("authentic").innerHTML = "The item is authentic";
                document.getElementById("itemPrice").innerHTML = data["chain"][i]["data"]["price"] + "$";
                document.getElementById("size").innerHTML = data["chain"][i]["data"]["size"];
                document.getElementById("artMedia").innerHTML = data["chain"][i]["data"]["media"];
                document.getElementById("idea").innerHTML = data["chain"][i]["data"]["ideas behind work"];

            }
        }
    })
    .catch(error => {
        console.log(error);
    });



//---------------------------FIREBASE CODE-------------------------//

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


// Initialize Firebase app, db, storage
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();


//get artist name from html tag (which comes from blockchain)
var artistName = document.getElementById("art-name").innerText; 
console.log(artistName);

GetURLFromStorage(artistName); //get item image url from storage
GetURLFromRealTimeDb(artistName); //get artist image url from realtime


//function to get item image urls from storage and put it in more items 
function GetURLFromStorage(artistName) {
    const storageRef = sRef(storage);
    const imagesRef = sRef(storageRef, "Images/" + artistName);
    //console.log(imagesRef);

    //---How to know which item to get???-----
    

    //-----get Download URL for ITEM picture from storage and put in main-card (based on artist name)
    getDownloadURL(sRef(imagesRef, "artist-picture.jpg"))
        .then((url) => {
            // Insert url into an <img> tag to "download"
            var img = document.getElementById("art-pic");
            img.src = url;
        })
        .catch((error) => {
            console.log(error);
        });


}



//-----get Download url for picture of ARTIST from real time db and put in main-card (based on artist name) 
function GetURLFromRealTimeDb(artistName) {
    const dbref = ref(db);
    get(child(dbref, "profileData/" + artistName))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                document.getElementById("artist-picture").src = snapshot.val()["artistpicurl"]; //assume that the key for artist picture is always "artistpicurl"
            }
            else {
                console.log("No data found");
            }
        })
        .catch((error) => {
            console.log(error);
        });

}















    // //function to get profile data for artist with artistName as parameter
    // function getData(artistName) {
    //     const dbref = ref(db);
//     get(child(dbref, "profileData/" + artistName))
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 document.getElementById("artistName").innerHTML = artistName;
//                 document.getElementById("artistAbout").innerHTML = snapshot.val().about;
//             }
//             else {
//                 console.log("No data found");
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }