import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";

async function searchApi(search) {
  return fetch(
    process.env.REACT_APP_DBHOST_COMPLOT_SEARCH +
      "/search?query=" +
      search +
      "&limit=20",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      },
    }
  ).then((data) => data.json());
}

export default function SearchComplot({ getDesc }) {
  const [renderOptions, setRenderOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const search = (e) => {
    if (e.target.value.length < 3) return;
    searchApi(e.target.value).then((value) => {
      if (!value.isSuccess) {
        alert("Failed connection Error");
      } else {
        setRenderOptions(value.result);
      }
    });
  };

  const selectComplot = async (value) => {
    setLoading(true);
    await getDesc(value);
    setLoading(false);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "100%", marginRight: "20px" }}>
        <Autocomplete
          disabled={loading}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={renderOptions}
          onChange={(event, value) => selectComplot(value)}
          renderInput={(params) => (
            <TextField
              disabled={loading}
              {...params}
              label="Search input"
              onChange={search}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </div>
      {loading && <CircularProgress></CircularProgress>}
    </div>
  );
}
