import React, { useContext, useState, useEffect, useRef } from "react";
import { ShopContext } from "../../context/shop-context";
import { Minus, Plus, Trash } from "phosphor-react";
import { AnimatePresence, easeInOut, motion as m } from "framer-motion";

export const CartItem = (props) => {
  const { id, productName, price, retailerName, productImage } = props.data;
  const {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemAmount,
  } = useContext(ShopContext);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const confirmDeleteRef = useRef(null);

  const totalPrice = (cartItems[id] * price).toFixed(2);

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[id] = 0;
    setCartItems(updatedCartItems);
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleClickOutside = (event) => {
    if (
      confirmDeleteRef.current &&
      !confirmDeleteRef.current.contains(event.target)
    ) {
      setShowConfirmDelete(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="cart-item">
      <table>
        <tbody>
          <tr>
            <td className="information">
              <img src={productImage} alt={productName} />
              <div className="description">
                <p>
                  <b>{productName}</b>
                </p>
                <p>{retailerName}</p>
                <p>Php {price}</p>
              </div>
            </td>
            <td className="quantity">
              <button onClick={() => removeFromCart(id)}>
                <Minus size={25} />
              </button>
              <input
                value={cartItems[id]}
                onChange={(e) =>
                  updateCartItemAmount(Number(e.target.value), id)
                }
                readOnly
              />
              <button onClick={() => addToCart(id)}>
                <Plus size={25} />
              </button>
            </td>
            <td>
              <p>Php {totalPrice}</p>
            </td>
            <td className="delete">
              <button onClick={handleDelete}>
                <Trash size={45} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <AnimatePresence>
        {showConfirmDelete && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="confirm-delete"
            ref={confirmDeleteRef}
          >
            <div className="text">
              <h2>
                <span>Remove {productName}</span> from cart
              </h2>
              <p>
                Are you sure you want to remove <span>{productName}</span> from
                your cart?
              </p>
            </div>

            <div className="button-container">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
