
const iife = (() => {
  // Arreglo 
  const animalsArray = [];

  // Función  asincronica para optener de json
  async function obtenerDataJson(nombre) {
    try {
      const response = await fetch("animales.json");
      const data = await response.json();
      const animalData = data.animales.find(animal => animal.name === nombre);
      return animalData;
    } catch (error) {
   
      console.error('Error al obtener la imagen:', error);
    }
  }

  // añadir un nuevo animal al arreglo
  function addAnimal(animal) {
    animalsArray.push(animal);
  }

  // Función para generar y mostrar 
  function cardsAnimal(animales, id) {
    // tarjetas html 
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

    // Insertar tarjeta
    document.getElementById(id).innerHTML = cartas;
  }

  // limpiar el formulario 
  let limpiar = () => {

    if (document.getElementById('preview').querySelector('img')) {
      document.getElementById('preview').innerHTML = '';
    }

    // restaurar valores
    document.getElementById('animal').value = document.getElementById('animal').defaultValue;
    document.getElementById('edad').value = document.getElementById('edad').defaultValue;
    document.getElementById('comentarios').value = document.getElementById('comentarios').defaultValue;
  }

  
  return {
    obtenerDataJson,
    cardsAnimal,
    addAnimal,
    animalsArray,
    limpiar
  };
})();


export { iife };
