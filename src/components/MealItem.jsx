import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import CartContex from "../store/CartContex";
function MealItem({ meal }) {
	const cartCtx = useContext(CartContex);

	function handleAddMealToCart() {
		cartCtx.addItem(meal);
	}

	return (
		<li className="meal-item">
			<article>
				<img
					src={`https://food-cart-react-backend-production.up.railway.app/${meal.image}`}
					alt={meal.name}
				/>
				<div>
					<h3>{meal.name}</h3>
					<p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
					<p className="meal-item-description">{meal.description}</p>
				</div>
				<p className="meal-item-actions">
					<Button onClick={handleAddMealToCart}>Add To Cart</Button>
				</p>
			</article>
		</li>
	);
}

export default MealItem;
