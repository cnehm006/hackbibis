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

const signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (password.length < 6) {
    document.getElementById("signup-error").textContent = "Password must be at least 6 characters.";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      window.location.href = "main.html"; // Redirect to main page
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
      document.getElementById("signup-error").textContent = error.message;
    });
});