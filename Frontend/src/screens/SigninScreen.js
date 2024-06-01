import { SigninScreens } from "../Api.js";
import { Setuserlo } from "../localStorage.js";
import { getuser } from "../localStorage.js";
import { hideloading, redirecUser, showloading } from "../Utils.js";
// import { hideloading } from "../Utils.js";
export const SigninScreen = {
  after_render: () => {
    document
      .getElementById("signin-form")
      .addEventListener("submit", async (e) => {
        //Cuando presionamos sale el loading y se hace la peticion
        //si sale bien se quita la clase que se añadio
        //
        e.preventDefault();
        showloading();
        const data = await SigninScreens({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
        });

        if (data.error) {
          alert(data.error);
        } else {
          console.log(data);
          Setuserlo(data);
          hideloading();
          redirecUser();
          //document.location.hash = "/";
        }
      });
  },
  render: () => {
    //En esta parte si esta logueado no se podra acceder otra vez al login
    if (getuser().nombre) {
      //  alert(getuser().nombre);
      // document.location.hash = "/";
      redirecUser();
    }
    return `
 <div class="form-container">
  <form id="signin-form">
    <ul class="form-items">
     <li><h1>Sign-In</h1></li>
     <li>
      <label for="email">Email</label>
      <input type="email" name="email" id="email">
     </li>
    <li>
    <label for="password">Password</label>
    <input type="password" name="password" id="password">
    </li>
    <li>
     <button type="submit" class="primary">Submit</button>
    </li>
    <li>
     <div>
      New User?<a href="#/register">Create your count</a>
     </div>
    </li>
    </ul>
  </form>
 </div>

`;
  },
};
