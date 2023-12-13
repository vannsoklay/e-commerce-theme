import { LoginForm } from "../forms/LoginForm";

const PrivateNotFound = () => {
  const name = "KHM";
  return (
    <div class="container mx-auto md:px-32 h-[52vh] flex items-center justify-center">
      <section class="space-y-4">
        <h1 class="font-bold text-xl flex justify-center">Login</h1>
        <LoginForm
          handler={() => "my_modal_1"}
          kind="private"
          className="w-96"
        />
      </section>
    </div>
  );
};

export default PrivateNotFound;
