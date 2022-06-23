// Función que renderiza los gráficos para dibujarlos en el Canvas
function render()
{
    switch (gameState)
    {
        case State.NEW_GAME:
            renderNew_GameState(); //Dibujamos el mensaje del contexto del juego
        break;

        case State.LOAD_LEVEL:
            //Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderLoadLevelState(); //Dibujamos el mensaje del nuevo nivel del juego
        break;

        case State.PLAYING:
            //Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctxGUI_Up.clearRect(0, 0, canvasGUI_Up.width, canvasGUI_Up.height);
            ctxGUI_Down.clearRect(0, 0, canvasGUI_Down.width, canvasGUI_Down.height);

            renderMap(); //Dibujamos el fondo de la pantalla
            renderSprites(); //Dibujamos los elementos de los Sprites
            //renderCollisionRectangles(); //Dibujamos los elementos para las intersecciones de la colisión

            //Dibujamos los GameGui:
            renderGUI_Up(); //Dibujamos el GameGui de arriba
            renderTrophy(); //Dibujamos la rotación del Trofeo
            renderGUI_Down(); //Dibujamos el GameGui de abajo 
        break;

        case State.PAUSE:
            renderPauseState();  //Dibujamos el mensaje de: "El juego está en pausa, pulsa la C para continuar con la partida."
        break;

        case State.GAME_OVER:
            //Canvas
            ctxGUI_Up.clearRect(0, 0, canvasGUI_Up.width, canvasGUI_Up.height);

            renderGameOverState(); //Dibujamos el mensaje
            //Dibujamos los GameGui:
            renderGUI_Up();
        break;
        case State.LEVELS_COMPLETED:
            //Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderLevelCompletedState(); //Dibujamos el mensaje
        break;
        case State.END_LEVEL:
            //Canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderEndLevelState();  //Dibujamos el mensaje de: "¡Enhorabuena!"
        break;  
    }
}
 
    


//Función que renderiza los gráficos del estado (gameState: State.NEW_GAME)
function renderNew_GameState()
{
    image = new Image();
    image.src = 'images/NewGameState.png';
    ctx.drawImage(image, 0, 0);
    
}

//Función que renderiza los gráficos del estado (gameState: State.LOAD_LEVEL)
function renderLoadLevelState()
{
    image = new Image();
    image.src = 'images/LoadLevelState.png';
    ctx.drawImage(image, 100, 70);
        
    //Si el jugador está en el Nivel 1, dibujamos el mensaje
    if (level === 1)
    {
        ctx.font = '15px Video';
        ctx.fillStyle = "black";
        ctx.fillText("Estás en el Nivel 1",120,60);  
    }

    //Si el jugador está en el Nivel 2, dibujamos el mensaje
    if (level === 2)
    {
        ctx.font = '15px Video';
        ctx.fillStyle = "black";
        ctx.fillText("Estás en el Nivel 2",120,60);   
    } 
    
    //Si el jugador está en el Nivel 3, dibujamos el mensaje
    if (level === 3)
    {
        ctx.font = '15px Video';
        ctx.fillStyle = "black";
        ctx.fillText("Estás en el Nivel 3",120,60);  
    }

    //Si el jugador está en el Nivel 4, dibujamos el mensaje
    if (level === 4)
    {
        ctx.font = '15px Video';
        ctx.fillStyle = "black";
        ctx.fillText("Estás en el Nivel 4",120,60);   
    }  

    //Si el jugador está en el Nivel 5, dibujamos el mensaje
    if (level === 5)
    {
        ctx.font = '15px Video';
        ctx.fillStyle = "black";
        ctx.fillText("Estás en el Nivel 5",120,60);   
    } 
}




//Función que renderiza los gráficos del estado (gameState: State.PLAYING)
function renderMap()
{
    image = new Image();
    image.src = 'images/PlayingScreen.png';
    ctx.drawImage(image, 0, 0);
}

//Función que renderiza el Gui de arriba
function renderGUI_Up()
{
    ctxGUI_Up.font = '15px Video';
    ctxGUI_Up.fillStyle = 'white';
    ctxGUI_Up.fillText("PUNTUACIÓN: " + score, 380, 28);
    ctxGUI_Up.fillText("TIEMPO: " + timeObj.value, 530, 28);
    ctxGUI_Up.fillText("VIDAS: " + life, 650, 28);
}

//Función que renderiza el trofeo
function renderTrophy()
{
    for (let i=0; i < level; i++)
    {
        //Calculámos la posición a dibujar en el Canvas:
        const xSize = 25; //Tamaño total del sprite en X
        const ySize = 25; //Tamaño total del sprite en Y

        const xPos = 20 + xSize * i; //Posición inicial en X
        const yPos = 8;  //Posición inicial en Y

        //Nos desplazamos al centro del Sprite
        ctxGUI_Up.translate(xPos + xSize / 2, yPos + ySize / 2);

        //Giramos
        ctxGUI_Up.rotate(trophyObj.angle_radians);

        //Volvemos al origen
        ctxGUI_Up.translate(-(xPos + xSize / 2), -(yPos  + ySize / 2));

        //Dibujamos la imagen del Trofeo
        image = new Image();
        image.src = 'images/Trophy.png';
        ctxGUI_Up.drawImage(image,xPos,yPos); 

        //Restauramos el contexto inicial
        ctxGUI_Up.setTransform(1, 0, 0, 1, 0, 0);   
    }  
}

//Función que renderiza el Gui de abajo
function renderGUI_Down()
{
    ctxGUI_Down.font = '15px Video';
    ctxGUI_Down.fillStyle = 'white';

    ctxGUI_Down.fillText("LÁMPARA ", 20, 27);
    //Si la lámpara está encendida dibujamos el circulo verde 
    if (states.light === true)
    {
        image = new Image();
        image.src = 'images/Activado.png';
        ctxGUI_Down.drawImage(image, 86, 13);  
    }

    //Si la lámpara está apagada dibujamos el circulo rojo
    if (states.light === false)
    {
        image = new Image();
        image.src = 'images/Desactivado.png';
        ctxGUI_Down.drawImage(image, 86, 13);   
    }
    
    ctxGUI_Down.fillText("BOMBILLA DE LA IZQUIERDA ", 120, 27);
    //Si la bombilla de la izquierda está encendida dibujamos el circulo verde
    if (states.mirror_left === true)
    {
        image = new Image();
        image.src = 'images/Activado.png';
        ctxGUI_Down.drawImage(image, 318, 13);  
    }
    //Si la bombilla de la izquierda está apagada dibujamos el circulo rojo
    if (states.mirror_left === false)
    {
        image = new Image();
        image.src = 'images/Desactivado.png';
        ctxGUI_Down.drawImage(image, 318, 13);  
    }

    ctxGUI_Down.fillText("BOMBILLA DE LA DERECHA ", 360, 27);
    //Si la bombilla de la derecha está encendida dibujamos el circulo verde
    if (states.mirror_right === true)
    {
        image = new Image();
        image.src = 'images/Activado.png';
        ctxGUI_Down.drawImage(image,544, 13);  
    }
    //Si la bombilla de la derecha está apagada dibujamos el circulo rojo
    if (states.mirror_right === false)
    {
        image = new Image();
        image.src = 'images/Desactivado.png';
        ctxGUI_Down.drawImage(image,544, 13);  
    }

    ctxGUI_Down.fillText("GRIFO ", 580, 27);
    //Si el grifo está encendida dibujamos el circulo verde
    if (states.sink === true)
    {
        image = new Image();
        image.src = 'images/Activado.png';
        ctxGUI_Down.drawImage(image,625, 13);  
    }
    //Si el grifo está apagada dibujamos el circulo rojo
    if (states.sink === false)
    {
        image = new Image();
        image.src = 'images/Desactivado.png';
        ctxGUI_Down.drawImage(image,625, 13);  
    }
 
    ctxGUI_Down.fillText("BAÑERA ", 670, 27); 
    //Si la bañera está encendida dibujamos el circulo verde
    if (states.bath === true)
    {
        image = new Image();
        image.src = 'images/Activado.png';
        ctxGUI_Down.drawImage(image, 728, 13);  
    }
    //Si la bañera está apagada dibujamos el circulo rojo
    if (states.bath === false)
    {
        image = new Image();
        image.src = 'images/Desactivado.png';
        ctxGUI_Down.drawImage(image, 728, 13);  
    }   
}


//Función que dibuja los rectángulos de colisión de los sprites
function renderCollisionRectangles()
{
    //Datos del LIGHT
    const x1 = sprites[0].xPos + sprites[0].xOffsetCol;
    const y1 = sprites[0].yPos + sprites[0].yOffsetCol;
    const w1 = sprites[0].xSizeCol;
    const h1 = sprites[0].ySizeCol;

    ctx.fillStyle = "red";
    ctx.fillRect(x1, y1, w1, h1);

    //Datos del MIRROR_LEFT
    const x2 = sprites[1].xPos + sprites[1].xOffsetCol;
    const y2 = sprites[1].yPos + sprites[1].yOffsetCol;
    const w2 = sprites[1].xSizeCol;
    const h2 = sprites[1].ySizeCol;

    ctx.fillStyle = "pink";
    ctx.fillRect(x2, y2, w2, h2);

    //Datos del MIRROR_RIGHT
    const x3 = sprites[2].xPos + sprites[2].xOffsetCol;
    const y3 = sprites[2].yPos + sprites[2].yOffsetCol;
    const w3 = sprites[2].xSizeCol;
    const h3 = sprites[2].ySizeCol;

    ctx.fillStyle = "pink";
    ctx.fillRect(x3, y3, w3, h3);

    //Datos del SINK
    const x4 = sprites[3].xPos + sprites[3].xOffsetCol;
    const y4 = sprites[3].yPos + sprites[3].yOffsetCol;
    const w4 = sprites[3].xSizeCol;
    const h4 = sprites[3].ySizeCol;

    ctx.fillStyle = "blue";
    ctx.fillRect(x4, y4, w4, h4);


    //Datos del BATH
    const x5 = sprites[4].xPos + sprites[4].xOffsetCol;
    const y5 = sprites[4].yPos + sprites[4].yOffsetCol;
    const w5 = sprites[4].xSizeCol;
    const h5 = sprites[4].ySizeCol;

    ctx.fillStyle = "blue";
    ctx.fillRect(x5, y5, w5, h5);


    //Datos del PLAYER
    const x6 = sprites[5].xPos + sprites[5].xOffsetCol;
    const y6 = sprites[5].yPos + sprites[5].yOffsetCol;
    const w6 = sprites[5].xSizeCol;
    const h6 = sprites[5].ySizeCol;

    ctx.fillStyle = "orange";
    ctx.fillRect(x6, y6, w6, h6);

    //Datos del ENEMY
    const x7 = sprites[6].xPos + sprites[6].xOffsetCol;
    const y7 = sprites[6].yPos + sprites[6].yOffsetCol;
    const w7 = sprites[6].xSizeCol;
    const h7 = sprites[6].ySizeCol;

    ctx.fillStyle = "green";
    ctx.fillRect(x7, y7, w7, h7);

    //Datos del BACTERIUM
    const x8 = sprites[7].xPos + sprites[7].xOffsetCol;
    const y8 = sprites[7].yPos + sprites[7].yOffsetCol;
    const w8 = sprites[7].xSizeCol;
    const h8 = sprites[7].ySizeCol;

    ctx.fillStyle = "white";
    ctx.fillRect(x8, y8, w8, h8);
   
}

//Función que renderiza los Sprites
function renderSprites()
{ 
    for (let i = 0; i < sprites.length; ++i)
    {
        const sprite = sprites[i];
        renderSprite(sprite); //Representamos el Sprite en el Canvas      
    }
}


//Función que renderiza el Sprite en el Canvas
function renderSprite(sprite)
{
    //Calculamos la posición del tile de inicio
    const xPosInit = sprite.colTile * SPRITE_SIZE;
    const yPosInit = sprite.filTile * SPRITE_SIZE;
    
    const xTile = xPosInit + sprite.frameCounter * SPRITE_SIZE + sprite.xOffset;
    const yTile = yPosInit + sprite.direction * SPRITE_SIZE + sprite.yOffset;
    const xPos = Math.floor(sprite.xPos);
    const yPos = Math.floor(sprite.yPos);
     
    //Si las direcciones de los Sprites no están apagados, dibujamos los Sprites
    if (sprite.direction !== Direction.OFF )
    {

        //Dibujamos el nuevo fotograma del sprite en la posición adecuada
        ctx.drawImage(
            tileSets[Tile.SIZE_80],     //La imagen
            xTile, yTile,               //La posición en X y en Y
            sprite.xSize, sprite.ySize, //La anchura y la altura del Sprite
            xPos, yPos,                 //La destinación X y la posición Y
            sprite.xSize, sprite.ySize  //La destinación de la anchura y de la altura
        );
    }
}



//Función que renderiza los gráficos del estado (gameState = State.PAUSE)
function renderPauseState()
{
    image = new Image();
    image.src = 'images/PauseState.png';
    ctx.drawImage(image, 100, 45);
}


//Función que renderiza los gráficos del estado (gameState = State.GAME_OVER)
function renderGameOverState()
{
    image = new Image();
    image.src = 'images/GameOverState.png';
    ctx.drawImage(image, 100, 45);
}



//Función que renderiza los gráficos del estado (gameState = State.END_LEVEL)
function renderEndLevelState()
{
    image = new Image();
    image.src = 'images/EndLevelState.png';
    ctx.drawImage(image, 100, 45);
}

//Función que renderiza los gráficos del estado 8gameState = State.LEVELS_COMPLETED)
function renderLevelCompletedState()
{
    image = new Image();
    image.src = 'images/LevelsCompletedState.png';
    ctx.drawImage(image, 100, 45);
}






