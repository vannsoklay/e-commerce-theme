type ContextAuth = {
  user: () => UserType;
  getUser: () => void;
  loading:  () => void;
  login: (model: string | null) => void;
};

type CartItem = {
  product: ProductType;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ProductType) => void;
  minusCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  cleanCartItems: Function,
  logout: Function
}

type LoginForm = {
  email?: string;
  phone?: string;
  password?: string;
};