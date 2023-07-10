import React, { useState } from "react";
import { Typography, Link } from "@mui/material";

const TruncatedText = ({ text, maxLength }) => {
  const [truncated, setTruncated] = useState(true);

  const toggleTruncated = () => {
    setTruncated(!truncated);
  };

  const truncatedText = truncated ? text?.slice(0, maxLength) + "..." : text;
  console.log("truncatedText", truncatedText);
  return (
    <Typography variant="body2">
      {truncatedText}
      {text?.length > maxLength && (
        <Link component="button" onClick={toggleTruncated}>
          {truncated ? "Read More" : "Read Less"}
        </Link>
      )}
    </Typography>
  );
};

export default TruncatedText;
