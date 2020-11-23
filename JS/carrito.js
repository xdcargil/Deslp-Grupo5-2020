//*El código de este JS está basado en el carrito de https://programadorwebvalencia.com/javascript-ejemplo-carrito-de-compra/*//
			 window.onload = function () {
					 // Variables
					 let productos = [
							 {
									 id: 1,
									 nombre: 'Ordenador acer',
									 precio: 800,
									 imagen: 'https://source.unsplash.com/random/500x500/?asus&sig=1'
							 },
							 {
									 id: 2,
									 nombre: 'Placa base',
									 precio: 400,
									 imagen: 'https://source.unsplash.com/random/500x500/?motherboard&sig=2'
							 },
							 {
									 id: 3,
									 nombre: 'Portatil',
									 precio: 300,
									 imagen: 'https://source.unsplash.com/random/500x500/?gaminglaptop&sig=3'
							 },
							 {
									 id: 4,
									 nombre: 'Teclado',
									 precio: 85,
									 imagen: 'https://source.unsplash.com/random/500x500/?gamingkeyboard&sig=4'
							 }
							 ,
							 {
									 id: 5,
									 nombre: 'Ratón',
									 precio: 85,
									 imagen: 'https://source.unsplash.com/random/500x500/?computermouse&sig=4'
							 }
							 ,
							 {
									 id: 6,
									 nombre: 'Procesador Intel i7',
									 precio: 85,
									 imagen: 'https://source.unsplash.com/random/500x500/?intel7&sig=4'
							 }

					 ]
					 let $items = document.querySelector('#items');
					 let carrito = [];
					 let total = 0;
					 let $carrito = document.querySelector('#carrito');
					 let $total = document.querySelector('#total');
					 let $botonVaciar = document.querySelector('#boton-vaciar');
					 function mostrarProductos() {
							 for (let info of productos) {
									 let miNodo = document.createElement('div');
									 miNodo.classList.add('card', 'col-sm-4');
									 let miNodoCardBody = document.createElement('div');
									 miNodoCardBody.classList.add('card-body');
									 let miNodoTitle = document.createElement('h5');
									 miNodoTitle.classList.add('card-title');
									 miNodoTitle.textContent = info['nombre'];
									 let miNodoImagen = document.createElement('img');
									 miNodoImagen.classList.add('img-fluid');
									 miNodoImagen.setAttribute('src', info['imagen']);
									 let miNodoPrecio = document.createElement('p');
									 miNodoPrecio.classList.add('card-text');
									 miNodoPrecio.textContent = info['precio'] + '€';
									 let miNodoBoton = document.createElement('button');
									 miNodoBoton.classList.add('btn', 'btn-primary');
									 miNodoBoton.textContent = '+';
									 miNodoBoton.setAttribute('marcador', info['id']);
									 miNodoBoton.addEventListener('click', addCarrito);
									 miNodoCardBody.appendChild(miNodoImagen);
									 miNodoCardBody.appendChild(miNodoTitle);
									 miNodoCardBody.appendChild(miNodoPrecio);
									 miNodoCardBody.appendChild(miNodoBoton);
									 miNodo.appendChild(miNodoCardBody);
									 $items.appendChild(miNodo);
							 }
					 }

					 function addCarrito () {
							 carrito.push(this.getAttribute('marcador'))
							 sumarTotal();
							 mostrarCarrito();
					 }

					 function mostrarCarrito() {
							 $carrito.textContent = '';
							 let carritoSinDuplicados = [...new Set(carrito)];
							 carritoSinDuplicados.forEach(function (item, indice) {
									 let miItem = productos.filter(function(itemBaseDatos) {
											 return itemBaseDatos['id'] == item;
									 });
									 let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
											 return itemId === item ? total += 1 : total;
									 }, 0);
									 let miNodo = document.createElement('li');
									 miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
									 miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - ${miItem[0]['precio']}€`;
									 let miBoton = document.createElement('button');
									 miBoton.classList.add('btn', 'btn-danger', 'mx-5');
									 miBoton.textContent = 'X';
									 miBoton.style.marginLeft = '1rem';
									 miBoton.setAttribute('item', item);
									 miBoton.addEventListener('click', borrarItemCarrito);
									 miNodo.appendChild(miBoton);
									 $carrito.appendChild(miNodo);
							 })
					 }
					 function borrarItemCarrito() {
							 console.log()
							 let id = this.getAttribute('item');
							 carrito = carrito.filter(function (carritoId) {
									 return carritoId !== id;
							 });
							 mostrarCarrito();
							 sumarTotal();
					 }
					 function sumarTotal() {
							 total = 0;
							 for (let item of carrito) {
									 let miItem = productos.filter(function(itemBaseDatos) {
											 return itemBaseDatos['id'] == item;
									 });
									 total = total + miItem[0]['precio'];
							 }
							 let totalDosDecimales = total.toFixed(2);
							 $total.textContent = totalDosDecimales;
					 }

					 function vaciarCarrito() {
							 carrito = [];
							 mostrarCarrito();
							 sumarTotal();
					 }

					 $botonVaciar.addEventListener('click', vaciarCarrito);
					 mostrarProductos();
			 }
