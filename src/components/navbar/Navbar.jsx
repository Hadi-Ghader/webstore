import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Navbar.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cookies from "js-cookie";

const initialClassTab = {
  home: "navtabWhite",
  products: "navtabWhite",
  contactus: "navtabWhite",
  aboutus: "navtabWhite",
  adminpanel: "navtabWhite",
};

const Navbar = () => {
  let pathname = window.location.pathname.replace("/", "");
  pathname = pathname === "" ? "home" : pathname;
  const [tabValue, setTabValue] = useState(pathname);
  const [tabStyle, setTabStyle] = useState({
    ...initialClassTab,
    [pathname]: "navtabOrange",
  });
  const [showProducts, setShowProducts] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event, newValue) => {
    setTabValue(newValue);
    setTabStyle({ ...initialClassTab, [newValue]: "navtabOrange" });
  };

  return (
    <>
      {Cookies.get("email") !== undefined &&
        Cookies.get("password") !== undefined && (
          <Button
            id="shopping-cart-btn"
            onClick={() => setShowProducts(!showProducts)}
          >
            <ShoppingCartIcon sx={{ fontSize: "2.2rem", color: "white" }} />
          </Button>
        )}
      <Tabs
        value={tabValue}
        className="navbar"
        onChange={handleClick}
        centered
        TabIndicatorProps={{ style: { background: "#ffb019" } }}
      >
        <Tab
          className={tabStyle.home}
          value="home"
          label="Home"
          to="/"
          component={Link}
        />
        <Tab
          className={tabStyle.products}
          value="products"
          label="products"
          to="/products"
          component={Link}
        />
        <Tab
          className={tabStyle.contactus}
          value="contactus"
          label="Contact Us"
          to="/contactus"
          component={Link}
        />
        <Tab
          className={tabStyle.aboutus}
          value="aboutus"
          label="About Us"
          to="/aboutus"
          component={Link}
        />
        {Cookies.get("admin") === "1" && (
          <Tab
            className={tabStyle.adminpanel}
            value="adminpanel"
            label="Admin Panel"
            to="/adminpanel"
            component={Link}
          />
        )}
      </Tabs>
      {Cookies.get("email") === undefined &&
      Cookies.get("password") === undefined ? (
        <Button
          id="sign-up"
          onClick={() => {
            setTabValue("home");
            setTabStyle({ ...initialClassTab, home: "navtabOrange" });
            navigate("/signup");
          }}
        >
          Sign Up / Login
        </Button>
      ) : (
        <Button
          id="sign-up"
          onClick={() => {
            Cookies.remove("email", { path: "", domain: "localhost" });
            Cookies.remove("password", { path: "", domain: "localhost" });
            Cookies.remove("admin", { path: "", domain: "localhost" });
            setTabValue("home");
            setTabStyle({ ...initialClassTab, home: "navtabOrange" });
            localStorage.removeItem("cartProducts");
            navigate("/");
          }}
        >
          Log Out
        </Button>
      )}
      <Dialog
        open={showProducts}
        onClose={() => setShowProducts(!showProducts)}
      >
        <DialogTitle> Ordered Products</DialogTitle>
        <DialogContent id="cart">
          {JSON.parse(localStorage.getItem("cartProducts"))?.map((product) => (
            <div className="cart-element">
              <img
                src={product.image}
                alt="product image"
                className="cart-image"
              />
              <DialogContentText className="product-name">
                Name: {product?.name}
              </DialogContentText>
              <DialogContentText className="product-price">
                Price: {product?.price}
              </DialogContentText>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            id="yellowButton"
            onClick={() => setShowProducts(!showProducts)}
            className="checkout"
          >
            {" "}
            Check Out{" "}
          </Button>
          <Button
            id="yellowButton"
            onClick={() => setShowProducts(!showProducts)}
          >
            {" "}
            Close{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
