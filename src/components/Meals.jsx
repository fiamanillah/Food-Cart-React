import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const deafultConfig = {};

function Meals() {
	const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp(
		"https://food-cart-react-backend-production.up.railway.app/meals",
		deafultConfig,
		[]
	);

	if (isLoading) {
		return <p className="center">Meal is loading</p>;
	}

	if (error) {
		return <Error title={"Could not fetch"} message={error} />;
	}

	return (
		<ul id="meals">
			{loadedMeals.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
}

export default Meals;
