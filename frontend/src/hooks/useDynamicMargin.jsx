import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const useDynamicMargin = () => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      let newMargin = 0;

      if (isLg) {
        newMargin = (viewportWidth - 1200) / 2; // For large screens
      } else if (isMd) {
        newMargin = (viewportWidth - 900) / 2; // For medium screens
      } else if (isSm) {
        newMargin = (viewportWidth - 600) / 2; // For small screens
      }

      setMargin(newMargin);
    };

    // Set initial margin
    handleResize();

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLg, isMd, isSm]);

  return `${margin}px`;
};

export default useDynamicMargin;
