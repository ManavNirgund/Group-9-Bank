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
import marathaBank from '../../Assets/Images/maratha-bank.png'
import { appName } from "../../Assets/data/enums";

// import { Link } from "react-scroll"; 

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Service/utilities/auth";
import { products } from "../../Assets/data/enums";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ScrollToAbout from "../ScrollToAbout/ScrollToAbout";

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
      style={{ backgroundColor: "rgb(135, 0, 64)" }}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <Link to={"/"} style={{ color: "white" }}>
            <img src={marathaBank} width= "50rem" height="auto"/>
           {appName.title}
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
              <DropdownMenu />
            </MDBNavbarItem>

            <MDBNavbarItem>
              {/* <MDBNavbarLink href="#">
                    <Link to="about" smooth={true} duration={300} style={{color: "white"}}>
                      About
                    </Link>
              </MDBNavbarLink> */}
              <ScrollToAbout />
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarNav className="mx-auto">
            <MDBNavbarItem>
              <MDBInputGroup>
                <MDBInput type="text" />
                <MDBBtn>Search</MDBBtn>
              </MDBInputGroup>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarNav>
            <MDBNavbarItem>
              {/* <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link"
                  style={{ color: "white" }}
                >
                  Login/Register
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  {!jwt && (
                    <MDBDropdownItem>
                      <Button variant="text" onClick={signinClicked}>
                        Login
                      </Button>
                    </MDBDropdownItem>
                  )}
                  {jwt && (
                    <MDBDropdownItem>
                      <Button variant="text" onClick={signinClicked}>
                        Login
                      </Button>
                    </MDBDropdownItem>
                  )}

                  <Button variant="text" onClick={regitserClicked}>
                    Register
                  </Button>
                </MDBDropdownMenu>
              </MDBDropdown> */}

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
