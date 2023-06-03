import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import "./products.css";
import axios from "axios";
import Cookies from "js-cookie";
import Footer from "../../components/Footer/footer.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [category, setCategory] = useState(-1);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products?category=${category}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) =>
        setErrorMessage("Please Signup / Login to be able to view the products")
      );
  }, [category]);

  const handleCategoryChange = (value) => {
    setCategory(value);
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
      {errorMessage === "" && (
        <div className="category-div">
          <label className="category-label">Filter By Category: </label>
          <Select
            id="category-select"
            variant="filled"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value={-1}>All</MenuItem>
            <MenuItem value={1}>Mobile Phones</MenuItem>
            <MenuItem value={2}>Laptops</MenuItem>
            <MenuItem value={3}>Televisions</MenuItem>
          </Select>
        </div>
      )}
      <div className="cards-container">
        {products.length > 0 &&
          products?.map((product, id) => (
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
                <Button
                  id="yellowButton"
                  size="small"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  id="yellowButton"
                  size="small"
                  onClick={() => {
                    setOpen(true);
                    const selected = products.filter(
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

      <div className="productErrorContainer">
        <Typography className="productsError">{errorMessage}</Typography>
      </div>
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

export default Products;
