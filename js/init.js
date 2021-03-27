// Estudio ajedrez de aguacate

// Realizado por Alain Forton aka 'dead_pixel'
// Tuxtla MX, Marzo del 2021

/*inicio*/

(function (){

	//Variable idioma
	let idioma = {	inicio : ['Español','English','Русский'] };
	//elementos
	let idiomaSelect = document.createElement('div');
	let menu = document.createElement('div');
		
	//primer evento seleccion de idioma
	idiomaSelect.addEventListener('click', function(ev){
		//elimino elemento selec de idioma
		idiomaSelect.remove();		
		//instancio objeto idioma
		idioma = devuelveIdioma(ev.target.id);
		//cambio title a idioma
		document.title = idioma.title;
		//div botones menu
		divCreador(idioma.menu, menu, testEstilo);
	});
	
	//segundo evento menu
	menu.addEventListener('click', function(ev){
	
		console.log('click menu');
		
	
	});
	
	//inicio
	divCreador(idioma.inicio, idiomaSelect, testEstilo);
	
})()











