import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { searchManyApi } from "../hooks/useApi";

export default function SearchComplot({ getDesc }) {
  const [renderOptions, setRenderOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    if (e.target.value.length < 3) return;
    var res = await searchManyApi(e.target.value);
    if (!res.isSuccess) toast.error(res.error);
    setRenderOptions(res.result);
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
