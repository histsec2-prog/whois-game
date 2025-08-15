// firebase.js
// ملف إعداد Firebase الرئيسي للمشروع

// استبدل القيم هنا بقيم مشروعك الحقيقية بعد نسخها من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBQOYfNpEnrW5a5k8yp0mezXWdOZCgGR_A",
  authDomain: "badr-23612.firebaseapp.com",
  projectId: "badr-23612",
  storageBucket: "badr-23612.firebasestorage.app",
  messagingSenderId: "75263319914",
  appId: "1:75263319914:web:e99f09e8ee494fbc65cf13",
  measurementId: "G-W0Q11GPSJ8"
};

// استدعاء مكتبات Firebase المطلوبة
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// تهيئة التطبيق
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
