# TerceraPreEntregaPracticaIntegradora

Se modifica la capa de persistencia para usar un DAO y DTO, mejor implementado para la logica de user, se realiza un middleware 
para crear un sistema de autorizacion para delimitar los endpoints para que el admin solo pueda crear, actualiar y eliminar productos, 
tambien para que solo el usuario pueda enviar mensajes al chat y que sea el unico que pueda agregar productos al carrito, de igual forma,
se crea un modelo ticket, el cual cuenta con la estructura definida, Id (autogenerado por mongo) code: String debe autogenerarse y 
ser único purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra, amount: Number, total de la 
compra.purchaser: String, contendrá el correo del usuario asociado al carrito, se crea la ruta /id/purchase para ayudar con el proceso 
de compra, en donde se valida el stock de los productos que se van a comprar y si el ususario desea continuar, comprar los que tienen el 
stock y dejar en el carrito los que no tienen stock, de igual manera, se actualiza el stock al completar el proceso de compra.

Se reesctructura el proyecto para que este construido por capas, ahora cuenta con las capas routing, controller, dao y
views, cada uno con las responsabilidades delegadas, de igual manera, se crea el archivo config y por medio del uso de dotenv,
permite trabajar bajo variables de entorno desde este archivo, se deja el archivo .env en el repo por practicidad pero se entiende
que no debe de ir ya que tiene información sensible.

Se ajusta el modelo de user, añadiendo a los campos que ya se tenian, el campo de cart, el cual contiene un id con referencia a carts, 
creando las opciones en la interfaz de products para poder añadir el producto al cart del usuario, tambien se añade boton que redirige al cart,
de igual manera, y se aclara que el sistema de login de ususario se trabaja a partir de session y no con jwt, se agrega a la vista 
las opciones que faltaban para filtrar desde el lado del cliente el limit o cantidad de productos por pagina, si se quiere ordenar o 
si se quiere buscar por un producto en especifico.


Se refactoriza la logica de login, ahora cuenta con hasheo de contraseña utilizando bcrypt, 
de igual forma, se implementa passport, passport-local para el login y register del aplicativo, y se añade la opcion de registro e 
inicio de sesión rapida con github (passport-github2)

---------------------------
Se agregan las vistas de login y registro de usuarios, en el cual se trabaja con sessions y mongo, 
para persistir las sesiones de los ususarios, de igual manera, se hace la respectiva redireccion de las vistas de login a register,
register a login y login a products en donde se visualiza un mensaje con el usuario logueado, del mismo modo, se creo una card 
en la vista products donde aparece el nombre, rol y correo electronico del ususario que inicio sesion, tambien, 
se creo el boton de cerrar sesion, el cual apartir de destroy, cierra sesion del ususario, y se agrega el sistema de roles,
en especial el correo adminCoder en donde si se intenta iniciar sesion con ese correo, se valida por codigo y se trata de un rol 
super admin el cual no vive en la base de datos, el resto de operaciones para productos y cart se mantienen funcionales 

En la ruta raiz "/" se dejo el login 
de igual forma, get("/login) 
y register ("/register")


----------- 
Uso de bd mongo atlas con colecciones 
  carts: 
    get - http://localhost:8080/api/carts/ -> traera toda la lista de carritos 
    post - http://localhost:8080/api/carts -> agregara un carrito a la coleccion
    put - http://localhost:8080/api/carts/idCarrito/product/idProduct -> modificara el carrito y si el producto ya existe sumara uno
                                example: 649bc54f1f5f6b1c9f3fa619/papas/3
    delete - http://localhost:8080/api/carts/idCarrito - se eliminara el carrito por el id
  products:
    get - http://localhost:8080/api/products -> traera toda la lista de productos 
    post - http://localhost:8080/api/products -> agregara un producto a la coleccion por body
            {"title":"agua","description":"bebida","price":2.66,"thumbnail":"ruta2.png","code":"bebidas#543","stock":33,"id":2}
    put -http://localhost:8080/api/products/id -> modificara el producto por id enviandolo por  body exmpId:649badf39bbbdc87450ff4e1
      example:{"title": "agua","description": "bebida","price": "4.66","thumbnail": "rutaagua.png", "code": "bebidas#543", "stock": "20"}
    delete - http://localhost:8080/api/carts/idProduct - se eliminara el carrito por el id

    messages: http://localhost:8080/api/chat/ - post - enviando user y message por body  y  get - render de chat con handlebars
      http://localhost:8080/api/chat/messages - get para obtener la lista de mensajes
