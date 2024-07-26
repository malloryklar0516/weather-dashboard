$(document).ready(function(){ 
    var apiKey = '&appid=2be56aada7872d75001afb030b365d8e';
    var searchBtn = document.getElementById('searchbutton');
    var historyEl= document.querySelector('.search-history');

   if (localStorage){
    var historyList = JSON.parse(localStorage.getItem('historyList'))||[];
    //displays 5 recent searches
    var displayList = historyList.slice(0,6);
    for (i=0; i< displayList.length; i++){
        $('.search-history').append(" <button type='button' class='list-group-item list-group-item-action'>"+displayList[i]+"</button>" );
    }
    displayList=[];
    getWeather(historyList[0]);
   //click event listener for the search button feature, calls getWeather function  
    searchBtn.addEventListener('click', function(){
        var searchEl=document.querySelector('#searchcity').value;
        localStorage.setItem('storedCity',searchEl);
        var city = localStorage.getItem('storedCity');
        historyList.unshift(city);
        localStorage.setItem('historyList',JSON.stringify(historyList));
        getWeather(city);         
        })
// gets weather and forecast when cities in recent searches are clicked
        $('.search-history').on("click","button", function(){
            getWeather($(this).text());
        })
       };
// gets today's date
   function todaysDate(){
    var today = dayjs().format("MM/DD/YYYY");
    return today;
   }
// function that gets weather and forecast for city searched and adds to html
    function getWeather(city){
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial"+apiKey;
    $.ajax({
    url: weatherURL,
    method: "GET"
    })
   .then(function(response){
       $('.city').html("<h3 class='fw-bold'>"+ response.name+ " ("+ todaysDate()+")" +"</h3>");
       $('.icon').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
       $('.temp').text("Temperature: "+response.main.temp+" F");
       $('.wind').text("Wind: " +response.wind.speed +" MPH");
       $('.hum').text("Humidity: "+response.main.humidity + "%");
        var latCoord = response.coord.lat;
        var longCoord = response.coord.lon;
        var forecastURL="https://api.openweathermap.org/data/2.5/forecast?lat="+latCoord+"&lon="+longCoord +"&units=imperial"+apiKey;
        //ajax call to get forecast for city searched 
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function(response){
            $('.day1-date').html("<h5 class='h5 fw-bold'>"+ dayjs(response.list[0].dt_txt).format( "MM/DD/YYYY")+"</h5>");
            $('.day1-icon').html("<img src='https://openweathermap.org/img/w/"+response.list[0].weather[0].icon +".png'>");
            $('.day1-temp').text("Temp: "+response.list[0].main.temp+" F");
            $('.day1-wind').text("Wind: "+ response.list[0].wind.speed +" MPH");
            $('.day1-humidity').text("Humidity: "+response.list[0].main.humidity +"%");
            $('.day2-date').html("<h5 class='h5 fw-bold'>"+ dayjs(response.list[8].dt_txt).format("MM/DD/YYYY")+"</h5>");
            $('.day2-icon').html("<img src='https://openweathermap.org/img/w/"+response.list[8].weather[0].icon +".png'>");
            $('.day2-temp').text("Temp: "+response.list[8].main.temp+" F");
            $('.day2-wind').text("Wind: "+ response.list[8].wind.speed +" MPH");
            $('.day2-humidity').text("Humidity: "+response.list[8].main.humidity +"%");
            $('.day3-date').html("<h5 class='h5 fw-bold'>"+ dayjs(response.list[16].dt_txt).format("MM/DD/YYYY")+"</h5>");
            $('.day3-icon').html("<img src='https://openweathermap.org/img/w/"+response.list[16].weather[0].icon +".png'>");
            $('.day3-temp').text("Temp: "+response.list[16].main.temp+" F");
            $('.day3-wind').text("Wind: "+ response.list[16].wind.speed +" MPH");
            $('.day3-humidity').text("Humidity: "+response.list[16].main.humidity +"%");
            $('.day4-date').html("<h5 class='h5 fw-bold'>"+ dayjs(response.list[24].dt_txt).format("MM/DD/YYYY")+"</h5>");
            $('.day4-icon').html("<img src='https://openweathermap.org/img/w/"+response.list[24].weather[0].icon +".png'>");
            $('.day4-temp').text("Temp: "+response.list[24].main.temp+" F");
            $('.day4-wind').text("Wind: "+ response.list[24].wind.speed +" MPH");
            $('.day4-humidity').text("Humidity: "+response.list[24].main.humidity +"%");
            $('.day5-date').html("<h5 class='h5 fw-bold'>"+ dayjs(response.list[31].dt_txt).format("MM/DD/YYYY")+"</h5>");
            $('.day5-icon').html("<img src='https://openweathermap.org/img/w/"+response.list[31].weather[0].icon +".png'>");
            $('.day5-temp').text("Temp: "+response.list[31].main.temp+" F");
            $('.day5-wind').text("Wind: "+ response.list[31].wind.speed +" MPH");
            $('.day5-humidity').text("Humidity: "+response.list[31].main.humidity +"%");
          console.log(response.list);  
        });
   });
   };
    })


