type ContextAuth = {
  user: () => UserType;
  getUser: () => void;
  loading:  () => void;
  login: (model: string | null) => void;
};

type CartItem = {
  product: ItemProduct;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ItemProduct) => void,
  minusCart: (product: ItemProduct) => void,
  removeFromCart: (productId: string) => void,
  addCarts: (cartItems: CartItem[]) => void,
  cleanCartItems: Function,
  logout: Function
}

type LoginForm = {
  email?: string;
  phone?: string;
  password?: string;
};