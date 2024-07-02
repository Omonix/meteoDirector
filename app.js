document.addEventListener("DOMContentLoaded", () => {
  let city = "";
  let dayForecast = 0;
  let daysTab = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let monthsTab = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const lb_submitCity = (e) => {
    axios
      .get(
        `https://api.meteo-concept.com/api/location/cities?token=e96e72b85f13950284302fce1f05967f2f78c27de31dfe5571a89145114735fd&search=${city}`
      )
      .then(async (response) => {
        lb_deleteCities();
        response.data.cities.forEach((element, index) => {
          axios
            .get(
              `https://api.meteo-concept.com/api/forecast/daily/${dayForecast}?token=e96e72b85f13950284302fce1f05967f2f78c27de31dfe5571a89145114735fd&insee=${element.insee}`
            )
            .then(async (response) => {
              const divGen = document.createElement("div");
              const divName = document.createElement("div");
              const divT = document.createElement("div");
              const divTMin = document.createElement("div");
              const divTMax = document.createElement("div");
              divGen.className = "individualCity";
              divGen.id = `indi${index}`;
              divName.className = "cityName";
              divName.id = `name${index}`;
              divT.className = "temperature";
              divT.id = `temp${index}`;
              divTMin.className = "tmin";
              divTMax.className = "tmax";
              divName.innerHTML = response.data.city.name;
              divTMin.innerHTML = response.data.forecast.tmin;
              divTMax.innerHTML = response.data.forecast.tmax;
              document.querySelector(".resultWeather").appendChild(divGen);
              document.getElementById(`indi${index}`).appendChild(divT);
              document
                .getElementById(`indi${index}`)
                .insertBefore(divName, divT);
              document.getElementById(`temp${index}`).appendChild(divTMax);
              document
                .getElementById(`temp${index}`)
                .insertBefore(divTMin, divTMax);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const lb_deleteCities = () => {
    for (
      let x = 0;
      x < document.querySelectorAll(".individualCity").length;
      x++
    ) {
      document.querySelectorAll(".individualCity")[0].remove();
    }
  };
  const lb_optionReload = () => {
    const futurDays = new Date();
    for (let y = 2; y < document.querySelectorAll("option").length; y++) {
      document.querySelectorAll("option")[y].innerHTML = new Date(
        `${futurDays.getFullYear()}-${monthsTab[futurDays.getMonth()]}-${
          futurDays.getDate() + y
        }`
      );
    }
  };

  document.querySelector(".submitCity").addEventListener("click", () => {
    if (document.querySelector(".citySearch").value !== "") {
      city = document.querySelector(".citySearch").value;
      lb_submitCity(document.querySelector(".resultWeather"));
    } else {
      alert("Write a city's name.");
    }
    document.querySelector(".citySearch").value = "";
  });
  document.querySelector(".daysFuture").addEventListener("click", () => {
    dayForecast = document.querySelector(".daysFuture").value;
    lb_submitCity();
  });

  lb_optionReload();

  setInterval(() => {
    let dateIs = new Date();
    document.querySelector(".day").innerHTML = `${
      daysTab[dateIs.getDay() - 1]
    } ${dateIs.getDate()}`;
    document.querySelector(".month").innerHTML = `${
      monthsTab[dateIs.getMonth()]
    } ${dateIs.getFullYear()}`;
    document.querySelector(
      ".hour"
    ).innerHTML = `${dateIs.getHours()}:${dateIs.getMinutes()}:${dateIs.getSeconds()}`;
  }, 1000);
  setInterval(() => {
    lb_optionReload();
  }, 3600000);
});
