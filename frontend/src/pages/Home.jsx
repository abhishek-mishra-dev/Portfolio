import React, { useContext } from 'react'
import { UserContext } from '../context/portfoliocontext';
import Card from '../components/card/Card';
import Tooltips from '../components/tooltips/Tooltips';

import { MdCall } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import CardShimmer from '../components/CardShimmer/CardShimmer';


const Home = () => {
  const { projects,loading } = useContext(UserContext);
 
 console.log("loading",loading);
  return (
    <>
      <div className="hero-section fix-width">
        <div className="hero-container">
          <img src="./Afjal.heic" alt="" />
          <a href="https://github.com/Afzal-Mia?tab=repositories" target='_blank' id='github' className='links' ><FaGithub size={40} color='black' className='icons' /></a>
          <a href="mailto:mohammedafzal1213@gmail.com" id='mail' className='links' ><MdEmail size={40} color='orange' className='icons' /></a>
          <a href="https://x.com/mohdafzal7534" target='_blank' id='x' className='links' ><FaSquareXTwitter size={40} color='black' className='icons' /></a>
          <a href="tel:+916392670425" id='call' className='links' ><MdCall size={40} color='blue' className='icons' /></a>
          <a href="https://wa.me/916392670425" target='_blank' id='whatsapp' className='links' ><IoLogoWhatsapp size={40} color='green' className='icons' /></a>
          <a href="https://www.linkedin.com/in/afzal-mia-606aa0293/" target='_blank' id='linkedin' className='links' ><FaLinkedin size={40} color='blue' className='icons' /></a>
          <a href="https://drive.google.com/file/d/1Zn5xVFmj8LDW8OXpGEOKeVkIcrT3ZnrN/view" download id='resume' className='icons links'>Resume📄</a>
        </div>
        <div className="fade-container ">
        </div>
      </div>

      
    

    <div className="text"><h1 className='text-animation'>Md Afjal <span id="surname">Ansari</span></h1></div>
      <div className="projects-container fix-width" id="projects">
  {loading ? (
    <>
      <CardShimmer/>
      <CardShimmer/>
      <CardShimmer/>
    </>
  ) : (
    projects.map((project) => (
      <Card key={project._id} project={project} />
    ))
  )}


</div>


    {/* Skills Section */}
    <div className="text"><h1 className='text-animation'><span id="surname">Skills</span></h1></div>

    <div className="skill-section fix-width" id="skills">
      <div className="frontend-container">
        <div className="frontend-skills appearLeft">
          <h3>Frontend</h3>
          <div className="skills-icon">
            <Tooltips content="Html" />
            <Tooltips content="Css" />
            <Tooltips content="JavaScript" />
            <Tooltips content="Tailwind" />
            <Tooltips content="Bootstrap"/>
            <Tooltips content="Redux" />
            <Tooltips content="MaterialUI" />
          </div>
        </div>
        <div className="frontend-img">
          <img src="./frontend.png" alt="frontend Image" className='imageShow'/>
        </div>
      </div>
      
      <div className="frontend-container backend-container">
        <div className="frontend-skills appearRight">
          <h3>Backend</h3>
          <div className="skills-icon">
            <Tooltips content="Node.js" />
            <Tooltips content="Express.js" />
            <Tooltips content="MongoDB" />
            <Tooltips content="PostgreSql"/>
            <Tooltips content="Git" />
            <Tooltips content="Github"/>
            <Tooltips content="VersionControl" />
            <Tooltips content="Postman" />
          </div>
        </div>
        <div className="frontend-img">
          <img src="./backend.png" alt="frontend Image" className='imageShow' />
        </div>
      </div>
   
    </div>
    {/* About me Section */}
 <div className="text"><h1 className='text-animation'><span id="surname">Education</span></h1></div>
    <div className="about_me fix-width" id='about'>
      <div className="education-container">
         <div className="details-grid">
                <div className="detail-card imageShow">
                    <h3 className="card-title">
                        <span className="emoji">🏫</span>
                        <span>10th Grade</span>
                    </h3>
                    <p className="card-text">
                        <span className="semibold">Board:</span> <span>State board</span>
                    </p>
                    {/* <p class="card-text">
                        <span class="font-semibold">Year:</span> <span>2017</span>
                        </p> */}
                    <p className="card-text">
                        <span className="semibold">Percentage:</span> <span>83.16%</span>
                    </p>
                </div>

                <div className="detail-card imageShow">
                    <h3 className="card-title">
                        <span className="emoji">🎓</span>
                        <span>12th Grade</span>
                    </h3>
                    <p className="card-text">
                        <span className="semibold">Board:</span> <span>State Board</span>
                    </p>
                    {/* <p class="card-text">
                        <span class="font-semibold">Year:</span> <span>2019</span>
                    </p> */}
                    <p className="card-text">
                        <span className="semibold">Percentage:</span> <span>78%</span>
                    </p>
                </div>

                <div className="detail-card imageShow">
                    <h3 className="card-title">
                        <span className="emoji">👨‍🎓</span>
                        <span>Graduation</span>
                    </h3>
                    <p className="card-text">
                        <span className="semibold">Degree:</span> <span>Bachelor of Technology(CSE)</span>
                    </p>
                    <p className="card-text">
                        <span className="semibold">University:</span> <span>Dr Apj Abdul Kalam Technical University,Lucknow</span>
                    </p>
                    <p className="card-text">
                        <span className="semibold">Year:</span> <span>2025</span>
                    </p>
                    <p className="card-text">
                        <span className="semibold">CGPA:</span> <span>Approximately 7.5</span>
                    </p>
                </div>
            </div>
      </div>
    </div>

    {/* Contact */}
<div id="fixed-contact">
  <a href="tel:+916392670425"  id='cl' ><MdCall size={40} color='blue'  /></a>
<a href="https://wa.me/916392670425" target='_blank' ><IoLogoWhatsapp size={40} color='green'  /></a>
 <a href="mailto:mohammedafzal1213@gmail.com" id='ml' ><MdEmail size={40} color='orange'  /></a>
   
</div>
{/* footer */}
<footer className="footer appearRight fix-width">
  <div className="footer-content ">
    <div className="footer-brand">
      <h2>Md Afjal Ansari</h2>
      <p>Full Stack Developer</p>
    </div>

    <div className="footer-links">
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </div>

    <div className="footer-social">
      <a href="https://github.com/Afzal-Mia" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
      <a href="https://linkedin.com/in/afzal-mia-606aa0293" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      <a href="https://x.com/mohdafzal7534" target="_blank" rel="noopener noreferrer"><FaSquareXTwitter /></a>
      <a href="mailto:mohammedafzal1213@gmail.com"><MdEmail /></a>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} Md Afjal Ansari. All rights reserved.</p>
  </div>
</footer>

 </>

  )
}

export default Home;