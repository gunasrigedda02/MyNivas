import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, serPassword] = useState("");
    const [name, setName] = useState("")
    const [home, setHome] = useState("");

    const userEmail = (event) => {
        setEmail(event.target.value);
    }

    const userPassword = (event) => {
        serPassword(event.target.value);
    }

    const userName = (event) => {
        setName(event.target.value)
    }
    const submitForm = () => {
        navigate("/Login");
    }
  return (
    <div>
        <form onSubmit={() => submitForm()}>
            Full Name: <input type="text" required onChange={() => userName()}/>
            Email: <input type="text" required onChange={() => userEmail()}/>
            Password: <input type="password" required onChange={() => userPassword()}/>
            <button onClick="submit">REGISTER</button>
        </form>
        <div>
            Already a user <a onClick={() => navigate("/Login")}>Login</a>
        </div>
    </div>
  )
}

export default Register;