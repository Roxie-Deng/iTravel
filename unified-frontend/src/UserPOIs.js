import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserPOIs = () => {
  const { user } = useAuth();
  const [pois, setPois] = useState([]);

  useEffect(() => {
    if (user && user.username) { // 使用 username 而非 id
      const fetchUserPOIs = async () => {
        try {
          console.log(`Fetching POIs for user ID: ${user.username}`); // 打印调试信息
          const response = await axios.get(`http://localhost:8080/api/pois/user/${user.username}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setPois(response.data);
          console.log('POIs fetched successfully:', response.data);
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
        {pois.length > 0 ? (
          pois.map(poi => (
            <div key={poi.id} className="item">
              <h3>{poi.name}</h3>
              <p>{poi.description}</p>
              <img src={poi.imageUrl} alt={poi.name} />
            </div>
          ))
        ) : (
          <p>No POIs found.</p>
        )}
      </div>
    </div>
  );
};

export default UserPOIs;
