import express, {Application} from "express"
import cors from "cors"
import routerUsuario from "./routes/userRoute"
import routerTournament from "./routes/tournamentRoutes"
import routerMatch from "./routes/matchRoute"
import routerUtils from "./routes/utilsRoute"
import errorHandler from "./middleware/errorHandler"
import routerLogin from "./routes/loginRoute"

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use("/api", routerUsuario)
app.use("/api", routerTournament)
app.use("/api", routerMatch)
app.use("/api", routerUtils)
app.use("/api", routerLogin)

app.use(errorHandler)

export default app