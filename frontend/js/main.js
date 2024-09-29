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
const storage = firebase.storage();

// Check if user is authenticated
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("user-email").textContent = user.email;
  } else {
    window.location.href = "index.html";
  }
});

// Log out
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
});

// File Upload
const uploadBtn = document.getElementById("upload-btn");
uploadBtn.addEventListener("click", async () => {
  const file = document.getElementById("file-upload").files[0];
  const uploadMessage = document.getElementById("upload-message");

  if (file) {
    const userId = auth.currentUser.uid;
    const storageRef = storage.ref(`uploads/${userId}/${file.name}`);

    storageRef.getDownloadURL()
      .then((url) => {
        uploadMessage.textContent = `A file named "${file.name}" already exists.`;
        uploadMessage.style.color = "red";
        uploadMessage.style.display = "block";
      })
      .catch((error) => {
        if (error.code === 'storage/object-not-found') {
          const uploadTask = storageRef.put(file);
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              uploadMessage.textContent = "Error uploading file: " + error.message;
              uploadMessage.style.color = "red";
              uploadMessage.style.display = "block";
            },
            async () => {
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
              uploadMessage.textContent = "File uploaded successfully!";
              uploadMessage.style.color = "green";
              uploadMessage.style.display = "block";
            }
          );
        }
      });
  } else {
    uploadMessage.textContent = "No file selected.";
    uploadMessage.style.color = "red";
    uploadMessage.style.display = "block";
  }
});

// Generate Questions Button Listener
const generateBtn = document.getElementById("generate-btn");
generateBtn.addEventListener("click", async () => {
  const examDate = document.getElementById("exam-date").value;
  if (!examDate) {
    alert("Please set your exam date.");
    return;
  }

  const userId = auth.currentUser.uid;
  const filesRef = storage.ref(`uploads/${userId}`);
  const files = await filesRef.listAll();

  if (files.items.length === 0) {
    alert("No files found. Please upload files first.");
    return;
  }

  const fileURLs = [];
  for (const item of files.items) {
    const downloadURL = await item.getDownloadURL();
    fileURLs.push(downloadURL);
  }

  const formData = new FormData();
  formData.append("fileURLs", JSON.stringify(fileURLs));

  const response = await fetch("http://localhost:3000/process-files", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  document.getElementById("questions-container").innerHTML = result.questions;

  scheduleExamReminder(examDate);
});

// Request permission for notifications
async function requestNotificationPermission() {
  if (Notification.permission === "default") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Please enable notifications.");
    }
  }
}

// Call notification permission on page load
requestNotificationPermission();

// Schedule notifications for exam date
function scheduleExamReminder(examDate) {
  const examTimestamp = new Date(examDate).getTime();
  const now = Date.now();
  const timeUntilExam = examTimestamp - now;

  if (timeUntilExam > 0) {
    setTimeout(() => {
      new Notification("Exam Reminder", {
        body: "Your exam is coming up! Time to review your course material."
      });
    }, timeUntilExam);
  }
}