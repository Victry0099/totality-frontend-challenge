// import { createSlice } from "@reduxjs/toolkit";
// import CryptoJS from "crypto-js"; // For encryption and decryption
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   updateProfile,
//   onAuthStateChanged, // Firebase listener for authentication state
//   setPersistence,
//   browserLocalPersistence, // Use Firebase's local persistence setting
// } from "firebase/auth";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { auth, storage } from "../firebase/firebase";

// // Secret key for encryption
// const SECRET_KEY = "my-secret-key";

// // Initial state
// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// // Redux slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setLoading, setUser, setError } = authSlice.actions;

// // Function to extract necessary user data for serialization
// const extractUserData = (user) => {
//   if (!user) return null;
//   return {
//     uid: user.uid,
//     email: user.email,
//     displayName: user.displayName || null,
//     photoURL: user.photoURL || null,
//     emailVerified: user.emailVerified,
//   };
// };

// // Encrypt password and save to local storage
// const saveEncryptedPassword = (password) => {
//   const encryptedPassword = CryptoJS.AES.encrypt(
//     password,
//     SECRET_KEY
//   ).toString();
//   localStorage.setItem("encryptedPassword", encryptedPassword);
// };

// // Decrypt password from local storage
// const getDecryptedPassword = () => {
//   const encryptedPassword = localStorage.getItem("encryptedPassword");
//   if (encryptedPassword) {
//     const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
//     return bytes.toString(CryptoJS.enc.Utf8);
//   }
//   return null;
// };

// // Set Firebase persistence
// const setAuthPersistence = async () => {
//   await setPersistence(auth, browserLocalPersistence);
// };

// // Asynchronous action for registering a new user
// export const registerUser =
//   (email, password, displayName) => async (dispatch) => {
//     try {
//       dispatch(setLoading(true));
//       dispatch(setError(null));

//       // Set persistence before creating the user
//       await setAuthPersistence();

//       // Register the user
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Update the user's profile with display name
//       await updateProfile(user, { displayName });

//       // Save encrypted password to local storage
//       saveEncryptedPassword(password);

//       // Dispatch the updated user to the Redux store
//       dispatch(setUser(extractUserData(user)));
//     } catch (error) {
//       dispatch(setError(error.message)); // Handle registration errors
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

// // Asynchronous action for logging in
// export const loginUser = (email, password) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     dispatch(setError(null));

//     // Set persistence before login
//     await setAuthPersistence();

//     // Log the user in
//     const userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;

//     // Save encrypted password to local storage
//     saveEncryptedPassword(password);

//     // Dispatch the updated user to the Redux store
//     dispatch(setUser(extractUserData(user)));
//   } catch (error) {
//     dispatch(setError(error.message)); // Handle login errors
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // Auto-login user by listening to Firebase auth state changes
// export const autoLoginUser = () => async (dispatch) => {
//   try {
//     // Set persistence before checking for existing authentication
//     await setAuthPersistence();

//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is already logged in, so dispatch their data
//         dispatch(setUser(extractUserData(user)));
//       } else {
//         // User is logged out, clear state
//         dispatch(setUser(null));
//       }
//     });
//   } catch (error) {
//     dispatch(setError(error.message)); // Handle any auto-login errors
//   }
// };

// // Asynchronous action for logging out
// export const logoutUser = () => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));
//     await signOut(auth);
//     localStorage.removeItem("encryptedPassword"); // Clear the encrypted password from local storage
//     dispatch(setUser(null)); // Clear the user from Redux store
//   } catch (error) {
//     dispatch(setError(error.message)); // Handle any logout errors
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// // Upload profile picture function
// export const uploadProfilePicture = (file) => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));

//     const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
//     const snapshot = await uploadBytes(storageRef, file);
//     const photoURL = await getDownloadURL(snapshot.ref);

//     // Update user's photoURL in Firebase Authentication
//     await updateProfile(auth.currentUser, { photoURL });

//     const updatedUser = auth.currentUser;
//     dispatch(setUser(extractUserData(updatedUser)));
//   } catch (error) {
//     dispatch(setError(error.message));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js"; // For encryption and decryption
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged, // Firebase listener for authentication state
  setPersistence,
  browserLocalPersistence, // Use Firebase's local persistence setting
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase/firebase";

// Secret key for encryption
const SECRET_KEY = "my-secret-key";

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setUser, setError } = authSlice.actions;

// Function to extract necessary user data for serialization
const extractUserData = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    emailVerified: user.emailVerified,
  };
};

// Encrypt password and save to local storage
const saveEncryptedPassword = (password) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    SECRET_KEY
  ).toString();
  localStorage.setItem("encryptedPassword", encryptedPassword);
};

// Decrypt password from local storage
const getDecryptedPassword = () => {
  const encryptedPassword = localStorage.getItem("encryptedPassword");
  if (encryptedPassword) {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return null;
};

// Set Firebase persistence
const setAuthPersistence = async () => {
  await setPersistence(auth, browserLocalPersistence);
};

// Asynchronous action for registering a new user
export const registerUser =
  (email, password, displayName) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Set persistence before creating the user
      await setAuthPersistence();

      // Register the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's profile with display name
      await updateProfile(user, { displayName });

      // Save encrypted password to local storage
      saveEncryptedPassword(password);

      // Dispatch the updated user to the Redux store
      dispatch(setUser(extractUserData(user)));
    } catch (error) {
      dispatch(setError(error.message)); // Handle registration errors
    } finally {
      dispatch(setLoading(false));
    }
  };

// Asynchronous action for logging in
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Set persistence before login
    await setAuthPersistence();

    // Log the user in
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save encrypted password to local storage
    saveEncryptedPassword(password);

    // Dispatch the updated user to the Redux store
    dispatch(setUser(extractUserData(user)));
  } catch (error) {
    dispatch(setError(error.message)); // Handle login errors
  } finally {
    dispatch(setLoading(false));
  }
};

// Auto-login user by listening to Firebase auth state changes
export const autoLoginUser = () => async (dispatch) => {
  try {
    // Set persistence before checking for existing authentication
    await setAuthPersistence();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already logged in, so dispatch their data
        dispatch(setUser(extractUserData(user)));
      } else {
        // User is logged out, clear state
        dispatch(setUser(null));
      }
    });
  } catch (error) {
    dispatch(setError(error.message)); // Handle any auto-login errors
  }
};

// Asynchronous action for logging out
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await signOut(auth);
    localStorage.removeItem("encryptedPassword"); // Clear the encrypted password from local storage
    dispatch(setUser(null)); // Clear the user from Redux store
  } catch (error) {
    dispatch(setError(error.message)); // Handle any logout errors
  } finally {
    dispatch(setLoading(false));
  }
};

// Upload profile picture function
export const uploadProfilePicture = (file) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
    const snapshot = await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(snapshot.ref);

    // Update user's photoURL in Firebase Authentication
    await updateProfile(auth.currentUser, { photoURL });

    const updatedUser = auth.currentUser;
    dispatch(setUser(extractUserData(updatedUser)));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Function to update user display name
export const updateUserDisplayName = (newDisplayName) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Update the user's display name in Firebase Authentication
    await updateProfile(auth.currentUser, { displayName: newDisplayName });

    const updatedUser = auth.currentUser;
    dispatch(setUser(extractUserData(updatedUser)));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
