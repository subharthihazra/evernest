export interface Product extends Document {
  name: string;
  description?: string;
  variant: Variant[];
}

export interface Variant {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  originalPrice: number;
  currentPrice: number;
  stock: number;
}
