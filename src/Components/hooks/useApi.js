import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import useLocalStorage from "../auth/Hooks/useLocalStorage";

const user = useLocalStorage.GetUser();

const processResult = (value) => {
  if (value && (value.result === null || value.result === undefined))
    return { isSucess: true, result: [] };
  if (value.status && value.status !== 200) {
    throw `${value.status} : ${value.title}`;
  }
  if (
    value !== null &&
    value !== undefined &&
    value.result !== null &&
    value.result !== undefined
  ) {
    return { isSucess: true, result: value.result };
  }
  if (value.errorMessage !== undefined)
    return { isSucess: false, error: value.errorMessage };
  else {
    return {
      isSucess: false,
      error: "Erreur inconnue lors de l'appel api. ",
    };
  }
};
const request = async (method, route, content) => {
  let header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
    Authorization: user.token,
  };
  return fetch(route, {
    method: method,
    headers: header,
    body: JSON.stringify(content),
  })
    .then((data) => {
      if (data.status && data.status !== 200) {
        throw `${data.status} : ${data.title}`;
      }
      return data.json();
    })
    .catch((error) => toast.error(error))
    .then((value) => {
      return processResult(value);
    });
};
const searchManyApi = (search) => {
  return request(
    "GET",
    `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}/search?query=${search}`
  );
};

const getOneApi = (title) => {
  return request(
    "GET",
    `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}/searchOne?title=${title}`
  );
};

const getAllApi = () => {
  return request("GET", `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}`);
};
const getAllGenresApi = () => {
  return request("GET", `${process.env.REACT_APP_DBHOST_COMPLOT_GENRES}`);
};


const createComplotApi = async (
  id,
  lattitude,
  longitude,
  name,
  active,
  description
) => {
  let app = {
    id: id,
    Lattitude: parseFloat(lattitude),
    Longitude: parseFloat(longitude),
    Name: name,
    Description: description,
    Public: active,
  };

  return request("POST", `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}`, app);
};

export {getAllGenresApi, getOneApi, getAllApi, createComplotApi, searchManyApi };
