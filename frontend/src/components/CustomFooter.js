import React from "react";

// Web page footer section
const CustomFooter = () => {
  return (
    <div style={{ paddingBottom: "80px" }}>
      <footer
        className="footer bg-dark"
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "50px",
        }}
      >
        <span style={{ margin: "auto" }} className="text-light">
          All Rights Reserved 2023 @ShahirJalal
        </span>
      </footer>
    </div>
  );
};
export default CustomFooter;