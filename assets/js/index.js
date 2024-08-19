// Importacion
import { Aguila } from "./classes/Aguila.mjs";
import { Leon } from "./classes/Leon.mjs";
import { Lobo } from "./classes/Lobo.mjs";
import { Oso } from "./classes/Oso.mjs";
import { Serpiente } from "./classes/Serpiente.mjs";
import { iife as funcionAutoejecudable } from "./modulo/iife.mjs";

// Objeto
const instanciadorAnimales = { Aguila, Leon, Lobo, Oso, Serpiente }

// Botón de registro
document.getElementById('btnRegistrar').addEventListener('click', async () => {
  const nombreHTML = document.getElementById('animal');
  const edadHTML = document.getElementById('edad');
  const comentariosHTML = document.getElementById('comentarios');

  // Datos del animal desde JSON
  const { imagen, sonido } = await funcionAutoejecudable.obtenerDataJson(nombreHTML.value);
  
  // Validacion
  if (!nombreHTML.value || !edadHTML.value || !comentariosHTML.value) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  
  // nueva instancia
  let animal = new instanciadorAnimales[nombreHTML.value](
    nombreHTML.value, 
    edadHTML.value,
    imagen,
    comentariosHTML.value,
    sonido
  );

  // Añadir
  funcionAutoejecudable.addAnimal(animal);
  
  // Actualizar
  funcionAutoejecudable.cardsAnimal(funcionAutoejecudable.animalsArray, 'Animales');

  // Limpiaar
  funcionAutoejecudable.limpiar();
});

// Eventos
document.getElementById('animal').addEventListener("change", async (event) => {
  // información del animal seleccionado
  const { imagen, sonido } = await funcionAutoejecudable.obtenerDataJson(event.target.value);
  const nombreAnimal = event.target.value;

  // imagen del animal preview
  const preview = document.getElementById('preview');
  
  // Limpiar
  preview.innerHTML = '';
  
  // Nuevo elemento de imagen
  const img = document.createElement('img');
  img.src = `assets/imgs/${imagen}`; 
  img.className = "img-fluid rounded"; 
  img.alt = nombreAnimal;
  
  // imagen al contenedor
  preview.appendChild(img);
});
