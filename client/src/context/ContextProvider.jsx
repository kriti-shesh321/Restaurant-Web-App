import { AuthProvider } from "./Auth/AuthContext";
import { ReviewProvider } from "./Restaurant/ReviewContext";
import { MenuCategoryProvider } from "./Menu/MenuCategoryContext";
import { MenuProvider } from "./Menu/MenuContext";
import { DeliveryAddressProvider } from "./Auth/DeliveryAddressContext";
import { CartProvider } from "./Cart/CartContext";
import { OrderProvider } from "./Order/OrderContext";

export const AppContextProvider = ({ children }) => {
  return (
    <CartProvider>
      <AuthProvider>
        <DeliveryAddressProvider>
          <OrderProvider>
            <ReviewProvider>
              <MenuCategoryProvider>
                <MenuProvider>
                  {children}
                </MenuProvider>
              </MenuCategoryProvider>
            </ReviewProvider>
          </OrderProvider>
        </DeliveryAddressProvider>
      </AuthProvider>
    </CartProvider>
  );
};