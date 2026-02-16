import { createContext, useEffect, useState } from "react";

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = ({ items, total }) => {
    const newOrder = {
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items,
      total,
      status: "Placed", // mock status
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const clearOrders = () => setOrders([]);

  return (
    <OrdersContext.Provider value={{ orders, createOrder, clearOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}
