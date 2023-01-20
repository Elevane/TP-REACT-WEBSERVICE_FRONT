import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import useLocalStorage from "../auth/Hooks/useLocalStorage";

const user = useLocalStorage.GetUser();

const processResult = (value) => {
  if (value && value.api) return { isSucess: true, result: [] };
  if (value && value.api === false)
    return { isSucess: false, error: value.errorMessage };
  if (
    value !== null &&
    value !== undefined &&
    value.result !== null &&
    value.result !== undefined
  ) {
    return { isSucess: true, result: value.result, error: null };
  } else if (value.errorMessage !== undefined)
    return { isSucess: false, error: value.errorMessage };
  else {
    return { isSucess: false, error: "Erreur inconnue lors de l'appel api." };
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
      return data.json();
    })
    .catch((e, a, b) => {
      return { api: false, errorMessage: `${e}  || ${a} || ${b}` };
    });
};
const searchManyApi = (search) => {
  return request(
    "GET",
    `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}/search?query=${search}`
  ).then((value) => {
    return processResult(value);
  });
};

const getOneApi = (title) => {
  return request(
    "GET",
    `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}/searchOne?title=${title}`
  ).then((value) => {
    return processResult(value);
  });
};

const getAllApi = () => {
  return request(
    "GET",
    `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}/mines`
  ).then((value) => {
    return processResult(value);
  });
};

const getAllAndPublicApi = () => {
  return request("GET", `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}`).then(
    (value) => {
      return processResult(value);
    }
  );
};
const getAllGenresApi = () => {
  return request("GET", `${process.env.REACT_APP_DBHOST_COMPLOT_GENRES}`).then(
    (value) => {
      return processResult(value);
    }
  );
};

const createComplotApi = async (
  id,
  lattitude,
  longitude,
  name,
  active,
  description,
  genres
) => {
  let app = {
    id: id,
    Lattitude: parseFloat(lattitude),
    Longitude: parseFloat(longitude),
    Name: name,
    Description: description,
    Public: active,
    Genres: genres,
  };

  return request(
    "POST",
    `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}`,
    app
  ).then((value) => {
    return processResult(value);
  });
};

export {
  getAllGenresApi,
  getAllAndPublicApi,
  getOneApi,
  getAllApi,
  createComplotApi,
  searchManyApi,
};
