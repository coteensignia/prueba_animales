// Función autoejecutable que encapsula la lógica de manejo de animales
const iife = (() => {
  // Arreglo para almacenar las instancias de animales
  const animalsArray = [];

  // Función asíncrona para obtener datos de animales desde un archivo JSON
  async function obtenerDataJson(nombre) {
    try {
      // Hacemos una solicitud para obtener el archivo JSON
      const response = await fetch("animales.json");
      // Convertimos la respuesta a JSON
      const data = await response.json();
      // Buscamos el animal que coincide con el nombre dado
      const animalData = data.animales.find(animal => animal.name === nombre);
      return animalData;
    } catch (error) {
      // Manejo de errores en caso de falla en la solicitud
      console.error('Error al obtener la imagen:', error);
    }
  }

  // Función para añadir un nuevo animal al arreglo
  function addAnimal(animal) {
    animalsArray.push(animal);
  }

  // Función para generar y mostrar tarjetas de animales en la interfaz
  function cardsAnimal(animales, id) {
    // Creamos las tarjetas HTML para cada animal
    let cartas = animales.map(animal => {
      return `
      <div class="card col-md-4">
        <img src="./assets/imgs/${animal.Img}" alt="${animal.Nombre}" class="card-img-top mt-2" style="width:auto; height: 150px; object-fit: cover; object-position: top;">

        <div class="card-body text-center mt-2">
          <h3 class="card-title">${animal.Nombre}</h3>
          <h5 class="card-title">${animal.Edad}</h5>
          <p class="card-title">${animal.Comentarios}</p>
          <audio controls style="max-width: 100%">
            <source src="./assets/sounds/${animal.Sonido}" type="audio/mpeg">
            Reproducir sonido
          </audio>
        </div>
      </div>
      `;
    }).join('');

    // Insertamos las tarjetas generadas en el contenedor con el ID dado
    document.getElementById(id).innerHTML = cartas;
  }

  // Función para limpiar el formulario y el contenedor de vista previa
  let limpiar = () => {
    // Limpiamos el contenedor de vista previa si tiene una imagen
    if (document.getElementById('preview').querySelector('img')) {
      document.getElementById('preview').innerHTML = '';
    }

    // Restauramos los valores predeterminados del formulario
    document.getElementById('animal').value = document.getElementById('animal').defaultValue;
    document.getElementById('edad').value = document.getElementById('edad').defaultValue;
    document.getElementById('comentarios').value = document.getElementById('comentarios').defaultValue;
  }

  // Retornamos un objeto con las funciones públicas de este módulo
  return {
    obtenerDataJson,
    cardsAnimal,
    addAnimal,
    animalsArray,
    limpiar
  };
})();

// Exportamos el módulo autoejecutable para su uso en otros archivos
export { iife };
