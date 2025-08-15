// scripts/app.js

// إعدادات Firebase الحقيقية
const firebaseConfig = {
  apiKey: "AIzaSyBQOYfNpEnrW5a5k8yp0mezXWdOZCgGR_A",
  authDomain: "badr-23612.firebaseapp.com",
  projectId: "badr-23612",
  storageBucket: "badr-23612.firebasestorage.app",
  messagingSenderId: "75263319914",
  appId: "1:75263319914:web:e99f09e8ee494fbc65cf13",
  measurementId: "G-W0Q11GPSJ8"
};

// استيراد وظائف Firebase
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  Timestamp
} from "firebase/firestore";

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ... (بقية الدوال: signUp, signIn, createGroup, joinGroup, updatePoints, logout) ...

// ربط الأزرار بملف HTML
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const displayNameInput = document.getElementById("displayName");

// إضافة مستمعي الأحداث (Event Listeners)
signupBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  const displayName = displayNameInput.value;
  try {
    await signUp(email, password, displayName);
    console.log("تم إنشاء الحساب بنجاح!");
  } catch (error) {
    console.error("خطأ في إنشاء الحساب:", error);
    alert("فشل إنشاء الحساب: " + error.message);
  }
});

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await signIn(email, password);
    console.log("تم تسجيل الدخول بنجاح!");
  } catch (error) {
    console.error("خطأ في تسجيل الدخول:", error);
    alert("فشل تسجيل الدخول: " + error.message);
  }
});
