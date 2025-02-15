document.addEventListener("DOMContentLoaded", () => {
  let city = "";
  let dayForecast = 0;
  let daysTab = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  let monthsTab = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  for (let y = 1; y < document.querySelectorAll("option").length; y++) {
    document.querySelectorAll("option")[y].innerHTML = `Aujourd'hui +${y}`;
  }

  const lb_submitCity = (e) => {
    axios
      .get(
        `https://api.meteo-concept.com/api/location/cities?token=e96e72b85f13950284302fce1f05967f2f78c27de31dfe5571a89145114735fd&search=${city}`
      )
      .then(async (response) => {
        lb_deleteCities();
        lb_getInfo(response.data.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const lb_getInfo = (tab) => {
    tab.forEach((element, index) => {
      axios
        .get(
          `https://api.meteo-concept.com/api/forecast/daily/${dayForecast}?token=e96e72b85f13950284302fce1f05967f2f78c27de31dfe5571a89145114735fd&insee=${element.insee}`
        )
        .then(async (response) => {
          console.log(response);
          const divGen = document.createElement("div");
          const divName = document.createElement("div");
          const divT = document.createElement("div");
          const divTMin = document.createElement("div");
          const divTMax = document.createElement("div");
          const divPlusButtonComponent = document.createElement("div");
          const divPlusButton = document.createElement("div");
          const divPlusElement = document.createElement("div");
          divGen.className = "individualCity";
          divGen.id = `indi${index}`;
          divName.className = "cityName";
          divName.id = `name${index}`;
          divT.className = "temperature";
          divT.id = `temp${index}`;
          divPlusButtonComponent.className = "plusCity";
          divPlusButtonComponent.id = `button${index}`;
          divPlusButton.className = "buttonPlus";
          divPlusElement.className = "plusComponent invisible";
          divPlusElement.id = `plus${index}`;
          divTMin.className = "tmin";
          divTMax.className = "tmax";
          divPlusButton.innerHTML = "Plus...";
          divName.innerHTML = `${response.data.city.name} (${response.data.city.insee})`;
          divTMin.innerHTML = `${response.data.forecast.tmin}°C`;
          divTMax.innerHTML = `${response.data.forecast.tmax}°C`;
          document.querySelector(".resultWeather").appendChild(divGen);
          document
            .getElementById(`indi${index}`)
            .appendChild(divPlusButtonComponent);
          document.getElementById(`button${index}`).appendChild(divPlusButton);
          document
            .getElementById(`indi${index}`)
            .insertBefore(divPlusElement, divPlusButtonComponent);
          document
            .getElementById(`indi${index}`)
            .insertBefore(divT, divPlusElement);
          document.getElementById(`indi${index}`).insertBefore(divName, divT);
          document.getElementById(`temp${index}`).appendChild(divTMax);
          document
            .getElementById(`temp${index}`)
            .insertBefore(divTMin, divTMax);
          lb_getEphemeride(element, index);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  const lb_getEphemeride = (e, i) => {
    axios
      .get(
        `https://api.meteo-concept.com/api/ephemeride/${dayForecast}?token=e96e72b85f13950284302fce1f05967f2f78c27de31dfe5571a89145114735fd&insee=${e.insee}`
      )
      .then(async (response) => {
        const divEphemeride = document.createElement("div");
        const divSunset = document.createElement("div");
        const divSunrise = document.createElement("div");
        const divDurationDay = document.createElement("div");
        const divDiff = document.createElement("div");
        divEphemeride.className = "ephemerideComponent";
        divSunset.className = "sunset";
        divSunrise.className = "sunrise";
        divDurationDay.className = "durationDay";
        divDiff.className = "diffDay";
        divEphemeride.id = `ephe${i}`;
        divSunrise.innerHTML = `Aube : ${response.data.ephemeride.sunrise}`;
        divSunset.innerHTML = `Crépuscule : ${response.data.ephemeride.sunset}`;
        divDurationDay.innerHTML = `Jour : ${response.data.ephemeride.duration_day}`;
        divDiff.innerHTML = `difference : ${response.data.ephemeride.diff_duration_day} min`;
        document
          .querySelectorAll(".plusComponent")
          [i].appendChild(divEphemeride);
        document.getElementById(`ephe${i}`).appendChild(divDiff);
        document.getElementById(`ephe${i}`).insertBefore(divSunset, divDiff);
        document.getElementById(`ephe${i}`).insertBefore(divSunrise, divSunset);
        document
          .getElementById(`ephe${i}`)
          .insertBefore(divDurationDay, divSunset);
        document
          .querySelectorAll(".buttonPlus")
          [i].addEventListener("click", () => {
            if (
              document.querySelectorAll(".plusComponent")[i].classList[1] ===
              "invisible"
            ) {
              document
                .querySelectorAll(".plusComponent")
                [i].classList.remove("invisible");
              document.querySelectorAll(".buttonPlus")[i].innerHTML = "Moins";
            } else {
              document
                .querySelectorAll(".plusComponent")
                [i].classList.add("invisible");
              document.querySelectorAll(".buttonPlus")[i].innerHTML = "Plus...";
            }
          });
      })
      .catch((err) => console.log(err));
  };
  const lb_deleteCities = () => {
    document.querySelector(".resultWeather").remove();
    const prinDiv = document.createElement("div");
    prinDiv.className = "resultWeather";
    document.querySelector(".weatherComponent").appendChild(prinDiv);
  };
  document.addEventListener("click", (element) => {
    switch (element.srcElement) {
      case document.querySelector(".submitCity"):
        if (document.querySelector(".citySearch").value !== "") {
          city = document.querySelector(".citySearch").value;
          document.querySelector(".citySearch").value = "";
          lb_submitCity(document.querySelector(".resultWeather"));
        } else {
          alert("Write a city's name.");
        }
        break;
    }
  });
  document.querySelector(".daysFuture").addEventListener("change", () => {
    dayForecast = document.querySelector(".daysFuture").value;
    lb_submitCity();
  });
  document.querySelector(".citySearch").addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      document.querySelector(".submitCity").click();
    }
  });
  document.querySelector(".citySearch").focus();

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
