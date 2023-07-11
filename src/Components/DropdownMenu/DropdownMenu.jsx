import React, { useState } from "react";
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from "mdb-react-ui-kit";
import { products } from "../../Assets/data/enums";
import { Link } from "react-router-dom";

const DropdownMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <MDBDropdown>
      <MDBDropdownToggle
        tag="a"
        className="nav-link"
        role="button"
        style={{ color: "white" }}
      >
        {selectedItem ? selectedItem.name : "Explore Products"}
      </MDBDropdownToggle>
      <MDBDropdownMenu style={{ borderRadius: "5px" }}>
        {products.map((item) => {
          return (
            <MDBDropdownItem
              key={item.id}
              style={{
                marginTop: "5px",
                marginLeft: "5px",
                marginRight: "5px",
                borderBottom: "1px solid gray",
              }}
              onClick={() => setSelectedItem(item)}
            >
              <Link to={item.to} style={{ color: "black" }}>
                {item.name}
              </Link>
            </MDBDropdownItem>
          );
        })}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default DropdownMenu;
