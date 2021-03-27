// Estudio ajedrez de aguacate

// Realizado por Alain Forton aka 'dead_pixel'
// Marzo del 2021 - V 1.8-TUXTLA

/*funciones*/

/*test*/

var testEstilo = {

	background : 'pink',
	border : '4px solid blue',
	padding : '10px',
	//left : '100px',
	//top : '20px',
	width : '100px',
	cursor: 'pointer'
}


	

/*fin test*/
	
//funcion devolver idioma seleccionado (int)=>(obj)
let devuelveIdioma = num => {
	//textos en 3 idiomas	
	const texto = [
		{ 	title : '♟️ Ajedrez de aguacate 🥑',
			menu : ['guia', 'juego', 'sobre mi'] },
		{ 	title : '♟️ Chess avocado 🥑',
			menu : ['guide', 'game', 'about'] },
		{ 	title : '♟️ Авокадо шахматы 🥑',
			menu : ['гид', 'игра', 'обо мне'] }
	];	
	//Devuelve obj idioma
	return texto[num];
};
//funcion crear elementos (obj.array, elem) => (append elems)	
let divCreador = (obj, elemento, stylo) => {
	//por cada elemento en array hace div correspondiente
	obj.forEach(function (str,i) {
		let divDinamico = document.createElement('div');
		divDinamico.innerText = str;
		divDinamico.id = i;
	 	Object.assign(divDinamico.style, stylo);
		elemento.appendChild(divDinamico);
	});
	//append elemento en document
	return document.body.appendChild(elemento);
}







