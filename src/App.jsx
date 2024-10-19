import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContexProvider } from "./store/CartContex";
import { CustomerProgressProvide } from "./store/CustomerProgress";

function App() {
	return (
		<CustomerProgressProvide>
			<CartContexProvider>
				<Header />
				<Meals />
				<Cart />
				<Checkout />
			</CartContexProvider>
		</CustomerProgressProvide>
	);
}

export default App;
