import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [form, setForm] = useState({Username: '', Email: '', Password: ''});
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/register', form);
            if(form.Email === "admin@gmail.com"){
                navigate('/admindashboard');
            }
            else{
                navigate('/userdashboard')
            }
        }
        catch(err){
            alert("Registration failed");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="Username" onChange={handleChange} placeholder="Username"></input>
            <input name="Email" onChange={handleChange} placeholder="Email"></input>
            <input name="Password" onChange={handleChange} placeholder="Password"></input>
            <button type="Submit">Register</button>
        </form>
    )
}

export default Register;