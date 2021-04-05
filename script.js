var settings = {
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {                                     //Retrieving Global Data
    console.log(response.Global.TotalConfirmed);   //TESTING (TO BE REMOVED)
    
    $("#total-cases-value").append(response.Global.TotalConfirmed);
    $("#new-cases-value").append(response.Global.NewConfirmed);
    $("#death-value").append(response.Global.TotalDeaths);
    $("#total-recovered-value").append(response.Global.TotalRecovered);
    $("#new-recovered-value").append(response.Global.NewRecovered);
    $("#new-death-value").append(response.Global.NewDeaths);
  });


  var country1 = {
    "url": "https://api.covid19api.com/live/country/malaysia",           //Retrieving Malaysia Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(country1).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-malaysia").append(response[response.length-1].Recovered);
    // $("#total-cases-malaysia").append(response[response.length-1].Confirmed);
    $("#total-deaths-malaysia").append(response[response.length-1].Deaths);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed;     //IMPLEMENT NEW CASES STATISTIC
    console.log(new_cases);
    $("#active-cases-malaysia").append(active_cases);
    $("#new-cases-malaysia").append(new_cases);
  }); 

  var country2 = {
    "url": "https://api.covid19api.com/live/country/singapore",           //Retrieving Singapore Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(country2).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-singapore").append(response[response.length-1].Recovered);
    $("#total-cases-singapore").append(response[response.length-1].Confirmed);
    $("#total-deaths-singapore").append(response[response.length-1].Deaths);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    $("#active-cases-singapore").append(active_cases);
  });

  var country3 = {
    "url": "https://api.covid19api.com/live/country/indonesia",           //Retrieving Indonesia Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(country3).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-indonesia").append(response[response.length-1].Recovered);
    $("#total-cases-indonesia").append(response[response.length-1].Confirmed);
    $("#total-deaths-indonesia").append(response[response.length-1].Deaths);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    $("#active-cases-indonesia").append(active_cases);
  });

  var country4 = {
    "url": "https://api.covid19api.com/live/country/israel",           //Retrieving Israel Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(country4).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-israel").append(response[response.length-1].Recovered);
    $("#total-cases-israel").append(response[response.length-1].Confirmed);
    $("#total-deaths-israel").append(response[response.length-1].Deaths);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    $("#active-cases-israel").append(active_cases);
  });