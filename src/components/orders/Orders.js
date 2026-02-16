import { useContext } from "react";
import { OrdersContext } from "../../context/OrdersContext";
import "./Orders.css";

function Orders() {
    const { orders, clearOrders } = useContext(OrdersContext);

    if (orders.length === 0) {
        return <h2 className="orders-h2">No orders yet </h2>;
    }

    return (
        <div className="orders-page">
            <h2>Your Orders</h2>


            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <div className="order-header">
                        <span>Order #{order.id}</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        <span className="status">{order.status}</span>
                    </div>

                    <div className="order-items">
                        {order.items.map(item => (
                            <div key={item.id} className="order-item">
                                <img src={item.img} alt={item.name} />

                                <div className="order-item-info">
                                    <h4>{item.name}</h4>
                                    <p>Price: {item.price} €</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>

                                <div className="order-item-total">
                                    {(item.price * item.quantity).toFixed(2)} €
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-total">
                        Total: <strong>{order.total.toFixed(2)} €</strong>
                    </div>
                </div>
            ))}
            <button type="button" className="order-btn" onClick={clearOrders}>
                Clear orders
            </button>
        </div>

    );
}

export default Orders;
