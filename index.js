import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import YAML from "yaml";

const app = express();

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api/v1/", (_req, res) => {
  res.send("Hello from backend");
});

app.listen(8080, () => {
  console.log(`server is running on port 8080`);
});
