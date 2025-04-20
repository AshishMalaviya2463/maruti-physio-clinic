import { colors } from "@/utils/styles/colors";
import { Container, Stack, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <Stack height={"50px"} width={"100%"} sx={{ boxShadow: 1 }}>
        <Container
          sx={{
            height: "100%",
            mx: "auto !important",
          }}
        >
          <Stack
            height={"50px"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            sx={{
              "& img": {
                height: "40px",
              },
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              gap={1}
              sx={{
                cursor: "pointer",
              }}
            >
              <img src={"/logo.png"} />
              <Typography
                fontSize={"16px"}
                fontWeight={600}
                color={colors.primaryColor}
              >
                Maruti Physiotherapy Clinic
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default Header;
