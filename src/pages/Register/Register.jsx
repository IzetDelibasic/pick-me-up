// -React-
import React, { useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import { toast } from "react-toastify";
// -Constants-
import { logoImage, backgroundImage } from "../../constants/ImageConstant";
// -Components-
import { FormRow } from "../../components";
// -Axios-
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
    setFormValid(
      firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        phoneNumber.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    };
    try {
      const response = await axios.post(
        "https://localhost:7065/api/User/UserRegistration",
        userData
      );
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error("An error occurred!");
      return err;
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center md:justify-start cursor-default mx-auto pb-4 pt-0">
        <img src={logoImage} alt="Logo" className="w-[48px] h-[48px]" />
        <div className="text-3xl font-montserrat pl-[0.5rem] text-blue-500">
          Jumpin
        </div>
      </div>
      <div className="bg-white bg-opacity-80 xl:w-[25%] p-8 rounded-[10px] rounded-bl-none flex flex-col items-center">
        <h1 className="text-2xl font-bold text-bluePurple uppercase mb-4 text-center font-montserrat">
          Register
        </h1>
        <Form
          method="post"
          className="flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            onChange={handleInputChange}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            onChange={handleInputChange}
          />
          <FormRow
            type="phone"
            name="phoneNumber"
            labelText="Phone Number"
            onChange={handleInputChange}
            placeholder="123-456-7890"
          />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            onChange={handleInputChange}
            placeholder="example@gmail.com"
          />
          <FormRow
            type="password"
            name="password"
            labelText="Password"
            onChange={handleInputChange}
          />
          <button
            className={`relative bg-blue-500 text-white font-medium py-[1rem] px-[3.5rem] md:px-[4rem] lg:px-[5rem] mr-0 mb-[20px] md:mb-0 rounded-[3rem] group overflow-hidden z-[1] ${
              !formValid && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!formValid}
          >
            <div className="">Register</div>
            <div className="absolute inset-0 bg-black w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
          </button>
        </Form>
        <div className="pt-4 font-montserrat">
          Already a member?
          <Link to="/login" className="ml-1 font-medium text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
