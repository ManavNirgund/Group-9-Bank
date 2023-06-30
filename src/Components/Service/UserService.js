import axios from "axios";
// import { useAuth } from "../auth";

const token = localStorage.getItem('token')

const signup_url = "http://localhost:8080/api/v1/auth/register";
// const signin_url = "http://localhost:8080/api/v1/auth/login";

export const signupUser = (values) => {
  axios.post(signup_url, values, {
    headers: {
      "Access-Control-Allow-Origin": "",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Accept: "*/*",
    },
  });
};

// export const signinUser = (values) => {
//   // const auth = useAuth();

//   axios.post("http://localhost:8080/api/v1/auth/login", values).then((res) => {
//     const token = res.data.access_token;
//     const { email, password } = values;

//     console.log(token);
//     localStorage.setItem("access_token", JSON.stringify(token));
//     auth.login({ email, password, token });
//   });
// };

// export const getTransData = (values) => {
//   axios.get()
// }
