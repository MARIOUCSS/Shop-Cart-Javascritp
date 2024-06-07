import { setShipping } from "../localStorage.js";
import { getuser, setPayment } from "../localStorage.js";

import { CheckoutSteps } from "../components/CheckoutSteps.js";
// import { hideloading } from "../Utils.js";
export const PaymentScreen = {
  after_render: () => {
    document
      .getElementById("payment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const PaymetMethod = document.querySelector(
          'input[name="payment-method"]:checked'
        ).value;
        setPayment({ PaymetMethod });
        document.location.hash = "/placeorder";
      });
  },
  render: () => {
    // En esta parte si esta logueado no se podra acceder otra vez al login
    const { nombre } = getuser();
    if (!nombre) {
      document.location.hash = "/";
    }

    //props={setp:true} = props.step=true
    return `
    
    ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
 <div class="form-container">
  <form id="payment-form">
    <ul class="form-items">
     <li><h3>Payment</h3></li>
     <li>
      <div>
       <input type="radio"
       id="paypal"
       name="payment-method"
       value="Paypal"
       checked
       />
       <label for="paypal">Paypal</label>
      </div>
     </li>
     <li>
     <div>
      <input type="radio"
      name="payment-method"
      id="Stripe"
      value="Stripe"
      />
      <label for="Stripe">Stripe</label>
     </div>
    </li>
    <li>
     <button type="submit" class="primary">Continue</button>
    </li>
   
    </ul>
  </form>
 </div>

`;
  },
};
