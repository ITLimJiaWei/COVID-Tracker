
$(document).ready(function () {
  var settings = {
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {                                     //Retrieving Global Data  
    $("#total-cases-value").append(response.Global.TotalConfirmed);
    $("#new-cases-value").append("+"+response.Global.NewConfirmed);
    $("#death-value").append(response.Global.TotalDeaths);
    $("#total-recovered-value").append(response.Global.TotalRecovered);
    $("#new-recovered-value").append("+"+response.Global.NewRecovered);
    $("#new-death-value").append("+"+response.Global.NewDeaths);
  });


  var malaysia = {
    "url": "https://api.covid19api.com/live/country/malaysia",           //Retrieving Malaysia Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(malaysia).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-malaysia").append(response[response.length-1].Recovered);
    $("#total-deaths-malaysia").append(response[response.length-1].Deaths);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed;     
    $("#confirmed-cases-malaysia").append(response[response.length-1].Confirmed)
    $("#active-cases-malaysia").append(active_cases);
    $("#new-cases-malaysia").append("+"+new_cases);
  }); 

  var singapore = {
    "url": "https://api.covid19api.com/live/country/singapore",           //Retrieving Singapore Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(singapore).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-singapore").append(response[response.length-1].Recovered);
    $("#total-cases-singapore").append(response[response.length-1].Confirmed);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed; 
    $("#new-cases-singapore").append("+"+new_cases);
    $("#total-deaths-singapore").append(response[response.length-1].Deaths);
    $("#active-cases-singapore").append(active_cases);
  });

  var indonesia = {
    "url": "https://api.covid19api.com/live/country/indonesia",           //Retrieving Indonesia Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(indonesia).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-indonesia").append(response[response.length-1].Recovered);
    $("#total-cases-indonesia").append(response[response.length-1].Confirmed);
    $("#total-deaths-indonesia").append(response[response.length-1].Deaths);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed; 
    $("#new-cases-indonesia").append("+"+new_cases);
    $("#active-cases-indonesia").append(active_cases);
  });

  var israel = {
    "url": "https://api.covid19api.com/live/country/israel",           //Retrieving Israel Data
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(israel).done(function (response) {
    console.log(response);                        //TESTING (TO BE REMOVED)
    $("#recovered-cases-israel").append(response[response.length-1].Recovered);
    $("#total-cases-israel").append(response[response.length-1].Confirmed);
    $("#total-deaths-israel").append(response[response.length-1].Deaths);
    var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
    var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed; 
    $("#new-cases-israel").append("+"+new_cases);
    $("#active-cases-israel").append(active_cases);
  });

  function countrySearch(e) {
    e.preventDefault();
    var countryName = $("#country-input").val();
    console.log(countryName)                    //TESTING (TO BE REMOVED)
    var countrySearch = {
      "url": "https://api.covid19api.com/live/country/" + countryName,           //Retrieving Israel Data
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(countrySearch).done(function (response) {
      console.log(response[response.length-1].Recovered);  //TESTING (TO BE REMOVED)   
      $("#country-search-name").empty();                 //Note (Add loading animation)
      $("#country-search-name").append(response[response.length-1].Country.toUpperCase())     
      $("#country-search-flag").empty();
      $("#country-search-flag").append("<img src='https://www.countryflags.io/"+ response[0].CountryCode.toLowerCase()  + "/flat/64.png'>")
    });


  }

  const form = document.getElementById('search-form');
  form.addEventListener('submit',countrySearch)

});


