import { setShipping } from "../localStorage.js";
import { getuser } from "../localStorage.js";

import { getShipping } from "../localStorage.js";
import { CheckoutSteps } from "../components/CheckoutSteps.js";
// import { hideloading } from "../Utils.js";
export const ShippingScreen = {
  after_render: () => {
    document
      .getElementById("shipping-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          postalCode: document.getElementById("PostalCode").value,
          country: document.getElementById("Country").value,
        });
        document.location.hash = "/payment";
      });
  },
  render: () => {
    // En esta parte si esta logueado no se podra acceder otra vez al login
    const { nombre } = getuser();
    if (!nombre) {
      document.location.hash = "/";
    }
    const { address, city, postalCode, country } = getShipping();
    //props={setp:true} = props.step=true
    return `
    
    ${CheckoutSteps.render({ step1: true, step2: true })}
 <div class="form-container">
  <form id="shipping-form">
    <ul class="form-items">
     <li><h3>Shipping</h3></li>
     <li>
      <label for="address">Address</label>
      <input type="text" name="address" id="address" value="${address}">
     </li>
     <li>
     <label for="city">City</label>
     <input type="text" name="city" id="city" value="${city}">
    </li>
    <li>
     <label for="Postal code">Postal Code</label>
     <input type="text" name="postalcode" id="PostalCode" value="${postalCode}">
    </li>
    <li>
     <label for="Country">Country</label>
     <input type="text" name="postalcode" id="Country" value="${country}">
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
