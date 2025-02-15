import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = auth.currentUser;
  return { uid, name: displayName, email, photo: photoURL };
};

export const updateUserInfo = async (photo) => {
  const photoURL = await uploadImage(photo);
  await updateProfile(auth.currentUser, { photoURL });
  return photoURL;
};

export const signout = async () => {
  await signOut(auth);
  return {};
};

const db = getFirestore(app);

export const createChannel = async ({ title, desc }) => {
  const channelCollection = collection(db, "channels");
  const newChannelRef = doc(channelCollection);
  const id = newChannelRef.id;
  const newChannel = {
    id,
    title,
    description: desc,
    createdAt: Date.now(),
  };
  await setDoc(newChannelRef, newChannel);
  return id;
};

export const createMessage = async ({ channelId, message }) => {
  const docRef = doc(db, `channels/${channelId}/messages`, message._id);
  await setDoc(docRef, { ...message, createdAt: Date.now() });
};
