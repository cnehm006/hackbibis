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