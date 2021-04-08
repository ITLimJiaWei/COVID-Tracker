
var currentDateTime = new Date();
console.log(currentDateTime.getDate())
currentDateTime.setDate(currentDateTime.getDate()-1)
console.log(currentDateTime.getDate())
var currentDateTimeMinusOneISO = currentDateTime.toISOString();
// console.log(currentDateTimeMinusOneISO);
//Tue Apr 06 2021 22:38:53 GMT+0800 (Singapore Standard Time)

// var currentDateTimeMinusOneISO = currentDateTimeMinusOne.toISOString();

$(document).ready(function () {

  var currentDate = new Date();
  var ISOcurrentDate = currentDate.toISOString();
  

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
    "url": "https://api.covid19api.com/live/country/singapore/status/confirmed/date/" + currentDateTimeMinusOne,           //Retrieving Singapore Data
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
    "url": "https://api.covid19api.com/live/country/indonesia/status/confirmed/date/" + currentDateTimeMinusOne,           //Retrieving Indonesia Data
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
    "url": "https://api.covid19api.com/live/country/israel/status/confirmed/date/" + currentDateTimeMinusOne,           //Retrieving Israel Data
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
      "url": "https://api.covid19api.com/live/country/" + countryName + "/status/confirmed/date/" + currentDateTimeMinusOne,           //Retrieving countrySearch Name data
      "method": "GET",
      "timeout": 0,
      

    };
    
    $.ajax(countrySearch).done(function (response) {
      // console.log(response[response.length-1].Recovered);  //TESTING (TO BE REMOVED)
      var i;
      var currentDateObj = new Date();
      var currentDateMinusOneObj = new Date();
      var totalNewCases = 0;
      var totalNewCasesMinusOne = 0;
      var totalCasesMinusOne = 0;
      var totalDeathsMinusOne = 0;
      var totalCases = 0;
      var totalDeaths = 0;
      currentDateMinusOneObj.setDate(currentDateMinusOneObj.getDate()-1)
      currentDateMinusOneObj.setHours(8,0,0,0);
      currentDateObj.setHours(8,0,0,0);
      for (i = 0 ; i <response.length; i++) {
        
        ISOdate = new Date(response[i].Date);
        year = ISOdate.getFullYear();
        month = ISOdate.getMonth()+1;
        dt = ISOdate.getDate();  
        dtMinusOne = ISOdate.getDate()-1; 
        if (dt < 10) {
          dt = '0' +  dt;
        }
  
        if (dtMinusOne < 10) {
          dtMinusOne = '0' +  dtMinusOne;
        }
        if (month < 10) {
          month = '0' + month;
        }
  
        countrySearchDate = year+'-'+month+'-'+dt;
        countrySearchDateMinusOne = year+'-'+month+'-'+dtMinusOne;
        var countrySearchDateObj = new Date(countrySearchDate);
        if (countrySearchDateObj.toString()===currentDateObj.toString() ) {
          totalCases += response[i].Confirmed;
          totalDeaths += response[i].Deaths;
        } 
        else {

        }
        
        if (countrySearchDateObj.toString()===currentDateMinusOneObj.toString()) {
          totalCasesMinusOne += response[i].Confirmed; 
          totalDeathsMinusOne += response[i].Deaths;
        }
        else {
          
        }
        
      }

      var newCases = totalCases - totalCasesMinusOne;
      var newDeaths = totalDeaths - totalDeathsMinusOne;
  

      $("#country-search-name").empty();                 //Note (Add loading animation)
      $("#country-search-name").append(response[response.length-1].Country.toUpperCase())     
      $("#country-search-flag").empty();
      $("#country-search-flag").append("<img src='https://www.countryflags.io/"+ response[0].CountryCode.toLowerCase()  + "/flat/64.png'>")
      $("#country-search-new-cases").empty();
      $("#country-search-new-cases").append("+"+newCases);
      $("#country-search-cases").empty();
      $("#country-search-cases").append(totalCases);
      $("#country-search-fatality-rate").empty();
      $("#country-search-fatality-rate").append((totalDeaths/totalCases).toFixed(3) + "%");
      $("#country-search-death").empty();
      $("#country-search-death").append(newDeaths);
      $("#country-search-total-deaths").empty();
      $("#country-search-total-deaths").append(totalDeaths);
      
    });
    // 2021-04-07T00:00:00Z

  }

  const form = document.getElementById('search-form');
  form.addEventListener('submit',countrySearch)

});


