var express = require("express");
var router = express.Router();
const os = require("os");
const fs = require("fs");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/areWeRunning", function (req, res, next) {
  console.log("we're up!");
  // Get the machine name
  const machineName = os.hostname();

  // Print to the console
  console.log(`Machine name: ${machineName}`);

  console.log("dotenv check: ", process.env.TEST);

  res.json({
    result: true,
    running_on: machineName,
    dotenvCheck: process.env.TEST,
    current_time: new Date(),
    app_name: process.env.APP_NAME,
  });
});

router.post("/saveJson", async (req, res) => {
  console.log("- in POST /saveJson");
  console.log(req.headers);
  console.log("--- body ----");
  console.log(req.body); // Logs the parsed body
  console.log("--- body End ----");
  console.log(req.body.name);

  // Define the path to save the JSON file outside of the project directory
  //const filePath = path.join(__dirname, "../../your_external_folder/data.json"); // Update the path accordingly
  const projResourcesFolderPath = process.env.PROJECT_RESOURCES;
  // console.log(`filePath: ${filePath}`);
  console.log(`projResourcesFolderPath: ${projResourcesFolderPath}`);

  if (!fs.existsSync(projResourcesFolderPath)) {
    fs.mkdirSync(projResourcesFolderPath, { recursive: true });
    console.log(`Folder created at: ${projResourcesFolderPath}`);
  } else {
    console.log(`Folder already exists at: ${projResourcesFolderPath}`);
  }
  console.log("after create folder");

  // Convert data to JSON string format
  const jsonData = JSON.stringify({ myName: req.body.name }, null, 2);

  const filePath = path.join(projResourcesFolderPath, "test.json");
  // Write data to the JSON file synchronously
  try {
    // Write data to the JSON file synchronously
    await fs.promises.writeFile(filePath, jsonData);
    console.log("Data saved successfully to:", filePath);
  } catch (err) {
    console.error("Error writing to file:", err);
  }
  console.log("🚨 after created file in ", filePath);

  res.json({ result: true });
});

router.post("/receiveImage", async (req, res) => {
  console.log("- in POST /receiveImage");
  console.log(req.headers);
  console.log("--- files ----");
  console.log(req.files); // Logs the parsed body
  console.log("--- body ----");
  console.log(req.body); // Logs the parsed body
  console.log("--- body End ----");

  if (!req.files?.photoFromFront) {
    return res.json({ result: false, message: "no file" });
  }
  console.log(
    "req.files?.photoFromFront.name: ",
    req.files?.photoFromFront.name
  );

  const filePathImage = path.join(process.env.PROJECT_RESOURCES, "/images"); // Update the path accordingly

  if (!fs.existsSync(filePathImage)) {
    fs.mkdirSync(filePathImage, { recursive: true });
    console.log(`Folder created at: ${filePathImage}`);
  } else {
    console.log(`Folder already exists at: ${filePathImage}`);
  }
  const file = req.files.photoFromFront;
  const filePath = path.join(filePathImage, file.name);

  const resultMove = await req.files.photoFromFront.mv(filePath);
  return res.json({ result: true, message: "image saved" });
});

module.exports = router;
