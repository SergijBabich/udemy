
 let tab = document.querySelectorAll('.info-header-tab');
 let indo = document.querySelector('.info-header');
 let tabContent= document.querySelectorAll('.info-tabcontent');
let cirkle =  document.querySelector('.slider-dots');
 let cirkleBtn = document.querySelectorAll('.dot');
  let sliderItem = document.querySelectorAll('.slider-item');

 	function hideTab(a){
 		for( let i =a; i<tabContent.length; i++){
 				tabContent[i].classList.remove("show");
 				tabContent[i].classList.add("hide");
 					
 		}
 	}
 
 	hideTab(1);
	function showTab(b){
		if(tabContent[b].classList.contains('hide')){
 				tabContent[b].classList.remove("hide");
 				tabContent[b].classList.add("show");
 			 			
 			}	
		
 	 	}

 indo.addEventListener('click' , function(event){
 	let target = event.target;

 	if (target && target.classList.contains('info-header-tab')){
 		for( let i =0; i<tab.length; i++){
 			if( target == tab[i]){
 				hideTab(0);
 				showTab(i);
 				break;
 			}
 		}
 	}


// timer
 });



// timer
let deadline = "2019-10-08";

function getTimeRemaning(endtime){
	let t = Date.parse(endtime) - new Date(),
	second = Math.floor((t/1000) % 60),
	minute = Math.floor((t/1000/60) % 60),
	hours = Math.floor((t/(1000*60*60)));
   
	return {
		'total':t,
		'second' :second,
		'minute' : minute,
		'hours' : hours
	};
   }



function setClock(id,endtime){
	let timer = document.getElementById(id),
		hours = timer.querySelector(".hours"),
		minutes = timer.querySelector(".minutes"),
		seconds = timer.querySelector(".seconds"),
		timeInterval = setInterval(updateClock , 1000);

	function updateClock(){
			let t = getTimeRemaning(endtime);
		(t.hours < 10)?	hours.textContent ='0'+ t.hours:hours.textContent = t.hours;	
		
		(t.minute < 10)? minutes.textContent = '0'+ t.minute:minutes.textContent = t.minute; 
		
		(t.second < 10)? seconds.textContent ='0'+t.second:seconds.textContent = t.second;
	
		console.log(typeof(t.second));

		if(t.total <= 0){
			clearInterval(timeInterval);
			hours.textContent ='00';
			minutes.textContent = '00';
			seconds.textContent ='00';

		}
	}		


}

setClock('timer' , deadline);

// show and hide modal window!
let descriptionBtn = document.querySelector(".description-btn");
let overlayFade = document.querySelector(".overlay");
let popupClose = document.querySelector(".popup-close");

descriptionBtn.addEventListener('click' , function(){
	overlayFade.style.display = "block";
	this.classList.add("more-splash");
	document.body.style.overflow = "hidden";
});
popupClose.addEventListener("click", function(){
	overlayFade.style.display = "none";
	descriptionBtn.classList.add("more-splash");
	document.body.style.overflow = '';
});

let contain = {
	loading: 'Загрузка...',
	success: 'Cпасибо',
	failure: 'Что то пошло не так'
}

let form = document.querySelector(".main-form");
let popupFormInput = form.querySelector(".popup-form__input");
let createElement = document.createElement("div");
createElement.classList.add("status");
 // отправка данных с формы на сервер без перезагузки станицы используя промисы.
/* Работа промисов закручается в соеденении исполнчюей функции и функция получения,
 после преобразования
 нашиешо обьекта в формат JSON, мы создаем условие с двумя возвращаемыми собитиями,
  если все ок, смогли позклчиться к серверу, вызываем 
 функцию  success. если есть ошибка, функция error ,  так же есть 2 доп. функции.
  1 функция ожидания, и функция очистки инпута после отправки данных */
 /*
 On english
 This is send a data from form to server to use Promise
  we  can Use Promise what woult  send data from form to our server.
 The work our Primise this is connect a general function and function get, 
 after convert ouq object into fonmat JSON
 we create (if) and two getter submit, if  it is "ok" => call  function (success),
  else call  function (error). Same, we have a two child function.
  The finst function is weating, and function from crear our inut after send data. 

 */
form.addEventListener('submit', function(event){
	function modalSub(){
	return new Promise(function( resolve,reject){
			event.preventDefault();
	form.appendChild(createElement);
	let request = new XMLHttpRequest();
	request.open('POST', 'server.php');
	request.setRequestHeader('Content-type' , 'applicatoin/json; charset = utf-8');
	
	let formData = new FormData(form);
	let obj = {};

	formData.forEach(function(value, key){
		obj[key]= value;

	});
	console.log(obj);
	let json = JSON.stringify(obj);
	request.send(json);
	console.log(json);
	request.onload =  function(){
	(request.readyState == 4 && request.status ==200)? resolve(this.success): reject(this.error);
    
};
	});
}
	
	function clear(){

		for(let i =0; i < popupFormInput.length; i++ ){
			popupFormInput[i].value = ''; 
		}
		console.log("clear");
	}
function loadIng(){
	createElement.textContent = contain.loading;
	console.log("loading");
}
	modalSub()
	.then(success =>{
			createElement.textContent = contain.success;
			console.log(contain.success);
	})
	.then(loadIng())
	.then(clear())
	.catch( error=>{
		createElement.textContent = contain.failure;
	})

});
	
	

 let formContact = document.getElementById("form");
 let input = formContact.getElementsByTagName('input');
  let ansElem = document.createElement("div");
  ansElem.classList.add("status");

  formContact.addEventListener('submit', function(event){
  	event.preventDefault();
  	console.log(input);
  	formContact.appendChild(ansElem);
  	let request1 = new XMLHttpRequest();
  	request1.open( 'POST' , 'server.php');
  	request1.setRequestHeader('Content-type' , 'applicatoin/json; charset = utf-8');

  	let formData1 = new FormData(formContact);
console.log(formData1);
  	let obj1 = {};

  	formData1.forEach(function(value, key){
  		 obj1[key] = value; 

  	});
  	let jsonvb = JSON.stringify(obj1);
  	console.log(obj1);
  	request1.send(jsonvb);

  	request1.addEventListener('readystatechange' , function(){
  		if( request1.readyState < 4){
  			ansElem.textContent = contain.loading;

  		} else if( request1.readyState == 4 &&  request1.status ==200){
  			ansElem.textContent = contain.success;
  		} else {
  			ansElem.textContent = contain.failure;
  		}
  	});
  });


let slideIndex = 1;
let slides = document.querySelectorAll(".slider-item");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let sliderDots = document.querySelector(".slider-dots");
let dot = document.querySelectorAll(".dot");
 showSlides(slideIndex);
 function showSlides(n){

 	if(n> slides.length){
 		slideIndex =1;
 	}
 	if(n < 1){
 		slideIndex = slides.length;
 	}


 	//hide all slider elemts
 	slides.forEach((item)=> item.style.display = 'none');
 	dot.forEach((item) => item.classList.remove('dot-active'));
 	//show the first el. slider and add  a class active for  the 	first circle
 	slides[slideIndex -1].style.display = 'block';
 	dot[slideIndex -1].classList.add('dot-active');
 }
 function plusSlides(n){
 	showSlides(slideIndex +=n);
 }
  function currentSlides(n){
 	showSlides(slideIndex = n);
 }
 prev.addEventListener('click' , function(){
 	plusSlides(-1);
 });
 next.addEventListener('click' , function(){
 	plusSlides(1);
 });
 // add click on tho circle 
 sliderDots.addEventListener('click', function(event){
 	for( let i = 0; i < dot.length+1; i++){
 	if(event.target.classList.contains('dot') && event.target == dot[i-1]){
 		currentSlides(i);
 	}

 	}
 });

 let person  = document.querySelectorAll(".counter-block-input")[0],
 	 restDays  = document.querySelectorAll(".counter-block-input")[1],
 	 place = document.getElementById("select"),
  	 total = document.getElementById("total"),
  	 personSum = 0,
  	 days = 0, 
  	 totals = 0;
 	 total.innerHTML = 0;
 
 	person.addEventListener('change', function(){
 			personSum = +this.value;
 			totals = (days + personSum)* 4000 ;
  			if(person.value  ==''  )
 			{
 				total.innerHTML = 0;
 			}else{
 				total.innerHTML = totals;
 			}
 	});
 	restDays.addEventListener('change', function(){
 			days = +this.value;
 			totals = (days + personSum) * 4000;
 			
 			if(restDays.value  == '' )
 			{
 				total.innerHTML = 0;
 			}else{
 				total.innerHTML = totals;
 			}
 	});
 	place.addEventListener('change' , function(){
 		if(restDays.value == '' || person.value == ''  ){
 			total.innerHTML = 0;
 		} else{
 			let a  = totals;
 			total.innerHTML = a* this.options[this.selectedIndex].value;
 		}

 	});