import React from 'react';
import { appName } from "../../Assets/data/enums";

const Footer = () => {
  return (
    <footer style={{color: "white"}}>
      <p>&copy; {new Date().getFullYear()} {appName.title}. All rights reserved.</p>
    </footer>
  );
};

export default Footer;