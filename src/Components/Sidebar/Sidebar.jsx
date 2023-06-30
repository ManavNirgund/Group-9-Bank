import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBInputGroup,
  MDBInputGroupText,
  MDBInput,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
} from "mdb-react-ui-kit";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Sidebar() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' dark bgColor='dark'>
  <MDBNavbarBrand href='#'>Brand Name</MDBNavbarBrand>
  <MDBNavbarNav>
    <MDBNavbarItem>
      <MDBNavbarLink active aria-current='page' href='#'>Home</MDBNavbarLink>
    </MDBNavbarItem>
    <MDBNavbarItem>
      <MDBNavbarLink href='#'>About</MDBNavbarLink>
    </MDBNavbarItem>
    {/* Add more buttons as needed */}
  </MDBNavbarNav>
  <MDBNavbarNav className='mx-auto'>
    <MDBNavbarItem>
      <MDBInputGroup>
      <MDBBtn outline>Search</MDBBtn>
        <MDBInput type='text' />
      </MDBInputGroup>
    </MDBNavbarItem>
  </MDBNavbarNav>
  <MDBNavbarNav>
    <MDBNavbarItem>
      <MDBDropdown>
        <MDBDropdownToggle tag='a' className='nav-link'>
          Profile
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem>Action 1</MDBDropdownItem>
          <MDBDropdownItem>Action 2</MDBDropdownItem>
          {/* Add more dropdown items as needed */}
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarItem>
  </MDBNavbarNav>
</MDBNavbar>

  );
}
