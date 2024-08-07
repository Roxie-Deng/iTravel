import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("User status changed:", user);
  }, [user]); // 当 user 改变时输出日志
  console.log("Navigation: Current user state", user);
  
  const handleLogout = () => {
    logout(navigate); // 传递navigate参数进行重定向
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/guide">Guide</Link>
      <Link to="/preferences">Preferences</Link>
      {user ? (
        <>
          <Link to="/profile">My Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;