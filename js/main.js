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
const storage = firebase.storage();

// Check if user is authenticated
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("user-email").textContent = user.email;
  } else {
    window.location.href = "login.html"; // Redirect to login if not logged in
  }
});

// Log out
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html"; // Redirect to login on logout
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