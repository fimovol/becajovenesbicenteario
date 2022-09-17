// ### VARIABLES ###

// Array de palabras
//⭕⭕⭕ agregando mas pistas
var palabras = [
  ["atlantico", "Un océano","el mar"], ["ordenador", "Una máquina","informatica"], ["laurel", "Un árbol","una hoja en el estofado"], 
  ["plaza", "Espacio público","lugar frecuentado"], ["rueda", "Gran invento","un circulo"], ["cereza", "Una fruta","algo rojo"], 
  ["petanca", "Un juego","a game"], ["higuera", "Un árbol","de la familia de las moráceas"], ["everest", "Un monte" ," con una altitud de 8848 metros sobre el nivel del mar"], 
  ["relampago", "Antecede al trueno","asusta mucho"], ["jirafa", "Un animal" ,"cuello enorme"], ["luxemburgo", "Un país" ,"tiene rojo en la bandera"], 
  ["uruguay", "Un país","al costado de argentina"], ["ilustracion", "Representación gráfica","un dibujo"], ["excursion", "Actividad en la naturaleza" ,"actividad con tus amigos"], 
  ["empanadilla", "De la panadería","postre delicioso"], ["pastel", "De la pastelería","infaltable en una fiesta de cumpleaños"], ["colegio", "Lugar para estudiar","ahi estan tus compañeros"], 
  ["carrera", "Competición","el mas veloz"], ["mermelada", "Confitura","pan con ..."]
];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;

var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");
// Boton de pista
var btnPista = document.getElementById("pista");


// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  // se obtiene un numero decimal aleatorio entre 0 - 1 
  // y se multiplica por el numero total de palabras
  // despues se convierte el numero en numero entero
  // y se guarda en la variable rand
  rand = (Math.random() * 19).toFixed(0);
  // se usa la variable rand como indice para obtener un valor del array palabras
  // y se guarda en la variable palabra
  palabra = palabras[rand][0].toUpperCase();
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  // se itera la variable i hasta ser igual a la variable num que es 
  // el numero de caracteres de la palabra
  for (var i = 0; i < num; i++) {
    // al array oculta se le va asignando el valor "_" 
    oculta[i] = "_";
  }
  // imprime todos los valores del array oculta en el objeto hueco
  hueco.innerHTML = oculta.join("");
}

// Chequear intento
function intento(letra) {
  // hace que el objeto sea deshabilitado
  document.getElementById(letra).disabled = true;
  // verifica que la variable palabra contenga la letra enviada
  if(palabra.indexOf(letra) != -1) {
    // itera i hasta que sea igual al numero de caracteres de la palabra
    for(var i=0; i<palabra.length; i++) {
      // en caso de haya una concidencia la letra reemplaza "_" 
      // por la letra enviada en el array oculta
      if(palabra[i]==letra) oculta[i] = letra;
    }
    // imprime todos los valores del array oculta en el objeto hueco
    hueco.innerHTML = oculta.join("");
    // imprime un mensaje en el objeto con el id acierto
    document.getElementById("acierto").innerHTML = "Bien!";
    // agrega las clases acierto verde en el objeto con el id acierto
    document.getElementById("acierto").className += "acierto verde";
  }else{
    // disminuye en 1 la variable cont
    cont--;
    // imprime el valor cont en el objeto con el id intentos
    document.getElementById("intentos").innerHTML = cont;
    // imprime un mensaje en el objeto con el id acierto
    document.getElementById("acierto").innerHTML = "Fallo!";
    // agrega las clases acierto rojo en el objeto con el id acierto
    document.getElementById("acierto").className += "acierto rojo";
    // cambia el valor de la propiedad src del objeto con el id image
    document.getElementById("image").src = `img/ahorcado_${cont}.png`;
  }
  // ejecuta la funcion comprueba fin
  compruebaFin();
  // ejecuta una funcion de tiempo de durancion de 800 milisegundos
  setTimeout(function () {
    // imprime un mensaje vacio en el objeto con el id acierto
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista ⭕⭕⭕
let otrPsita = false
function pista() {
  // imprime en el objeto con el id hueco-pista el valor de array palabras
  
  if(otrPsita == false){
    document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
    otrPsita = true
    btnPista.textContent = 'quieres otra pista ? '.toLocaleUpperCase()
  }else{
    document.getElementById("hueco-pista").innerHTML = palabras[rand][2];
    otrPsita = false
  }
}
//⭕⭕⭕ refactorizando
function felicidadesGameOver(htmltext){
  // imprime un mensaje en el objeto con el id msg-final
  document.getElementById("msg-final").innerHTML = htmltext || "";
  // agrega la clase zoom-in en el objeto con el id msg-final
  document.getElementById("msg-final").className += "zoom-in";
}

// Compruba si ha finalizado
function compruebaFin() {
  // verifica que la variable oculta contenga "_"
  if( oculta.indexOf("_") == -1 ) {
    //⭕⭕⭕
    felicidadesGameOver("Felicidades !!")
    // agrega la clase encuadre en el objeto con el id palabra
    document.getElementById("palabra").className += " encuadre";
    // deshabilita todos los botones
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    // cambia el valor de innerHTML del objeto con el id reset
    document.getElementById("reset").innerHTML = "Empezar";
    // verifica que el contador sea igual a cero
  }else if( cont == 0 ) {
    //⭕⭕⭕
    felicidadesGameOver("Game Over")
    // deshabilita todos los botones
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    // cambia el valor de innerHTML del objeto con el id reset
    document.getElementById("reset").innerHTML = "Empezar";
    // asigna la funcion de recarga de pagina al objeto con id reset
  }
}

// Restablecer juego
function inicio() {

  // ejecuta funcion generaPalabra
  generaPalabra();
  // ejecuta funcion pintarGuiones con el parametro del numero de caracteres
  // de la variable palabra
  pintarGuiones(palabra.length);
  cont = 6;
  // imprime la variable cont en el objeto con el id intentos
  document.getElementById("intentos").innerHTML=cont;
  // habilita todos los botones
  document.querySelectorAll('.letra').forEach(item => {
    item.disabled=false
  })
}

// itera todos los elementos con la clase letras
document.querySelectorAll('.letra').forEach(item => {
  // asigna eventos click a cada elemento
  item.addEventListener('click', event => {
    // funcion que se asocia al elemento
    intento(event.target.value);
  })
})
//⭕⭕⭕
btnInicio.addEventListener('click', e => {
  location.reload()
})

btnPista.addEventListener('click', function(){
  pista();
});

// Iniciar
window.onload = inicio();
