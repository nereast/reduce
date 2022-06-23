//Activos
const Asset = {
    TILEMAP: 0,
    SOUNDS:  1
};

//Estados del juego
const State = {
    LOADING:   0,
    NEW_GAME:  1,
    LOAD_LEVEL: 2,
    PLAYING:   3,
    GAME_OVER: 4,
    END_LEVEL: 5,
    PAUSE: 6,
    LEVELS_COMPLETED: 7,
};

//Constantes para definir el tipo de sprite
const Type = {
    LIGHT: 0,                   //Nuesta animación de la lámpara
    MIRROR_LEFT: 1,             //Nuestra animación de la bombilla de la izquierda
    MIRROR_RIGHT: 2,            //Nuestra animación de la bombilla de la derecha
    SINK: 3,                    //Nuestra animación del grifo
    BATH: 4,                    //Nuestra animación del grifo de la bañera
    PLAYER: 5,                  //Nuestro personaje
    ENEMY: 6,                   //Nuestro enemigo
    BACTERIUM: 7,               //Nuestro segundo enemigo
  
}


//Diferentes TileSets
const Tile = {
    SIZE_80: 0, //Sprite.png 80 x 80
}

//Estados de animación de los sprites
const Direction = {

    // 2 estados para los objetos LIGHT, MIRROR_LEFT, MIRROR_RIGHT, SINK y BATH
    OFF: -1,
    ON: 0,

    // Estados para las 4 direcciones del PLAYER
    RIGHT: 0,
    LEFT: 1,
    JUMP_RIGHT: 2,
    JUMP_LEFT: 3, 
    
    // Estados de 2 direcciones del ENEMY
    RIGHT_2: 0,
    LEFT_2: 1,

    // Estados de 2 direcciones del BACTERIUM
    OFF: -1,
    RIGHT_3: 0,
    LEFT_3: 1,   
  
}

//Constantes para el código de las teclas para el juego
const Key = {
    RIGHT:  39,
    LEFT:   37,
    JUMP_RIGHT: 38,
    JUMP_LEFT: 40,
    BEGIN: 66,
    CONTINUE: 67,
    NEW_GAME: 78,
    PAUSE: 80,
    START: 83,

}

//Constantes para los movimientos del jugador
const Mov = {
    NONE: -1,
    RIGHT: 0,
    LEFT: 1,
    JUMP_RIGHT: 2,
    JUMP_LEFT: 3,
}



//Anchura del Sprite.png
const SPRITE_SIZE = 80;


//Número de sprites a dibujar en pantalla
const NUM_SPRITES = 1;

//Velocidad del juego
const FPS = 50;


//Aceleraciones
const GRAVITY = 80;
const ACCELERATION_X  = 50;

//Fricción
const FRICTION = 0.8;
const NO_FRICTION = 0.5;


//Sonidos del juego
const Sound = {
    GAME_MUSIC: 0,
    KEYBOARD: 1,
    JUMP: 2,
    COLLISION: 3,
    HURT: 4,
    ENEMY: 5,
    GAME_OVER: 6,
    LEVELS_COMPLETED: 7,
    END_LEVEL: 8,
}