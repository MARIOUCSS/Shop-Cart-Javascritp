import { RegisterUser } from "../Api.js";
import { Setuserlo } from "../localStorage.js";
import { getuser } from "../localStorage.js";
import { hideloading, redirecUser, showloading } from "../Utils.js";
import { getCartItems } from "../localStorage.js";
// import { hideloading } from "../Utils.js";
export const RegisterScreen = {
  after_render: () => {
    document
      .getElementById("register-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showloading();
        const data = await RegisterUser({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });
        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          Setuserlo(data);
          hideloading();
          redirecUser(getCartItems());
          // document.location.hash = "/";
        }
      });
  },
  render: () => {
    // En esta parte si esta logueado no se podra acceder otra vez al login
    if (getuser().nombre) {
      //  alert(getuser().nombre);
      //document.location.hash = "/";
      redirecUser();
    }
    return `
 <div class="form-container">
  <form id="register-form">
    <ul class="form-items">
     <li><h3>Create count</h3></li>
     <li>
      <label for="name">Name</label>
      <input type="name" name="name" id="name">
     </li>
    <li>
    <label for="email">Password</label>
    <input type="email" name="email" id="email">
    </li>
    <li>
    <label for="password">Password</label>
    <input type="password" name="password" id="password">
    </li>
    <li>
    <label for="repassword">Re-Password</label>
    <input type="password" name="repassword" id="repassword">
    </li>
    <li>
     <button type="submit" class="primary">Register</button>
    </li>
    <li>
     <div>
      Already have an account?<a href="#/signin">Sign-In</a>
     </div>
    </li>
    </ul>
  </form>
 </div>

`;
  },
};
