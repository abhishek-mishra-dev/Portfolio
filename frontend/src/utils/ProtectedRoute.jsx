import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/portfoliocontext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
