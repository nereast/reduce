
function update()
{
    //Cambiamos lo que está haciendo el juego según el estado del juego
    switch(gameState)
    {
        case State.LOADING:
            console.log("Cargando...");
        break;
        case State.NEW_GAME:
            console.log("Contexto del juego");
            updateNewGame();
        break;
        case State.LOAD_LEVEL:
            updateLoadLevel();
        break;
        case State.PLAYING:
            console.log("Pulsa P para pausar la partida.");
            updatePlayGame();
        break;
        case State.PAUSE:
            console.log("El juego está en pausa, pulsa C para continuar con la partida");
            updatePauseState();
        break;
        case State.GAME_OVER: 
            console.log("¡Has perdido!");
            updateEndGame();
        break;
        case State.LEVELS_COMPLETED:
            console.log("¡Bravo! Has superado todos los niveles.");
            updateLevelsCompleted();
        break;
        case State.END_LEVEL:
            console.log("¡Enhorabuena! Has acabado la partida.");
            updateEndLevel();
        break;
        
    }
}


//Función que actualiza los sonidos del juego
function updateMusic()
{
    var buffer = 0.28;
    const music = sounds[Sound.GAME_MUSIC];
    if(music.currentTime > music.duration - buffer)
    {
        music.currentTime = 0;
        music.play();
    }
}

//Función que actualiza el estado (gameState = State.NEW_GAME)
function updateNewGame()
{
    //Si se pulsa la tecla S, empieza un nuevo juego
    const isSPressed = action.start;
    if (isSPressed)
    {
        gameState = State.LOAD_LEVEL;
        //Reproducimos el sonido de la pulsación del teclado, desde el inicio
        sounds[Sound.KEYBOARD].currentTime = 0;
        sounds[Sound.KEYBOARD].play();
    }

    //Reproducimos el sonido del GAME_MUSIC al inicializar el juego
    sounds[Sound.GAME_MUSIC].play();
    sounds[Sound.GAME_MUSIC].volume = 0.5; //Reproducimos el sonido a un volumen inferior

    initTimer();     //Inicializamos el Timer
    initVars();      //Inicializamos las variables del GameGui
    initStates();    //Inicializamos los estados del juego
}



//Función que actualiza el estado (gameState = State.LOAD_LEVEL)
function updateLoadLevel()
{
    //Si el jugador pulsa la tecla B, empieza a jugar
    const isBPressed = action.begin;
    if (isBPressed)
    {
        gameState = State.PLAYING;
        //Reproducimos el sonido de la pulsación del teclado, desde el inicio
        sounds[Sound.KEYBOARD].currentTime = 0;
        sounds[Sound.KEYBOARD].play();
         
    }

    //Si el jugador está en el Primer nivel
    if (level === 1)
    {
        console.log("Nivel 1.");
        initFirstLevelSprites(); //Inicializamos los Sprites del Primer Nivel.   
    }

    //Si el jugador no está en el Primer Nivel
    if (level !== 1)
    {
        console.log("Nivel 2,3,4 o 5... hasta que el tiempo llegue a cero o que las vidas del jugador lleguen a cero.");
        initRestOfLevelSprites(); //Inicializamos los Sprites de los demás niveles. 
        initStates(); //Inicializamos los estados del juego.

        sprites[Type.ENEMY].speed +=10; //Aumentamos la velocidad del primer enemigo (ENEMY)
    }
}


//Función que actualiza el estado (gameState = State.PLAYING)
function updatePlayGame()
{
    updateSprites();        //Actualizamos los Sprites
    updateTime();           //Actualizamos el tiempo
    updateTrophy();         //Actualizamos la animación del trofeo
    calculateCollision();   //Calculamos las colisiones

    //Si se pulsa la tecla P, se pausa la partida
    const isPPresed = action.pause;
    if (isPPresed)
    {
        gameState = State.PAUSE;
        //Reproducimos el sonido de la pulsación del teclado, desde el inicio
        sounds[Sound.KEYBOARD].currentTime = 0;
        sounds[Sound.KEYBOARD].play();
    }

}

//Función que actualiza el estado (gameState = State.PAUSE)
function updatePauseState() 
{
    //Si se pulsa la tecla C, se continua con la partida
    const isCPresed = action.continue;
    if (isCPresed)
    {
        gameState = State.PLAYING;
        //Reproducimos el sonido de la pulsación del teclado, desde el inicio
        sounds[Sound.KEYBOARD].currentTime = 0;
        sounds[Sound.KEYBOARD].play();
    }

}
//Función que actualiza el estado (gameState = State.GAME_OVER)
function updateEndGame()
{
    //Si se pulsa la tecla N, se va al estado NEW_GAME
    const isNPressed = action.newGame;
    if (isNPressed) 
    {
        gameState = State.NEW_GAME;
        //Reproducimos el sonido de la pulsación del teclado, desde el inicio
        sounds[Sound.KEYBOARD].play();
    }   
}


//Función que actualiza el estado (gameState = State.END_LEVEL)
function updateEndLevel()
{
    //Si se pulsa la tecla S, se sube de nivel o se va al estado LOAD_LEVEL
    const isSPressed = action.start;
    if (isSPressed)
    {
        gameState = State.LOAD_LEVEL;
        level += 1; //El nivel del juego pasa a ser a un nivel mayor al 1. 

        //Reproducimos el sonido de la pulsación del teclado, desde el inicio
        sounds[Sound.KEYBOARD].play();

    }     
}

//Función que actualiza el estado (gameState = State.LEVELS_COMPLETED)
function updateLevelsCompleted()
{
    const isNPressed = action.newGame;
    if (isNPressed)
    {
        gameState = State.NEW_GAME;
        //Reproducimos el sonido de la pulsación del teclado, desde el inicio
        sounds[Sound.KEYBOARD].play();
    }
}


//Función para actualizar el contador del tiempo
function updateTime()
{
    timeObj.timeChange += lag;

    if (timeObj.timeChange > timeObj.timeChangeValue)
    {
        //Reseteamos el contador
        timeObj.timeChange = 0;
        //Reducimos en una unidad el tiempo
        timeObj.value--;
    }
}

//Función que elimina las vidas del jugador o el PLAYER
function decreaseLife()
{
    life --;   
}
     
//Función que comprueba, si las vidas del PLAYER han llegado hasta cero
function checkifLivesisZero()
{
    if (life === 0)
    {
        gameState = State.GAME_OVER;
        //Reproducimos el sonido del estado GAME_OVER
        sounds[Sound.GAME_OVER].play();
    }
}


//Función que actualiza la puntuación del PLAYER
function updatePlayerScore(point)
{
   score +=point;
}


//Función que comprueba si todos los objetos están apagados
function checkTheStatesOfTheElements()
{
    const light = sprites[Type.LIGHT];
    const mirror_left = sprites[Type.MIRROR_LEFT];
    const mirror_right = sprites[Type.MIRROR_RIGHT];
    const sink = sprites[Type.SINK];
    const bath = sprites[Type.BATH];

    //Si todos los objetos están apagados, el jugador consigue ganar
    if (light.direction === Direction.OFF && mirror_left.direction === Direction.OFF &&
        mirror_right.direction === Direction.OFF && sink.direction === Direction.OFF &&
        bath.direction === Direction.OFF)
    {
        //Si el jugador está en un nivel menor que el 5, pasa a ir al estado END_LEVEL
        if (level < 5)
        {
            gameState = State.END_LEVEL;
            console.log("State.End_Level");
            //Reproducimos el sonido del estado END_LEVEL
            sounds[Sound.END_LEVEL].play();
        }

        //Si el jugador está en el Nivel 5, para a ir al estado LEVELS_COMPLETED
        if (level === 5)
        {
            gameState = State.LEVELS_COMPLETED;
            console.log("State.Levels_Completed");
            //Reproducimos el sonido del estado LEVELS_COMPLETED
            sounds[Sound.LEVELS_COMPLETED].play();
        }
    }
}


//Función que actualiza el ángulo del trofeo
function updateTrophy()
{
    //Giramos 5º
    trophyObj.angle += 5;
    trophyObj.angle_radians = trophyObj.angle * Math.PI / 180;

}



//Función que disminuye la puntuación del PLAYER, que sucede cuando el primer enemigo (ENEMY) choca contra los objetos
function decreaseTheScoreOfPlayer(point)
{
    score -=point;
}



//Función que disminuye el tiempo del jugador, que sudece cuando el enemigo choca contra los objetos
function decreaseTime()
{
    timeObj.value--;
}

//Función que comprueba si el tiempo de la partida ha llegado a cero
function checkifTimeIsZero()  
{
    if (timeObj.value === 0) 
    {
        gameState = State.GAME_OVER;
        //Reproducimos el sonido del estado GAME_OVER
        sounds[Sound.GAME_OVER].play();
    }
}




//Función que actualiza los Sprites
function updateSprites()
{
    for (let i = 0; i < sprites.length; i++)
    {
        const sprite = sprites[i];
        updateSprite(sprite);
    }
}

//Función que actualiza la imagen llamada "Sprite.png"
function updateSprite(sprite)
{
    const type = sprite.id;
    switch (type) 
    {
        //Caso del jugador (PLAYER)
        case Type.PLAYER:
            updatePlayer(sprite);
        break; 
        
        //Caso del enemigo (ENEMY)
        case Type.ENEMY:
            updateEnemy(sprite);
        break;

        //Caso del segundo enemigo (BACTERIUM)
        case Type.BACTERIUM:
            updateBacterium(sprite);
        break;

        //Caso de la animación de la lámpara (LIGHT)
        case Type.LIGHT: 
            updateLight(sprite);
        break;

        //Caso de la animación de la bombilla de la izquierda (MIRROR_LEFT)
        case Type.MIRROR_LEFT:
            updateMirror_Left(sprite);
        break;

        //Caso de la animación de la bombilla de la izquierda (MIRROR_LEFT)
        case Type.MIRROR_RIGHT:
            updateMirror_Right(sprite);
        break;

        //Caso de la animación del grifo (SINK)
        case Type.SINK:
            updateSink(sprite);
        break;

        //Caso de la animación del grifo de la bañera (BATH)
        case Type.BATH:
            updateBath(sprite);
        break;

        default:
        break;     
    }  
}

//Función que actualiza el jugador (PLAYER)
function updatePlayer()
{
    const player = sprites[Type.PLAYER];
    const isMovingRight = movement.direction == Mov.RIGHT && (action.moveRight);
    const isMovingLeft  = movement.direction == Mov.LEFT  && (action.moveLeft);
    const isLeftOrRightPressed = action.moveRight || action.moveLeft;
    
    // -----------------------------------------------------------------
    // MOVIMIENTO HORIZONTAL
    // -----------------------------------------------------------------

    // Estamos moviéndonos hacia la izquierda y continuamos pulsando la tecla
    if (isMovingLeft)
    {
        //Asignamos la direccion de animación
        player.direction = Direction.LEFT;
        
        //Asignamos la aceleración (negativa)
        player.accelX = -ACCELERATION_X;
    }
    
    //Estamos moviéndonos hacia la derecha y continuamos pulsando la tecla
    else if (isMovingRight)
    {
        //Asignamos la direccion de animación
        player.direction = Direction.RIGHT;

        //Asignamos la aceleración (positiva)
        player.accelX = ACCELERATION_X;
    }  

    else   //Caso en el que NO se ha iniciado el movimiento
    {
        
        if (action.moveRight)
        {           
            //Asignamos movimiento a la derecha
            movement.direction = Mov.RIGHT;
        }
        else if (action.moveLeft)
        {
            //Asignamos movimiento a la izquierda
            movement.direction = Mov.LEFT;  
        }
        else
        {
            //Si no tenemos pulsada la izquierda ni la derecha
            movement.direction = Mov.NONE;
            player.accelX = 0;
        }
        
    }


    //Calculamos la VELOCIDAD en X (V = V + A*t)
    player.vx += player.accelX * lag / 1000;

    //Aplicamos fricción en los cambios de dirección, para reducir la velocidad rápidamente
    if ((isMovingLeft && player.vx > 0) ||
        (isMovingRight && player.vx < 0) ||
        (!isLeftOrRightPressed))
    {
        player.vx *= player.friction;
    }
        
    //Limitamos a la velocidad máxima en dirección horizontal
    if (player.vx > player.speedLimit) //Derecha (velocidad +)
    {
        player.vx = player.speedLimit;
    }
    else if (player.vx < -player.speedLimit)  //Izquierda (velocidad -)
    {
        player.vx =- player.speedLimit;
    }

    //Calculamos la nueva posición en X
    player.xPos = player.xPos + player.vx * lag / 1000;


    
    // -------------------------------------------------------------------
    // MOVIMIENTO VERTICAL
    // -------------------------------------------------------------------

    //No estamos en el suelo
    if (!player.isOnGround)
    { 
        //Calculamos velocidad en Y (V = V + A*t)
        player.vy += player.accelY * lag / 1000;        
    }
    else //Estamos en el suelo
    {   
        if (action.jumpRight) //Pulsamos la tecla de arriba para el salto a la derecha
        {
            player.isOnGround = false;

            //Asignamos velocidad inicial de salto
            player.vy += player.jumpForce;
            player.direction = Direction.JUMP_RIGHT;

            //Reproducimos el sonido de salto, desde el inicio
            sounds[Sound.JUMP].currentTime = 0;
            sounds[Sound.JUMP].play(); 
        }  
        
        else if (action.jumpLeft) //Pulsamos la tecla de abajo para el salto a la izquierda
        {
            player.isOnGround = false;

            //Asignamos velocidad inicial de salto
            player.vy += player.jumpForce;
            player.direction = Direction.JUMP_LEFT;

            //Reproducimos el sonido de salto, desde el inicio
            sounds[Sound.JUMP].currentTime = 0;
            sounds[Sound.JUMP].play(); 
        }
    }
    
    //Calculamos la nueva posición en Y
    player.yPos = player.yPos + player.vy * lag / 1000;



    // -----------------------------------------------------------------------
    // COLISION CON EL SUELO (PASAR A COLISIONES)
    // -----------------------------------------------------------------------

    if (player.yPos > canvas.height - player.ySize)
    {
        player.isOnGround = true;
        player.yPos = canvas.height - player.ySize;
        player.vy = 0; 
    }
  

    if (movement.direction !== Mov.NONE)
    {
        //Si no estamos parados actualizamos el frame de animación
        updateAnimationFrame(player); 
    }

}



 
// Función que actualiza los frames de animación
function updateAnimationFrame(sprite)
{
    //Aumentamos el contador de tiempo entre frames
    sprite.animLagCounter++;

    //Cambiamos de frame cuando el lag de animación alcanza animSpeed
    if (sprite.animLagCounter === sprite.animSpeed)
    {
        sprite.frameCounter++;
        sprite.animLagCounter = 0;
    } 
   
    //Si hemos llegado al máximo de frames reiniciamos el contador (animación cíclica)
    if (sprite.frameCounter === sprite.numberOfFrames)
    {        
        sprite.frameCounter = 0; 
    }
}



//Función que controla el movimiento del Enemigo (ENEMY)
function updateEnemy(sprite)
{
    const state = sprite.direction;
    switch (state) 
    {
        case Direction.RIGHT_2:
            if (sprite.isCollisionRight)
            {
                swapEnemyDirection(sprite);
                sprite.isCollisionRight = false;
            }
            else
            {
                sprite.xPos = sprite.xPos + sprite.speed * lag / 1000; 
                sprite.yPos = sprite.yPos + Math.pow(-1, Math.floor(sprite.timeChangeValue / 1000)) * sprite.speed * lag / 1000;
            }                                       
        break;

        case Direction.LEFT_2:
            if (sprite.isCollisionLeft)
            {
                swapEnemyDirection(sprite);
                sprite.isCollisionLeft = false;
            }
            else
            {
                sprite.xPos = sprite.xPos - sprite.speed * lag / 1000;   
                sprite.yPos = sprite.yPos + Math.pow(-1, Math.floor(sprite.timeChangeValue / 1000)) * sprite.speed * lag / 1000;        
            }                             
        break;        
    }

    //Actualizamos el frame de animación
    updateAnimationFrame(sprite); 

    //Cambiamos aleatoriamente la dirección del Enemigo (ENEMY)
    updateTimeOfDirection(sprite);
}

//Función que intercambia la dirección del Enemigo (ENEMY)
function swapEnemyDirection()
{
   const enemy = sprites[Type.ENEMY];
   enemy.direction = enemy.direction === Direction.RIGHT_2 ? Direction.LEFT_2 : Direction.RIGHT_2;  
  
}

//Función que actualiza la dirección de los dos enemigos (ENEMY y BACTERIUM)
function updateTimeOfDirection(sprite)
{

    //Incrementamos el tiempo para el cambio de dirección
    sprite.timeChange += lag;

    if (sprite.timeChange > sprite.timeChangeValue)
    {
        sprite.timeChange = 0;

        //Actualizamos el tiempo de cambio de dirección aleatoriamente, entre 1 y 4 segundos
        let newTimeChange = 1000 * (Math.floor(Math.random() * 4) + 1);
        while (newTimeChange === sprite.timeChangeValue)
        {
            newTimeChange = 1000 * (Math.floor(Math.random() * 4) + 1);
        }
        sprite.timeChangeValue = newTimeChange;      
    }
}



//Función que controla el movimiento del segundo enemigo (BACTERIUM)
function updateBacterium(sprite)
{
    const state = sprite.direction;
    switch (state) 
    {
        case Direction.RIGHT_3:
            if (sprite.isCollisionRight)
            {
                swapBacteriumDirection(sprite);
                sprite.isCollisionRight = false;
            }
            else
            {
                sprite.xPos = sprite.xPos + sprite.speed * lag / 1000; 
                sprite.yPos = sprite.yPos + Math.pow(-1, Math.floor(sprite.timeChangeValue / 1000)) * sprite.speed * lag / 1000;

                //Si el temporizador del valor del tiempo llega a 1500, el objeto Bacterium desaparece del Canvas
                if (sprite.timeChange > 1500) 
                {
                    sprite.timeChange = 0;
                    sprite.direction = Direction.OFF;
                }
            }
                                                    
        break;

        case Direction.LEFT_3:
            if (sprite.isCollisionLeft)
            {
                swapBacteriumDirection(sprite);
                sprite.isCollisionLeft = false;
            }
            else
            {
                sprite.xPos = sprite.xPos - sprite.speed * lag / 1000;   
                sprite.yPos = sprite.yPos + Math.pow(-1, Math.floor(sprite.timeChangeValue / 1000)) * sprite.speed * lag / 1000;        
            }
                                         
        break;  
        
        case Direction.OFF:
            //Si el temporizador del tiempo del valor llega a 2500, el objeto Bacterium aparece en el Canvas
            if (sprite.timeChange > 2500)
            {
                sprite.xPos = Math.random()* canvas.width;
                sprite.yPos = Math.random()* canvas.height;


                sprite.timeChange = 0;
                sprite.direction = Direction.RIGHT_3;
            }
        break;

    }

    //Actualizamos el frame de animación
    updateAnimationFrame(sprite); 

    //Cambiamos aleatoriamente dirección del segundo enemigo (BACTERIUM)
    updateTimeOfDirection(sprite);
}




//Función que intercambia la dirección del segundo enemigo (BACTERIUM)
function swapBacteriumDirection(sprite)
{
    const bacterium = sprites[Type.BACTERIUM];
    bacterium.direction = bacterium.direction === Direction.RIGHT_3 ? Direction.LEFT_3 : Direction.RIGHT_3;  
                                
}



//Función que actualiza la animación de la lámpara
function updateLight()
{
    const light = sprites[Type.LIGHT];

    //Actualizamos los frames de animación
    updateAnimationFrame(light);

        //Si el Player se colisiona con la lámpara, la lámpara se apaga
        if (light.isCollisionWithPlayer) 
        {
            light.direction = Direction.OFF; 
            //La colisión con la lámpara pasa a ser false
            light.isCollisionWithPlayer = false;
            //Actualizamos el estado de la lámpara de Activado a Desactivado
            states.light = false;  
        }

        //Si el Enemy se colisiona con la lámpara, la lámpara se enciende
        if (light.isCollisionWithEnemy) 
        {
            light.direction = Direction.ON;
            //La colisión con la lámpara pasa a ser false
            light.isCollisionWithEnemy = false;
            //Actualizamos el estado de la lámpara de Desactivado a Activado
            states.light = true;
        }
}


//Funciones que actualizan las animaciones de las dos bombillas del espejo:

//La bombilla de la izquierda:
function updateMirror_Left()
{
    const mirror_left = sprites[Type.MIRROR_LEFT];
     
    //Actualizamos los frames de la animación
    updateAnimationFrame(mirror_left);
   
        //Si el Player se colisiona con la bombilla de la izquierda, la bombilla se apaga
        if (mirror_left.isCollisionWithPlayer) 
        {
            mirror_left.direction = Direction.OFF;
            //La colisión con la bombilla pasa a ser false
            mirror_left.isCollisionWithPlayer = false;
            //Actualizamos el estado de la bombilla de la izquierda de Activado a Desactivado
            states.mirror_left = false;    
        }

        //Si el Enemy se colisiona con la bombilla de la izquierda, la bombilla se enciende
        if (mirror_left.isCollisionWithEnemy) 
        {
            mirror_left.direction = Direction.ON;
            //La colisión con la bombilla pasa a ser false
            mirror_left.isCollisionWithEnemy = false;
            //Actualizamos el estado de la bombilla de la izquierda de Desactivado a Activado
            states.mirror_left = true; 
        }   
}


//La bombilla de la derecha:
function updateMirror_Right()
{
    const mirror_right = sprites[Type.MIRROR_RIGHT];
  
    //Actualizamos los frames de la animación
    updateAnimationFrame(mirror_right);
   
        //Si el Player se colisiona con la bombilla de la derecha, la bombilla se apaga
        if (mirror_right.isCollisionWithPlayer) 
        {
            mirror_right.direction = Direction.OFF;
            //La colisión con la bombilla pasa a ser false
            mirror_right.isCollisionWithPlayer = false;
            //Actualizamos el estado de la bombilla de la derecha de Activado a Desactivado
            states.mirror_right = false; 
        }

        //Si el Enemy se colisiona con la bombilla de la derecha, la bombilla se enciende
        if (mirror_right.isCollisionWithEnemy) 
        {
            mirror_right.direction = Direction.ON;
            //La colisión con la bombilla pasa a ser false
            mirror_right.isCollisionWithEnemy = false;
            //Actualizamos el estado de la bombilla de la derecha de Desactivado a Activado
            states.mirror_right = true; 
        }
   
}


//Función que actualiza la animación del agua del grifo
function updateSink()
{
    const sink = sprites[Type.SINK];
     
    //Actualizamos los frames de animación
    updateAnimationFrame(sink);
   
        //Si el Player se colisiona con el grifo, el grifo se enciende
        if (sink.isCollisionWithPlayer) 
        {
            sink.direction = Direction.OFF;
            //La colisión del grifo pasa a ser false
            sink.isCollisionWithPlayer = false;
            //Actualizamos el estado del grifo de Activado a Desactivado
            states.sink = false; 
        }

        //Si el Enemy se colisiona con el grifo, el grifo se apaga
        if (sink.isCollisionWithEnemy) 
        {
            sink.direction = Direction.ON;
            //La colisión del grifo pasa a ser false
            sink.isCollisionWithEnemy = false;
            //Actualizamos el estado del grifo de Desactivado a Activado
            states.sink = true;
        }
         
}


//Función que actualiza la animación del grifo de la bañera
function updateBath()
    {
    const bath = sprites[Type.BATH];
    //Actualizamos los frames de la animación 
    updateAnimationFrame(bath);

        //Si el Player se colisiona con el grifo, el grifo se apaga
        if (bath.isCollisionWithPlayer) 
        {
            bath.direction = Direction.OFF;
            //La colisión con la bañera pasa a ser false
            bath.isCollisionWithPlayer = false;
            //Actualizamos el estado del grifo de la bañera de Activado a Desactivado
            states.bath = false; 
        }

        //Si el Enemy se colisiona con el grifo, el grifo se enciende
        if (bath.isCollisionWithEnemy)
        {
            bath.direction = Direction.ON;
            //La colisión con la bañera pasa a ser false 
            bath.isCollisionWithEnemy = false;
            //Actualizamos el estado del grifo de la bañera de Desactivado a Activado
            states.bath = true; 
        }
    }


