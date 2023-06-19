import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface ImageComponentProps {
  defaultImage: string;
  photo: string;
  fetchPhotos: Function;
}

const ScrollBarImage: React.FC<ImageComponentProps> = ({
  defaultImage,
  photo,
  fetchPhotos,
}) => {
  const deleteImage = (photoName: string) => {
    fetch(`http://localhost:3000/images/${photoName}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the backend API.");
        }
        fetchPhotos();
        return response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    container.scrollLeft += event.deltaY;
  };

  const handleDownload = async (photoName: string) => {
    try {
      // Make a GET request to the backend endpoint that serves the file
      const response = await fetch(
        `http://localhost:3000/images/${photoName}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      // Retrieve the file data
      const fileData = await response.blob();

      // Create a temporary URL for the Blob
      const url = window.URL.createObjectURL(fileData);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `${photoName}`; // Set the desired file name

      // Append the link to the document body
      document.body.appendChild(link);

      // Simulate a click on the link to trigger the download
      link.click();

      // Clean up by removing the link and revoking the URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      onWheel={handleScroll}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="300px"
        height="300px"
        border="1px solid black"
        sx={{
          backgroundImage: `url(http://localhost:3000/images/${
            photo || defaultImage
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        margin={"20px 0"}
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
      >
        <Button
          variant="contained"
          component="label"
          color="success"
          fullWidth
          onClick={() => {
            handleDownload(photo);
          }}
        >
          Download
        </Button>
        <Button
          variant="contained"
          component="label"
          color="error"
          fullWidth
          onClick={() => {
            deleteImage(photo);
          }}
        >
          Delete from storage
        </Button>
      </Box>
    </Box>
  );
};

export default ScrollBarImage;
