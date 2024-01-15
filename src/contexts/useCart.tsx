import {
	Show,
	createContext,
	createEffect,
	useContext,
	JSXElement,
} from "solid-js";
import { createStore } from "solid-js/store";
import { useAuth } from "./useAuth";
import { useNavigate } from "solid-start";
import { CartContextType, CartItem } from "~/types/global";
import { ItemProduct } from "~/types/product";

const CartContext = createContext<CartContextType>();

export function CartProvider(props: { children: JSXElement }) {
	const navigate = useNavigate();
	const { getUser } = useAuth();
	const [cartItems, setCartItems] = createStore<CartItem[] | []>([]);

	createEffect(() => {
		const storedCartItems: any = localStorage.getItem("cartItems");
		if (storedCartItems) {
			setCartItems(JSON.parse(storedCartItems));
		}
	});

	createEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	});

	const updateLocalStorage = () => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	};

	const addToCart = (product: ItemProduct) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find(
				(item) => item.product?.id === product?.id
			);
			if (existingItem) {
				return prevItems.map((res) =>
					res.product?.id === product?.id
						? { ...res, quantity: res.quantity + 1 }
						: res
				);
			}
			const newItem: CartItem = { product, quantity: 1 };
			const updatedItems = [...prevItems, newItem];
			return updatedItems;
		});
		updateLocalStorage();
	};

	const minusCart = (product: ItemProduct) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems?.find(
				(item) => item.product?.id === product?.id
			);
			if (existingItem) {
				return prevItems?.map((res) =>
					res.product.id === product.id
						? { ...res, quantity: res.quantity - 1 }
						: res
				);
			}
			const updatedItems = prevItems?.filter(
				(item: CartItem) => item.product.id !== product.id
			);
			return updatedItems;
		});
		updateLocalStorage();
	};

	const removeFromCart = (productId: string) => {
		setCartItems((prevItems) => {
			const updatedItems = prevItems?.filter(
				(item) => item.product.id !== productId
			);
			return updatedItems;
		});
		updateLocalStorage();
	};

	const cleanCartItems = () => {
		localStorage.removeItem("cartItems");
		setCartItems([]);
	};

	const addCarts = (items: CartItem[]) => {
		setCartItems(items.concat(cartItems));
		updateLocalStorage();
	};

	const logout = () => {
		localStorage.removeItem("cartItems");
		localStorage.removeItem("access_token");
		setCartItems([]);
		getUser();
		addCarts(cartItems);
		navigate("/");
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				addCarts,
				removeFromCart,
				minusCart,
				cleanCartItems,
				logout,
			}}
		>
			{props.children}
		</CartContext.Provider>
	);
}

export const useCart = () => useContext(CartContext) as CartContextType;
