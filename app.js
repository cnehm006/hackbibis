// Your web app's Firebase configuration
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
  
  // Get Firebase Authentication and Cloud Storage
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  // User Sign-Up
  const signupBtn = document.getElementById("signup-btn");
  signupBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if (!email || !password) {
      console.error("Please enter both email and password.");
      return;
    }
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed up:", userCredential.user);
        document.getElementById("upload-container").style.display = "block";  // Show upload section
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  });
  
  // User Login
  const loginBtn = document.getElementById("login-btn");
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (!email || !password) {
      console.error("Please enter both email and password.");
      return;
    }
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        document.getElementById("upload-container").style.display = "block";  // Show upload section
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
      });
  });
  
  // File Upload
  const uploadBtn = document.getElementById("upload-btn");
  uploadBtn.addEventListener("click", () => {
    const file = document.getElementById("file-upload").files[0];
    if (file) {
      const storageRef = storage.ref(`uploads/${auth.currentUser.uid}/${file.name}`);
      storageRef.put(file)
        .then((snapshot) => {
          console.log("File uploaded successfully:", snapshot.metadata);
        })
        .catch((error) => {
          console.error("Error uploading file:", error.message);
        });
    } else {
      console.log("No file selected.");
    }
  });
  