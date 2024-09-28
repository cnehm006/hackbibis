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