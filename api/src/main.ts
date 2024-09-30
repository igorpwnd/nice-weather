import express from "express";
import cors from 'cors';
import { config } from "dotenv";

import { routes } from "./routes";

const app = express();
const port = 3000;

config()

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
