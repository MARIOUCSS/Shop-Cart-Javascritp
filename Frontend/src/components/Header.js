import { getuser } from "../localStorage.js";
export const Header = {
  render: () => {
    const { nombre } = getuser();
    return ` 
           <div class="brand">
                <a href="#/">jamazon</a>
            </div>
            <div>
            ${
              nombre
                ? `<a href="#/profile">${nombre}</a>`
                : `<a href="#/signin">Sign-In</a>`
            }
            <a href="#/cart">Cart</a>
            </div>
    `;
  },
  after_render: () => {},
};
