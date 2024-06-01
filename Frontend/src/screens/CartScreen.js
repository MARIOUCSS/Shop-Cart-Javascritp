import { GetProduct } from "../Api.js";
import { parseRequestUrl, rerender } from "../Utils.js";
import { SetItems, getCartItems } from "../localStorage.js";
const addtoCart = async (item, forceupdate = false) => {
  //let porque este puede cambiar de [] a lleno
  //cuando se ingresa el producto primero entra el ({objeto},false)
  //ahora cuando se actualiza este entra el true({objeto},true)
  console.log("cuantity", item.qty);
  let carItems = getCartItems();
  const existem = carItems.findIndex((x) => x.product === item.product);
  if (existem !== -1) {
    const pro = await GetProduct(carItems[existem].product);
    console.log(pro);
    console.log(item);
    if (pro.countInStock >= item.qty) {
      // carItems[existem].qty += 1;
      // console.log(item);
      carItems[existem].qty = item.qty;
      // SetItems(carItems);
      console.log("Cantidad seleccionada:", item.qty);
      // SetItems([...carItems, { ...item }]);
    } else {
      console.log("no se puede añadir mas");
    }
  } else {
    SetItems([...carItems, item]);
  }
  if (forceupdate) {
    //aca el problema es que primero muestra el rendery despues setea debe ser al contrario
    SetItems(carItems);
    rerender(CartScreen);
  }
};

const removeFromcart = (id) => {
  SetItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    //Si hay un id se tiene que mandar
    //y elimino el ultimo y se va a cart
    document.location.hash = "/cart";
    //si hay un id quedate hay ahora cuando se vacia el carrito
    //presionas para seguir comprando y vuelves al carrito toda la funcionalidad
    //tambien tiene ejecutarse como eliminar otra vez  por eso el else
    //sino pongo el else solamente se elimina una vez pero los demas elementos quedan
    //en el localstorage si se elimina
    /// http://127.0.0.1:5500/Frontend/src/index.html#/cart/||5||
  } else {
    //al eliminar uno se va a a la pagina cart
    //pero no actualiza sigue mostrando pero no
    //Tienes que darle funcionalidad a los botones que quedan al eliminar tienes que actualizarlos
    rerender(CartScreen);
  }
};

export const CartScreen = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName("qty-select");
    //ArrayFron convierte en array los select
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener("change", (e) => {
        //Trae lo que esta en el localstorage
        //El item trae solo el array que se parece
        //select su value
        //Qty:<select class="qty-select" id="${item.product}">
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        const selectedQty = Number(e.target.value);
        console.log("Cantidad seleccionada:", selectedQty);
        addtoCart({ ...item, qty: selectedQty }, true);
      });
    });

    const deletebuttons = document.getElementsByClassName("delete-button");
    Array.from(deletebuttons).forEach((deleteb) => {
      //  <button type="button" class="delete-button" ====>||id|↑="${
      //  item.product
      // }">
      deleteb.addEventListener("click", () => {
        removeFromcart(deleteb.id);
      });
    });
    document.getElementById("checkout-button").addEventListener("click", () => {
      document.location.hash = "/signin";
    });
  },
  render: async () => {
    //identifica
    const request = parseRequestUrl();
    if (request.id) {
      const product = await GetProduct(request.id);
      addtoCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countinStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `<div class="cart">
     <div class="cart-list">
       <ul class="cart-list-container">
         <li>
           <h3>Shopping</h3>
           <div>Price</div>
         </li>
         ${
           cartItems.length === 0
             ? '<div>Cart is empty.<a href="#/">Go Shopping</a></div>'
             : cartItems
                 .map(
                   (item) => `
         <li>
          <div class="cart-image">
           <img src="${item.image}" alt="${item.name}"/>
          </div>
          <div class="cart-name">
           <div>
             <a href="#/product/${item.product}">
               ${item.name}
             </a>
           </div>
           <div>
      
              Qty:<select class="qty-select" id="${item.product}">
                   ${[...Array(item.countinStock).keys()].map((x) =>
                     //En el array se forma 4 espacios dependiendo el numero de count
                     //x =0,1,2,3,4
                     item.qty === x + 1
                       ? // Por ejemplo si es 2 va iterar 2==0+1 = 2===1 muestra el segundo
                         //cuando llega a ser 2===2 ese numero sera seleccionado con check
                         // por ejemplo  1 (check)/2 3 4 5
                         `<option selected value="${x + 1}">${x + 1}</option>`
                       : `<option value="${x + 1}">${x + 1}</option>`
                   )}
                  </select>
                  <button type="button" class="delete-button" id="${
                    item.product
                  }">
                    Delete
                  </button>
           </div>

          </div>
          <div class="cart-price">
           $${item.price}
          </div>

         </li>

          `
                 )
                 .join("")
         }
       </ul>
     </div>
     <div class="cart-action">
       <h3>
       Subtotal(${cartItems.reduce((a, c) => a + c.qty, 0)} items)
       :
       $${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
       </h3>
       <button id="checkout-button" class="primary fw">
       Proceed to Checkout
       </button>
     </div>

    </div>
    `;
  },
};
