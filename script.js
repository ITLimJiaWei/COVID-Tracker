

$(document).ready(function () {



  //Used for 4 main country statistics  (Idea to randomize the statistics)
  var currentDateTime = new Date();
  currentDateTime.setDate(currentDateTime.getDate()-3)
  var currentDateTimeMinusOneISO = currentDateTime.toISOString();
  var countryArray = new Array();    
  var country2 = "";


  //Used for CountrySearch Feature
  var currentDate = new Date();
  var ISOcurrentDate = currentDate.toISOString();
  var i;
  var currentDateObj = new Date();
  var currentDateMinusOneObj = new Date();
  var totalNewCases = 0;
  var totalNewCasesMinusOne = 0;
  var totalCasesMinusOne = 0;
  var totalDeathsMinusOne = 0;
  var totalCases = 0;
  var totalDeaths = 0;
  currentDateMinusOneObj.setDate(currentDateMinusOneObj.getDate()-2)
  currentDateObj.setDate(currentDateObj.getDate()-1)
  currentDateMinusOneObj.setHours(8,0,0,0);
  currentDateObj.setHours(8,0,0,0);

  //Used for CountrySearch Chart
  var MinusFourMonthsDate = new Date();
  MinusFourMonthsDate.setMonth(MinusFourMonthsDate.getMonth()-4);
  var ISOMinusFourMonthsDate = MinusFourMonthsDate.toISOString();

 

  var summary = {
    "url": "https://api.covid19api.com/summary",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(summary).done(function (response) {                                     //Retrieving Global Data  
    $("#total-cases-value").append(response.Global.TotalConfirmed);
    $("#new-cases-value").append("+"+response.Global.NewConfirmed);
    $("#death-value").append(response.Global.TotalDeaths);
    $("#total-recovered-value").append(response.Global.TotalRecovered);
    $("#new-recovered-value").append("+"+response.Global.NewRecovered);
    $("#new-death-value").append("+"+response.Global.NewDeaths);
  });


  var countries = {
    "url": "https://api.covid19api.com/countries",
    "method": "GET",
    "timeout": 0,
  };

  
  
  $.ajax(countries).done(function (response) {
    var counter1 = Math.floor(Math.random() * response.length);
    var counter2 = Math.floor(Math.random() * response.length);
    var counter3 = Math.floor(Math.random() * response.length);
    var counter4 = Math.floor(Math.random() * response.length);
    country1 = response[counter1].Country;
    country2 = response[counter2].Country;
    country3 = response[counter3].Country;
    country4 = response[counter4].Country;
    countryArray.push(response[counter1].ISO2);
    countryArray.push(response[counter2].ISO2);
    countryArray.push(response[counter3].ISO2);
    countryArray.push(response[counter4].ISO2);
    $("#country-random1").append(country1);
    $("#country-random2").append(country2);
    $("#country-random3").append(country3);
    $("#country-random4").append(country4);

    console.log(response[counter1].ISO2);
    $("#country-flag1").append("<img src='https://www.countryflags.io/"+ response[counter1].ISO2  + "/flat/64.png'>")
    $("#country-flag2").append("<img src='https://www.countryflags.io/"+ response[counter2].ISO2  + "/flat/64.png'>")
    $("#country-flag3").append("<img src='https://www.countryflags.io/"+ response[counter3].ISO2  + "/flat/64.png'>")
    $("#country-flag4").append("<img src='https://www.countryflags.io/"+ response[counter4].ISO2  + "/flat/64.png'>")



    console.log(countryArray);

    var countryRandom1 = {
      "url": "https://api.covid19api.com/live/country/"+ countryArray[0] +"/status/confirmed/date/" + currentDateTimeMinusOneISO,       
      "method": "GET",
      "timeout": 0,
    };

    $.ajax(countryRandom1).done(function (response) {
      console.log(response[0].Province);
      if (response[0].Province === "") {
        $("#recovered-cases-country1").append(response[response.length-1].Recovered);
        $("#total-deaths-country1").append(response[response.length-1].Deaths);
        var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
        var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed;     
        $("#confirmed-cases-country1").append(response[response.length-1].Confirmed)
        $("#active-cases-country1").append(active_cases);
        $("#new-cases-country1").append("+"+new_cases);
      }
      else {
        console.log("PROVINCE PRESENT");
      }

      
    });  


    var countryRandom2 = {
      "url": "https://api.covid19api.com/live/country/"+ countryArray[1] +"/status/confirmed/date/" + currentDateTimeMinusOneISO,           
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(countryRandom2).done(function (response) {

      if (!response[0].Province) {

        $("#recovered-cases-country2").append(response[response.length-1].Recovered);
        $("#total-cases-country2").append(response[response.length-1].Confirmed);
        var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
        var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed; 
        $("#new-cases-country2").append("+"+new_cases);
        $("#total-deaths-country2").append(response[response.length-1].Deaths);
        $("#active-cases-country2").append(active_cases);
      }

      else {
        console.log("PROVINCE PRESENT")
        // var provinceCountries = {
        //   "url": "https://api.covid19api.com/total/country/us/status/confirmed",
        //   "method": "GET",
        //   "timeout": 0,
        // };
        
        // $.ajax(provinceCountries).done(function (response) {
        
        //   $("#recovered-cases-country2").append(response[response.length-1].Recovered);
        //   $("#total-cases-country2").append(response[response.length-1].Confirmed);
        //   var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
        //   var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed; 
        //   $("#new-cases-country2").append("+"+new_cases);
        //   $("#total-deaths-country2").append(response[response.length-1].Deaths);
        //   $("#active-cases-country2").append(active_cases);


        // });    
        
      }
    });

    var countryRandom3 = {
      "url": "https://api.covid19api.com/live/country/"+ countryArray[2] +"/status/confirmed/date/" + currentDateTimeMinusOneISO,           //Retrieving Indonesia Data
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(countryRandom3).done(function (response) {

      if (!response[0].Province) {
        $("#recovered-cases-country3").append(response[response.length-1].Recovered);
        $("#total-cases-country3").append(response[response.length-1].Confirmed);
        $("#total-deaths-country3").append(response[response.length-1].Deaths);
        var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
        var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed; 
        $("#new-cases-country3").append("+"+new_cases);
        $("#active-cases-country3").append(active_cases);
      }
      else {
        console.log("PROVINCE PRESENT")
      }
    });

    var countryRandom4 = {
      "url": "https://api.covid19api.com/live/country/"+ countryArray[3] +"/status/confirmed/date/" + currentDateTimeMinusOneISO,           //Retrieving Israel Data
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(countryRandom4).done(function (response) {

      if (response[0].Province === "") {
        $("#recovered-cases-country4").append(response[response.length-1].Recovered);
        $("#total-cases-country4").append(response[response.length-1].Confirmed);
        $("#total-deaths-country4").append(response[response.length-1].Deaths);
        var active_cases = response[response.length-1].Confirmed-response[response.length-1].Recovered;
        var new_cases = response[response.length-1].Confirmed-response[response.length-2].Confirmed; 
        $("#new-cases-country4").append("+"+new_cases);
        $("#active-cases-country4").append(active_cases);
       }
      else {
        console.log("PROVINCE PRESENT")
       }
      
      
    });
    
  });
  

  
  
  
  

  
  


  

  
  
  

  

  

  function countrySearch(e) {
    e.preventDefault();
    var countryName = $("#country-input").val();
    
    
    var countrySearch = {
      "url": "https://api.covid19api.com/live/country/" + countryName + "/status/confirmed/date/" + currentDateTimeMinusOneISO,           //Retrieving countrySearch Name data
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(countrySearch).done(function (response) {
      

          

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
          console.log(totalCases);
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
      

      $("#country-search-name").empty();                                                      //Note (Add loading animation)
      $("#country-search-name").append(response[response.length-1].Country.toUpperCase())     
      $("#country-search-flag").empty();
      $("#country-search-flag").append("<img src='https://www.countryflags.io/"+ response[0].CountryCode.toLowerCase()  + "/flat/64.png'>")
      $("#country-search-new-cases").empty();
      $("#country-search-new-cases").append("+"+newCases);
      $("#country-search-cases").empty();
      $("#country-search-cases").append(totalCases);
      $("#country-search-fatality-rate").empty();
      $("#country-search-fatality-rate").append((totalDeaths/totalCases).toFixed(4) + "%");
      $("#country-search-death").empty();
      $("#country-search-death").append(newDeaths);
      $("#country-search-total-deaths").empty();
      $("#country-search-total-deaths").append(totalDeaths);
      
    });
    // 2021-04-07T00:00:00Z

  }

  function countrySearchChart(e) {
    e.preventDefault();
    $("#myChart-div").empty();
    $("#myChart-div").append('<canvas class="chart" id="myChart2" width="400" height="200"></canvas>');
    var countryName = $("#country-input").val();
    
    
    var countrySearchChart = {
      "url": "https://api.covid19api.com/total/country/"+ countryName + "/status/confirmed",     //Retrieving countrySearch Name data
      "method": "GET",
      "timeout": 0,
      //?from=" + ISOMinusFourMonthsDate + "&to=" + ISOcurrentDate
    };  
    
    $.ajax(countrySearchChart).done(function (response) {
      console.log(response)     
    var labelArray = new Array();     
    var dataArray = new Array();                                          //countrySearchChart Function (Note: Add in US,UK etc functionality!!!!)
    
      



    for (i = 1 ; i < response.length; i++) {
      var ctx2 = $('#myChart2');
      
      ISOdate = new Date(response[i].Date);  //Converting ISO to Date Object
      year = ISOdate.getFullYear();
      month = ISOdate.getMonth()+1;
      dt = ISOdate.getDate();  
      if (dt < 10) {
        dt = '0' +  dt;
      }

      if (month < 10) {
        month = '0' + month;
      }
      
      stringDate = dt + "/" + month + "/" + year ;
      labelArray.push(stringDate);

      if (response[i].Cases >= response[i-1].Cases ) {
        dataArray.push(response[i].Cases-response[i-1].Cases);  
      }
      else {
        dataArray.push(response[i-1].Cases-response[i-2].Cases);
      }
      
    }

    var myChart = new Chart(ctx2, {

      type: 'bar',
      data: {

        labels: labelArray,
        datasets: [{
            label: '# of New Cases',      
            data: dataArray,
            backgroundColor: [
                'rgb(0, 160, 160)'
            ],
            borderColor: [
                'rgb(0, 160, 160)'
            ],
            borderWidth: 0
        }]
    },
    options: {
      scales: {
          y: {
              beginAtZero: true

            }
          }
        }
      });



    });


  }

    



  const form = document.getElementById('search-form');      //Functionality for CountrySearch SearchBar
  form.addEventListener('submit',countrySearch);
  form.addEventListener('submit',countrySearchChart);


  // Chartjs
  var testSG = {
    "url": "https://api.covid19api.com/live/country/singapore",
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(testSG).done(function (response) {
    var labelArray = new Array();
    var dataArray = new Array();
    var newCases = 0;
    for (i = 1 ; i < response.length; i++) {
      var ctx = $('#myChart');

      ISOdate = new Date(response[i].Date);  //Converting ISO to Date Object
      year = ISOdate.getFullYear();
      month = ISOdate.getMonth()+1;
      dt = ISOdate.getDate();  
      if (dt < 10) {
        dt = '0' +  dt;
      }

      if (month < 10) {
        month = '0' + month;
      }
      
      stringDate = dt + "/" + month + "/" + year ;

      

      labelArray.push(stringDate);
      dataArray.push(response[i].Confirmed-response[i-1].Confirmed);
    }

    var myChart = new Chart(ctx, {

      type: 'bar',
      data: {

        labels: labelArray,
        datasets: [{
            label: '# of New Cases',
            data: dataArray,
            backgroundColor: [
                'rgb(0, 160, 160)'
            ],
            borderColor: [
                'rgba(0, 156, 156, 0.2)'
            ],
            borderWidth: 1
        }]
    },
    options: {
      scales: {
          y: {
              beginAtZero: true

            }
          }
        }
      });


    
  });

  //Continue coding here




});


