export const getCartItems = () => {
  const cartitems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartitems;
};
export const SetItems = (cartitems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartitems));
};
export const clearuser = () => {
  // console.log("aca estoy");
  localStorage.removeItem("Useritems");
};
export const getShipping = () => {};
export const getuser = () => {
  const useritems = localStorage.getItem("Useritems")
    ? JSON.parse(localStorage.getItem("Useritems"))
    : { token: "", id: "", nombre: "", email: "", isAdmin: "" };
  return useritems;
};
export const Setuserlo = (data) => {
  localStorage.setItem(
    "Useritems",
    JSON.stringify({
      token: data.token,
      id: data.user.id,
      nombre: data.user.name,
      email: data.user.email,
      isAdmin: data.user.isAdmin,
    })
  );
};
