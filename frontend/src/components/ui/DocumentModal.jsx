import { Box, Modal, Paper, Typography } from "@mui/material";

import StyledLine from "./StyledLine";

const DocumentModal = ({ open, handleClose, title, content }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: {
            lg: 1000,
            md: 800,
            sm: 500,
            xs: 400,
          },
          height: {
            lg: 600,
            md: 500,
            sm: 600,
            xs: 600,
          },
          overflowY: "scroll",
        }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Typography
            variant="h3"
            fontSize={30}
            color={"primary.main"}
            gutterBottom
            minWidth="fit-content"
          >
            {title}
          </Typography>
          <StyledLine
            color={"secondary.main"}
            thickness={1}
            rightOrnament
            topMargin={-1}
            leftMargin={1}
          />
        </Box>
        <Box>{content}</Box>
      </Paper>
    </Modal>
  );
};

export default DocumentModal;
