import React from "react";
import "./Footer.css";
const Footer: React.FC = () => {
  return (
    <footer>
      <div className="content-footer footer-left">
        <ul>
          <li className="title-footer">FIND A STORE</li>
          <li className="title-footer">BECOME A MEMBER</li>
          <li className="title-footer">Send Us Feedback</li>
        </ul>
      </div>
      <div className="content-footer footer-center-1">
        <ul>
          <li className="title-footer">GET HELP</li>
          <li className="title-footer-small">Order Status</li>
          <li className="title-footer-small">Delivery</li>
          <li className="title-footer-small">Returns</li>
          <li className="title-footer-small">Payment Options</li>
          <li className="title-footer-small">Contact Us</li>
        </ul>
      </div>
      <div className="content-footer footer-center-2">
        <ul>
          <li className="title-footer">ABOUT NIKE</li>
          <li className="title-footer-small">News</li>
          <li className="title-footer-small">Careers</li>
          <li className="title-footer-small">Investors</li>
          <li className="title-footer-small">Sustainability</li>
        </ul>
      </div>
      <div className="content-footer footer-right">
        <ul>
          <a href="https://twitter.com/">
            {" "}
            <li>
              <i className="fa-brands fa-twitter" />
            </li>
          </a>
          <a href="https://www.facebook.com/">
            <li>
              <i className="fa-brands fa-facebook" />
            </li>
          </a>
          <a href="https://www.instagram.com/">
            <li>
              <i className="fa-brands fa-instagram" />
            </li>
          </a>
          <a href="https://line.me/en/">
            <li>
              <i className="fa-brands fa-line" />
            </li>
          </a>
          <a href="https://www.tiktok.com/vi-VN">
            <li>
              <i className="fa-brands fa-tiktok" />
            </li>
          </a>
        </ul>
      </div>
      <div className="content-footer map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.7699680130695!2d108.21785398496668!3d16.07742239953558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142183a597c954d%3A0x27d2bd48ecfbd0f1!2zVHJ1bmcgdMOibSBIw6BuaCBjaMOtbmggVGjDoG5oIHBo4buRIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1682822064180!5m2!1svi!2s"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
};

export default Footer;
