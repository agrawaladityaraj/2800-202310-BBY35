import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  useScrollTrigger,
  Toolbar,
  IconButton,
  Container,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ContactlessIcon from "@mui/icons-material/Contactless";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import InfoIcon from "@mui/icons-material/Info";

import useSmall from "@/Hooks/useSmall";
import MountedWrapper from "@/components/MountedWrapper";

import Logo from "@/assets/images/Logo.png";

interface INavLink {
  href: string;
  label: string;
  icon: JSX.Element;
}

const leftNavLinks: INavLink[] = [
  { href: "/about", label: "About", icon: <InfoIcon /> },
];

const rightNavLinks: INavLink[] = [
  { href: "/user", label: "Account", icon: <ContactlessIcon /> },
  { href: "/contact", label: "Contact", icon: <PermContactCalendarIcon /> },
];

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

const ElevationScroll = ({ window, children }: Props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    //elevation: trigger ? 4 : 0,
    elevation: 0,
    style: { borderBottom: trigger ? "1px solid #E4E8ED" : "0px" },
  });
};

const Navbar: NextPage = () => {
  const small: boolean = useSmall(960);

  const [drawer, setDrawer] = useState<boolean>(false);

  useEffect(() => {
    setDrawer(false);
  }, [small]);

  return (
    <MountedWrapper>
      <>
        <ElevationScroll>
          <AppBar sx={{ pt: small ? 1 : 2, pb: small ? 1 : 2 }}>
            {small ? (
              <Container>
                <Toolbar
                  sx={{
                    color: (theme) => theme.palette.common.black,
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  <Link href="/" passHref={true}>
                    <Image
                      style={{ marginRight: "1em" }}
                      src={Logo}
                      height={40}
                      width={40}
                      alt="Logo"
                    />
                  </Link>
                  <IconButton
                    sx={{ color: (theme) => theme.palette.common.white }}
                    size="small"
                    aria-label="menu"
                    onClick={() => setDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                </Toolbar>
              </Container>
            ) : (
              <Container maxWidth="xl">
                <Toolbar
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#515e72",
                    cursor: "pointer",
                  }}
                >
                  <Link href="/" passHref={true}>
                    <div style={{ marginRight: "1em" }}>
                      <Image src={Logo} height={40} width={40} alt="Logo" />
                    </div>
                  </Link>
                  {leftNavLinks.map((navLink: INavLink) => (
                    <Link
                      style={{ textDecoration: "none" }}
                      key={navLink.href}
                      href={navLink.href}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          mr: 2,
                          textDecoration: "none",
                          color: (theme) => theme.palette.common.white,
                        }}
                      >
                        {navLink.label}
                      </Typography>
                    </Link>
                  ))}
                  <Box sx={{ flexGrow: 1, cursor: "cursor" }} />
                  <Box display="flex">
                    {rightNavLinks.map((navLink: INavLink, index: number) => (
                      <Link
                        style={{ textDecoration: "none" }}
                        key={navLink.href}
                        href={navLink.href}
                        passHref={true}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            mr: index !== rightNavLinks.length - 1 ? 2 : "auto",
                            color: (theme) => theme.palette.common.white,
                          }}
                        >
                          {navLink.label}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Toolbar>
              </Container>
            )}
          </AppBar>
        </ElevationScroll>
        <Toolbar sx={{ mt: small ? 1 : 2, mb: small ? 1 : 2 }} />
        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          <List>
            {leftNavLinks.map((navLink: INavLink) => (
              <Link
                style={{ textDecoration: "none" }}
                key={navLink.href}
                href={navLink.href}
                passHref={true}
              >
                <ListItem button>
                  <ListItemIcon
                    sx={{ color: (theme) => theme.palette.common.black }}
                  >
                    {navLink.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: (theme) => theme.palette.common.white }}
                    primary={navLink.label}
                  />
                </ListItem>
              </Link>
            ))}
            <Divider />
            {rightNavLinks.map((navLink: INavLink) => (
              <Link
                style={{ textDecoration: "none" }}
                key={navLink.href}
                href={navLink.href}
                passHref={true}
              >
                <ListItem button>
                  <ListItemIcon
                    sx={{ color: (theme) => theme.palette.common.black }}
                  >
                    {navLink.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: (theme) => theme.palette.common.white }}
                    primary={navLink.label}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      </>
    </MountedWrapper>
  );
};

export default Navbar;
