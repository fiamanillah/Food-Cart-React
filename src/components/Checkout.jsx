import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContex";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import CustomerProgressContext from "../store/CustomerProgress";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
};

function Checkout() {
	const cartCtx = useContext(CartContext);

	const userProgressCtx = useContext(CustomerProgressContext);

	const {
		data,
		isLoading: isSending,
		error,
		sendRequest,
		clearData,
	} = useHttp("https://food-cart-react-backend-production.up.railway.app/orders", requestConfig);

	const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

	function handleClose() {
		userProgressCtx.hideCheckOt();
	}

	function handleSubmit(e) {
		e.preventDefault();

		const fd = new FormData(e.target);
		const customerData = Object.fromEntries(fd.entries());

		sendRequest(
			JSON.stringify({
				order: {
					items: cartCtx.items,
					customer: customerData,
				},
			})
		);
	}

	function handleFinish() {
		userProgressCtx.hideCheckOt();
		cartCtx.clearCart();
		clearData();
	}

	let action = (
		<>
			<Button textOnly type="button" onClick={handleClose}>
				Close
			</Button>
			<Button>Submit Order</Button>
		</>
	);

	if (isSending) {
		action = <span>Sending Order data</span>;
	}

	if (data && !error) {
		return (
			<Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
				<h2>Success</h2>
				<p>Your order has submitted successefully</p>
				<p>
					we will get back to you with more details via email within the next few minutes
				</p>

				<p className="modal-actions">
					<Button onClick={handleFinish}>Okay</Button>
				</p>
			</Modal>
		);
	}

	return (
		<Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
			<form onSubmit={handleSubmit}>
				<h2>CheckOut</h2>
				<p>Total Ammount {currencyFormatter.format(cartTotal)}</p>
				<Input label="Full Name" type="text" id="name" />
				<Input label="Email Address" type="email" id="email" />
				<Input label="Street" type="text" id="street" />
				<div className="control-row">
					<Input label="Postal Code" type="text" id="postal-code" />
					<Input label="City" type="text" id="city" />
				</div>

				{error && <Error title="Field to submit order" message={error} />}

				<p className="modal-actions">{action}</p>
			</form>
		</Modal>
	);
}

export default Checkout;
