import { NETFLIX_BG_IMAGE } from "../util/constants";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../util/validations";
import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../util/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef("");
  const password = useRef("");
  const name = useRef("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [error, setError] = useState(null);

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

  const handleNameChange = (e) => {
    const isValid = validateName(name.current.value);
    setIsNameValid(isValid);
    name.current.style.border = isValid ? "1px solid green" : "1px solid red";
  };

  const handleAuthError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Authentication error:", errorCode, errorMessage);

    switch (errorCode) {
      case "auth/email-already-in-use":
        setError("That email address is already in use.");
        break;
      case "auth/invalid-email":
        setError("That email address is not valid.");
        break;
      case "auth/operation-not-allowed":
        setError("Email/Password authentication is not enabled. Please contact support.");
        break;
      case "auth/weak-password":
        setError("The password is too weak. Please choose a stronger one.");
        break;
      case "auth/user-not-found":
        setError("No account found with this email address.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      default:
        setError(`Authentication failed: ${errorMessage}`);
        break;
    }
  };

  const handleSubmit = async () => {
    setError(null); // Clear any previous errors
    
    if (signIn) {
      if (isEmailValid && isPasswordValid) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          const user = userCredential.user;
          // update the user state
          dispatch(addUser(user));
          // navigate to browse page
          navigate("/browse");
        } catch (error) {
          handleAuthError(error);
        }
      } else {
        setError("Please enter valid email and password");
      }
    } else {
      if (isNameValid && isEmailValid && isPasswordValid) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          const user = userCredential.user;
          // update the user state
          dispatch(addUser(user));
          // navigate to browse page
          navigate("/browse");
        } catch (error) {
          handleAuthError(error);
        }
      } else {
        setError("Please fill in all fields correctly");
      }
    }
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
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          {!signIn && (
            <input
              className="rounded-sm text-lg my-3 py-3 px-3 bg-gray-500"
              placeholder="Enter your name"
              type="text"
              ref={name}
              onBlur={(ev) => handleNameChange(ev)}
            />
          )}
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
          <p className="text-sm text-gray-500 cursor-pointer">
            {signIn ? "New to Netflix?" : "Already have an account?"}{" "}
            <span
              className="text-white cursor-pointer"
              onClick={() => {
                setSignIn(!signIn);
                setError(null); // Clear error when switching modes
              }}
            >
              {signIn ? "Sign up now." : "Sign in now."}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
