import { MDBNavbarLink } from "mdb-react-ui-kit";
import React from "react";
import { Link } from "react-scroll";

const ScrollToAbout = () => {
  return (
    <MDBNavbarLink href="#">
      <Link to="about" smooth={true} duration={300} style={{ color: "white" }}>
        About
      </Link>
    </MDBNavbarLink>
  );
};

export default ScrollToAbout;
