document.addEventListener("DOMContentLoaded", () => {
  let city = "";
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
        response.data.cities.forEach((element) => {
          axios
            .get(
              `https://api.meteo-concept.com/api/forecast/daily/0?token=e96e72b85f13950284302fce1f05967f2f78c27de31dfe5571a89145114735fd&insee=${element.insee}`
            )
            .then(async (response) => {
              const divGen = document.createElement("div");
              const divName = document.createElement("div");
              const divT = document.createElement("div");
              const divTMin = document.createElement("div");
              const divTMax = document.createElement("div");
              divGen.className = "individualCity";
              divName.className = "cityName";
              divT.className = "temperature";
              divTMin.className = "tmin";
              divTMax.className = "tmax";
              divName.innerHTML = response.data.city.name;
              divTMin.innerHTML = response.data.forecast.tmin;
              divTMax.innerHTML = response.data.forecast.tmax;
              document.querySelector(".resultWeather").appendChild(divGen);
              document.querySelector(".individualCity").appendChild(divT);
              document
                .querySelector(".individualCity")
                .insertBefore(divName, divT);
              document.querySelector(".temperature").appendChild(divTMax);
              document
                .querySelector(".temperature")
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

  document.querySelector(".submitCity").addEventListener("click", () => {
    if (document.querySelector(".citySearch").value !== "") {
      city = document.querySelector(".citySearch").value;
      lb_submitCity(document.querySelector(".resultWeather"));
    } else {
      alert("Write a city's name.");
    }
    document.querySelector(".citySearch").value = "";
  });

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
});
