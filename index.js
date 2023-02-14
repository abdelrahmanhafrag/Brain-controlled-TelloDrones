// follow Neurosity's documentation to set up your Crown before trying this code.

const { Notion } = require("@neurosity/notion");
require("dotenv").config(); // Importing the dependencies to index.js

//Get variables from .env file
const deviceId = process.env.DEVICE_ID || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";

//verify that the variables are not blank, the program will quit if blank
const verifyEnvs = (email, password, deviceId) => {
    const invalidEnv = (env) => {
      return env === "" || env === 0;
    };
    if (
      invalidEnv(email) ||
      invalidEnv(password) ||
      invalidEnv(deviceId)
    ) {
      console.error(
        "Please verify deviceId, email and password are in .env file, quitting..."
      );
      process.exit(0);
    }
  };
  verifyEnvs(email, password, deviceId);
  
  console.log(`${email} attempting to authenticate to ${deviceId}`);

  // instantiate a new notion
  const notion = new Notion({
    deviceId
  });

  //add async login
  const main = async () => {
    await notion
      .login({
        email,
        password
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
    console.log("Logged in");
    notion.kinesis("jumpingJacks").subscribe((intent) => {
        console.log(intent);
        
        // Commanding the drone to flip back every time the Crown BCI detects "Jumping jacks thoughts"

        /* 
        run the following code through terminal before proceed
        export FLASK_APP=telloControl.py
        flask run */

        fetch("http://localhost:5000/command", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ command: "flip_back" }) 
          })
            .then(response => response.json())
            .then(data => console.log(data.message));

      });
  };
  
  main();

/* disregard this code:

light.togglePower();
var robot = require("robotjs");
robot.keyTap("space");
var e = new KeyboardEvent('keydown',{'keyCode':32,'which':32});
document.dispatchEvent(keyboardEvent);
const jumpEvent = new Event('keydown');
jumpEvent.keycode = 32;
document.dispatchEvent(jumpEvent); */