//Función principal para el cálculo de colisiones
function calculateCollision()
{
    //Colisión de los objetos del sprite con los bordes de la pantalla
    for (let i = 0; i < sprites.length; i++)
    {
        calculateCollisionWithBorders(sprites[i]);       
    }

    //Calculamos la colisión del objeto PLAYER con el objeto ENEMY
    calculateSpritePlayerAndEnemyCollision(sprites[i]);

    //Si el jugador no está en en Primer Nivel, calculamos las colisiones del Jugador (PLAYER) contra el segundo enemigo (BACTERIUM)
    if (level > 1)
    {
        //Calculamos la colisión del objeto PLAYER con el objeto BACTERIUM
        calculateSpritePlayerAndBacteriumCollision(sprites[i]);
    }

    //Calculamos la colisión del PLAYER con las luces y el agua (LIGHT, MIRROR_LEFT, MIRROR_RIGHT, SINK and BATH)
    calculateSpritePlayerAndElementsCollision(sprites[i]);

    //Calculamos la colisión del ENEMY con las luces y el agua (LIGHT, MIRROR_LEFT, MIRROR_RIGHT, SINK and BATH)
    calculateSpriteEnemyWithElementsCollision(sprites[i]);        
}


//Función que calcula la colisión de los objetos del sprite con los bordes de la pantalla
function calculateCollisionWithBorders(sprite)
{

    if (sprite.xPos < -sprite.xOffsetCol)
    {
        sprite.xPos = -sprite.xOffsetCol;
        sprite.isCollisionLeft = true;  
    }
        
    else if (sprite.xPos > canvas.width - sprite.xSizeCol - sprite.xOffsetCol)
    {
        sprite.xPos = canvas.width - sprite.xSizeCol - sprite.xOffsetCol;
        sprite.isCollisionRight = true;  
    }
        
    else if (sprite.yPos > canvas.height - sprite.ySizeCol - sprite.yOffsetCol)
        sprite.yPos = canvas.height - sprite.ySizeCol - sprite.yOffsetCol

    else if (sprite.yPos < -sprite.yOffsetCol)
        sprite.yPos = -sprite.yOffsetCol;
}

//Función que calcula si 2 rectángulos se han interseccionado
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) 
{
    let collisionX;
    let collisionY;

    if (x2 > x1)
        collisionX = (x2 - x1) < w1;
    else
        collisionX = (x1 - x2) < w2;

    if (y2 > y1)
        collisionY = (y2 - y1) < h1;
    else
        collisionY = (y1 - y2) < h2;
  
    return collisionX && collisionY;
}


//Función que calcula la colisión de los dos personajes (PLAYER Y ENEMY)
function calculateSpritePlayerAndEnemyCollision()
{   
    const player = sprites[Type.PLAYER];
    const enemy = sprites[Type.ENEMY];
   
    //Datos del objeto PLAYER
    const x1 = player.xPos + player.xOffsetCol;
    const y1 = player.yPos + player.yOffsetCol;
    const w1 = player.xSizeCol;
    const h1 = player.ySizeCol;

    //Datos del objeto ENEMY 
    const x2 = enemy.xPos + enemy.xOffsetCol;
    const y2 = enemy.yPos + enemy.yOffsetCol;
    const w2 = enemy.xSizeCol;
    const h2 = enemy.ySizeCol;
   
    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede
    if (isCollision) 
    {
        //Reducimos las vidas del PLAYER 
        decreaseLife(); 
        // Y si las vidas, han llegado a cero, se acaba la partida (GAME_OVER)
        checkifLivesisZero();
        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.HURT].play();
    }  
}

//Función que calcula la colisión de los dos personajes (PLAYER Y BACTERIUM)
function calculateSpritePlayerAndBacteriumCollision()
{
    const player = sprites[Type.PLAYER];
    const bacterium = sprites[Type.BACTERIUM];
   
    //Datos del objeto PLAYER
    const x1 = player.xPos + player.xOffsetCol;
    const y1 = player.yPos + player.yOffsetCol;
    const w1 = player.xSizeCol;
    const h1 = player.ySizeCol;

    //Datos del objeto BACTERIUM 
    const x2 = bacterium.xPos + bacterium.xOffsetCol;
    const y2 = bacterium.yPos + bacterium.yOffsetCol;
    const w2 = bacterium.xSizeCol;
    const h2 = bacterium.ySizeCol;
   
    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede
    if (isCollision) 
    {
        //Reducimos las vidas del PLAYER 
        decreaseLife(); 
        // Y si las vidas, han llegado a cero, se acaba la partida (GAME_OVER)
        checkifLivesisZero();
        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.HURT].play();    
    }
}


// -----------------------------------------------------------------------
// LAS COLISIONES DEL PLAYER CON LOS OBJETOS DEL AGUA Y LA LUZ
// -----------------------------------------------------------------------

function calculateSpritePlayerAndElementsCollision()
{
    calculateSpritePlayerAndLightCollision();
    calculateSpritePlayerAndMirror_LeftCollision();
    calculateSpritePlayerAndMirror_RightCollision();
    calculateSpritePlayerAndSinkCollision();
    calculateSpritePlayerAndBathCollision();
    checkTheStatesOfTheElements(); //Función que comprueba si todos los objetos del agua y de la luz están apagados
}


//Función que calcula la colisión entre el objeto PLAYER y el objeto LIGHT
function calculateSpritePlayerAndLightCollision()
{
    const player = sprites[Type.PLAYER];
    const light = sprites[Type.LIGHT];

    //Datos del objeto PLAYER
    const x1 = player.xPos + player.xOffsetCol;
    const y1 = player.yPos + player.yOffsetCol;
    const w1 = player.xSizeCol;
    const h1 = player.ySizeCol;

    //Datos del objeto LIGHT
    const x2 = light.xPos + light.xOffsetCol;
    const y2 = light.yPos + light.yOffsetCol;
    const w2 = light.xSizeCol;
    const h2 = light.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del objeto LIGHT no está en OFF
    if (isCollision && light.direction !== Direction.OFF) 
    {
        //Desactivamos la animación de la lámpara (LIGHT)
        light.isCollisionWithPlayer = true;
        //Actualizamos la puntuación del Player (por tocar la lámpara, el jugador consigue 30 puntos)
        updatePlayerScore(30);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.COLLISION].currentTime = 0;
        sounds[Sound.COLLISION].play();

    }
}

//Función que calcula la colisión entre el objeto PLAYER y el objeto MIRROR_LEFT
function calculateSpritePlayerAndMirror_LeftCollision()
{
    const player = sprites[Type.PLAYER];
    const mirror_left = sprites[Type.MIRROR_LEFT];

    //Datos del objeto PLAYER
    const x1 = player.xPos + player.xOffsetCol;
    const y1 = player.yPos + player.yOffsetCol;
    const w1 = player.xSizeCol;
    const h1 = player.ySizeCol;

    //Datos del objeto MIRROR_LEFT
    const x2 = mirror_left.xPos + mirror_left.xOffsetCol;
    const y2 = mirror_left.yPos + mirror_left.yOffsetCol;
    const w2 = mirror_left.xSizeCol;
    const h2 = mirror_left.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del MIRROR_LEFT no está en OFF
    if (isCollision && mirror_left.direction !== Direction.OFF) 
    {
        //Desactivamos la animación de la bombilla de la izquierda (MIRROR_LEFT)
        mirror_left.isCollisionWithPlayer = true;
        //Actualizamos la puntuación del Player (por tocar la bombilla de la izquierda, el jugador consigue 40 puntos)
        updatePlayerScore(40);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.COLLISION].currentTime = 0;
        sounds[Sound.COLLISION].play();    
    }
}


//Función que calcula la colisión entre el objeto PLAYER y el objeto MIRROR_RIGHT
function calculateSpritePlayerAndMirror_RightCollision()
{
    const player = sprites[Type.PLAYER];
    const mirror_right = sprites[Type.MIRROR_RIGHT];

    //Datos del objeto PLAYER
    const x1 = player.xPos + player.xOffsetCol;
    const y1 = player.yPos + player.yOffsetCol;
    const w1 = player.xSizeCol;
    const h1 = player.ySizeCol;

    //Datos del objeto MIRROR_LEFT
    const x2 = mirror_right.xPos + mirror_right.xOffsetCol;
    const y2 = mirror_right.yPos + mirror_right.yOffsetCol;
    const w2 = mirror_right.xSizeCol;
    const h2 = mirror_right.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del MIRROR_RIGHT no está en OFF
    if (isCollision && mirror_right.direction !== Direction.OFF) 
    {
        //Desactivamos la animación de la bombilla de la derecha (MIRROR_RIGHT)
        mirror_right.isCollisionWithPlayer = true;
        //Actualizamos la puntuación del Player (por tocar la bombilla de la derecha, el jugador consigue 40 puntos)
        updatePlayerScore(40)

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.COLLISION].currentTime = 0;
        sounds[Sound.COLLISION].play();
    }
}


//Función que calcula la colisión entre el objeto PLAYER y el objeto SINK
function calculateSpritePlayerAndSinkCollision()
{
    const player = sprites[Type.PLAYER];
    const sink = sprites[Type.SINK];
    
    //Datos del objeto PLAYER
    const x1 = player.xPos + player.xOffsetCol;
    const y1 = player.yPos + player.yOffsetCol;
    const w1 = player.xSizeCol;
    const h1 = player.ySizeCol;

    //Datos del objeto SINK
    const x2 = sink.xPos + sink.xOffsetCol;
    const y2 = sink.yPos + sink.yOffsetCol;
    const w2 = sink.xSizeCol;
    const h2 = sink.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del SINK no está en OFF
    if (isCollision && sink.direction !== Direction.OFF) 
    {
        //Desactivamos la animación del grifo (SINK)
        sink.isCollisionWithPlayer = true; 
        //Actualizamos la puntuación del Player (por tocar el grifo, el jugador consigue 20 puntos)
        updatePlayerScore(20);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.COLLISION].currentTime = 0;
        sounds[Sound.COLLISION].play();
    }
}


//Función que calcula la colisión entre el objeto PLAYER y el objeto BATH
function calculateSpritePlayerAndBathCollision()
{
    const player = sprites[Type.PLAYER];
    const bath = sprites[Type.BATH];
    
    //Datos del PLAYER
    const x1 = player.xPos + player.xOffsetCol;
    const y1 = player.yPos + player.yOffsetCol;
    const w1 = player.xSizeCol;
    const h1 = player.ySizeCol;


    //Datos del BATH
    const x2 = bath.xPos + bath.xOffsetCol;
    const y2 = bath.yPos + bath.yOffsetCol;
    const w2 = bath.xSizeCol;
    const h2 = bath.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)

    //Si la colisión entre los dos rectángulos sucede y si la dirección del BATH no está en OFF
    if (isCollision && bath.direction !== Direction.OFF) 
    {
        //Desactivamos la animación del grifo de la bañera (BATH)
        bath.isCollisionWithPlayer = true;
        //Actualizamos la puntuación del Player (por tocar el grifo de la bañera, el jugadpr consigue 10 puntos)
        updatePlayerScore(10);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.COLLISION].currentTime = 0;
        sounds[Sound.COLLISION].play();
        
    }
}


// -----------------------------------------------------------------------
// LAS COLISIONES DEL ENEMY CON LOS OBJETOS DEL AGUA Y LA LUZ
// -----------------------------------------------------------------------

function calculateSpriteEnemyWithElementsCollision() 
{
    calculateSpriteEnemyAndLightCollision();
    calculateSpriteEnemyAndMirror_LeftCollision();
    calculateSpriteEnemyAndMirror_RightCollision();
    calculateSpriteEnemyAndSinkCollision();
    calculateSpriteEnemyAndBathCollision(); 
    checkifTimeIsZero();   //Función que comprueba si el tiempo del juego ha llegado a cero
    checkifLivesisZero();  //Función que comprueba si las vidas del jugador han llegado a cero
}



//Función que calcula la colisión entre el objeto ENEMY y el objeto LIGHT
function calculateSpriteEnemyAndLightCollision()
{
    const enemy = sprites[Type.ENEMY];
    const light = sprites[Type.LIGHT];

    //Datos del objeto ENEMY
    const x1 = enemy.xPos + enemy.xOffsetCol;
    const y1 = enemy.yPos + enemy.yOffsetCol;
    const w1 = enemy.xSizeCol;
    const h1 = enemy.ySizeCol;

    //Datos del objeto LIGHT
    const x2 = light.xPos + light.xOffsetCol;
    const y2 = light.yPos + light.yOffsetCol;
    const w2 = light.xSizeCol;
    const h2 = light.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del LIGHT no está en ON
    if (isCollision && light.direction != Direction.ON) 
    {
        //Activamos la animación del objeto de la lámpara (LIGHT)
        light.isCollisionWithEnemy = true;
        //El PLAYER tiene menos tiempo para desactivar los objetos
        decreaseTime();
        //Reducimos la puntuación del PLAYER (en este caso, 30 puntos)
        decreaseTheScoreOfPlayer(30);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.ENEMY].currentTime = 0;
        sounds[Sound.ENEMY].play();
        
    }
}

//Función que calcula la colisión entre el objeto ENEMY y el objeto MIRROR_LEFT
function calculateSpriteEnemyAndMirror_LeftCollision()
{
    const enemy = sprites[Type.ENEMY];
    const mirror_left = sprites[Type.MIRROR_LEFT];

    //Datos del objeto ENEMY
    const x1 = enemy.xPos + enemy.xOffsetCol;
    const y1 = enemy.yPos + enemy.yOffsetCol;
    const w1 = enemy.xSizeCol;
    const h1 = enemy.ySizeCol;

    //Datos del objeto MIRROR_LEFT
    const x2 = mirror_left.xPos + mirror_left.xOffsetCol;
    const y2 = mirror_left.yPos + mirror_left.yOffsetCol;
    const w2 = mirror_left.xSizeCol;
    const h2 = mirror_left.ySizeCol;
    
    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del MIRROR_LEFT no está en ON
    if (isCollision && mirror_left.direction != Direction.ON) 
    {
        //Activamos la animación del objeto de bombilla de la izquierda del espejo (MIRROR_LEFT)
        mirror_left.isCollisionWithEnemy = true;
        //El PLAYER tiene menos tiempo para desactivar los objetos
        decreaseTime();
        //Reducimos la puntuación del PLAYER (en este caso, 40 puntos)
        decreaseTheScoreOfPlayer(40);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.ENEMY].currentTime = 0;
        sounds[Sound.ENEMY].play();
    }
}

//Función que calcula la colisión entre el objeto ENEMY y el objeto MIRROR_RIGHT
function calculateSpriteEnemyAndMirror_RightCollision()
{
    const enemy = sprites[Type.ENEMY];
    const mirror_right= sprites[Type.MIRROR_RIGHT];
    
    //Datos del objeto ENEMY
    const x1 = enemy.xPos + enemy.xOffsetCol;
    const y1 = enemy.yPos + enemy.yOffsetCol;
    const w1 = enemy.xSizeCol;
    const h1 = enemy.ySizeCol;

    //Datos del objeto MIRROR_RIGHT
    const x2 = mirror_right.xPos + mirror_right.xOffsetCol;
    const y2 = mirror_right.yPos + mirror_right.yOffsetCol;
    const w2 = mirror_right.xSizeCol;
    const h2 = mirror_right.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del MIRROR_RIGHT no está en ON 
    if (isCollision && mirror_right.direction != Direction.ON) 
    {
        //Activamos la animación del objeto de bombilla de la derecha del espejo (MIRROR_RIGHT)
        mirror_right.isCollisionWithEnemy = true;
        //El PLAYER tiene menos tiempo para desactivar los objetos
        decreaseTime();
        //Reducimos la puntuación del PLAYER (en este caso, 40 puntos)
        decreaseTheScoreOfPlayer(40);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.ENEMY].currentTime = 0;
        sounds[Sound.ENEMY].play();
    }

}



//Función que calcula la colisión entre el objeto ENEMY y el objeto SINK
function calculateSpriteEnemyAndSinkCollision()
{
    const enemy = sprites[Type.ENEMY];
    const sink = sprites[Type.SINK];
    
    //Datos del objeto ENEMY
    const x1 = enemy.xPos + enemy.xOffsetCol;
    const y1 = enemy.yPos + enemy.yOffsetCol;
    const w1 = enemy.xSizeCol;
    const h1 = enemy.ySizeCol;

    //Datos del objeto SINK
    const x2 = sink.xPos + sink.xOffsetCol;
    const y2 = sink.yPos + sink.yOffsetCol;
    const w2 = sink.xSizeCol;
    const h2 = sink.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del SINK no está en ON
    if (isCollision && sink.direction != Direction.ON) 
    {
        //Activamos la animación del grifo (SINK)
        sink.isCollisionWithEnemy = true;
        //El PLAYER tiene menos tiempo para desactivar los objetos
        decreaseTime();
        //Reducimos la puntuación del PLAYER (en este caso, 20 puntos)
        decreaseTheScoreOfPlayer(20);

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.ENEMY].currentTime = 0;
        sounds[Sound.ENEMY].play();
    }
}

//Función que calcula la colisión entre el objeto ENEMY y el objeto BATH
function calculateSpriteEnemyAndBathCollision()
{
    const enemy = sprites[Type.ENEMY];
    const bath = sprites[Type.BATH];
    
    //Datos del objeto ENEMY
    const x1 = enemy.xPos + enemy.xOffsetCol;
    const y1 = enemy.yPos + enemy.yOffsetCol;
    const w1 = enemy.xSizeCol;
    const h1 = enemy.ySizeCol;

    //Datos del objeto BATH
    const x2 = bath.xPos + bath.xOffsetCol;
    const y2 = bath.yPos + bath.yOffsetCol;
    const w2 = bath.xSizeCol;
    const h2 = bath.ySizeCol;

    const isCollision = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2)
    //Si la colisión entre los dos rectángulos sucede y si la dirección del BATH no está en ON
    if (isCollision && bath.direction != Direction.ON) 
    {
        //Activamos la animación del grifo de la bañera (BATH)
        bath.isCollisionWithEnemy = true;
        //El PLAYER tiene menos tiempo para desactivar los objetos
        decreaseTime();  
        //Reducimos la puntuación del PLAYER (en este caso, 10 puntos)
        decreaseTheScoreOfPlayer(10); 

        //Reproducimos el sonido de la colisión, desde el inicio
        sounds[Sound.ENEMY].currentTime = 0;
        sounds[Sound.ENEMY].play();
    }
}





