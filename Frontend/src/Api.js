import { apiurl } from "./config.js";
import { getuser } from "./localStorage.js";

export const GetProduct = async (id) => {
  try {
    const response = await fetch(`${apiurl}/api/products/${id}`);

    // Verificar si la solicitud fue exitosa (status 200)
    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }

    // Convertir la respuesta a JSON
    const data = await response.json();

    // Verificar si el campo 'success' está presente y es true
    if (data.success) {
      return data.product;
    } else {
      throw new Error("La solicitud no fue exitosas");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return { error: error.message };
  }
};
export const RegisterUser = async (userR = { name, email, password }) => {
  try {
    const response = await fetch(`${apiurl}/apiu/registeru`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userR),
    });
    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error("La solicitud no fue exitosas");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return { error: error.message };
  }
};
export const Updateuser = async (USERU = { name, email, password }) => {
  try {
    const { id, token } = getuser();
    if (!id || !token) {
      throw new Error("No se encontró el ID o el token del usuario");
    }
    console.log("Enviando solicitud con ID:", id);
    console.log("Enviando solicitud con token:", token);
    console.log("Enviando solicitud con token:", USERU);
    // http://localhost:3000/apiu/update/662c765fa7fe05a2fdc0870b
    const response = await fetch(`${apiurl}/apiu/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Aquí debes asegurarte de que no haya espacios adicionales
      },
      body: JSON.stringify(USERU),
    });
    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error("La solicitud no fue exitosas");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return { error: error.message };
  }
};
export const SigninScreens = async (user = { email, password }) => {
  try {
    const response = await fetch(`${apiurl}/apiu/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("La solicitud no fue exitosa");
    }
    const data = await response.json();
    if (data.success) {
      return data;
    } else {
      throw new Error("La solicitud no fue exitosas");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    return { error: error.message };
  }
};
