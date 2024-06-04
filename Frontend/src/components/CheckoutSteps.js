export const CheckoutSteps = {
  render: (props) => {
    //el props sera un objeto que servira para llevar datos del padre al hijo
    //ojo {props={step1:true ,step2:true}}
    return `
<div class="checkout-steps">
<div class="${props.step1 ? "active" : ""}">Signin</div>
<div class="${props.step2 ? "active" : ""}">Shipping</div>
<div class="${props.step3 ? "active" : ""}">Payment</div>
<div class="${props.step4 ? "active" : ""}">Place Order</div>
`;
  },
};
