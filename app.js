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
const hamburger = document.querySelector(".fas.fa-bars");
const ul = document.querySelector("ul");
const logOutBtn = document.querySelector(".logOut");
const wrapper = document.querySelector(".wrapper");
const modalWrapper = document.querySelector(".modal-wrap ");
const modal = document.querySelector(".modal");
const modalIcon = document.querySelector(".modal-icon");
const errorMessage = document.querySelector(".error-message");

let left = true;

//Change to register
const toggleSign = () => {
  if (left) {
    formPart.style.right = "50%";
    imagePart.style.left = "50%";
    imagePart.style.borderRadius = "0px 10px 10px 0px";
    mainTxt.textContent = "Sign Up";
    switchToRegister.textContent = "Sign In";
    left = false;
  } else {
    formPart.style.right = "0%";
    imagePart.style.left = "0%";
    imagePart.style.borderRadius = "10px 0px 0px 10px";
    mainTxt.textContent = "Sign In";
    switchToRegister.textContent = "Sign up";

    left = true;
  }
  // nameField.classList.toggle("active");

  signInBtn.classList.toggle("active");
  signUpBtn.classList.toggle("active");
};

switchToRegister.addEventListener("click", toggleSign);

function errorModalMessage(error) {
  wrapper.classList.add("blur");
  modalWrapper.classList.add("active");
  modal.classList.add("active");
  errorMessage.textContent = error;
}

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
      var errorMessage = error.message;
      errorModalMessage(errorMessage);
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

function closeErrorMessage() {
  wrapper.classList.remove("blur");
  modalWrapper.classList.remove("active");
  modal.classList.remove("active");
}
modalIcon.addEventListener("click", closeErrorMessage);

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

      errorModalMessage(errorMessage);
      // alert(errorMessage);
    });
}

signInBtn.addEventListener("click", signIn);
signUpBtn.addEventListener("click", signUp);
