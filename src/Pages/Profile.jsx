import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadProfilePicture,
  updateUserDisplayName,
} from "../features/authSlice";
import { FaUser } from "react-icons/fa";
const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isNameUpdating, setIsNameUpdating] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Ref for file input
  const fileInputRef = useRef(null);

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]); // Set the selected file
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value); // Set the new display name
  };

  // Function to trigger file input on image click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicUpload = async () => {
    if (profilePic) {
      setIsProfileUpdating(true); // Set updating state to disable button
      await dispatch(uploadProfilePicture(profilePic)); // Dispatch the upload action
      setIsProfileUpdating(false); // Reset updating state after completion
    } else {
      alert("Please select a picture first.");
    }
  };

  const handleDisplayNameUpdate = async () => {
    if (displayName) {
      setIsNameUpdating(true); // Set updating state to disable button
      await dispatch(updateUserDisplayName(displayName)); // Dispatch the update display name action
      setIsNameUpdating(false); // Reset updating state after completion
      setDisplayName("");
    } else {
      alert("Please enter a display name.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Profile Image */}
          <img
            src={user?.photoURL || <FaUser />}
            alt="Profile"
            className="w-36 h-36 rounded-full mb-4 cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef} // Use ref for file input
            onChange={handleProfilePicChange}
            style={{ display: "none" }} // Hide the input
          />

          {/* Update Profile Picture Button */}
          <button
            onClick={handleProfilePicUpload}
            disabled={isProfileUpdating} // Disable button when updating
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${
              isProfileUpdating ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isProfileUpdating ? "Updating..." : "Update Picture"}
          </button>

          {/* Display Name Input */}
          <input
            type="text"
            placeholder="Enter display name"
            value={displayName}
            onChange={handleDisplayNameChange}
            className="border border-gray-300 rounded w-full p-2 mb-4"
          />

          {/* Update Display Name Button */}
          <div className="flex gap-4">
            <button
              onClick={handleDisplayNameUpdate}
              disabled={isNameUpdating} // Disable button when updating
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ${
                isNameUpdating ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isNameUpdating ? "Updating..." : "Update Name"}
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default Profile;
