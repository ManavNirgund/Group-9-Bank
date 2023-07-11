/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
// import { useAuth } from "../auth";

const signup_url = "http://localhost:8090/authentication/api/v1/auth/register";
// const signin_url = "http://localhost:8080/api/v1/auth/login";

export const signupUser = async (values) => {
  axios.post(signup_url, values, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  });
  // const response = await fetch(signup_url, {
  //   method: "POST",
  //   mode: "no-cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(values),
  // });

  // if (!response.ok) {
  //   const errorData = await response.json();
  //   throw new Error(errorData.message);
  // }

  // console.log("Registered: ", values);
};

// export const signinUser = (values, auth) => {
//   axios.post("http://localhost:8080/api/v1/auth/login", values)
//     .then((res) => {
//       const token = res.data.access_token;
//       const { email, password } = values;

//       console.log(token);
//       localStorage.setItem("access_token", JSON.stringify(token));
//       localStorage.setItem("email",email)
//       auth.login({ email, password, token });

//     })
//     .catch((error) => {
//       // Handle error
//       console.error("Signin error:", error);
//     });
//   //  const{email,password} = values;

// };
// export const data = () => {
//   const email = localStorage.getItem('email')
//   axios.get(`https://localhost:8080/users/email/${email}`).then((res)=>{
//     console.log(res);
//     localStorage.setItem('data',res)
//   })
// }
