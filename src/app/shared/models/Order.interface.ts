export interface OrderItem {
  product_id: string;
  quantity: number;
}

export interface Order {
  id: number;
  status: string;
  date: string;
  user_id: string;
  products: OrderItem[];
}
