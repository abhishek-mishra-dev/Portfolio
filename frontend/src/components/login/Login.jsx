import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import './Login.css'
import { serverApi } from '../../main';
import { useContext } from 'react';
import { UserContext } from '../../context/portfoliocontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = ({ setIsLogin }) => {
     const navigate = useNavigate();
    const [formSending,setFormSending]=useState(false);
    const {setUser}=useContext(UserContext)
    const [formData, setFormData] = useState({
        'email': '',
        'password': ''
    })
    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSending(true);
        fetch(`${serverApi}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
               if(data.success){
                toast.success("Logged in Successfully");
                console.log(data);
                localStorage.setItem("token",data.token);
                setFormSending(false);
                setUser(true);
                setIsLogin(false)
                navigate('/dashboard');
            }
            else{
                setFormSending(false);
                toast.error(data.message);
                console.log(data.message);
                console.log("something went wrong!......");
                setUser(false);
                navigate('/');
               }
            })
            .catch((e) => {
                toast.error(e.message);
            })
    }

    return (
        <>
            <div className="login">
                <div className="login-container">
                    <div className="head">
                        <h3>Login</h3>
                        <span id='cross-icon' onClick={() => setIsLogin(false)}>
                            <RxCross1 color='blue' size={30} />
                        </span></div>
                    <form id='login-form' onSubmit={handleSubmit}>
                        <input type="email" value={formData.email} name='email' onChange={handleForm} placeholder='Enter Email Here..' required />
                        <input type="password" value={formData.password} name='password' onChange={handleForm} placeholder='Enter Password..' required />
                        <input type="submit" value={formSending ? "Just A Second ....." :"Login"} />

                    </form>
                </div>

            </div>
        </>
    )
}

export default Login;