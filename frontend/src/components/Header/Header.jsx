import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>order you favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes with
          finest ingridents and culinary expertises.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
