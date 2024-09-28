const firebaseConfig = {
    apiKey: "AIzaSyAeVO91EBeTQl-Ritjsg0tZPfQ2m0Aj6wE",
    authDomain: "hackbibi-b355d.firebaseapp.com",
    projectId: "hackbibi-b355d",
    storageBucket: "hackbibi-b355d.appspot.com",
    messagingSenderId: "1078264251831",
    appId: "1:1078264251831:web:6f5adfc2b7703a74f09432",
    measurementId: "G-V0T9MC6NQ6"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
      window.location.href = "main.html"; // Redirect to main page
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
      document.getElementById("login-error").textContent = error.message;
    });
});