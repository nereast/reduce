//Class para los Sprites
class Sprite
{
    constructor(id, direction, colTile, filTile, xPos, yPos, speed, numberOfFrames, frameCounter, xSize, ySize, xOffset, yOffset, 
                animSpeed, animLagCounter, isCollisionWithPlayer, isCollisionWithEnemy, xSizeCol, ySizeCol, xOffsetCol, yOffsetCol, timeChange, timeChangeValue, isCollisionRight, isCollisionLeft, vx, vy, speedLimit, accelX, accelY, friction, jumpForce, isOnGround)
    {
        this.id             = id;                     //Tipo de Sprite
        this.direction      = direction;              //Estado de animacion del sprite
        this.colTile        = colTile;                //Posición de tile de inicio en X
        this.filTile        = filTile;                //Posición de tile de inicio en Y
        this.xPos           = xPos;                   //Posición inicial en X
        this.yPos           = yPos;                   //Posición inicial en Y
        this.speed          = speed;                  //Velocidad de movimiento (pixels / sec)
        this.numberOfFrames = numberOfFrames;         //Número de frames de animación
        this.frameCounter   = frameCounter;           //Contador de frames
        this.xSize          = xSize;                  //Tamaño total del sprite en X
        this.ySize          = ySize;                  //Tamaño total del sprite en Y
        this.xOffset        = xOffset;                //Offset en X de comienzo de dibujo del personaje respecto del anterior bloque
        this.yOffset        = yOffset;                //Offset en Y de comienzo de dibujo del personaje respecto del anterior bloque
        this.animSpeed      = animSpeed;              //Velocidad de cambio de frame (a mayor número, más lento)
        this.animLagCounter = animLagCounter;         //Contador de velocidad de cambio de frame

        //Colisiones con las luces y el agua
        this.isCollisionWithPlayer = isCollisionWithPlayer;         //Usada por las luces y el agua para la desactivación de las animaciones
        this.isCollisionWithEnemy  = isCollisionWithEnemy;          //Usada por las luces y el agua para la activación de las animaciones

        //Colisiones
        this.xSizeCol       = xSizeCol;               //Tamaño en X para colisiones
        this.ySizeCol       = ySizeCol;               //Tamaño en Y para colisiones
        this.xOffsetCol     = xOffsetCol;             //Offset en X para colisiones (Respecto de xPos)
        this.yOffsetCol     = yOffsetCol;             //Offset en Y para colisiones (Respecto de yPos)

       
        //Enemigos (Enemy y Bacterium)
        this.timeChange     = timeChange;             //Usada por los enemigos para el cambio de dirección
        this.timeChangeValue  = timeChangeValue;      //Usada por los enemigos para el cambio de dirección
        this.isCollisionRight = isCollisionRight;     //Usada por los enemigos para el cambio de dirección 
        this.isCollisionLeft = isCollisionLeft;       //Usada por los enemigos para el cambio de dirección
        
        //Physics
        this.vx             = vx;                     //Velocidad de movimiento (pixels / sec)
        this.vy             = vy;                     //Velocidad de movimiento (pixels / sec)
        this.speedLimit     = speedLimit;             //Velocidad límite
        this.accelX         = accelX;                 //Aceleración horizontal
        this.accelY         = accelY;                 //Aceleración vertical
        this.friction       = friction;               //Valor de fricción con el suelo
        this.jumpForce      = jumpForce;              //Valor de velocidad inicial de salto (Negativo)
        
        //Colisión del jugador (PLAYER)
        this.isOnGround     = isOnGround;             //Valor que determina si estamos en contacto con el suelo (Negativo)
    }
}


//Class para el tiempo
class Time
{
    constructor(value, timeChange, timeChangeValue)
    {
        this.value             = value;                     //Valor del tiempo
        this.timeChange        = timeChange;                //Temporizador para cambiar valor
        this.timeChangeValue   = timeChangeValue;           //Tiempo para cambiar valor
        
    }
}




