import express, { Express, Request, Response } from "express";
import axios from "axios";
import Joi from "joi"
import * as dotenv from "dotenv";
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/flights/search", async (req, res) => {


const schema = Joi.object({
  departureAirport: Joi.string().required(),
  arrivalAirport: Joi.string().required(),
  date: Joi.date().iso().required(),
});

const { error } = schema.validate(req.query);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}

  const { departureAirport, arrivalAirport, date } = req.query;

  try {
    const response = await axios.get(
      `https://flight-radar1.p.rapidapi.com/flights/search`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY,
        },
        params: {
          departure: departureAirport,
          arrival: arrivalAirport,
          date: date,
        },
      }
    );

    const flightData = response.data;
    res.status(200).json({
      data: flightData,
      message: flightData.message,
    });
  } catch (error) {
    console.error("Error fetching flight data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching flight data" });
  }
});

app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "route not found" });
});

const Port = process.env.PORT || 4000
app.listen(Port, () => {
  return console.log(`Express is listening at http://localhost:${Port}`);
});
