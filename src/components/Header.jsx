import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContex";
import CustomerProgressContext from "../store/CustomerProgress";
function Header() {
	const cartCtx = useContext(CartContext);

	const customerProgressCtx = useContext(CustomerProgressContext);

	const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity;
	}, 0);

	function handleShowCart() {
		customerProgressCtx.showCart();
	}

	return (
		<header id="main-header">
			<div id="title">
				<img src={logoImg} alt="logoImg" />
				<h1>ReactFood</h1>
			</div>
			<nav>
				<Button textOnly onClick={handleShowCart}>
					Cart ({totalCartItems})
				</Button>
			</nav>
		</header>
	);
}

export default Header;
