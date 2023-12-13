import { A } from "solid-start";

export const ComingSoon = () => {
  return (
    <div class="container mx-auto h-[48vh] flex justify-center items-center">
      <main class="text-center">
        <h1 class="text-2xl font-bold text-gray-600 pb-4">Coming Soon</h1>
        <A href="/products">
          <button class="btn btn-md w-64 bg-primary/30 text-primary hover:bg-primary/30 hover:text-primary hover:border-primary">
            More Products
          </button>
        </A>
      </main>
    </div>
  );
};

export const Development = () => {
    return (
      <div class="container mx-auto h-[48vh] flex justify-center items-center">
        <main class="text-center">
          <h1 class="text-2xl font-bold text-gray-600 pb-4">Development</h1>
          <A href="/products">
            <button class="btn btn-md w-64 bg-primary/30 text-primary hover:bg-primary/30 hover:text-primary hover:border-primary">
              More Products
            </button>
          </A>
        </main>
      </div>
    );
  };
  
