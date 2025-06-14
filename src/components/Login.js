import { NETFLIX_BG_IMAGE } from "../util/constants";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../util/validations";
import { useRef, useState } from "react";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [signIn, setSignIn] = useState(true);

  const handleEmailChange = (e) => {
    const isValid = validateEmail(email.current.value);
    setIsEmailValid(isValid);
    email.current.style.border = isValid ? "1px solid green" : "1px solid red";
  };

  const handlePasswordChange = (e) => {
    const isValid = validatePassword(password.current.value);
    setIsPasswordValid(isValid);
    password.current.style.border = isValid
      ? "1px solid green"
      : "1px solid red";
  };

  const handleSubmit = () => {
    if (signIn) {
      if (isEmailValid && isPasswordValid) {
        console.log("Email and password are valid");
      } else {
        console.log("Either of email or password is not valid");
      }
    } else {
      if (isNameValid && isEmailValid && isPasswordValid) {
        console.log("Name, email and password are valid");
      } else {
        console.log("Either of name, email or password is not valid");
      }
    }
  };

  const handleNameChange = (e) => {
    const isValid = validateName(name.current.value);
    setIsNameValid(isValid);
    name.current.style.border = isValid ? "1px solid green" : "1px solid red";
  };
    return (
      <div>
        <div className="absolute top-0 left-0 bg-center z-[1] bg-black">
          <img
            src={NETFLIX_BG_IMAGE}
            alt="background-img"
            className="opacity-50"
          />
        </div>
        <div className="relative z-[2] bg-black text-white w-[28rem] top-0 left-[50%] translate-x-[-50%] rounded-lg">
          <form
            className="flex flex-col px-16 py-16"
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className="text-3xl py-4">{signIn ? "Sign In" : "Sign Up"}</h2>
            {!signIn && <input
              className="rounded-sm text-lg my-3 py-3 px-3 bg-gray-500"
              placeholder="Enter your name"
              type="text"
              ref={name}
              onBlur={(ev) => handleNameChange(ev)}
            />}
            <input
              className="rounded-sm text-lg my-3 py-3 px-3 bg-gray-500"
              placeholder="Enter your email"
              type="email"
              ref={email}
              onBlur={(ev) => handleEmailChange(ev)}
            />
            <input
              className="rounded-sm text-lg my-3 py-3 px-3 bg-gray-500"
              placeholder="password"
              type="password"
              ref={password}
              onBlur={(ev) => handlePasswordChange(ev)}
            />
            <button
              className="bg-red-600 rounded-sm text-lg my-4 py-[6px]"
              onClick={handleSubmit}
            >
              {signIn ? "Sign In" : "Sign Up"}
            </button>
            <p className="text-sm text-gray-500 cursor-pointer">{signIn ? "New to Netflix?" : "Already have an account?"} <span className="text-white cursor-pointer" onClick={() => setSignIn(!signIn)}>{signIn ? "Sign up now." : "Sign in now."}</span></p>
          </form>
        </div>
      </div>
    );
};
export default Login;
