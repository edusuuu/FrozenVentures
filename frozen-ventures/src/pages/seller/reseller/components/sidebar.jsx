import React, { useState } from "react";
import {
  Gauge,
  Storefront,
  Truck,
  ClockCounterClockwise,
  Coin,
  Cube,
  Kanban,
  Envelope,
  CaretRight,
  CaretLeft,
  ShoppingCart,
} from "phosphor-react";

export const Sidebar = ({ activeItem, onActiveItemChange, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    onToggle(!isExpanded);
  };

  const handleItemClick = (item) => {
    onActiveItemChange(item);
  };

  return (
    <div className={`side-bar ${isExpanded ? "expanded" : ""}`}>
      {isExpanded ? (
        <CaretLeft
          className="toggle-sidebar"
          size={30}
          onClick={toggleSidebar}
        />
      ) : (
        <CaretRight
          className="toggle-sidebar"
          size={30}
          onClick={toggleSidebar}
        />
      )}
      <ul>
        <li
          className={activeItem === "performance" ? "active" : ""}
          onClick={() => handleItemClick("performance")}
          data-tooltip="Shop Performance"
        >
          <Gauge size={40} />
          {isExpanded && <p>Shop Performance</p>}
        </li>
        <li
          className={activeItem === "shop" ? "active" : ""}
          onClick={() => handleItemClick("shop")}
          data-tooltip="Shop"
        >
          <Storefront size={40} />
          {isExpanded && <p>Shop</p>}
        </li>
        <li
          className={activeItem === "cart" ? "active" : ""}
          onClick={() => handleItemClick("cart")}
          data-tooltip="Cart"
        >
          <ShoppingCart size={40} />
          {isExpanded && <p>Cart</p>}
        </li>
        <li
          className={activeItem === "history" ? "active" : ""}
          onClick={() => handleItemClick("history")}
          data-tooltip="History"
        >
          <ClockCounterClockwise size={40} />
          {isExpanded && <p>History</p>}
        </li>
        <li
          className={activeItem === "order" ? "active" : ""}
          onClick={() => handleItemClick("manage-order")}
          data-tooltip="Manage Order"
        >
          <Truck size={40} />
          {isExpanded && <p>Manage Order</p>}
        </li>
        <li
          className={activeItem === "product" ? "active" : ""}
          onClick={() => handleItemClick("manage-product")}
          data-tooltip="Manage Product"
        >
          <Coin size={40} />
          {isExpanded && <p>Manage Product</p>}
        </li>
        <li
          className={activeItem === "inventory" ? "active" : ""}
          onClick={() => handleItemClick("manage-inventory")}
          data-tooltip="Manage Inventory"
        >
          <Cube size={40} />
          {isExpanded && <p>Manage Inventory</p>}
        </li>
        <li
          className={activeItem === "manage-shop" ? "active" : ""}
          onClick={() => handleItemClick("manage-shop")}
          data-tooltip="Manage Shop"
        >
          <Kanban size={40} />
          {isExpanded && <p>Manage Shop</p>}
        </li>
        <li
          className={activeItem === "inbox" ? "active" : ""}
          onClick={() => handleItemClick("inbox")}
          data-tooltip="Inbox"
        >
          <Envelope size={40} />
          {isExpanded && <p>Inbox</p>}
        </li>
      </ul>
    </div>
  );
};
