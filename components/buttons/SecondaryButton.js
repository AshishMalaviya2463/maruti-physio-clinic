import { colors } from "@/utils/styles/colors";
import { Button } from "@mui/material";

const SecondaryButton = ({ children, onClick = () => {} }) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: colors.lightGray,
        textTransform: "none",
        height: "40px",
        px: "20px !important",
        borderRadius: "8px",
        boxShadow: "none !important",
        color: colors.titleColor,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
