import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { IconButton, Stack } from "@mui/material";
// icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";
import useCounter from "@/zustand/useCounterStore";
import useLogin from "@/zustand/useLoginStore";

function HeaderComponent() {
  const count = useCounter((state) => state.count);
  const { isLogin, setIsLogin } = useLogin();

  return (
    <>
      <AppBar position="static" className="bg-black">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/">
              <Image src={logo} width={100} height={100} alt="logo" />
            </Link>

            <Box className="w-full flex justify-end items-center">
              {isLogin ? (
                <div className="flex items-center">
                  <span className="text-white mr-2">codecamp</span>
                  <Link
                    href="/"
                    className="text-white"
                    onClick={() => setIsLogin(false)}
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </Box>

            <Box>
              <Stack
                direction="row"
                sx={{
                  "& svg": {
                    color: "white",
                  },
                }}
              >
                <IconButton>
                  <Link href="/cart">
                    <AddShoppingCartIcon />
                  </Link>
                </IconButton>
                <p>{count}</p>
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default HeaderComponent;
