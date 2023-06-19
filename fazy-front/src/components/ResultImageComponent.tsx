import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface ResultImageComponentProps {
  defaultImage: string;
}

const ResultImageComponent: React.FC<ResultImageComponentProps> = ({
  defaultImage,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(defaultImage);
    setCopied(true);
  };
  return (
    <>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="300px"
          height="300px"
          border="1px solid black"
          sx={{
            backgroundImage: `url(${defaultImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
        <Box display={"flex"} width="300px" alignSelf="center" marginTop="20px">
          <TextField
            label="Image URL"
            value={defaultImage}
            variant="outlined"
            fullWidth
            disabled
          />
          <Button
            variant="contained"
            color="success"
            onClick={handleCopyUrl}
            fullWidth
          >
            {copied ? "Copied!" : "Copy URL"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ResultImageComponent;
