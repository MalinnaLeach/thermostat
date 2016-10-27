$( document ).ready(function() {
  myThermo = new Thermostat();
  // var weather = "";

  var update = function() {
  $('#temperature').html(myThermo.temperature);
  $('#power-saving-mode').html(myThermo.psm);
  $('#status').html(myThermo.status());
};

  update();

    $.ajax({
      type:'GET',
      url:"http://api.openweathermap.org/data/2.5/weather?q=London&APPID=c2acf68f8c62606b5b06c3c51e245f19",
      data:"format=json",
      success:function(feed) {
          console.log((feed.main.temp - 273.15).toFixed());
          $('#temp').html((feed.main.temp - 273.15).toFixed() + " °C");
          $('#condition').html(feed.weather[0].description);
      },
      dataType:'jsonp'
    });

  $( "#up" ).click(function( event ) {
      myThermo.up();
      update();
  });
  $( "#down" ).click(function( event ) {
      myThermo.down();
      update();
  });
  $( "#tpsm" ).click(function( event ) {
    myThermo.togglePowerSavingMode();
    update();
  });
  $( "#reset" ).click(function( event ) {
    myThermo.reset();
    update();
  });
});
