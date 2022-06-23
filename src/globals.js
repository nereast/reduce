//Variables globales

//Variables que dan acceso al canvas y al contexto
let canvas;
let canvasGUI_Up;
let canvasGUI_Down;
let image;

let ctx;
let ctxGUI_Up;
let ctxGUI_Down;


//Variable que gestiona el estado del juego
let gameState = State.INVALID;


// --------------------------------
// VARIABLES DEL CONTROL DE TIEMPO
// --------------------------------

//Tiempo del ciclo anterior
let previousCycleTime = 0;

//Tiempo del ciclo del juego real
let lag = 0;

let globalTime;

//Tiempo del ciclo objetivo (constante)
let frameTimeObj = 0;

//Caja de texto para mostrar datos de depuración
let txtPruebas;

// Datos de las imágenes (tileset)
let tileSets = [];

//Array con los datos de los sprites
let sprites = [];

//Variables para gestionar la carga de activos
let assetsToLoad = [];
let assetsLoaded = 0;

//Objeto que guarda el estado de la acción enviada
let action = {};

//Objeto que guarda el estado del movimiento del personaje
let movement = {};

//Variables para la puntuación del Player
let score;
let point;


//Objeto con el timer
let timeObj = {};


//Variables para la vida del Player
let life;


//Variable que gestiona si los objetos están activos o desactivados
let states = {};

//Variable que gestiona los niveles que tiene el juego
let level;

//Array con datos de los sonidos 
let sounds = [];

//Objeto del Trophy, para su rotación
let trophyObj = {};