# Bus Booking App


# Follow instruction to setup project locally.

## Requirements
```
1. MongoDB Atlas Connection String (MongoDB Atlas Connection Driver Link : mongoURI)
2. Node.JS environment 
```

## Installation And Import Packages
1. Clone this github repository - [Bus Booking App](https://github.com/KartikNP31/bus-booking-app)

2. Run the following command in project directory in terminal 1
> - ``` cd client ```
> - ``` npm install ```

3. Run the following command in project directory in other terminal (Terminal 2).
> - ``` cd server ```
> - ``` npm install ```


4. Create ``` .env ``` file in server directory and paste your mongodb connection string and webhook endpoint SIGNING_SECRET key created on clerk.
> - ``` mongoURI="Your_mongodb_connection_string ```
>- ``` PORT=8000 ```




## Run Application

1. Open "bus-booking-app" in Windows Terminal.

2. Run the Command in the Terminal 1: 
> - ``` cd client ```
> - ``` npm start ```
  - Wait for below message
  ```
  Compiled successfully!
  You can now view client in the browser.
  Local: http://localhost:3000
  webpack compiled successfully
  ```

3. Run the Command in the Terminal 2: 
> - ``` cd server ```
> - ``` npm start ```

  - Wait for the below Message in terminal2.
  ```
  Server running on : http://localhost:8000
  Connected to MongoDB
  ```


>## GitHub Repository 
>- [Bus-booking-app](https://github.com/KartikNP31/bus-booking-app)
>- https://github.com/KartikNP31/bus-booking-app