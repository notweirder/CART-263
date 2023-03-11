let currentTimeIndex = 0;
let long = 0;
let lat = 0;

let weather;
function preload() {
  weather = loadJSON('https://api.open-meteo.com/v1/forecast?latitude=45.51&longitude=-73.59&hourly=temperature_2m,cloudcover&current_weather=true&timezone=America%2FNew_York');
}

function setup() {
  createCanvas(1000, 500);
  background(50,100,200);
  textAlign(CENTER);
  textSize(20)

  for(i=0;i<weather.hourly.time.length-1;i++)
  {
    if (weather.current_weather.time == weather.hourly.time[i])
    {
      currentTimeIndex = i;
    }
  }
  
   long = width/2 + weather.longitude/180 * width/2
   lat = height/2 - weather.latitude/90 * height/2





  fill(255,weather.hourly.cloudcover[currentTimeIndex]*2.55)
  rect(0,0,width,height)
  fill(0)
  ellipse(long,lat,10)


  text('Wind speed: ' + weather.current_weather.windspeed, width/2, height/2-20)
  text('Wind direction: ' + weather.current_weather.winddirection, width/2, height/2+20)


  

}

