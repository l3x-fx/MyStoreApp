export interface RawProduct {
  id: number;
  name: string;
  description: string;
  img_url: string;
  price: number;
  category: string;
}

export interface Product extends RawProduct {
  quantity: number;
}
