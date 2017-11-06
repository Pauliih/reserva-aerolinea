/*
Tip. | Representación usando Arrays]

1. Usa un arreglo unidimensional del tipo booleano para represenar la tabla de asientos del avión. 
Inicializa todos los elementos del arreglo con -false- para indicar que todos los asientos están vacíos. 

2. A medida que se asigne cada asiento, establezca el elemento correspondiente del arreglo en true para 
indicar que ese asiento ya no está disponible.

3. Tu aplicación nunca deberá asignar un asiento que ya haya sido asignado. Cuando esté llena la sección 
económica o primera clase, tu programa deberá preguntar a la persona si acepta ser colocada en la sección 
de primera clase (y viceversa).

4. Si la persona acepta, haga la asignación de asiento apropiada.  Si no, debe imprimir el mensaje “El 
próximo vuelo sale en 3 horas”.
*/


var airlineSeats = [false,false,false,false,false,false,false,false,false,false]; // declaro un array que representa los 
																				//asientos disponibles=false; || no disponible=true;
var busySeats = 0; // declaro una variable para guardar los asientos ocupados.

function paintSeats (array){
	var containerSeats = document.getElementById("seats");

	for (var i = 0; i < array.length; i++) {
		var seat = document.createElement("div");
		seat.className = "seats";
		//seats.style.background = "#343D46";

		// del 1 al 4 (índice 0 al 3), en el arreglo es primera clasey se pinta de color oro.
		if (i<4) {
			seat.style.background = "#FD7521";
		}
		else{		// del índice 4 en adelante, el arreglo es clase económica, y se pintan de verde.
			seat.style.background = "#A6E22E";
		}
		containerSeats.appendChild(seat);
	}
}

//Función que se le agrega un evento al hacer click en el botón para volver a hacer una reservación 
//eligiendo desde en qué clase prefiere viajar.
function reserve (){
	var btn = document.getElementById("btn-seats");
	btn.addEventListener('click', chooseZone);
}

// Hace la pregunta de en qué clase prefiere viajar
function chooseZone(){
	var choice = prompt("Ingresa la opción de la clase en que prefieres viajar: \n 1.Primera \n 2.Económica");


	if (choice == 1) {
		checkFirstClassZone();
	} else if (choice == 2){
		checkEconomicClassZone();
	} else{
		alert("Por favor ingresa un número válido");
	}
}


//función para reservar asiento en primera clase
function checkFirstClassZone(){
	var zone = 'Primera Clase';
	for (var i = 0; i < 4; i++) {
		if (airlineSeats[i] == false) {		//Verificar si los asientos estan disponibles

			airlineSeats[i] = true;	// Reservamos el asiento
			reserveSeats(i); //Funcion que marca como ocupado el asiento
			paintTicket(i,zone);
			break; // Al reservar el asiento no necesitamos seguir recorriendo el arreglo, así que lo rompemos con un break
		} else if(i == 3 && airlineSeats[i]== true){ // verificamos si estan los 4 asientos ocupados
			reasignEconomicClassZone(zone); //Reasignamos a clase económica
		}
	}
}

//función para reservar asiento en clase económica
function checkEconomicClassZone(){
	var zone = ' Clase Económica';
	for (var i = 4; i < 10 ; i++) {
		if (airlineSeats[i] == false) {

			airlineSeats[i] = true;
			reserveSeats(i);
			paintTicket(i,zone);
			break;
		} else if(i == 9 && airlineSeats[i]== true){ // verificamos si estan los 6 asientos ocupados
			reasignFirstClassZone(zone); //Reasignamos a primera clase
		}
	}
}

//funcion para reasignar a clase económica
function reasignEconomicClassZone(zone){
	var reasign = confirm("Ya no quedan asientos en " + zone + " :c \n ¿Quieres reservar en la zona económica?");

	if(reasign == true){
		checkEconomicClassZone();
	} else{
		nextFlight();
	}
}

function reasignFirstClassZone(zone){
	var reasign = confirm("Ya no quedan asientos en " + zone + " :c \n ¿Quieres reservar en la zona de primera clase?");

	if(reasign == true){
		checkFirstClassZone();
	} else{
		nextFlight();
	}
}	

function nextFlight(){
	alert("El proximo vuelo sale en 3 horas. :)")
}

//Función para marcar asientos reservados
function reserveSeats(indexToPaint){
	var seat = document.getElementsByClassName('seats');
	seat[indexToPaint].textContent = "Ocupado";
}

function paintTicket(i,zone){
	var containerTickets = document.getElementById('ticket'); //Llamamos a  section ticket del DOM
	var ticket = document.createElement('div'); // Creamos el elemento div
	ticket.className = 'seats';
	var title = document.createElement('p');
	var reservedSeating = document.createElement('p');
	var zoneClass = document.createElement('p');
	title.textContent = "Pase de Abordar";
	reservedSeating.textContent = "N° de Asiento:" + (i +1);
	zoneClass.textContent = zone;
	ticket.appendChild(title);
	ticket.appendChild(reservedSeating);
	ticket.appendChild(zoneClass);
	containerTickets.appendChild(ticket);
}

paintSeats(airlineSeats);
reserve();
chooseZone();