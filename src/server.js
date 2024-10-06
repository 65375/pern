import express from "express";
import cors from "cors";
import routerPessoa from "./routes/pessoa.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/', routerPessoa);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});