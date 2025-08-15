// scripts/app.js

/*
  هذا الملف يحتوي على جميع الأكواد الخاصة بالتطبيق:
  - تسجيل الدخول / تسجيل حساب
  - واجهة المستخدم
  - التعامل مع Firebase Auth و Firestore
  - اللعب الفردي والجروبات
  - تحديث النقاط والمستوى
  - متجر العناصر
*/

// TODO: ضع هنا firebaseConfig بعد إنشاءه
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// تسجيل حساب جديد
async function signUp(email, password, displayName) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    displayName: displayName,
    email: email,
    avatar: "",
    points: 0,
    level: 1,
    createdAt: Timestamp.now()
  });
  return user;
}

// تسجيل الدخول
async function signIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// مراقبة حالة تسجيل الدخول
onAuthStateChanged(auth, user => {
  if (user) {
    console.log("مستخدم متصل:", user.uid);
    // هنا يمكن إعادة توجيه المستخدم للواجهة الرئيسية
  } else {
    console.log("لا يوجد مستخدم متصل");
  }
});

// وظائف لإنشاء جروب
async function createGroup(name, ownerUid) {
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  const groupRef = doc(db, "groups", code);
  await setDoc(groupRef, {
    name,
    code,
    ownerUid,
    players: [],
    status: "waiting",
    minPlayers: 4,
    maxPlayers: 10,
    currentTurnIndex: 0,
    round: 1,
    createdAt: Timestamp.now()
  });
  return code;
}

// الانضمام لجروب
async function joinGroup(code, player) {
  const groupRef = doc(db, "groups", code);
  await updateDoc(groupRef, {
    players: arrayUnion(player)
  });
}

// تحديث النقاط
async function updatePoints(userId, points) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    points: points
  });
}
