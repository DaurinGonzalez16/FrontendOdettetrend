// Obtén todos los elementos con el nombre "imgSecundaria" (asumiendo que son elementos <img>)
const imagenesSecundarias = document.getElementsByName("imgSecundaria");

// Itera sobre los elementos y añade un listener de clic a cada uno
imagenesSecundarias.forEach((imagen) => {
  imagen.addEventListener("click", () => {
    // Obtiene el primer elemento con la clase "contenedor_img_principal"
    const contenedorPrincipal = document.querySelector(
      ".contenedor_img_principal"
    );

    // Asegúrate de que el elemento se ha encontrado antes de intentar manipularlo
    if (contenedorPrincipal) {
      // Modifica el contenido del contenedor principal con la URL de la imagen secundaria
      contenedorPrincipal.innerHTML = `<img src="${imagen.src}" alt="Imagen principal">`;
    }
  });
});
