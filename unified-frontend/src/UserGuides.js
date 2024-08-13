import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserGuides = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (user && user.username) { // 使用 username 而非 id
      const fetchUserGuides = async () => {
        try {
          console.log(`Fetching guides for user ID: ${user.username}`); // 打印调试信息
          const response = await axios.get(`http://localhost:8080/api/guides/user/${user.username}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setGuides(response.data);
          console.log('Guides fetched successfully:', response.data);
        } catch (error) {
          console.error('Failed to fetch guides:', error);
        }
      };

      fetchUserGuides();
    }
  }, [user]);

  return (
    <div className="section">
      <h2>My Guides</h2>
      <div className="items-container">
        {guides.length > 0 ? (
          guides.map(guide => (
            <div key={guide.id} className="item">
              <h3>{guide.destination}</h3>
              <p>{guide.guide}</p>
            </div>
          ))
        ) : (
          <p>No guides found.</p>
        )}
      </div>
    </div>
  );
};

export default UserGuides;
