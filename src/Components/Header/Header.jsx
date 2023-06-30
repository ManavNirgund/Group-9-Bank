import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBInputGroup,
  MDBInput,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
  MDBContainer,
  MDBNavbarToggler,
  MDBIcon,
  MDBCollapse,
} from "mdb-react-ui-kit";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Service/utilities/auth";

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);

  const nav = useNavigate();
  const auth = useAuth();
  const jwt = localStorage.getItem("token");

  const signinClicked = () => {
    nav("/signin");
  };

  const regitserClicked = () => {
    nav("/register");
  };

  const productsClicked = () => {
    nav("/products");
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <MDBNavbar
      expand="lg"
      dark
      style={{ backgroundColor: "rgba(135, 0, 64, 0.6)" }}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <Link to={"/"} style={{ color: "white" }}>
            Group 9 Bank
          </Link>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page">
                <Link to={"products"} style={{ color: "white" }}>
                  Explore Products
                </Link>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">About</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarNav>
            <MDBNavbarItem>

              <MDBNavbarNav>
                <MDBNavbarItem>
                  {!auth.jwt && (
                    <MDBNavbarLink>
                      <Link to={"signin"} style={{ color: "white" }}>
                        Login
                      </Link>
                    </MDBNavbarLink>
                  )}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {!auth.jwt && (
                    <MDBNavbarLink>
                      <Link to={"register"} style={{ color: "white" }}>
                        Register
                      </Link>
                    </MDBNavbarLink>
                  )}
                </MDBNavbarItem>
              </MDBNavbarNav>

              {/* <MDBNavbarNav>
                
              </MDBNavbarNav> */}
              {/* <MDBNavbarItem>
                {!auth.jwt && (
                  <MDBNavbarLink>
                    <Link to={"register"} style={{ color: "white" }}>
                      Register
                    </Link>
                  </MDBNavbarLink>
                )}
              </MDBNavbarItem> */}
              <MDBNavbarItem>
                {auth.jwt && (
                  <MDBNavbarLink>
                    <Link onClick={handleLogout} style={{ color: "white" }}>
                      Logout
                    </Link>
                  </MDBNavbarLink>
                )}
              </MDBNavbarItem>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
