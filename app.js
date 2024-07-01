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
  const test = () => {
    axios
      .get(
        `https://api.meteo-concept.com/api/location/cities?token=e96e72b85f13950284302fce1f05967f2f78c27de31dfe5571a89145114735fd&search=${city}`
      )
      .then(async (response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.status, err.response.data.message);
        console.log("errorer");
      });
  };
  test();
});
