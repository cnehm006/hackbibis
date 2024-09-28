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