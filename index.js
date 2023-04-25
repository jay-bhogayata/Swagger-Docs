import { URL } from "url";
import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import YAML from "yaml";
import fileUpload from "express-fileupload";
import cors from "cors";

const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let courses = [
  {
    id: "11",
    name: "Learn Reactjs",
    price: 299,
  },
  {
    id: "22",
    name: "Learn Angular",
    price: 399,
  },
  {
    id: "33",
    name: "Learn Django",
    price: 499,
  },
];

app.get("/api/v1/", (req, res) => {
  res.send("Hello from backend");
});

app.get("/api/v1/courseObject", (req, res) => {
  res.send({ id: "11", name: "Master backend with node", price: 499 });
});

app.get("/api/v1/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/v1/course/:courseId", (req, res) => {
  const course = courses.find((course) => course.id === req.params.courseId);
  res.send(course);
});

app.post("/api/v1/addCourse", (req, res) => {
  courses.push(req.body);
  res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;

  res.send({ location, device });
});

app.post("/api/v1/courseupload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".png";
  console.log(path);
  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(8080, () => {
  console.log(`server is running on port 8080`);
});
