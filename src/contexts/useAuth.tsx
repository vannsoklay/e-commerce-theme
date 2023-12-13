import {
  createContext,
  useContext,
  JSXElement,
  type Component,
  createSignal,
  createEffect,
  Show,
} from "solid-js";
import { getMe } from "~/api/me";
import { Dialog } from "~/components/Dialog";
import { LoginForm } from "~/components/forms/LoginForm";

interface contextProps {
  children: JSXElement;
}

const AuthContext = createContext<{
  user: () => UserType | null;
  getUser: () => void;
  loading: () => void;
  login: (model: string | null) => void
}>();

const AuthProvider: Component<contextProps> = (props) => {
  const [modalId, setModelId] = createSignal<string | null>(null);
  const [user, setUser] = createSignal<UserType | null>(null);
  const [loading, setLoading] = createSignal<boolean>(true);

  const getUser = () => {
    getMe()
      .then(({ status, data }) => {
        if (status === 200) {
          setUser(data.data.user);
          return;
        }
        setUser(null);
      })
      .catch((e) => {
        setUser(null);
        setLoading(false);
        return;
      });
  };

  createEffect(() => {
    setLoading(true);
    getMe()
      .then(({ status, data }) => {
        if (status === 200) {
          setUser(data.data.user);
        }
      })
      .catch((e) => {
        setUser(null);
        setLoading(false);
        return;
      });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const context = {
    user,
    getUser,
    loading: () => loading(),
    login: (model: string | null) => login(model)
  };

  // this use for popup login when click on button login at top bar
  const login = (model: string | null) => {
    setModelId(() => model);
  };

  return (
    <AuthContext.Provider value={context}>
      <Dialog modalId={modalId} classes="w-96">
        <h1 class="font-bold text-xl mb-6">Login</h1>
        <LoginForm handler={login} />
      </Dialog>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext) as ContextAuth;
}
