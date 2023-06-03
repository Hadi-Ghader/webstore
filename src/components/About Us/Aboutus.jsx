import React from "react";
import "./Aboutus.css";
import aboutimage from "./aboutusimage.jpg";
import teammemberone from "./teammemberone.jpg";
import teammembertwo from "./teammembertwo.jpg";
import teammemberthree from "./teammemberthree.jpg";
import Footer from "../../components/Footer/footer.jsx"

<link
  href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap"
  rel="stylesheet"
></link>;

const Aboutus = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-image-container">
        <img src={aboutimage} alt="About Us" className="about-us-image" />
        <div className="about-us-text-box">
          <h1 className="about-us-heading">About Us</h1>
          <p className="about-us-text">
            Welcome to our web store! We are dedicated to providing high-quality
            products and excellent customer service.
          </p>
          <p className="about-us-text">
            Our mission is to offer a wide range of products that cater to our
            customers' needs and preferences. Whether you're looking for
            electronics, clothing, home decor, or any other items, we've got you
            covered.
          </p>
          <p className="about-us-text">
            At our web store, we strive to create a seamless shopping
            experience. We carefully curate our product selection to ensure that
            each item meets our quality standards.
          </p>
          <p className="about-us-text">
            If you have any questions, feedback, or concerns, please don't
            hesitate to contact us. Our friendly support team is here to assist
            you.
          </p>
          <p className="about-us-text">Thank you for choosing our web store!</p>
        </div>
        <div className="team-member-container">
          <div className="team-member-card">
            <div className="team-member-info">
              <h2 className="team-member-name">John Doe</h2>
              <p className="team-member-role">Co-Founder</p>
              <p className="team-member-bio">
                John Doe is a passionate entrepreneur and the co-founder of our
                company. With years of experience in the industry, John has
                played a key role in shaping our vision and driving our success.
                He brings a wealth of knowledge and expertise in business
                development, strategic planning, and customer relations. John's
                relentless dedication and innovative mindset have been
                instrumental in transforming our company into a market leader.
                He is committed to delivering exceptional value to our clients
                and spearheading our mission of revolutionizing the industry.
              </p>
            </div>
            <div className="team-member-image-container">
              <img
                src={teammemberone}
                alt="Team Member"
                className="team-member-image"
              />
            </div>
          </div>
          <div className="team-member-card">
            <div className="team-member-info">
              <h2 className="team-member-name">Jane Smith</h2>
              <p className="team-member-role">Lead Designer</p>
              <p className="team-member-bio">
                Jane Smith is an accomplished designer with a passion for
                creativity and innovation. With a keen eye for aesthetics and
                attention to detail, Jane brings a fresh perspective to our
                design team. Her expertise in user-centered design and
                understanding of the latest design trends have contributed to
                the creation of captivating and user-friendly interfaces. Jane's
                dedication to delivering exceptional design solutions and her
                collaborative approach make her an invaluable asset to our team.
                She is committed to crafting visually stunning and intuitive
                experiences for our clients.
              </p>
            </div>
            <div className="team-member-image-container">
              <img
                src={teammembertwo}
                alt="Team Member"
                className="team-member-image"
              />
            </div>
          </div>
          <div className="team-member-card">
            <div className="team-member-info">
              <h2 className="team-member-name">Michael Johnson</h2>
              <p className="team-member-role">Software Engineer</p>
              <p className="team-member-bio">
                Michael Johnson is a skilled software engineer with a passion
                for building robust and scalable applications. With expertise in
                various programming languages and frameworks, Michael has
                contributed significantly to our technical team. His
                problem-solving skills and attention to detail have played a
                crucial role in delivering high-quality software solutions.
                Michael is dedicated to staying up-to-date with the latest
                technologies and best practices, ensuring our products are at
                the forefront of innovation. He is committed to driving
                excellence and continuous improvement within our development
                team.
              </p>
            </div>
            <div className="team-member-image-container">
              <img
                src={teammemberthree}
                alt="Team Member"
                className="team-member-image"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
