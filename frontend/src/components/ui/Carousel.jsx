import { useState } from "react";
import { Box, IconButton, CardMedia} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        margin: "auto",
        my: 1,
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          flex: "0 0 95%",
          position: "relative",
          p: 0.3,
          border: "1px solid",
          borderColor: "primary.light",
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      >
        <CardMedia
          component="img"
          image={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          sx={{ height: "100%", objectFit: "cover" }}
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <IconButton
              size="small"
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ArrowBack />
            </IconButton>

            <IconButton
              size="small"
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 10,
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ArrowForward />
            </IconButton>
          </>
        )}
      </Box>

      {/* Indicator Dots Section */}
      <Box
        sx={{
          flex: "0 0 5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              width: 12,
              height: currentIndex === index ? 24 : 12, // Elongate the selected dot
              border: "1px solid",
              borderColor: "primary.light",
              borderRadius: (theme) => theme.shape.borderRadius,
              backgroundColor:
                currentIndex === index ? "secondary.main" : "grey",
              mb: 1,
              cursor: "pointer",
              transition: "background-color 0.3s ease,  height 0.3s ease",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
