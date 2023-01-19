import { IconButton, Popover, Typography, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

export default function Marker({ name, isPublic, desc, lat, lng, genres }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const color = ["#faedcd", "#d4a373", "#ccd5ae", "#e9edc9", "#fefae0"];

  const getColor = (key) => {
    return color[key];
  };
  const handleClick = (event) => {
    if (!open) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div
      onClick={handleClick}
      aria-describedby={id}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "18px",
        height: "18px",
        border: "2px solid #fff",
        borderRadius: "100%",
        userSelect: "none",
      }}
      className={isPublic ? "public_marker" : "private_marker"}
    >
      <Popover
        style={{ width: "400px" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "0.5px solid #CDCDCD",
              padding: "10px",
            }}
          >
            <h2
              style={{
                textTransform: "Capitalize",
              }}
            >
              {name || "No Name"}
            </h2>
            <IconButton onClick={handleClose}>
              <CloseIcon color="primary" />
            </IconButton>
          </div>

          <p
            style={{
              padding: "10px",
              width: "300px",
            }}
          >
            {desc || "not desc"}
          </p>
          <div
            style={{
              margin: "10px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {genres &&
              genres.map((elm, index) => (
                <Chip
                  key={index}
                  label={elm.name}
                  style={{ margin: "5px", backgroundColor: getColor(index) }}
                ></Chip>
              ))}
          </div>
          <div
            style={{
              margin: "10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <span style={{ fontWeight: "bold" }}>Lattitude</span>
              <Typography color="primary">{lat}</Typography>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Longitude</span>
              <Typography color="primary">{lng}</Typography>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
