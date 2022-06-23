// Funciones de inicialización
window.onload = init;

function init()
{
    // Variables que hacen referencia al Canvas
    canvas = document.getElementById('gameScreen');
    canvasGUI_Up = document.getElementById('gameGUI_Up');
    canvasGUI_Down = document.getElementById ('gameGUI_Down');
    
    //Inicializamos el estado del juego
    gameState = State.LOADING;

    //Inicializamos los contextos del Canvas
    ctx = canvas.getContext('2d');
    ctxGUI_Up = canvasGUI_Up.getContext('2d');
    ctxGUI_Down = canvasGUI_Down.getContext('2d');
    ctxConfetti = canvas.getContext('2d');

    //Eliminación del Anti-Aliasing
    ctx.imageSmoothingEnabled = false;

    //Cargamos los activos: El Sprite del juego
    loadAssets();
    
    //Agregamos los detectores de eventos del teclado
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup",   keyupHandler, false);

    //Inicializamos el trofeo
    initTrophy();

    // Iniciar la solicitud del primer frame
    window.requestAnimationFrame(gameLoop);   
}
    


//Función que inicializa las variables del juego 
function initVars()
{
    //Inicializamos el estado del nivel del juego
    level = 1;
    
    //Inicializamos la puntuación del jugador
    score = 0;

    //Inicializamos el tiempo de frame en ms.
    frameTimeObj = 1000 / FPS; 

    //Inicializamos el estado de las vidas
    life = 100;
}

//Función que inicializa los estados del juego
function initStates()
{
    //Inicializamos los estados de las acciones de las teclas 
    action = {
        moveLeft:  false,
        moveRight: false,
        jumpLeft:  false,
        jumpRight: false,
        begin:     false,
        continue:  false,
        finish:    false,
        newGame:   false,
        pause:     false,
        start:     false,
    }

    //Inicializamos los estados de los movimientos del Player
    movement = {
        direction:  Mov.NONE,     
        jumpLeft:  false,
        jumpRight: false
 
    }
    
    //Inicializamos los estados de los objetos
    states = {
        light: true,
        mirror_left: true,
        mirror_right: true,
        sink: true,
        bath: true,
    }
}

//Función que carga los activos
function loadAssets()
{
    //Cargamos la imagen del Sprite de 80 x 80
    let tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);  
    tileSet.src = "./images/Sprite.png";  
    tileSets.push(tileSet);
    assetsToLoad.push(tileSet); 

    //Cargamos el sonido del fondo del juego
    let gameMusic = document.querySelector("#gameMusic");
    gameMusic.addEventListener("canplaythrough", loadHandler, false);
    gameMusic.addEventListener("timeupdate", updateMusic, false);  
    gameMusic.load();
    sounds.push(gameMusic);
    assetsToLoad.push(gameMusic);

    //Cargamos el sonido del teclado
    let keyboardSound = document.querySelector("#keyboardSound");
    keyboardSound.addEventListener("canplaythrough", loadHandler, false);
    keyboardSound.load();
    sounds.push(keyboardSound);
    assetsToLoad.push(keyboardSound);

    //Cargamos el sonido del salto del jugador
    let jumpSound = document.querySelector("#jumpSound");
    jumpSound.addEventListener("canplaythrough", loadHandler, false);
    jumpSound.load();
    sounds.push(jumpSound);
    assetsToLoad.push(jumpSound);

    //Cargamos el sonido de la colisión entre el jugador y los dos enemigos
    let collisionSound = document.querySelector("#collisionSound");
    collisionSound.addEventListener("canplaythrough", loadHandler, false);
    collisionSound.load();
    sounds.push(collisionSound);
    assetsToLoad.push(collisionSound);

    //Cargamos el sonido de la colisión entre el jugador y los dos enemigos
    let hurtSound = document.querySelector("#hurtSound");
    hurtSound.addEventListener("canplaythrough", loadHandler, false);
    hurtSound.load();
    sounds.push(hurtSound);
    assetsToLoad.push(hurtSound);

    //Cargamos el sonido de la colisión entre el primer enemigo (ENEMY) y los objetos
    let enemySound = document.querySelector("#enemySound");
    enemySound.addEventListener("canplaythrough", loadHandler, false);
    enemySound.load();
    sounds.push(enemySound);
    assetsToLoad.push(enemySound);

    //Cargamos el sonido del estado GAME_OVER
    let gameOverSound = document.querySelector("#gameOverSound");
    gameOverSound.addEventListener("canplaythrough", loadHandler, false);
    gameOverSound.load();
    sounds.push(gameOverSound);
    assetsToLoad.push(gameOverSound);

    //Cargamos el sonido del estado LEVELS_COMPLETED
    let levelsCompletedSound = document.querySelector("#levelsCompletedSound");
    levelsCompletedSound.addEventListener("canplaythrough", loadHandler, false);
    levelsCompletedSound.load();
    sounds.push(levelsCompletedSound);
    assetsToLoad.push(levelsCompletedSound);

    //Cargamos el sonido del estado END_LEVELS
    let endLevelsSound = document.querySelector("#endLevelsSound");
    endLevelsSound.addEventListener("canplaythrough", loadHandler, false);
    endLevelsSound.load();
    sounds.push(endLevelsSound);
    assetsToLoad.push(endLevelsSound);
}


//Función que inicializa los objetos del Sprite del primer nivel
function initFirstLevelSprites()
{
    //Inicializamos el Array de los Sprites vacio, siempre que se inicie una nueva partida.
    sprites = [];
    
    //Creamos nuestro objeto Light
    const light = new Sprite(
        Type.LIGHT,                    //Tipo de Sprite
        Direction.ON,                  //Estado de animación del sprite
        0,                             //Posición de tile de inicio en X
        9,                             //Posición de tile de inicio en Y
        54,                            //Posición inicial en X
        -8,                            //Posición inicial en Y
        10,                            //Velocidad de movimiento (pixels / sec)
        3,                             //Número de frames de animación
        0,                             //Contador de frames
        80,                            //Tamaño total del sprite en X
        80,                            //Tamaño total del sprite en Y
        0,                             //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                             //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                            //Velocidad de cambio de frame (a mayor número, más lento)
        0,                             //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                         //Usada por los objetos para la desactivación de las animaciones
        false,                         //Usada por los objetos para la activación de las animaciones

        //Colisiones
        25,                          //Tamaño en X para las colisiones
        25,                          //Tamaño en Y para las colisiones
        28,                          //Offset en X para las colisiones (Respecto de xPos)
        32                           //Offset en Y para las colisiones (Respecto de yPos)
    );

    //Añadimos el objeto Light al array de Sprites
    sprites.push(light);


    //Creamos nuestro objeto Mirror_Left
    const mirror_left = new Sprite(
        Type.MIRROR_LEFT,                   //Tipo de Sprite
        Direction.ON,                       //Estado de animación del sprite
        0,                                  //Posición de tile de inicio en X
        11,                                 //Posición de tile de inicio en Y
        185,                                //Posición inicial en X
        -26,                                //Posición inicial en Y
        100,                                //velocidad de movimiento (pixels / sec)
        3,                                  //Número de frames de animación
        0,                                  //Contador de frames
        80,                                 //Tamaño total del sprite en X
        80,                                 //Tamaño total del sprite en Y
        0,                                  //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                                  //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                 //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                  //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                             //Usada por los objetos para la desactivación de las animaciones
        false,                             //Usada por los objetos para la activación de las animaciones

        //Colisiones
        25,                                 //Tamaño en X para las colisiones
        25,                                 //Tamaño en Y para las colisiones
        28,                                 //Offset en X para las colisiones (Respecto de xPos)
        28                                  //Offset en Y para las colisiones (Respecto de yPos)
    );

    //Añadimos el objeto Mirror_Left Light al array de Sprites
    sprites.push(mirror_left);


    //Creamos nuestro objeto Mirror_Right
    const mirror_right = new Sprite(
        Type.MIRROR_RIGHT,                      //Tipo de Sprite
        Direction.ON,                           //Estado de animación del sprite
        0,                                      //Posición de tile de inicio en X
        13,                                     //Posición de tile de inicio en Y
        234,                                    //Posición inicial en X
        -26,                                    //Posición inicial en Y
        100,                                    //Velocidad de movimiento (pixels / sec)
        3,                                      //Número de frames de animación
        0,                                      //Contador de frames
        80,                                     //Tamaño total del sprite en X
        80,                                     //Tamaño total del sprite en Y
        0,                                      //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                                      //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                     //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                      //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                                  //Usada por los objetos para la desactivación de las animaciones
        false,                                  //Usada por los objetos para la activación de las animaciones

        //Colisiones
        25,                                     //Tamaño en X para las colisiones
        25,                                     //Tamaño en Y para las colisiones
        28,                                     //Offset en X para las colisiones (Respecto de xPos)
        28                                      //Offset en Y para las colisiones (Respecto de yPos)
   
    );

    //Añadimos el objeto de Mirror_Right al array de Sprites
    sprites.push(mirror_right);


    //Creamos nuestro objeto Sink
    const sink = new Sprite(
        Type.SINK,                          //Tipo de Sprite
        Direction.ON,                       //Estado de animación del sprite
        0,                                  //Posición de tile de inicio en X
        15,                                 //Posición de tile de inicio en Y
        190,                                //Posición inicial en X
        68,                                 //Posición inicial en Y
        100,                                //Velocidad de movimiento (pixels / sec)
        3,                                  //Número de frames de animación
        0,                                  //Contador de frames
        80,                                 //Tamaño total del sprite en X
        80,                                 //Tamaño total del sprite en Y
        0,                                  //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                                  //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                 //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                  //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                              //Usada por los objetos para la desactivación de las animaciones
        false,                              //Usada por los objetos para la activación de las animaciones
        
        //Colisiones
        35,                                 //Tamaño en X para las colisiones
        35,                                 //Tamaño en Y para las colisiones
        15,                                 //Offset en X para las colisiones (Respecto de xPos)
        5                                   //Offset en Y para las colisiones (Respecto de yPos)
   
    );

    //Añadimos el objeto Sink al array de Sprites
    sprites.push(sink);


    //Creamos nuestro objeto Bath
    const bath = new Sprite(
        Type.BATH,                          //Tipo de Sprite
        Direction.ON,                       //Estado de animación del sprite
        0,                                  //Posición de tile de inicio en X
        17,                                 //Posición de tile de inicio en Y
        10,                                 //Posición inicial en X
        91,                                 //Posición inicial en Y
        20,                                 //Velocidad de movimiento (pixels / sec)
        3,                                  //Número de frames de animación
        0,                                  //Contador de frames
        80,                                 //Tamaño total del sprite en X
        80,                                 //Tamaño total del sprite en Y
        5,                                  //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        5,                                  //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                 //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                  //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                              //Usada por los objetos para la desactivación de las animaciones
        false,                              //Usada por los objetos para la activación de las animaciones

        //Colisiones
        35,                                 //Tamaño en X para las colisiones
        35,                                 //Tamaño en Y para las colisiones
        45,                                 //Offset en X para las colisiones (Respecto de xPos)
        5                                   //Offset en Y para las colisiones (Respecto de yPos)
   
    );

    //Añadimos el objeto Bath al array de Sprites
    sprites.push(bath);


    //Creamos nuestro objeto player
    const player = new Sprite(
        Type.PLAYER,                //Tipo de Sprite
        Direction.RIGHT,            //Estado de animación del sprite
        0,                          //Posición del tile en X
        0,                          //Posici´pn del tile en Y
        0,                          //Posición inicial en X
        0,                          //Posición inicial en Y
        10,                         //Velocidad de movimiento (pixels / sec)
        3,                          //Número de frames de animación
        0,                          //Contador de frames
        60,                         //Tamaño total del sprite en X
        57,                         //Tamaño total del sprite en Y
        0,                          //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                          //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                         //Velocidad de cambio de frame (a mayor número, más lento)
        0,                          //Contador de velocidad de cambio de frame 

        //Colisiones con las luces y el agua
        false,                       //Usada por los objetos para la desactivación de las animaciones
        false,                       //Usada por los objetoos para la activación de las animaciones

        //Colisiones
        40,                         //Tamaño en X para las colisiones
        10,                         //Tamaño en Y para las colisiones
        20,                         //Offset en X para las colisiones (Respecto de xPos)
        40,                         //Offset en Y para las colisiones (Respecto de yPos)

        //Enemigos (Enemy y Bacterium)
        0,                          //Usada por el Enemigo para el cambio de dirección
        0,                          //Usada por el Enemigo para el cambio de dirección
        0,                          //Usada por el Enemigo para el cambio de dirección
        0,                          //Usada por el Enemigo para el cambio de dirección
        
        //Physics
        0,                          //velX
        0,                          //velY
        50,                         //Speed limit
        40,                         //accelX
        GRAVITY,                    //accelY
        FRICTION,                   //friction  (Valor entre 0 y 1. Si friction === 1: no hay fricción)
        -150,                       //Valor inicial de jumpForce

        //Colisión del jugador (PLAYER)
        false,                      //Valor inicial de contacto con el suelo
       
    );

    //Añadimos el Player al array de sprites
    sprites.push(player);
 

    //Creamos nuestro objeto Enemy
    const enemy = new Sprite(
        Type.ENEMY,                //Tipo de Sprite
        Direction.RIGHT_2,         //Estado de animación del sprite
        0,                         //Posición del tile de inicio en X
        4,                         //Posición del tile de inicio en Y
        20,                        //Posición inicial en X
        80,                        //Posición inicial en Y
        55,                        //Velocidad de movimiento (pixels / sec)
        3,                         //Número de frames de animación
        0,                         //Contador de frames
        80,                        //Tamaño total del sprite en X
        70,                        //Tamaño total del sprite en Y
        0,                         //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                         //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        5,                         //Velocidad de cambio de frame (a mayor número, más lento)
        0,                         //Contador de velocidad de cambio de frame 
        
        //Colisiones con las luces y el agua
        false,                         //Usada por los objetos para la desactivación de las animaciones
        false,                         //Usada por los objetos para la activación de las animaciones
        
        //Colisiones
        40,                        //Tamaño en Y para las colisiones (Respecto de xPos)
        65,                        //Tamaño en X para las colisiones (Respecto de yPos)
        15,                        //Offset en X para las colisiones (Respecto de xPos)
        5,                         //Offset en Y para las colisiones (Respecto de yPos)

        //Enemigos (Enemy y Bacterium)
        0,                         //Usada por los enemigos para el cambio de dirección
        100,                       //Usada por los enemigos para el cambio de dirección
        false,                     //Usada pro los enemigos  para el cambio de dirección
        false,                     //Usada por los enemigos para el cambio de dirección
        
    );

    //Añadimos el Enemy al array de Sprites
    sprites.push(enemy); 
}

//Función que inicializa los objetos del Sprite de los siguientes niveles
function initRestOfLevelSprites()
{
    //Inicializamos el Array de los Sprites vacio, siempre que se inicie una nueva partida.
    sprites = [];
    
    //Creamos nuestro objeto Light
    const light = new Sprite(
        Type.LIGHT,                    //Tipo de Sprite
        Direction.ON,                  //Estado de animación del sprite
        0,                             //Posición de tile de inicio en X
        9,                             //Posición de tile de inicio en Y
        54,                            //Posición inicial en X
        -8,                            //Posición inicial en Y
        10,                            //Velocidad de movimiento (pixels / sec)
        3,                             //Número de frames de animación
        0,                             //Contador de frames
        80,                            //Tamaño total del sprite en X
        80,                            //Tamaño total del sprite en Y
        0,                             //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                             //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                            //Velocidad de cambio de frame (a mayor número, más lento)
        0,                             //Contador de velocidad de cambio de frame

     //Colisiones con las luces y el agua
        false,                         //Usada por los objetos para la desactivación de las animaciones
        false,                         //Usada por los objetos para la activación de las animaciones

        //Colisiones
        25,                            //Tamaño en X para las colisiones
        25,                            //Tamaño en Y para las colisiones
        28,                            //Offset en X para las colisiones (Respecto de xPos)
        32                             //Offset en Y para las colisiones (Respecto de yPos)
    );

    //Añadimos el objeto Light al array de Sprites
    sprites.push(light);


    //Creamos nuestro objeto Mirror_Left
    const mirror_left = new Sprite(
        Type.MIRROR_LEFT,                   //Tipo de Sprite
        Direction.ON,                       //Estado de animación del sprite
        0,                                  //Posición de tile de inicio en X
        11,                                 //Posición de tile de inicio en Y
        185,                                //Posición inicial en X
        -26,                                //Posición inicial en Y
        100,                                //Velocidad de movimiento (pixels / sec)
        3,                                  //Número de frames de animación
        0,                                  //Contador de frames
        80,                                 //Tamaño total del sprite en X
        80,                                 //Tamaño total del sprite en Y
        0,                                  //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                                  //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                 //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                  //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                              //Usada por los objetos para la desactivación de las animaciones
        false,                              //Usada por los objetos para la activación de las animaciones

        //Colisiones
        25,                                 //Tamaño en X para las colisiones
        25,                                 //Tamaño en Y para las colisiones
        28,                                 //Offset en X para las colisiones (Respecto de xPos)
        28                                  //Offset en Y para las colisiones (Respecto de yPos)
    );

    //Añadimos el objeto Mirror_Left Light al array de Sprites
    sprites.push(mirror_left);


    //Creamos nuestro objeto Mirror_Right
    const mirror_right = new Sprite(
        Type.MIRROR_RIGHT,                      //Tipo de Sprite
        Direction.ON,                           //Estado de animación del sprite
        0,                                      //Posición de tile de inicio en X
        13,                                     //Posición de tile de inicio en Y
        234,                                    //Posición inicial en X
        -26,                                    //Posición inicial en Y
        100,                                    //Velocidad de movimiento (pixels / sec)
        3,                                      //Número de frames de animación
        0,                                      //Contador de frames
        80,                                     //Tamaño total del sprite en X
        80,                                     //Tamaño total del sprite en Y
        0,                                      //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                                      //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                     //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                      //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                                  //Usada por los objetos para la desactivación de las animaciones
        false,                                  //Usada por los objetos para la activación de las animaciones

        //Colisiones
        25,                                     //Tamaño en X para las colisiones
        25,                                     //Tamaño en Y para las colisiones
        28,                                     //Offset en X para las colisiones (Respecto de xPos)
        28                                      //Offset en Y para las colisiones (Respecto de yPos)
   
    );

    //Añadimos el objeto de Mirror_Right al array de Sprites
    sprites.push(mirror_right);


    //Creamos nuestro objeto Sink
    const sink = new Sprite(
        Type.SINK,                          //Tipo de Sprite
        Direction.ON,                       //Estado de animación del sprite
        0,                                  //Posición de tile de inicio en X
        15,                                 //Posición de tile de inicio en Y
        190,                                //Posición inicial en X
        68,                                 //Posición inicial en Y
        100,                                //Velocidad de movimiento (pixels / sec)
        3,                                  //Número de frames de animación
        0,                                  //Contador de frames
        80,                                 //Tamaño total del sprite en X
        80,                                 //Tamaño total del sprite en Y
        0,                                  //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                                  //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                 //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                  //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                              //Usada por los objetos para la desactivación de las animaciones
        false,                              //Usada por los objetos para la activación de las animaciones

        //Colisiones
        35,                                 //Tamaño en X para las colisiones
        35,                                 //Tamaño en Y para las colisiones
        15,                                 //Offset en X para las colisiones (Respecto de xPos)
        5                                   //Offset en Y para las colisiones (Respecto de yPos)
   
    );

    //Añadimos el objeto Sink al array de Sprites
    sprites.push(sink);


    
    //Creamos nuestro objeto Bath
    const bath = new Sprite(
        Type.BATH,                          //Tipo de Sprite
        Direction.ON,                       //Estado de animación del sprite
        0,                                  //Posición de tile de inicio en X
        17,                                 //Posición de tile de inicio en Y
        10,                                 //Posición inicial en X
        91,                                 //Posición inicial en Y
        20,                                 //Velocidad de movimiento (pixels / sec)
        3,                                  //Número de frames de animación
        0,                                  //Contador de frames
        80,                                 //Tamaño total del sprite en X
        80,                                 //Tamaño total del sprite en Y
        5,                                  //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        5,                                  //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                                 //Velocidad de cambio de frame (a mayor número, más lento)
        0,                                  //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        false,                              //Usada por los objetos para la desactivación de las animaciones
        false,                              //Usada por los objetos para la activación de las animaciones

        //Colisiones
        35,                                 //Tamaño en X para las colisiones
        35,                                 //Tamaño en Y para las colisiones
        45,                                 //Offset en X para las colisiones (Respecto de xPos)
        5                                   //Offset en Y para las colisiones (Respecto de yPos)
   
    );

    //Añadimos el objeto Bath al array de Sprites
    sprites.push(bath);


    //Creamos nuestro objeto player
    const player = new Sprite(
        Type.PLAYER,                //Tipo de Sprite
        Direction.RIGHT,            //Estado de animación del sprite
        0,                          //Posición del tile en X
        0,                          //Posición del tile en Y
        0,                          //Posición inicial en X
        0,                          //Posición inicial en Y
        10,                         //Velocidad de movimiento (pixels / sec)
        3,                          //Número de frames de animación
        0,                          //Contador de frames
        60,                         //Tamaño total del sprite en X
        57,                         //Tamaño total del sprite en Y
        0,                          //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                          //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        10,                         //Velocidad de cambio de frame (a mayor número, más lento)
        0,                          //Contador de velocidad de cambio de frame 

        //Colisiones con las luces y el agua
        false,                       //Usada por los objetos para la desactivación de las animaciones
        false,                       //Usada por los objetos para la activación de las animaciones

        //Colisiones
        40,                         //Tamaño en X para las colisiones
        10,                         //Tamaño en Y para las colisiones
        20,                         //Offset en X para las colisiones (Respecto de xPos)
        40,                         //Offset en Y para las colisiones (Respecto de yPos)

        //Enemigos (Enemy y Bacterium)
        0,                          //Usada por el Enemigo para el cambio de dirección
        0,                          //Usada por el Enemigo para el cambio de dirección
        0,                          //Usada por el Enemigo para el cambio de dirección
        0,                          //Usada por el Enemigo para el cambio de dirección
        
        //Physics
        0,                          //velX
        0,                          //velY
        50,                         //Speed limit
        40,                         //accelX
        GRAVITY,                    //accelY
        FRICTION,                   //friction  (Valor entre 0 y 1. Si friction === 1: no hay fricción)
        -150,                       //Valor inicial de jumpForce

        //Colisión del jugador (PLAYER)
        false,                    //Valor inicial de contacto con el suelo
       
    );

    //Añadimos el Player al array de sprites
    sprites.push(player);
 

    //Creamos nuestro objeto Enemy
    const enemy = new Sprite(
        Type.ENEMY,                //Tipo de Sprite
        Direction.RIGHT_2,         //Estado de animación del sprite
        0,                         //Posición del tile de inicio en X
        4,                         //Posición del tile de inicio en Y
        20,                        //Posición inicial en X
        80,                        //Posición inicial en Y
        55,                        //Velocidad de movimiento (pixels / sec)
        3,                         //Número de frames de animación
        0,                         //Contador de frames
        80,                        //Tamaño total del sprite en X
        70,                        //Tamaño total del sprite en Y
        0,                         //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                         //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        5,                         //Velocidad de cambio de frame (a mayor número, más lento)
        0,                         //Contador de velocidad de cambio de frame 
        
        //Colisiones con las luces y el agua
        false,                     //Usada por los objetos para la desactivación de las animaciones
        false,                     //Usada por los objetos para la activación de las animaciones
        
        //Colisiones
        40,                        //Tamaño en Y para las colisiones (Respecto de xPos)
        65,                        //Tamaño en X para las colisiones (Respecto de yPos)
        15,                        //Offset en X para las colisiones (Respecto de xPos)
        5,                         //Offset en Y para las colisiones (Respecto de yPos)

        //Enemigos (Enemy y Bacterium)
        0,                         //Usada por los enemigos para el cambio de dirección
        100,                       //Usada por los enemigos para el cambio de dirección
        false,                     //Usada pro los enemigos  para el cambio de dirección
        false,                     //Usada por los enemigos para el cambio de dirección
        
    );

    //Añadimos el Enemy al array de Sprites
    sprites.push(enemy);


    //Creamos nuestro objeto Bacterium
    const bacterium = new Sprite(
        Type.BACTERIUM,            //Tipo de Sprite
        Direction.RIGHT_3,         //Estado de animación del sprite
        0,                         //Posición del tile de inicio en X
        6,                         //Posición del tile de inicio en Y
        20,                        //Posición inicial en X
        20,                        //Posición inicial en Y
        80,                        //Velocidad de movimiento (pixels / sec)
        3,                         //Número de frames de animación
        0,                         //Contador de frames
        80,                        //Tamaño total del sprite en X
        70,                        //Tamaño total del sprite en Y
        0,                         //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        0,                         //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        5,                         //Velocidad de cambio de frame (a mayor número, más lento)
        0,                         //Contador de velocidad de cambio de frame 
        
        //Colisiones con las luces y el agua
        false,                      //Usada por los objetos para la desactivación de las animaciones
        false,                      //Usada por los objetos para la activación de las animaciones

        //Colisiones
        40,                        //Tamaño en Y para las colisiones (Respecto de xPos)
        65,                        //Tamaño en X para las colisiones (Respecto de yPos)
        15,                        //Offset en X para las colisiones (Respecto de xPos)
        5,                         //Offset en Y para las colisiones (Respecto de yPos)

        //Enemigos (Enemy y Bacterium)
        0,                         //Usada por los enemigos para el cambio de dirección
        2500,                      //Usada por los enemigos para el cambio de dirección
        false,                     //Usada pro los enemigos para el cambio de dirección
        false,                     //Usada por los enemigos para el cambio de dirección
        
    );

    //Añadimos el Bacterium al array de Sprites
    sprites.push(bacterium);
}

//Función que inicializa los valores del objeto Trophy
function initTrophy()
{
    trophyObj = 
    {
        angle: 0,
        angle_radians: 0
    }
}


//Función que ¡inicializa el tiempo
function initTimer()
{
    //Creamos nuestro objeto time
    timeObj = new Time(
        1000,              //Tiempo total
        50,                //Contador de cambio de tiempo
        1000,              //Tiempo para cambio de tiempo
        
    );   
}

