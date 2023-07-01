/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
// import { useAuth } from "../auth";

const signup_url = "http://localhost:8080/api/v1/auth/register";
const signin_url = "http://localhost:8080/api/v1/auth/login";

export const signupUser = (values) => {
  axios.post(signup_url, values);
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
