import React, { useContext } from 'react'
import { UserContext } from '../context/portfoliocontext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const {user} = useContext(UserContext);
  const navigate=useNavigate();
//  console.log(user);
  if (!user) {
    // alert("Login First");
    // console.log(user);
    return navigate('/');
  }

  return children;
};


export default ProtectedRoute;