import { useTheme, useMediaQuery } from "@mui/material";

const useCurrentBreakpoint = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.up("xs")); // 0px
  const isSm = useMediaQuery(theme.breakpoints.up("sm")); // 600px
  const isMd = useMediaQuery(theme.breakpoints.up("md")); // 900px
  const isLg = useMediaQuery(theme.breakpoints.up("lg")); // 1200px
  const isXl = useMediaQuery(theme.breakpoints.up("xl")); // 1536px

  if (isXl) return "xl";
  if (isLg) return "lg";
  if (isMd) return "md";
  if (isSm) return "sm";
  if (isXs) return "xs";

  return "xs"; // Default to xs if none match
};

export default useCurrentBreakpoint;
