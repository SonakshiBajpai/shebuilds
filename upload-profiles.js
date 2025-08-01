const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');

// Your Firebase config (using environment variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDgSZhSzC8Shl_z8m5KFW6VxKa8vH9bvQw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "she-builds-876d7.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://she-builds-876d7-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "she-builds-876d7",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "she-builds-876d7.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadProfiles() {
  try {
    console.log('🔥 Reading mock profiles...');
    
    // Read the JSON file
    const jsonData = fs.readFileSync('./mock_female_profiles.json', 'utf8');
    const data = JSON.parse(jsonData);
    
    console.log('📊 Found', Object.keys(data.profiles).length, 'profiles to upload');
    
    // Upload each profile to Firestore
    const uploadPromises = [];
    
    for (const [userId, profileData] of Object.entries(data.profiles)) {
      // Add some additional fields for better matching
      const enhancedProfile = {
        ...profileData,
        name: generateName(), // Generate random name
        email: `${userId}@example.com`,
        phone: generatePhone(),
        id: userId,
        joinDate: new Date().toISOString(),
        isVerified: true,
        lastActive: new Date().toISOString(),
        profileCompletion: 100,
        profilePicture: generateProfilePicture()
      };
      
      // Create document reference
      const docRef = doc(db, 'mockProfiles', userId);
      
      // Upload to Firestore
      uploadPromises.push(
        setDoc(docRef, enhancedProfile).then(() => {
          console.log('✅ Uploaded profile:', userId);
        })
      );
    }
    
    // Wait for all uploads to complete
    await Promise.all(uploadPromises);
    
    console.log('🎉 All profiles uploaded successfully!');
    console.log('📍 Check your Firestore Console: https://console.firebase.google.com/project/she-builds-876d7/firestore');
    
  } catch (error) {
    console.error('❌ Error uploading profiles:', error);
  }
}

// Helper functions
function generateName() {
  const names = [
    'Priya Sharma', 'Ananya Patel', 'Kavya Singh', 'Riya Agarwal', 'Sneha Gupta',
    'Aarya Reddy', 'Ishita Verma', 'Tanvi Kapoor', 'Sakshi Kulkarni', 'Aditi Jain'
  ];
  return names[Math.floor(Math.random() * names.length)];
}

function generatePhone() {
  return '+91' + Math.floor(Math.random() * 9000000000 + 1000000000);
}

function generateProfilePicture() {
  const pics = [
    '/profile1.jpg', '/profile2.jpg', '/profile3.jpg', 
    '/profile4.jpg', '/profile5.jpg'
  ];
  return pics[Math.floor(Math.random() * pics.length)];
}

// Run the upload
uploadProfiles(); 