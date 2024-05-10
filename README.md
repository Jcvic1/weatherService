# Weather Service

Simple weather service api using Node Express.

## Overview

The Weather Service API is a powerful tool for accessing weather data. It provides detailed information about weather conditions at specific coordinates or a default location (Moscow). This API is designed to be intuitive and easy to use, making it accessible for developers of all skill levels.

## Getting Started

### Prerequisites

- Basic knowledge of HTTP and RESTful APIs.
- An API client capable of sending HTTP requests (e.g., Postman, curl).

### Installation

-Spin up Docker using docker-compose up to build image, run test and start.
-Send HTTP requests to the API endpoints as described below.

## API Endpoints

### Swagger

For web interface

- **URL**: `http://localhost:3000/api-docs`

### API clients

Postman, curl e.t.c

- **URL**: `http://localhost:3000/api/weather`

### Extras

- **Method**: `GET`
- **Parameters**:
  - `lat`: Latitude of the location (optional).
  - `long`: Longitude of the location (optional).
- **Responses Status**:

  - `200 OK`: Successful operation. Returns an array of weather data objects.
  - `400 Bad Request`: Invalid request parameters.
  - `403 Forbidden`: Access denied.
  - `404 Not Found`: Resource not found.
  - `500 Internal Server Error`: Server encountered an error.

- **Responses Schema**:
  ```
  [
      {
          "date": "string",
          "temperature": 0
      }
  ]
  ```
