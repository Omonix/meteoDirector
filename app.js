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
        response.data.cities.forEach((element) => {
          console.log(element.name);
        });
      })
      .catch((err) => {
        console.log(err.response.status, err.response.data.message);
        console.log("errorer");
      }); //finally
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
