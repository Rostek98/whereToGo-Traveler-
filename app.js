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
const switchToRegister = document.getElementById("toggler");
const emailField = document.querySelector(".email-field");
const nameField = document.querySelector(".name-field");
const passwordField = document.querySelector(".password-field");
const signInBtn = document.querySelector(".signInBtn");
const signUpBtn = document.querySelector(".signUpBtn");
const mainTxt = document.querySelector(".mainTxt");
const formPart = document.querySelector(".registration");
const imagePart = document.querySelector(".image");
let left = true;
//Change to register
const toggleSign = () => {
  if (left) {
    formPart.style.right = "50%";
    imagePart.style.left = "50%";
    imagePart.style.borderRadius = "0px 10px 10px 0px";

    left = false;
    left = false;
  } else {
    formPart.style.right = "0%";
    imagePart.style.left = "0%";
    imagePart.style.borderRadius = "10px 0px 0px 10px";

    left = true;
    left = true;
  }
  nameField.classList.toggle("active");
  signInBtn.classList.toggle("active");
  signUpBtn.classList.toggle("active");

  if (mainTxt.textContent === "Sign In") {
    mainTxt.textContent = "Sign Up";
  } else {
    mainTxt.textContent = "Sign In";
  }
};

switchToRegister.addEventListener("click", toggleSign);

//Sign UP
function signUp(e) {
  e.preventDefault();

  firebase
    .auth()
    .createUserWithEmailAndPassword(emailField.value, passwordField.value)
    .then(function () {
      window.location.href = "main.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    var user = firebase.auth().currentUser;
    if (user == null) {
      window.location.href = "index.html";
    }
  } else {
  }
});

function signIn(e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(emailField.value, passwordField.value)
    .then(function () {
      window.location.href = "main.html";
    })
    .catch(function (error) {
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

signInBtn.addEventListener("click", signIn);
signUpBtn.addEventListener("click", signUp);
