import { Updateuser } from "../Api.js";
import { Setuserlo } from "../localStorage.js";
import { getuser } from "../localStorage.js";
import { hideloading, showloading } from "../Utils.js";
import { clearuser, getShipping } from "../localStorage.js";
// import { hideloading } from "../Utils.js";
export const ShippingScreen = {
  after_render: () => {
    document.getElementById("signout-button").addEventListener("click", (e) => {
      e.preventDefault();
      clearuser();
      document.location.hash = "/";
    });
    const { token } = getuser();

    document
      .getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showloading();
        const data = await Updateuser({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          token: token,
        });
        if (data.error) {
          alert(data.error);
        } else {
          console.log("paso");
          console.log(data);
          Setuserlo(data);
          hideloading();
          document.location.hash = "/";
        }
      });
  },
  render: () => {
    // En esta parte si esta logueado no se podra acceder otra vez al login
    const { nombre, email } = getuser();
    if (!nombre) {
      document.location.hash = "/";
    }
    const { address, city, postalCode, country } = getShipping();
    return `
 <div class="form-container">
  <form id="shipping-form">
    <ul class="form-items">
     <li><h3>User Profile</h3></li>
     <li>
      <label for="name">Name</label>
      <input type="name" name="name" id="name" value="${nombre}">
     </li>
    <li>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" value="${email}">
    </li>
    <li>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" >
    </li>
 
    <li>
     <button type="submit" class="primary">Update</button>
    </li>
    <li>
     <button type="submit"  id="signout-button">Sign Out</button>
    </li>
    </ul>
  </form>
 </div>

`;
  },
};
