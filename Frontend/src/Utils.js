//import { getCartItems } from "./localStorage";

export const parseRequestUrl = () => {
  // //     document.location: Se refiere al objeto Location asociado al
  //  documento actual, que proporciona información sobre la URL del documento.
  // // .hash: Devuelve la parte de la URL después del símbolo de almohadilla (#).
  // // .toLowerCase(): Convierte el valor del fragmento a minúsculas.
  const url = document.location.hash.toLowerCase();
  //const url = document.location.href.toLowerCase();
  console.log("Full URL:", url);
  const request = url.split("/").slice(1);
  console.log("====>" + request);
  const [resource, id, verb] = request;
  return {
    resource: resource || null,
    id: id || null,
    verb: verb || null,
  };
};
//En este paso entre el objeto{ render:(),after_render:()}
//para que muestre el render y despues el after render para que pueda seguie el change
export const rerender = async (component) => {
  document.getElementById("main-container").innerHTML =
    await component.render();
  await component.after_render();
};

export const showloading = () => {
  document.getElementById("loading-overlay").classList.add("active");
};
export const hideloading = () => {
  document.getElementById("loading-overlay").classList.remove("active");
};
export const redirecUser = (pp) => {
  //console.log(pp.length);//
  if (Array.isArray(pp)) {
    console.log(pp.length);
    pp.length !== 0
      ? (document.location.hash = "/shipping")
      : (document.location.hash = "/");
  } else {
    console.error("Expected an array but received:", pp);
  }
  // if (getCartItems().length !== 0) {
  //   document.location.hash = "/shipping";
  // } else {
  //   document.location.hash = "/";
  // }
};
