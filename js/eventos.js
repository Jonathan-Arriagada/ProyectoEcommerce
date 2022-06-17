// <------------------------ Storage ------------------------>

function capturarStorage(){
    return JSON.parse(localStorage.getItem("carrito")) || []

}

function guardarStorage(array){
    localStorage.setItem("carrito", JSON.stringify(array))
}

// <------------------------ Funcion para agregar productos en el carrito ------------------------>

function agregar(idParam){
    let carrito = capturarStorage()
    if(productoEnCarrito(idParam)){
        incrementarCantidad(idParam)
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2000
            }).showToast();
    }else{
    let productoEncontrado = dataProductos.find(producto=>producto.id==idParam)
    carrito.push({...productoEncontrado, cantidad:1 })
    guardarStorage(carrito)
    mostrarCarrito()
    Toastify({
        text: "Producto agregado al carrito",
        duration: 1000
        }).showToast();
    }
    totalProductos()
}

// <------------------------ Funcion para incrementar cantidad ------------------------>

function incrementarCantidad(id){
    let carrito = capturarStorage()
    const indice = carrito.findIndex(producto=>producto.id==id)
    carrito[indice].cantidad++
    guardarStorage(carrito)
    mostrarCarrito()
}                

// <------------------------ Funcion para eliminar productos del carrito ------------------------>

function eliminarCarrito(id){
    let carrito = capturarStorage()
    let resultado = carrito.filter(producto=> producto.id !=id)
    guardarStorage(resultado)
    mostrarCarrito()
    totalProductos()
}

function productoEnCarrito(id){
    let carrito=capturarStorage()
    return carrito.some(producto=>producto.id==id)
}

// <------------------------ Funcion para ver el total de la compra ------------------------>

function totalProductos(){
    let carrito=capturarStorage()
    let total = carrito.reduce(
        (acc, producto) => acc + producto.cantidad * producto.precio, 0
    )
   if (total != 0){
    totalCarrito.innerHTML = total
    botonFinalizar.addEventListener('click',() => { 
        Swal.fire({
            icon: 'success',
            title: '¡Compra Exitosa!',
            footer: '<b>Te esperamos en nuestro local para abonar y retirar.</b>'
        })
        localStorage.clear();
        mostrarCarrito();
        totalProductos();
    })
    }else {
        totalCarrito.innerHTML = total
        botonFinalizar.addEventListener('click',() => {
            Swal.fire({
                icon: 'error',
                title: 'Carrito vacio',
            })
    })
    }

}
// <------------------------ Vaciar carrito ------------------------>

botonVaciar.addEventListener('click', () => {
    Swal.fire({
        icon: 'error',
        title: 'Carrito vacio',
    })
    localStorage.clear();
    mostrarCarrito();
    totalProductos();
})