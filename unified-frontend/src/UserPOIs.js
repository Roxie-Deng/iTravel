import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserPOIs = () => {
  const { user } = useAuth();
  const [pois, setPois] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserPOIs = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/pois/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setPois(response.data);
        } catch (error) {
          console.error('Failed to fetch POIs:', error);
        }
      };

      fetchUserPOIs();
    }
  }, [user]);

  return (
    <div className="section">
      <h2>My POIs</h2>
      <div className="items-container">
        {pois.map(poi => (
          <div key={poi.id} className="item">
            <h3>{poi.title}</h3>
            <p>{poi.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPOIs;