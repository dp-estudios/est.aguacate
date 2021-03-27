// Estudio ajedrez de aguacate

// Realizado por Alain Forton aka 'dead_pixel'
// Marzo del 2021 - V 1.8-TUXTLA

/*canvas*/



let cTitulo = document.createElement('canvas');
let cCuerpo = document.createElement('canvas');

let ctxTitulo = cTitulo.getContext('2d');	


		
let ctxCuerpo = cCuerpo.getContext('2d');

function mostrarCosas(){
		
	//posible funcion crea canvas en base tama;o 
	
	//function (id canvas, objeto con estilos, width y height )	
		
	const tituloStyle = {

		position : 'absolute',
		background : 'blue',
		border : '4px solid yellow',
		
		top : 0,
		left : 0,
		transform: 'translate(0, 0)'

	}
	
	console.log(window.innerHeight, tituloStyle.width, tituloStyle.height)
	
	const cuerpoStyle = {

		position : 'absolute',
		background : 'pink',
		border : '4px solid blue',
		top : '558px',
		left : 0
		//transform: 'translate(-50%, 0)'

	}

	Object.assign(cTitulo.style, tituloStyle);
	Object.assign(cCuerpo.style, cuerpoStyle);
	
	let quePex = window.innerWidth < 500;
	
	cTitulo.height = 500;
	cTitulo.width = window.innerWidth;
	
	cCuerpo.height = 500;
	cCuerpo.width = window.innerWidth;
	
	if(quePex) {ctxTitulo.scale(1,1)} else {ctxTitulo.scale(2,2)};
	
	contenedor.appendChild(cTitulo);
	contenedor.appendChild(cCuerpo);
}



function imagenes(){

	img = new Image();
	//img.crossOrigin = "Anonymous";
	
	console.log('antes del onload',cTitulo.width, cTitulo.height);	
	
	img.onload = function () { 
		
		//cTitulo.width = img.width;
  		//cTitulo.height = img.height;
		//cTitulo.width = this.naturalWidth;
		//cTitulo.height = this.naturalHeight;
		
		console.log(img.width,img.height, cTitulo.width, cTitulo.height);

		//ctxTitulo.msImageSmoothingEnabled = false;
		//ctxTitulo.webkitImageSmoothingEnabled = false;
		//ctxTitulo.imageSmoothingEnabled = false;
		
		ctxTitulo.globalCompositeOperation = 'overlay';// bueno pero aclara overlay	\\ darken bueno pero pierde pixels
		
		console.log('c w, p w, c-p/2',cTitulo.width, this.width, (cTitulo.width - this.width)/2 );
		let cordx = this.width/2;
		let cordXX = (cTitulo.width - this.width)/2 ;
		ctxTitulo.fillStyle = '#15754b';
		ctxTitulo.fillRect( cordx + 10, 10, 255,250);
		
		ctxTitulo.drawImage(img, cTitulo.width/2 - 700, 0, this.width/1.5, this.height/1.5);// this.width/2, this.height/2); 
		
		//100 * img.width / img.height, 100 * img.height / img.width);
		//, 200, 100);
		console.log('fuck');
	}
   
   img.src = 'img/instrucciones/fuck.png';//'fondoTest.png'  testDos.png;//titledos

}






// que quiero, entrar luego 	

function animaContenido(){
		
		
}




























