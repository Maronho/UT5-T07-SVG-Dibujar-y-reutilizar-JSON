
var pelisData;
var selectedPeli;
var selectedHora;

var stringTitle;
var stringHora;

var butacasOcupadas;
var butacasSelected = [];

var precio = 10;

$(document).ready(function() {
  console.log( "ready!" );
  loadMovieData();

  $(function(){
    var pelisJson = 'ocupados.json';
    $.getJSON( pelisJson, {
    }).done(function( response ) {
      createScreen(response);
    });
  });
});

function loadMovieData(){
   stringTitle = localStorage.getItem("selectedPeli");
   stringHora = localStorage.getItem("selectedSesion");
}

function createScreen(response){

    console.log(response);
    butacasOcupadas = response.lista;

  for (var i = 1; i < 51; i++) {
     let stringActual = '#'+i;
     let act = $(stringActual);

     let ocupado =false;

     for (var j = 0; j < butacasOcupadas.length ; j++) {
       if(i == butacasOcupadas[j]){
         act.removeClass("asiento");
         act.addClass("asiento-ocupado");
         ocupado=true;
       }
     }
      if (!ocupado){
        act.click(function() {
          let butacaNumber = act[0].id;
          let found =false;

          if(butacasSelected.length == 0){
            act.removeClass("asiento");
            act.addClass("asiento-seleccionado");
            butacasSelected.push(butacaNumber);
          }
          else{
            for (var z = 0; z < butacasSelected.length ; z++) {
              if(butacaNumber == butacasSelected[z]){
                act.removeClass("asiento-seleccionado");
                act.addClass("asiento");
                butacasSelected.splice(z,1);
                found=true;
              }
            }
          }

          if(!found){
            act.removeClass("asiento");
            act.addClass("asiento-seleccionado");
            butacasSelected.push(butacaNumber);
          }
          calcularPrecio();
        })
      }
  }

}

function calcularPrecio(){
  let prize = (butacasSelected.length -1)*precio;
  $('#nAsientos').text(butacasSelected.length -1);
  $('#precio').text(prize+" Euros");
}

function GoPeli(){
  localStorage.setItem("selectedButacas",butacasSelected.length -1);
  localStorage.setItem("precio",(butacasSelected.length -1)*precio);
  window.location.href ='../pago/pago.html';
}
function Atras(){
  window.location.href ='../Inicio.html';
}
