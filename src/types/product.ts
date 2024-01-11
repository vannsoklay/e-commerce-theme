interface Variants {
  label: string;
  option: "SIZE" | "COLOR";
  preview: string;
  price: string;
}

type ItemProduct = {
  thumbnail?: any;
  title?: Element;
  id: string;
  name: string;
  price: number;
  currency: "KHR" | "USD";
  preview: string;
};
type ProductType = {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
  brand: string;
  currency: string;
  price: number;
  slug: String;
  previews: string[];
  tags: string[];
  quantity: number;
  variants: Variants[];
};

// dynamic types
type HeaderType = {
  logo: string;
  name: string;
  type: boolean;
};
