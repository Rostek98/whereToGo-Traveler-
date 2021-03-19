var firebaseConfig = {
  apiKey: "AIzaSyDvi6sKh_qzltWQijYoIlupmikcrvhhwSw",
  authDomain: "uniproject-be097.firebaseapp.com",
  databaseURL: "https://uniproject-be097.firebaseio.com",
  projectId: "uniproject-be097",
  storageBucket: "uniproject-be097.appspot.com",
  messagingSenderId: "1050631639916",
  appId: "1:1050631639916:web:af5059742a70bcc1505949",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const hamburger = document.querySelector(".fas.fa-bars");
const ul = document.querySelector("ul");
const logOutBtn = document.querySelector(".logOut");

// Hamburger

function expand() {
  ul.classList.toggle("active");
}
hamburger.addEventListener("click", expand);

function logOut() {
  console.log("dziala");
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((e) => {
      console.error("Sign Out Error", e);
    });
}

logOutBtn.addEventListener("click", logOut);
