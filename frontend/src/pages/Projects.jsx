import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/portfoliocontext';
import { serverApi } from '../main';

const Projects = () => {
  const {id}=useParams();
  const {projects}=useContext(UserContext);
  console.log("project id:",id);
  console.log(projects);
 const projectFound = projects.find((project) => project._id === id);
 console.log(projectFound);
  return (
    <>
    <div className="project-detail-container fix-width">
      {
       <div className="img-product-container">
        <h3>{projectFound.title}</h3>
        <img src={`${serverApi}/uploads/${projectFound.image}`}  alt="" />
        <p>{projectFound.description}</p>
       </div>
      }
    </div>
    </>
  )
}

export default Projects;