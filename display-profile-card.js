//Between line 21 and 30 dummy variable artistName should be hyperlink from main-card.html

// Import the functions needed
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getDatabase, ref, get, set, child } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL, listAll, list } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js"; //for image stuff in more items

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
const storage = getStorage();


var artistName = "Mohammed Akrouf";
// var token = document.createElement("p");
// token.innerText = "Hello";
// token.hidden = false;
// document.getElementById("artistAbout").appendChild(token);


//call functions to get data and the images (URLS) from firebase
getDataFromRealTimeDb(artistName); //artist name, artist about, artist picture
GetURLFromStorage(artistName); //item picture URL


//assume that the key for artist picture is always "artistpicurl"
//function to get artist name, about and artist pic url from real time db
function getDataFromRealTimeDb(artistName) {
  const dbref = ref(db);
  get(child(dbref, "profileData/" + artistName))
    .then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById("artistName").innerHTML = artistName;
        document.getElementById("artistAbout").innerHTML = snapshot.val().about;
        document.getElementById("art-pic").src = snapshot.val()["artistpicurl"];


        //get the token parameter of the artistpicurl
        // const queryString =  document.getElementById("art-pic").src;
        // const urlParams = new URLSearchParams(queryString);
        // token.innerText = urlParams.get('token');
      
      }
      else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.log(error);
    });
} 


//function to get URL for MORE ITEM images from storage and put it in more items
function GetURLFromStorage(artistName) {
    //console.log(token.innerText);

    const storageRef = sRef(storage);
    const imagesRef = sRef(storageRef, "Images/" + artistName);
    //console.log(imagesRef);
     
    listAll(imagesRef)
    .then((res) => {
    res.prefixes.forEach((folderRef) => {
        // All the prefixes under imagesRef.
        // You may call listAll() recursively on them.
        //console.log(folderRef);        
       
    });

    //for each item image we put in html image tag
    res.items.forEach((itemRef) => {
        // All the items under listRef.
        getDownloadURL(itemRef)
        .then((url) => {
            // Insert url into an <img> tag to "download"
            console.log(url);
            var img = document.createElement("img");
            img.src = url;
          /*   img.width = 180;
            img.height = 180;
            img.style = "margin: 1px 10px 1px 10px"; */
            img.classList.add("item-card");
            document.getElementById("itemCard").appendChild(img); //id = itemCard is the more items section

        })
        .catch((error) => {
            console.log(error);
    });

    });
    }).catch((error) => {
        console.log(error);
    });

  } //end of method



