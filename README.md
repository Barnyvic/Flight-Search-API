# Flight Search API
The Flight Search API allows you to search for flight information based on specific parameters such as departure airport, arrival airport, and date. This API utilizes a freely available flight search API provider to fetch flight data and returns relevant information to the user.

# Getting Started
* Node.js (at least version 14)
* npm (Node Package Manager)
* API key from the chosen flight search API provider (e.g., Rapid API)

# Installation

**- clone from github**

  git clone https://github.com/Barnyvic/Flight-Search-API.git

**- Install all the packages**

    npm install

**- start the server using node**

      npm run start

**- start the server using nodemon**

     npm run dev


# API Endpoints

- Search Flights: Get /flights/search

Request Body
```
{
   "departureAirport": "JFK",
  "arrivalAirport": "LAX",
  "date": "2023-08-25T12:00:00.000Z"
}
```
Response Body
```
{
  "data": [
    {
      "flightNumber": "XYZ123",
      "departureTime": "2023-08-25T12:00:00.000Z",
      "arrivalTime": "2023-08-25T15:00:00.000Z",
      "airline": "Example Airlines",
      "price": 350.50
    }
  ]
}
```
