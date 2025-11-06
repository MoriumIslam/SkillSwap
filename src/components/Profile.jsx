import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Edit3, User, Mail, Camera, CheckCircle } from "lucide-react";

const AVATAR_FALLBACK = "https://i.postimg.cc/RVgJYLjg/avatar-placeholder.png";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setMessage("Please enter your name");
      setTimeout(() => setMessage(""), 2500);
      return;
    }
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: name.trim(),
        photoURL: photoURL || AVATAR_FALLBACK,
      });
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3500);
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="text-gray-600 mt-2">Manage your SkillSwap account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg text-center font-medium ${
                message.includes("Error")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {!message.includes("Error") && <CheckCircle size={18} />}
                {message}
              </div>
            </div>
          )}

          {!isEditing ? (
            // ===== View Mode =====
            <div className="space-y-6">
              {/* Image */}
              <div className="w-32 h-32 mx-auto relative">
                <img
                  src={user?.photoURL || AVATAR_FALLBACK}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src = AVATAR_FALLBACK;
                  }}
                />
              </div>

              {/* Name */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <User size={18} />
                  <span className="text-sm font-medium">User Name</span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {user?.displayName || "Not provided"}
                </p>
              </div>

              {/* Email (read-only) */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Mail size={18} />
                  <span className="text-sm font-medium">User Email</span>
                </div>
                <p className="text-lg font-medium text-gray-900 break-all">
                  {user?.email || "Not provided"}
                </p>
              </div>

              {/* Update Profile Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
              >
                <span className="inline-flex items-center gap-2">
                  <Edit3 size={18} /> Update Profile
                </span>
              </button>
            </div>
          ) : (
            // ===== Edit Mode =====
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Preview */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 relative">
                  <img
                    src={photoURL || AVATAR_FALLBACK}
                    alt="Preview"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-300"
                    onError={(e) => {
                      e.currentTarget.src = AVATAR_FALLBACK;
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                    <Camera size={14} />
                  </div>
                </div>
                <p className="text-sm text-gray-600">Profile Preview</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  <span className="inline-flex items-center gap-2">
                    <User size={16} /> User Name
                  </span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                  required
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  <span className="inline-flex items-center gap-2">
                    <Camera size={16} /> Profile Photo URL
                  </span>
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Paste an image URL"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to keep the default avatar.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;