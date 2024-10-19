import { createContext, useState } from "react";

const CustomerProgressContext = createContext({
	progress: "",
	showCart: () => {},
	hideCart: () => {},
	showCheckOut: () => {},
	hideCheckOt: () => {},
});

export function CustomerProgressProvide({ children }) {
	const [customerProgress, setCustomerProgess] = useState("");

	function showCart() {
		setCustomerProgess("cart");
	}

	function hideCart() {
		setCustomerProgess("");
	}

	function showCheckOut() {
		setCustomerProgess("checkout");
	}

	function hideCheckOt() {
		setCustomerProgess("");
	}

	const customerProgressCtx = {
		progress: customerProgress,
		showCart,
		hideCart,
		showCheckOut,
		hideCheckOt,
	};

	return (
		<CustomerProgressContext.Provider value={customerProgressCtx}>
			{children}
		</CustomerProgressContext.Provider>
	);
}

export default CustomerProgressContext;
