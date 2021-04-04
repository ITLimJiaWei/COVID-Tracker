var settings = {
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response.Global.TotalConfirmed);   //TESTING
    
    $("#total-cases-value").append(response.Global.TotalConfirmed);
    $("#new-cases-value").append(response.Global.NewConfirmed);
    $("#death-value").append(response.Global.TotalDeaths);
  });




  