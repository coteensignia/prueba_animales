// Importamos las clases de animales desde los módulos correspondientes
import { Aguila } from "./classes/Aguila.mjs";
import { Leon } from "./classes/Leon.mjs";
import { Lobo } from "./classes/Lobo.mjs";
import { Oso } from "./classes/Oso.mjs";
import { Serpiente } from "./classes/Serpiente.mjs";
// Importamos la función autoejecutable desde el módulo IIFE
import { iife as funcionAutoejecudable } from "./modulo/iife.mjs";

// Definimos un objeto para instanciar los diferentes tipos de animales
const instanciadorAnimales = { Aguila, Leon, Lobo, Oso, Serpiente }

// Manejador de eventos para el botón de registro
document.getElementById('btnRegistrar').addEventListener('click', async () => {
  // Referencias a los elementos del formulario
  const nombreHTML = document.getElementById('animal');
  const edadHTML = document.getElementById('edad');
  const comentariosHTML = document.getElementById('comentarios');

  // Obtenemos los datos del animal desde el archivo JSON
  const { imagen, sonido } = await funcionAutoejecudable.obtenerDataJson(nombreHTML.value);
  
  // Validamos que todos los campos del formulario estén llenos
  if (!nombreHTML.value || !edadHTML.value || !comentariosHTML.value) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  
  // Creamos una nueva instancia del animal usando la clase correspondiente
  let animal = new instanciadorAnimales[nombreHTML.value](
    nombreHTML.value, 
    edadHTML.value,
    imagen,
    comentariosHTML.value,
    sonido
  );

  // Añadimos el nuevo animal a la lista de animales
  funcionAutoejecudable.addAnimal(animal);
  
  // Actualizamos el contenedor con la información de los animales
  funcionAutoejecudable.cardsAnimal(funcionAutoejecudable.animalsArray, 'Animales');

  // Limpiamos el formulario después de agregar el animal
  funcionAutoejecudable.limpiar();
});

// Manejador de eventos para cambios en la selección de animal
document.getElementById('animal').addEventListener("change", async (event) => {
  // Obtenemos la información del animal seleccionado
  const { imagen, sonido } = await funcionAutoejecudable.obtenerDataJson(event.target.value);
  const nombreAnimal = event.target.value;

  // Referencia al contenedor donde se mostrará la imagen del animal
  const preview = document.getElementById('preview');
  
  // Limpiamos el contenedor antes de añadir la nueva imagen
  preview.innerHTML = '';
  
  // Creamos un nuevo elemento de imagen
  const img = document.createElement('img');
  img.src = `assets/imgs/${imagen}`; // Establecemos la ruta de la imagen
  img.className = "img-fluid rounded"; // Aplicamos clases de estilo
  img.alt = nombreAnimal; // Definimos el atributo alt
  
  // Añadimos la imagen al contenedor
  preview.appendChild(img);
});
