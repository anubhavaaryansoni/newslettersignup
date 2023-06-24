const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //for importing static data in this project eg styles.css , imagees which are downloaded
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
        },
      },
    ],
  }; //all this data fields we get from the api site
  const url = "https://us10.api.mailchimp.com/3.0/lists/288ce7270b"; // api server + /unique id or audience id
  const jsondata = JSON.stringify(data);
  const options = {
    method: "POST",
    auth: "anubhav:785b41d6afb5db0d4849439b53d998d4-us10",
  };
  const request = https.request(url, options, (response) => {
    console.log(response.statusCode);
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
      console.log(response.statusCode);
    }
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsondata);
  request.end();
});
app.post("/fail", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server is running in port 3000"); 
});
//api key     785b41d6afb5db0d4849439b53d
// uniquue id  288ce7270b
