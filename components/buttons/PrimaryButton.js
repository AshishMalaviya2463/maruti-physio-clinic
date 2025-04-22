import { colors } from "@/utils/styles/colors";
import { Button } from "@mui/material";

const PrimaryButton = ({
  children,
  onClick = () => {},
  btnColor = colors.primaryColor,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: btnColor,
        textTransform: "none",
        height: "40px",
        px: "20px !important",
        borderRadius: "8px",
        boxShadow: "none !important",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
