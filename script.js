


$(document).ready(function () {


  //Used for 4 main country statistics  (Idea to randomize the statistics)
  var currentDateTime = new Date();
  currentDateTime.setDate(currentDateTime.getDate()-3)
  var currentDateTimeMinusOneISO = currentDateTime.toISOString();

  //Used for CountrySearch Feature
  var currentDate = new Date();
  var ISOcurrentDate = currentDate.toISOString();

  //Used for CountrySearch Chart
  var MinusFourMonthsDate = new Date();
  MinusFourMonthsDate.setMonth(MinusFourMonthsDate.getMonth()-4);
  var ISOMinusFourMonthsDate = MinusFourMonthsDate.toISOString();

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
    "url": "https://api.covid19api.com/live/country/singapore/status/confirmed/date/" + currentDateTimeMinusOneISO,           //Retrieving Singapore Data
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
    "url": "https://api.covid19api.com/live/country/indonesia/status/confirmed/date/" + currentDateTimeMinusOneISO,           //Retrieving Indonesia Data
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
    "url": "https://api.covid19api.com/live/country/israel/status/confirmed/date/" + currentDateTimeMinusOneISO,           //Retrieving Israel Data
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
      "url": "https://api.covid19api.com/live/country/" + countryName + "/status/confirmed/date/" + currentDateTimeMinusOneISO,           //Retrieving countrySearch Name data
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(countrySearch).done(function (response) {
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
      "url": "https://api.covid19api.com/total/country/"+ countryName + "/status/confirmed?from=" + ISOMinusFourMonthsDate + "&to=" + ISOcurrentDate,     //Retrieving countrySearch Name data
      "method": "GET",
      "timeout": 0,
      //https://api.covid19api.com/total/country/singapore/status/confirmed?from=2021-01-01T00:00:00Z&to=2021-04-01T00:00:00Z
    };  
    
    $.ajax(countrySearchChart).done(function (response) {
      console.log(response)     
    var labelArray = new Array();     
    var dataArray = new Array();                                          //countrySearchChart Function (Note: Add in US,UK etc functionality!!!!)
    
      

    //https://api.covid19api.com/live/country/south-africa/status/confirmed/date/2020-03-21T13:13:30Z



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
      dataArray.push(response[i].Cases-response[i-1].Cases);    //(Note: Add in US,UK etc functionality!!!!)
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


