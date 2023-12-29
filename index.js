(async () => {
  const lat = 45.267136;
  const lon = 19.833549;
  const apiKey = "487091e1cdca4f0ac134ff892ae5411e";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const weather = await response.json();
  const forecast = weather.list;
  formatList(forecast);
})();

function formatList(list){
    const formatedList = list.map((weather) => {
        return {
            ...weather,
            date_time: new Date(weather.dt_txt)
        };
    });
    // console.log(formatedList[0].date_time.getDay());
    getUniqueDays(formatedList);
}

function getUniqueDays(list){
    const days = {};
    for (const weather of list) {
        const key = weather.date_time.getDate();
        days[key] = weather;
    }
    const daysList = Object.values(days);
    daysList.sort((a, b) => a.date_time - b.date_time);
    displayWeatherData(daysList);
}

function displayWeatherData(days){
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
        const dayDisplay = boxes[i].getElementsByTagName('h3')[0];
        const tempDisplay = boxes[i].querySelector("#temp");
        tempDisplay.innerHTML = days[i].main.temp;
        dayDisplay.innerHTML = dayNames[days[i].date_time.getDay()];
    }
}

