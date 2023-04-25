import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import YAML from "yaml";

const app = express();

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

app.listen(8080, () => {
  console.log(`server is running on port 8080`);
});
