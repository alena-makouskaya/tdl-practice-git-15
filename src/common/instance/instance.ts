import axios from "axios";

export const settings = {
    withCredentials: true,
    headers: {
      "API-KEY": "7b598717-c73b-45c6-bd2c-d5029693391a",
    },
  };
  
  export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings,
  });