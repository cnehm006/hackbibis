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
  const uploadMessage = document.getElementById("upload-message");

  if (file) {
    // Get the current user's unique UID from Firebase Authentication
    const userId = auth.currentUser.uid;
    
    // Create a reference to the file in Firebase Storage
    const storageRef = storage.ref(`uploads/${userId}/${file.name}`);
    
    // Check if the file already exists by trying to get its download URL
    storageRef.getDownloadURL()
      .then((url) => {
        // If the file exists, prevent the upload and show an error message
        uploadMessage.textContent = `A file named "${file.name}" already exists. Please choose another file.`;
        uploadMessage.style.color = "red";
        uploadMessage.style.display = "block";
      })
      .catch((error) => {
        // If the file does not exist (404 error), proceed with the upload
        if (error.code === 'storage/object-not-found') {
          // Upload the file
          const uploadTask = storageRef.put(file);

          // Monitor the upload progress
          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
              // Handle unsuccessful uploads
              console.error("Error during file upload:", error.message);
              uploadMessage.textContent = "Error uploading file: " + error.message;
              uploadMessage.style.color = "red";
              uploadMessage.style.display = "block";
            }, 
            () => {
              // Handle successful uploads on complete
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                // Show success message
                uploadMessage.textContent = "File uploaded successfully!";
                uploadMessage.style.color = "green";
                uploadMessage.style.display = "block";
              });
            }
          );
        } else {
          // If there is any other error, display it
          console.error("Error checking file existence:", error.message);
          uploadMessage.textContent = "Error: " + error.message;
          uploadMessage.style.color = "red";
          uploadMessage.style.display = "block";
        }
      });
  } else {
    uploadMessage.textContent = "No file selected.";
    uploadMessage.style.color = "red";
    uploadMessage.style.display = "block";
  }
});