import { useEffect, useState, useContext } from "react";
import {
  googleSignInWithPopUp,
  googleSignInWithRedirect,
  db,
  auth,
  addUserDataToDatabase,
} from "../../../Utils/Firebase/firebase.utils";
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import FormInput from "../Minor Components/FormInput.component";
import Button from "../Minor Components/Button.component";
import { userContext } from "../../../Contexts/user.context";
import { Navigate } from "react-router-dom";

const defaultUserDetails = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [userDetails, setUserDetails] = useState(defaultUserDetails);

  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = userDetails;
  const { currentUser } = useContext(userContext);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await addUserDataToDatabase(response.user);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const logInUserWithGooglePopUp = async (e) => {
    const { user } = await googleSignInWithPopUp();
    await addUserDataToDatabase(user);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUserDetails(defaultUserDetails);
      setErrorMessage("");
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        setErrorMessage(
          "Invalid login details, please make sure your Email or Password is correct."
        );
      }

      setUserDetails(defaultUserDetails);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center  mx-60">
        <h2 className="my-4 text-4xl">Login</h2>
        <form onSubmit={handleOnSubmit} className="flex flex-col w-96 my-4 ">
          <FormInput
            label="Email"
            type="email"
            name="email"
            required
            value={email}
            onChange={handleOnChange}
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={handleOnChange}
          />
          <p className="underline hover:cursor-pointer">
            Forgot your password?
          </p>
          <div className="flex flex-row py-4">
            <Button type="submit">Sign in</Button>
            <Button
              buttonType="google"
              type="button"
              onClick={logInUserWithGooglePopUp}
            >
              Sign in with Google
            </Button>
          </div>
          <Link className="m-auto pt-4 underline" to="/sign-up">
            Create an account
          </Link>
        </form>
        {errorMessage && <div className="text-xl px-44">{errorMessage}</div>}
        {currentUser && <Navigate to="/" replace={true} />}
      </div>
    </>
  );
};

export default SignIn;
