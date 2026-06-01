import { useState } from "react";

import { useNavigate, useParams } from "react-router";

import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurantById } from "@/api/RestaurantApi";
import type { CartItem, MenuItem } from "@/api/types";
import CheckOutButton from "@/components/search/CheckOutButton";
import MenuItemCard from "@/components/search/MenuItemCard";
import OrderSummary from "@/components/search/OrderSummary";
import RestaurantInfo from "@/components/search/RestaurantInfo";
import LoadingButton from "@/components/LoadingButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import type { UserFormData } from "@/forms/user-profile-form/UserProfileForm";

const CART_ITEMS_SESSION_KEY = "cartItems";

const getObjectId = (value: MenuItem["_id"]) =>
  typeof value === "string" ? value : value?.$oid;

const getStoredCartItems = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const storedCartItems = window.sessionStorage.getItem(CART_ITEMS_SESSION_KEY);

  if (!storedCartItems) {
    return [];
  }

  try {
    const parsedCartItems = JSON.parse(storedCartItems);
    return Array.isArray(parsedCartItems) ? parsedCartItems : [];
  } catch {
    return [];
  }
};

const storeCartItems = (cartItems: CartItem[]) => {
  window.sessionStorage.setItem(
    CART_ITEMS_SESSION_KEY,
    JSON.stringify(cartItems)
  );
};

function DetailPage() {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const { data: restaurant, error, isLoading } =
    useGetRestaurantById(restaurantId);
  const { isPending: isCreatingCheckout, mutateAsync: createCheckoutSession } =
    useCreateCheckoutSession();
  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCartItems);

  const addToCart = (menuItem: MenuItem) => {
    const menuItemId = getObjectId(menuItem._id) ?? menuItem.name;

    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItemId
      );

      const updatedCartItems = existingCartItem
        ? prevCartItems.map((cartItem) =>
            cartItem._id === menuItemId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [
            ...prevCartItems,
            {
              _id: menuItemId,
              name: menuItem.name,
              price: menuItem.price,
              quantity: 1,
            },
          ];

      storeCartItems(updatedCartItems);
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (currentCartItem) => currentCartItem._id !== cartItem._id
      );

      storeCartItems(updatedCartItems);
      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurantId) {
      return;
    }

    const checkoutSession = await createCheckoutSession({
      cartItems,
      deliveryDetails: {
        address: userFormData.address,
        city: userFormData.city,
        country: userFormData.country,
        name: userFormData.name,
      },
      restaurantId,
    });

    const checkoutUrl = new URL(checkoutSession.url, window.location.origin);

    if (checkoutUrl.origin === window.location.origin) {
      navigate(`${checkoutUrl.pathname}${checkoutUrl.search}`);
      return;
    }

    window.location.assign(checkoutSession.url);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingButton label="Cargando restaurante..." />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error?.message ?? "No se encontro el restaurante."}
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <AspectRatio ratio={16 / 9} className="rounded-lg bg-slate-100">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restauranteName}
          className="absolute inset-0 size-full object-cover"
        />
      </AspectRatio>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <RestaurantInfo restaurant={restaurant} />

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950">Menu</h2>
            <div className="grid gap-3">
              {restaurant.menuItems.map((menuItem) => (
                <MenuItemCard
                  key={getObjectId(menuItem._id) ?? menuItem.name}
                  menuItem={menuItem}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </section>
        </div>

        <Card className="self-start lg:sticky lg:top-6">
          <OrderSummary
            cartItems={cartItems}
            deliveryPrice={restaurant.deliveryPrice}
            restaurantName={restaurant.restauranteName}
            removeFromCart={removeFromCart}
          />
          <CardFooter className="pt-0">
            <CheckOutButton
              disabled={cartItems.length === 0}
              isLoading={isCreatingCheckout}
              onCheckout={onCheckout}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default DetailPage;
