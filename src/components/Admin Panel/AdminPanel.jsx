import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import PageviewIcon from "@mui/icons-material/Pageview";
import { useState } from "react";
import "./AdminPanel.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Cookies from "js-cookie";

const Panel = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price: 0,
    category: { id: -1, name: "" },
    favorite: 0,
    image: "",
    order: 0,
    onsale: 0,
    description: "",
  });
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState();

  const handleAdd = () => {
    setIsAdd(true);
    setIsView(false);
    setIsEdit(false);
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setSelectedProduct(product);
  };

  const submitEdit = async () => {
    await axios
      .post(
        `http://localhost:8080/products/${selectedProduct.id}`,
        selectedProduct
      )
      .then((res) => setMessage(res.data));
    getProducts();
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8080/products/${id}`, { withCredentials: true })
      .then((res) => setMessage(res.data));
    getProducts();
  };

  const addNewProduct = () => {
    axios
      .post("http://localhost:8080/products", newProduct)
      .then((res) => setMessage(res.data));
  };

  const getProducts = async () => {
    setIsAdd(false);
    setIsEdit(false);
    setIsView(true);
    await axios
      .get(`http://localhost:8080/products?category=-1`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
      });
  };

  return (
    <>
    {Cookies.get("admin") === "1" && <div>
      <Box
        sx={{ marginTop: 1, width: "100%", maxWidth: 360, bgcolor: "#0C2542" }}
      >
        <nav className="AdminList">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleAdd}>
                <ListItemIcon>
                  <AddIcon sx={{ color: "#FFB019" }} />
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={getProducts}>
                <ListItemIcon>
                  <PageviewIcon sx={{ color: "#FFB019" }} />
                </ListItemIcon>
                <ListItemText primary="View Products" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>

      {isAdd && (
        <div className="flex-col flex-col-pos">
          <div className="flex-row">
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Name of The Product"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  name: e.target.value,
                }))
              }
            />
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Quantity"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  quantity: e.target.value,
                }))
              }
            />
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Price"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  price: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex-row">
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Category"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  category: { id: e.target.value, name: "" },
                }))
              }
            />
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Favorite(0,1)"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  favorite: e.target.value,
                }))
              }
            />
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Image Url"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  image: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex-row">
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Orders"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  order: e.target.value,
                }))
              }
            />
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Sale"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  onsale: e.target.value,
                }))
              }
            />
            <TextField
              InputProps={{ style: { color: "black" } }}
              InputLabelProps={{ style: { color: "black" } }}
              label="Description"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setNewProduct((oldState) => ({
                  ...oldState,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <Button id="button_send" variant="contained" onClick={addNewProduct}>
            Add Product
          </Button>
        </div>
      )}

      {isView && (
        <div className="cards-container">
          {products?.map((product, id) => (
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
                  size="small"
                  id="yellowButton"
                  onClick={() => handleEdit(product)}
                >
                  Edit Product
                </Button>
                <Button
                  id="yellowButton"
                  size="small"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete Product
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}

      <Snackbar
        open={message !== ""}
        autoHideDuration={6000}
        onClose={() => setMessage("")}
        message={message}
        action={<CloseIcon fontSize="small" onClick={() => setMessage("")} />}
      />

      {isEdit && (
        <div className="popup">
          <h2 className="productHeader">{selectedProduct?.name}</h2>
          <div className="flex-col">
            <div className="flex-row">
              <TextField
                value={selectedProduct.name}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Name of The Product"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    name: e.target.value,
                  }))
                }
              />
              <TextField
                value={selectedProduct.quantity}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Quantity"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    quantity: e.target.value,
                  }))
                }
              />
              <TextField
                value={selectedProduct.price}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Price"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    price: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex-row">
              <TextField
                value={selectedProduct.category.id}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Category"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    category: { id: e.target.value, name: "" },
                  }))
                }
              />
              <TextField
                value={selectedProduct.favorite}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Favorite(0,1)"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    favorite: e.target.value,
                  }))
                }
              />
              <TextField
                value={selectedProduct.image}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Image Url"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    image: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex-row">
              <TextField
                value={selectedProduct.order}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Order"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    order: e.target.value,
                  }))
                }
              />
              <TextField
                value={selectedProduct.onsale}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="OnSale"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    onsale: e.target.value,
                  }))
                }
              />
              <TextField
                value={selectedProduct.description}
                InputProps={{ style: { color: "black" } }}
                InputLabelProps={{ style: { color: "black" } }}
                label="Description"
                variant="outlined"
                type="text"
                onChange={(e) =>
                  setSelectedProduct((oldState) => ({
                    ...oldState,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <Button
            sx={{ color: "black !important" }}
            onClick={() => setIsEdit(false)}
          >
            {" "}
            Close{" "}
          </Button>
          <Button
            sx={{ color: "black !important" }}
            className="confirmButton"
            onClick={submitEdit}
          >
            {" "}
            Confirm{" "}
          </Button>
        </div>
      )}
    </div>}
    </>
  );

};

export default Panel;
