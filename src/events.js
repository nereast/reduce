//Eventos de los teclados a la hora de mover el jugador y a la hora de desplazarse de una pantalla a otra:

function keydownHandler(event)
{
    switch(event.keyCode)
    {
        case Key.LEFT:
            action.moveLeft = true;
            break;

        case Key.RIGHT:
            action.moveRight = true;
            break;

        case Key.JUMP_RIGHT:
            action.jumpRight = true;
            break;

        case Key.JUMP_LEFT: 
            action.jumpLeft = true;
            break;
        case Key.BEGIN:
            action.begin = true;
            break;

        case Key.CONTINUE:
            action.continue = true;
            break;

        case Key.NEW_GAME:
            action.newGame = true;
            break;
        
        case Key.PAUSE:
            action.pause = true;
            break;
        
        case Key.START:
            action.start = true;
            break;
    }
}

function keyupHandler(event)
{
    switch(event.keyCode)
    {
        case Key.LEFT:
            action.moveLeft = false;
            break;

        case Key.RIGHT:
            action.moveRight = false;
            break;

        case Key.JUMP_RIGHT:
            action.jumpRight = false;
            break;

        case Key.JUMP_LEFT: 
            action.jumpLeft = false;
            break;

        case Key.BEGIN:
            action.begin = false;
            break;
        
        case Key.CONTINUE:
            action.continue = false;
            break;
        
        case Key.PAUSE:
            action.pause = false;
            break;
        
        case Key.START:
            action.start = false;
            break;
        
    }
}

//Función que se llama cada vez que se carga un activo
function loadHandler()
{
    assetsLoaded++;
   
    //Una vez se han cargado todos los activos
    if(assetsLoaded === assetsToLoad.length)
    {
        //Retiramos el evento de carga de los tilesets
        for (i = 0; i < tileSets.length; i++)
        {
            tileSets[i].removeEventListener("load", loadHandler, false);
        }
      
        console.log("Assets finished loading: " + assetsLoaded);
       
        //Iniciamos el juego
        gameState = State.NEW_GAME;

        //Retiramos el evento de carga de los sonidos 
        for (i = 0; i < sounds.length; ++i)
        {
            sounds[i].removeEventListener("canplaythrough", loadHandler, false);
        }
    }
}




