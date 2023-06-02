import { Box, Button } from "@mui/material"
import ImageComponent from "../components/ImageComponent"
import { useEffect, useState } from "react";
import ResultImageComponent from "../components/ResultImageComponent";
import ScrollableContainer from "../components/ScrollableContainer";
import ScrollBarImage from "../components/ScrollBarImage";
import AddImage from "../components/AddImageProps";

function MainPage() {
      const handleSwapFaces = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const currentFormData = new FormData(event.currentTarget)
        const formData = new FormData()
        if(currentFormData.get('file1')&&currentFormData.get('file2')){
          formData.append('files',currentFormData.get('file1') as File)
          formData.append('files',currentFormData.get('file2') as File)
        }
        console.log(currentFormData.get('file1'))
        console.log(currentFormData.get('file2'))
        fetch('http://localhost:3000/images/swap', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              console.log(response);
            } else {
              throw new Error('Upload failed');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    

      const [photos, setPhotos] = useState<Array<string>>([]);

      useEffect(() => {
        fetchPhotos();
      }, []);
    
      const fetchPhotos = async () => {
        fetch('http://localhost:3000/images')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data from the backend API.');
          }
          return response.json();
        })
        .then(data => {
          // Process the retrieved data
          console.log(data);
          setPhotos(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      };
  return (
    <>
    <form onSubmit={handleSwapFaces}>
    <Box
    display={"flex"}
    justifyContent={"space-around"}
    flexWrap={"wrap"}>
      <ImageComponent defaultImage={"src/assets/fazy-logo.png"} id={1}/>
      <ImageComponent defaultImage={"src/assets/fazy-logo.png"} id={2}/>
      <Box alignSelf={"center"} width={"200px"} marginBottom={"20px"}>
      <Button variant="contained" color="success" type="submit" fullWidth>
                    Fazy
      </Button>
      </Box>
      <ResultImageComponent defaultImage={"src/assets/fazy-logo.png"}/>
    </Box>
    </form>
    <ScrollableContainer>
      {photos.map((val,i)=>{
        return <ScrollBarImage defaultImage={"src/assets/fazy-logo.png"} photo={val} key={i}/>
      })}
    <AddImage onUploadSuccess={function (): void {
          console.info("Image is uploaded")
        } } onUploadError={function (): void {
          console.error("Image is not uploaded")
        } }/>
    </ScrollableContainer>
    </>
  )
}

export default MainPage
