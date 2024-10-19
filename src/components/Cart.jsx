import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContex";
import CustomerProgressContext from "../store/CustomerProgress";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/formatting";
import CartItem from "./CartItem";

function Cart() {
	const cartCtx = useContext(CartContext);

	const customerProgressCtx = useContext(CustomerProgressContext);

	const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

	function handleCloseCart() {
		customerProgressCtx.hideCart();
	}

	function handleCheckOutCart() {
		customerProgressCtx.showCheckOut();
	}

	return (
		<Modal
			cssClasses="cart"
			open={customerProgressCtx.progress === "cart"}
			onClose={customerProgressCtx.progress === "cart" ? handleCloseCart : null}>
			<h2>Your cart</h2>
			<ul>
				{cartCtx.items.map((item) => (
					<CartItem
						key={item.id}
						name={item.name}
						quantity={item.quantity}
						price={item.price}
						onIncrease={() => {
							cartCtx.addItem(item);
						}}
						onDecrease={() => {
							cartCtx.removeItem(item.id);
						}}
					/>
				))}
			</ul>

			<p className="cart-total"> {currencyFormatter.format(cartTotal)}</p>
			<p className="modal-actions">
				<Button textOnly onClick={handleCloseCart}>
					Close
				</Button>
				{cartCtx.items.length > 0 && <Button onClick={handleCheckOutCart}>CheckOut</Button>}
			</p>
		</Modal>
	);
}

export default Cart;
