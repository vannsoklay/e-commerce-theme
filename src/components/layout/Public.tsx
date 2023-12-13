// import SideBar from "./SideBar";
import { Component, JSXElement, Show } from "solid-js";
// import Breadcrumb from "../Breadcrumb";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { useLocation } from "solid-start";

interface layoutProps {
  children: JSXElement;
}

const PublicLayout: Component<layoutProps> = (props) => {
  const router = useLocation();

  return (
    <div>
      <TopBar />
      <main class="mb-16">{props.children}</main>
      <Show when={!router.pathname.startsWith("/me")}>
        <Footer />
      </Show>
    </div>
  );
};

export default PublicLayout;
