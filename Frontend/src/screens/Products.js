import { parseRequestUrl } from "../Utils.js";
import { GetProduct } from "../Api.js";
import { Rating } from "../components/Rating.js";
export const Productscreens = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener("click", () => {
      document.location.hash = `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    console.log(request.id);
    const product = await GetProduct(request.id);
    console.log(product);
    if (product.error) {
      return `<h1>${product.error}</h1>`;
    }
    return `
     <div class="content">
        <div class="back-to-result"> 
         <a href="/#/">Back to Result</a>
        </div>
        <div class="details">
          <div class="details-image">
           <img src="${product.image}" alt="${product.name}"/>
          </div>
          <div class="details-info">
           <ul>
             <li>
              <h1>${product.name}</h1>
             </li>
             <li>${Rating.render({
               value: product.rating,
               text: `${product.numReviews} reviews`,
             })}</li>
             <li>
              Price:<Strong>$${product.price}</Strong>
             </li>
             <li>
             Description:
              <div>
              ${product.description}
              </div>
              
             </li>
           </ul>
          </div>
          <div class="details-action">
            <ul>
               <li>
               Price:<Strong>$${product.price}</Strong>
               </li>
               <li>
                Status:${
                  product.countInStock > 0
                    ? `<span class="success">In Stock</span>`
                    : `<span class="error">Unavailable</span>`
                }
               </li>
               <li>
                  <button  id="add-button" class=" fw button primary"> ADD TO CART</button>
               </li>
            </ul>
          </div>
          
        </div>
     </div>
    `;
  },
};
