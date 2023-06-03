import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

<link
  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap"
  rel="stylesheet"
></link>;

const footer = () => {
  return (
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-left">
          <h3 class="footer-heading">OnDemand</h3>
          <ul class="footer-links">
            <li>
              <a href="https://www.facebook.com/">
                <FacebookIcon id="fbicon" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://web.whatsapp.com/">
                <WhatsAppIcon id="wpicon" />
                Whatsapp
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <InstagramIcon id="instaicon" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div class="footer-middle">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div class="footer-right">
          <h4 class="footer-heading">Contact Us</h4>
          <p class="footer-contact-info">
            Address: Maderes Street, Bshamoun, Lebanon
            <br />
            Phone: +961 76 05 38 37
            <br />
            Email: hadi@gmail.com
          </p>
          <p class="footer-text">&copy; 2023 On Demand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
