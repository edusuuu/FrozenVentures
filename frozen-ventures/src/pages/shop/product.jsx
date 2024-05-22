import React, { useState, useEffect, useContext } from "react";
import "../../assets/styles/product.css";
import { UserContext } from "../../context/user-context";
import { motion as m, AnimatePresence } from "framer-motion";
import { ShoppingCart, WarningCircle } from "phosphor-react";
import { fetchAllProductsFromAllUsers, addItemToCart } from "../../firebase/firebase-products";

export async function getProductsFromDatabase() {
  try {
    const databaseProducts = await fetchAllProductsFromAllUsers();
    const products = databaseProducts.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      productRetailer: product.productRetailer,
      productImage: product.productImage,
      productDescription: product.productDescription,
    }));
    return products;
  } catch (error) {
    console.error("Error converting database products data:", error);
    return [];
  }
}

export const Product = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const userId = user?.userId;

  useEffect(() => {
    const fetchProducts = async () => {
      const productsFromDatabase = await getProductsFromDatabase();
      setProducts(productsFromDatabase);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId, productPrice, productName, productRetailer, productImage) => {
    if (userId) {
      await addItemToCart(userId, productId, 1, productPrice, productName, productRetailer, productImage);
      const addedProduct = products.find((product) => product.productId === productId);
      setAddedProduct(addedProduct);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card" key={product.productId}>
          <img src={product.productImage} alt={product.productName} />
          <div className="product-box">
            <div className="product-info">
              <p>{product.productName}</p>
              <p>Php {product.productPrice}</p>
              <p>{product.productRetailer}</p>
            </div>
            <ShoppingCart onClick={() => handleAddToCart(product.productId, product.productPrice, product.productName, product.productRetailer, product.productImage)} />
          </div>
        </div>
      ))}

      <AnimatePresence>
        {showNotification && addedProduct && (
          <m.div
            className="notify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WarningCircle size={50} />
            <p>
              <span>{addedProduct.productName}</span> has been added to your cart.
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};