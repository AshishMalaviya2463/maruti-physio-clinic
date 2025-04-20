import Header from "@/components/Header";
import UserList from "@/components/UserList";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Header />
      <Container
        sx={{
          mx: "auto !important",
          height: "calc(100svh - 55px)",
          py: "15px !important",
        }}
      >
        <UserList />
      </Container>
    </>
  );
}
