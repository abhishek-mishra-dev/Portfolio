import React from 'react'
import { FaGithub } from 'react-icons/fa'
import './Card.css'
import { CgLivePhoto } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { serverApi } from '../../utils/config';


function Card({project}) {
  const navigate=useNavigate();

 const handleImgClick=(id)=>{
  navigate(`/projects/${id}`)
 }
  return (
    <>
     <div className="main-card imageShow">
      <div className="img-container ">
        <img src={`${serverApi}/uploads/${project.image}`} onClick={()=>handleImgClick(project._id)}  alt="" />
      </div>
      <div className="card-footer">
        <span>{project.description}</span>
      </div>
      <h3>{project.title}</h3>
      <div className="btn-group">
        <a href={project.url1}>Github <FaGithub /></a>
        {project.url2 &&(<a href={project.url2} id='live'>Live <CgLivePhoto/></a>)}
      </div>
    </div>
    </>
  )
}

export default Card