  
import axios from 'axios';
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();


const api = axios.create({
    // baseURL: "https://torchimage-backend.vercel.app/",
    baseURL: "http://localhost:3333/",
        jar: cookieJar,
        withCredentials: true
   });


   
export default api;