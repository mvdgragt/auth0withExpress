import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5001/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  if (loading) return <div
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#ccc",
          borderRadius: "50%",
          marginBottom: "15px",
        }}
      ></div>;
  if (!user) return <p>Not logged in.</p>;
  return (
    <div>
      <h2>Hello {user.given_name || user.name}</h2>
      <h2>User Email address is:- {user.email}</h2>
      {user.picture && (
        <img
          src={user.picture}
          alt={user.name}
          style={{ width: 80, borderRadius: "50%" }}
        />
      )}
      
    </div>
  );
};

export default Profile;
