// app.js
import { Homeproduct } from "../src/screens/HomeScreems.js";
//import { ProductScreens } from "../src/screens/ProductScreen.js";
//import { Productscreens } from "./screens/Products.js";
import { hideloading, parseRequestUrl, showloading } from "./Utils.js";
import { Error404screen } from "../src/screens/Error404Screen.js";
import { Productscreens } from "./screens/Products.js";
import { CartScreen } from "./screens/CartScreen.js";
import { SigninScreen } from "./screens/SigninScreen.js";
import { Header } from "./components/Header.js";
import { RegisterScreen } from "./screens/RegisterScreen.js";
import { profile } from "./screens/Profile.js";
const routes = {
  "/": Homeproduct,
  "/product/:id": Productscreens,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
  "/profile": profile,
};
//http://127.0.0.1:5500/Frontend/src/index.html#/product/1
const router = async () => {
  // showloading();
  //Al meter la funcion estas ejecutando
  const request = parseRequestUrl();
  console.log("Parsed URL:", request);
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");

  console.log("dsdsd->" + parseUrl);
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404screen;
  //====>/product/:id ? product/:id
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  /*Despues de renderizar */
  await screen.after_render();
  // hideloading();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
