const axios = require("axios");

const request = axios.create({
  baseURL: process.env.URL,
  transformResponse: [
    function(data) {
      return JSON.parse(data);
    }
  ],
  headers: {
    Origin: "http://selfcare.jtl.co.ke",
    "Content-Type": "application/json"
  }
});

module.exports = {
  getBalances: () =>
    request
      .post("subBalance", {
        msisdn: process.env.Faiba_Number
      })
      .then(response => response.data),
  buyBundle: bundleType =>
    request
      .post("bundlesAirtime", {
        msisdn: process.env.Faiba_Number,
        code: bundleType
      })
      .then(response => response.data)
};
