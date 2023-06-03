import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./home.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import Cookies from "js-cookie";
import Footer from "../../components/Footer/footer.jsx"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Home = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [mostOrderedProducts, setMostOrderedProducts] = useState([]);
  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  
  const theme = useTheme();

  useEffect(() => {
    axios.get(`http://localhost:8080/products/favorites`).then((res) => {
      setFavoriteProducts(res.data);
    });

    axios.get(`http://localhost:8080/products/mostOrdered`).then((res) => {
      setMostOrderedProducts(res.data);
    });

    axios.get(`http://localhost:8080/products/onSale`).then((res) => {
      setOnSaleProducts(res.data);
    });
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleClose = () => {
    setOpenSnack(false);
  };

  const addToCart = (product) => {
    axios
      .post(
        `http://localhost:8080/addProductToUser`,
        {
          email: Cookies.get("email"),
          productId: product.id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        localStorage.setItem("cartProducts", JSON.stringify(res.data));
        setOpenSnack(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Container className="headers">
        <Box sx={{ bgcolor: "#0C2542", height: "2rem" }}>
          <h4 className="divider">Our Favorite Products</h4>
        </Box>
      </Container>
      <Box>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            bgcolor: "inherit",
            justifyContent: "center",
            color: "#0c2542",
          }}
        >
          <Typography style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {favoriteProducts[activeStep]?.name}
          </Typography>
        </Paper>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {favoriteProducts.map((step, index) => (
            <div key={step?.name}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={step.image}
                  alt={step?.name}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          style={{ background: "#0c2542" }}
          steps={favoriteProducts.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              id="yellowButton"
              size="small"
              onClick={handleNext}
              disabled={activeStep === favoriteProducts.length - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              id="yellowButton"
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>

      <Container className="headers">
        <Box sx={{ bgcolor: "#0C2542", height: "2rem" }}>
          <h4 className="divider">Most Ordered Products</h4>
        </Box>
      </Container>
      <div className="cards-container">
        {mostOrderedProducts?.map((product, id) => (
          <Card key={id}>
            <CardMedia
              component="img"
              alt="Image"
              height="140"
              image={product.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="text-container"
              >
                <span>Price: {product.price}</span>
                <span className="quantity">Quantity: {product.quantity}</span>
              </Typography>
            </CardContent>
            <CardActions>
              {Cookies.get("email") !== undefined && (
                <Button
                  id="yellowButton"
                  size="small"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              )}
              <Button
                id="yellowButton"
                size="small"
                onClick={() => {
                  setOpen(true);
                  const selected = mostOrderedProducts.filter(
                    (unit) => unit.name === product.name
                  )[0];
                  setSelectedProduct(selected);
                }}
              >
                Product Info
              </Button>{" "}
            </CardActions>
          </Card>
        ))}
      </div>

      <Container className="headers">
        <Box sx={{ bgcolor: "#0C2542", height: "2rem" }}>
          <h4 className="divider">Products on Sale</h4>
        </Box>
        <div className="cards-container">
          {onSaleProducts?.map((product, id) => (
            <Card key={id}>
              <CardMedia
                component="img"
                alt="Image"
                height="140"
                image={product.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="text-container"
                >
                  <span>
                    Price: {product.price * (1 - product.onsale / 100)}
                  </span>
                  <span className="quantity">Quantity: {product.quantity}</span>
                </Typography>
              </CardContent>
              <CardActions>
                {Cookies.get("email") !== undefined && (
                  <Button id="yellowButton" size="small" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                )}
                <Button
                  id="yellowButton"
                  size="small"
                  onClick={() => {
                    setOpen(true);
                    const selected = onSaleProducts.filter(
                      (unit) => unit.name === product.name
                    )[0];
                    setSelectedProduct(selected);
                  }}
                >
                  Product Info
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedProduct?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="yellowButton" onClick={() => setOpen(false)}>
            {" "}
            Close{" "}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
          open={openSnack}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Added To Cart"
        />;
      <Footer />
    </>
  );
};

export default Home;
