function gameLoop(timeStamp)
{
    //Copia global del tiempo
    globalTime = timeStamp;

    //Seguimos solicitando nuevos frames
    window.requestAnimationFrame(gameLoop);

    const elapsedCycleTime = timeStamp - previousCycleTime; //ms
    previousCycleTime = timeStamp;
    lag += elapsedCycleTime;
    
    if (lag >= frameTimeObj)
    {               
        //Introduzimos la función de update(); del gameLogic.js
        update();
        //Dibujamos los elementos en el canvas a través de la función de render(); del gameRender.js
        render();
        //Corregimos los excesos de tiempo
        lag -= frameTimeObj;
    }
}












