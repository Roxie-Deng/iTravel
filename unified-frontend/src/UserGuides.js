import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserGuides = () => {
  const { user } = useAuth();
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserGuides = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/guides/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setGuides(response.data);
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
        {guides.map(guide => (
          <div key={guide.id} className="item">
            <h3>{guide.title}</h3>
            <p>{guide.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserGuides;