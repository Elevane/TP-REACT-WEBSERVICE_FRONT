import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function request(method, route, body = null) {
  return fetch(route, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
      body: body,
    },
  })
    .then((data) => {
      if (data.status !== 200) throw "Error while calling api";
      if (data === null || data === undefined)
        throw "Data recieved is incorrect";
      return data.json();
    })
    .then((value) => {
      if (!value.isSuccess) toast.error(`Error from api : ${value.error}`);
      return value.result;
    })
    .catch((error) => toast.error(error));
}

const getOneApi = (title) => {
  return request(
    "GET",
    `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}/searchOne?title=${title}`
  );
};

const getAllApi = () => {
  return request("GET", `${process.env.REACT_APP_DBHOST_COMPLOT_SEARCH}`);
};

export { getOneApi, getAllApi };
