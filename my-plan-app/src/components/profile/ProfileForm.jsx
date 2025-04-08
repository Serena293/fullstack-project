import React, { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../DarkModeContext";
import axios from "axios";

const ProfileForm = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://fullstack-project-70tb.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfileData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          bio: response.data.bio || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.patch(
        "http://localhost:8080/api/profile",
        { bio: profileData.bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setProfileData((prev) => ({ ...prev, bio: response.data.bio }));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className={`profile-loading ${darkMode ? "dark" : "light"}`}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`profile-error ${darkMode ? "dark" : "light"}`}>
        <div className="alert alert-danger">
          {error}
          <button
            className="btn btn-sm btn-light ms-3"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-light">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="mb-0">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  {!isEditing ? (
                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  ) : (
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  )}
                </div>

                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="row mb-4">
                    <div className="col-md-8">
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <p>{profileData.firstName}</p>
                        </div>
                        <div className="col-md-6">
                          <p>{profileData.lastName}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p>{profileData.email}</p>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Bio:</label>
                        {isEditing ? (
                          <textarea
                            className="form-control"
                            rows="3"
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="form-control-static">
                            {profileData.bio || "No bio provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="d-flex justify-content-end mt-4">
                      <button type="submit" className="btn btn-success" disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
