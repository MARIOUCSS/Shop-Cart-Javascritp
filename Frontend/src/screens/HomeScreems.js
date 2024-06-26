//import { data } from "../data.js";
//Rating es un objeto
import { Rating } from "../components/Rating.js";
export const Homeproduct = {
  render: async () => {
    //const products = data;
    const response = await fetch("http://localhost:3000/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response || !response.ok) {
      return `<div>Error Imbecil</div>`;
    }
    const products = await response.json();
    return `
    <ul class="products">
      ${products
        .map(
          (product) => `
    <li>
       <div class="product">
         <a href="#/product/${product._id}">
          <img src="${product.image}" alt="${product.name}">
         </a>
          <div class="product-name">
          <a href="#/product/${product._id}">
             ${product.name}
          </a>
           </div>
           <div class="product-rating">
           ${Rating.render({
             value: product.rating,
             text: `${product.numReviews} reviews`,
           })}
           </div>
          <div class="product-brand">
          ${product.brand}
           </div>
          <div class="product-price">
         $${product.price}
          </div>
      </div>
    </li>
      `
        )
        .join("\n")}
     </ul>
    `;
  },
};
