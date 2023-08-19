import express, { Express, Request, Response } from "express";
import axios from "axios";
import Joi from "joi"

const app: Express = express();
const port = 3000;
const API_KEY = "344f9a8aa7msheb89d0439e4f0ffp165a03jsn5dcdd8f75d8f";

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
          "X-RapidAPI-Key": API_KEY,
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

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
