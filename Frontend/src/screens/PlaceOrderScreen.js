import { CheckoutSteps } from "../components/CheckoutSteps.js";
import { getCartItems, getPayment, getShipping } from "../localStorage.js";

const converCartoOrder = () => {
  const orderItems = getCartItems();
  if (orderItems.length === 0) {
    document.location.hash = "/cart";
  }
  const shipping = getShipping();
  if (!shipping.country) {
    document.location.hash = "/shipping";
  }
  const Payment = getPayment();
  if (!Payment.paymentMethod) {
    document.location.hash = "/payment";
  }
  const itemsPrice = orderItems.reduce((ac, i) => ac + i.price * i.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
  const totalprice = itemsPrice + shippingPrice + taxPrice;
  return {
    orderItems,
    shipping,
    Payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalprice,
  };
};

export const PlaceOrderScreen = {
  after_render: () => {},
  render: () => {
    // const {
    //   orderItems,
    //   shipping,
    //   Payment,
    //   itemsPrice,
    //   shippingPrice,
    //   taxPrice,
    //   totalprice,
    // } = converCartoOrder();

    return `
      ${CheckoutSteps.render({
        step1: true,
        step2: true,
        step3: true,
        step4: true,
      })}
    <div class="order">
  
    
    </div>
    `;
  },
};
