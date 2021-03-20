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
var db = firebase.firestore();

const hamburger = document.querySelector(".fas.fa-bars");
const ul = document.querySelector("ul");
const logOutBtn = document.querySelector(".logOut");
const infoIcon = document.querySelector(".fas.fa-info-circle");
const infoAboutObject = document.querySelector(".info");
const closeInfo = document.querySelector(".fas.fa-times");
const mainDiv = document.querySelector("main");
const renderTest = document.querySelector(".renderTest");
const searchBar = document.querySelector(".searchBar");

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

// Expand info div
function moreInfo(clickedElement, openInfo) {
  clickedElement.addEventListener("click", () => {
    openInfo.classList.add("active");
  });
}
//Close info div
function lessInfo(closeIcon, closeInfo) {
  closeIcon.addEventListener("click", () =>
    closeInfo.classList.remove("active")
  );
}

//Render cards

function renderCards(doc) {
  const card = document.createElement("div");
  card.className = "card";
  mainDiv.appendChild(card);

  const cardImage = document.createElement("div");
  cardImage.className = "cardImage";
  card.appendChild(cardImage);

  const image = document.createElement("img");
  image.setAttribute("src", doc.data().img);
  // image.setAttribute("src", "./img/mainPhone/for1920.jpg");
  cardImage.appendChild(image);

  const cardTitle = document.createElement("div");
  cardTitle.className = "cardTitle";
  card.appendChild(cardTitle);

  const h2 = document.createElement("h2");
  h2.textContent = doc.data().name;
  // h2.textContent = "Name of place";
  cardTitle.appendChild(h2);

  const textAndIcons = document.createElement("div");
  textAndIcons.className = "textAndIcons";
  cardTitle.appendChild(textAndIcons);

  const firstIcon = document.createElement("i");
  firstIcon.className = "fas fa-map-marker-alt";
  textAndIcons.appendChild(firstIcon);

  const secondIcon = document.createElement("i");
  secondIcon.className = "fas fa-info-circle";
  textAndIcons.appendChild(secondIcon);

  const info = document.createElement("div");
  info.className = "info";
  card.appendChild(info);
  moreInfo(secondIcon, info);

  const firstP = document.createElement("p");
  firstP.textContent = `City: ${doc.data().city}`;
  // firstP.textContent = "City:Lviv";
  info.appendChild(firstP);

  const secondP = document.createElement("p");
  secondP.textContent = `Region: ${doc.data().region}`;
  // secondP.textContent = `Region:Lviv Oblast`;
  info.appendChild(secondP);

  const thirdP = document.createElement("p");
  thirdP.textContent = `Code: ${doc.data().postalcode}`;
  // thirdP.textContent = `Postal Code: 79008`;
  info.appendChild(thirdP);

  const fourthP = document.createElement("p");
  fourthP.textContent = `Address: ${doc.data().address}`;
  // fourthP.textContent = `Address:Rynok Square, 1`;
  info.appendChild(fourthP);

  const lastIcon = document.createElement("i");
  lastIcon.className = "fas fa-times";
  info.appendChild(lastIcon);
  lessInfo(lastIcon, info);
}

//Function filter

function findAndFilter(e) {
  const inputValue = e.target.value.toLowerCase();
  if (inputValue === "odessa") {
    orderOdessa();
  } else if (inputValue === "") mainDiv.innerHTML = "";
  if (inputValue === "warsaw") {
    orderWarsaw();
  }
}

searchBar.addEventListener("input", findAndFilter);

function orderOdessa() {
  db.collection("Ukraine")
    .where("city", "==", "Odessa")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        renderCards(doc);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function orderWarsaw() {
  var order = db.collection("Poland").where("city", "==", "Warsaw");
  order.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, " => ", doc.data());
      renderCards(doc);
    });
  });
}
