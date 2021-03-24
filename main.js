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
const popUpFinder = document.querySelector('.modal-iframe');
const mapFrame = document.querySelector('.mapFrame');


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
  cardImage.appendChild(image);

  const cardTitle = document.createElement("div");
  cardTitle.className = "cardTitle";
  card.appendChild(cardTitle);

  const h2 = document.createElement("h2");
  h2.textContent = doc.data().name;
  cardTitle.appendChild(h2);

  const textAndIcons = document.createElement("div");
  textAndIcons.className = "textAndIcons";
  cardTitle.appendChild(textAndIcons);

  const firstIcon = document.createElement("i");
  firstIcon.className = "fas fa-map-marker-alt";
  textAndIcons.appendChild(firstIcon);

 firstIcon.addEventListener('click',()=> {
  const close = document.querySelector('.closeMap');
  popUpFinder.classList.add('active');
  mapFrame.setAttribute("src",doc.data().map);
  close.addEventListener('click',()=>{
    popUpFinder.classList.remove('active');
  })
   console.log(doc.data().map);
 })


  const secondIcon = document.createElement("i");
  secondIcon.className = "fas fa-info-circle";
  textAndIcons.appendChild(secondIcon);

  const info = document.createElement("div");
  info.className = "info";
  card.appendChild(info);
  moreInfo(secondIcon, info);

  const firstP = document.createElement("p");
  firstP.textContent = `City: ${doc.data().city}`;
  info.appendChild(firstP);

  const secondP = document.createElement("p");
  secondP.textContent = `Region: ${doc.data().region}`;
  info.appendChild(secondP);

  const thirdP = document.createElement("p");
  thirdP.textContent = `Code: ${doc.data().postalcode}`;
  info.appendChild(thirdP);

  const fourthP = document.createElement("p");
  fourthP.textContent = `Address: ${doc.data().address}`;
  info.appendChild(fourthP);

  const lastIcon = document.createElement("i");
  lastIcon.className = "fas fa-times";
  info.appendChild(lastIcon);
  lessInfo(lastIcon, info);
}

// Function filter
function findAndFilter(e) {
  let inputValue = e.target.value.toLowerCase();
  if (
    inputValue === "odessa" ||
    inputValue === "kharkiv" ||
    inputValue === "chernivtsi" ||
    inputValue === "kiev" ||
    inputValue === "lviv"
  ) {
    findCity(
      "Ukraine",
      inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase()
    );
  } else if (inputValue === "") mainDiv.innerHTML = "";
  if (inputValue === "warsaw" || inputValue === "krakow") {
    findCity(
      "Poland",
      inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase()
    );
  } else if (inputValue === "") mainDiv.innerHTML = "";
  if (inputValue === "moscov" || inputValue === "saint petersburg") {
    findCity(
      "Russia",
      inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase()
    );
  } else if (inputValue === "") mainDiv.innerHTML = "";
  if (
    inputValue === "dresden" ||
    inputValue === "berlin" ||
    inputValue === "munich"
  ) {
    findCity(
      "Deutschland",
      inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase()
    );
  } else if (inputValue === "") mainDiv.innerHTML = "";
  if (inputValue === "barcelona" || inputValue === "granada") {
    findCity(
      "Spain",
      inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase()
    );
  } else if (inputValue === "") mainDiv.innerHTML = "";

  if (
    inputValue === "ukraine" ||
    inputValue === "poland" ||
    inputValue === "russia" ||
    inputValue === "spain"
  ) {
    showCounty(inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase());
  }
  if (inputValue === "germany") {
    inputValue = "deutschland";
    showCounty(inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase());
  }
}

searchBar.addEventListener("input", findAndFilter);

//Order by city name

function findCity(country, city) {
  console.log(`${country} i ${city}`);
  var order = db.collection(country).where("city", "==", city);
  order.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      renderCards(doc);
    });
  });
}

//Order by country name
function showCounty(country) {
  db.collection(country)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        renderCards(doc);
      });
    });
}
