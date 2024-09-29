// Firebase configuration for Hackbibi project
const firebaseConfig = {
    apiKey: "AIzaSyAeVO91EBeTQl-Ritjsg0tZPfQ2m0Aj6wE",
    authDomain: "hackbibi-b355d.firebaseapp.com",
    projectId: "hackbibi-b355d",
    storageBucket: "hackbibi-b355d.appspot.com",
    messagingSenderId: "1078264251831",
    appId: "1:1078264251831:web:6f5adfc2b7703a74f09432",
    measurementId: "G-V0T9MC6NQ6"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  
  // Toggle between Sign In and Sign Up forms
  const showLoginBtn = document.getElementById("show-login");
  const showSignupBtn = document.getElementById("show-signup");
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  
  showLoginBtn.addEventListener("click", () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });
  
  showSignupBtn.addEventListener("click", () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });
  
  // Function to display error messages
  function displayError(message, elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
  
  // Sign-Up
  const signupBtn = document.getElementById("signup-btn");
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
  
    if (password.length < 6) {
      displayError("Password must be at least 6 characters.", "signup-error");
      return;
    }
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed up:", userCredential.user);
        window.location.href = "main.html"; // Redirect to main page
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
        
        // Display specific error messages
        if (error.code === 'auth/email-already-in-use') {
          displayError("The email address is already in use by another account.", "signup-error");
        } else if (error.code === 'auth/invalid-email') {
          displayError("The email address is invalid.", "signup-error");
        } else if (error.code === 'auth/weak-password') {
          displayError("The password is too weak.", "signup-error");
        } else {
          displayError(error.message, "signup-error"); // Generic error
        }
      });
  });
  
  // Sign-In
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
  
        // Display specific error messages
        if (error.code === 'auth/wrong-password' || error.message.includes('INVALID_LOGIN_CREDENTIALS')) {
          displayError("Incorrect password. Please try again.", "login-error");
        } else if (error.code === 'auth/user-not-found') {
          displayError("No account found with this email.", "login-error");
        } else if (error.code === 'auth/invalid-email') {
          displayError("The email address is invalid.", "login-error");
        } else {
          displayError(error.message, "login-error"); // Generic error
        }
      });
  });  