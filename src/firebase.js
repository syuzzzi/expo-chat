import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import config from "../firebase.json";

// Firebase 앱 초기화
const app = initializeApp(config);
const auth = getAuth(app);
const storage = getStorage(app); // Firebase Storage 추가

export const signin = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

const uploadImage = async (uri) => {
  if (uri.startsWith("https")) {
    return uri;
  }

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const user = auth.currentUser;
  if (!user) throw new Error("User is not authenticated");

  // ✅ 최신 Firebase Storage 사용법
  const storageRef = ref(storage, `profile/${user.uid}/photo.png`);
  await uploadBytes(storageRef, blob);
  blob.close();

  return await getDownloadURL(storageRef);
};

export const signup = async ({ name, email, password, photo }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const photoURL = await uploadImage(photo);
  await updateProfile(user, { displayName: name, photoURL });
  return user;
};
