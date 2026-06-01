export type User = {
  auth0Id: string;
  email: string;
};

export type UpdateUser = {
  address: string;
  city: string;
  country: string;
  name: string;
};

export type BackEndUser = User &
  UpdateUser & {
    _id: string;
  };

export type MenuItem = {
  _id?: string | { $oid: string };
  name: string;
  price: number;
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type OrderStatusInfo = {
  label: string;
  progressValue: number;
  value: OrderStatus;
};

export type Restaurante = {
  _id?: string | { $oid: string };
  user: string;
  restauranteName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type RestaurantSearchResponse = {
  data: Restaurante[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type OrderRestaurant = Pick<
  Restaurante,
  | "_id"
  | "city"
  | "country"
  | "deliveryPrice"
  | "estimatedDeliveryTime"
  | "imageUrl"
  | "restauranteName"
>;

export type Order = {
  _id: string;
  cartItems: Array<
    Omit<CartItem, "_id"> & {
      menuItemId?: string;
    }
  >;
  createdAt: string;
  deliveryDetails: UpdateUser & {
    email?: string;
  };
  restaurant?: OrderRestaurant;
  restaurantSnapshot: OrderRestaurant;
  status: OrderStatus;
  stripeSessionId?: string;
  totalAmount: number;
  updatedAt: string;
  user?: BackEndUser;
};
