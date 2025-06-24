import React from 'react'
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProtectedRoute from './utils/protectedRoute';
import PageNotFound from './components/PageNotFound/PageNotFound';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/projects/:id" element={<Projects/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}
export default App;