# IoT Tracker API

A RESTful API for tracking IoT device locations using Node.js, Express, and MongoDB.

## 📋 Overview

This application provides a simple and efficient way to:
- Store location data from IoT devices
- Retrieve location history for specific devices

## ✨ Features

- **Device tracking**: Store location data with timestamps
- **Location history**: Retrieve all locations for a specific device
- **RESTful API**: Simple HTTP endpoints for integration
- **MongoDB storage**: Flexible and scalable data storage

## 🛠️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Packages**: Mongoose, CORS, dotenv

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/iot-tracker.git
   cd iot-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   Create a `.env` file in the root directory:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 🚀 API Endpoints

### POST /trackers
Save IoT device location data

**Request Body:**
```json
{
  "deviceId": "device123",
  "latitude": 37.7749,
  "longitude": -122.4194,
  "timestamp": "2025-03-28T15:00:00Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Tracker data saved"
}
```

### GET /trackers/:deviceId
Get location history for a specific device

**Example:** `GET /trackers/device123`

**Response (200):**
```json
[
  {
    "_id": "6603a1b2c3d4e5f6a7b8c9d0",
    "deviceId": "device123",
    "latitude": 37.7749,
    "longitude": -122.4194,
    "timestamp": "2025-03-28T15:00:00Z"
  },
  {
    "_id": "6603a1b2c3d4e5f6a7b8c9d1",
    "deviceId": "device123",
    "latitude": 37.7750,
    "longitude": -122.4195,
    "timestamp": "2025-03-28T15:05:00Z"
  }
]
```

## 🚢 Deployment Options

### Option 1: Traditional VPS/Cloud VM

1. **Provision a server** (AWS EC2, DigitalOcean, etc.)
2. **Install Node.js and npm**
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm
   ```
3. **Clone and setup application**
4. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start app.js --name "iot-tracker"
   pm2 startup
   pm2 save
   ```

### Option 2: Docker Deployment

1. **Create a Dockerfile in project root**
   ```dockerfile
   FROM node:16

   WORKDIR /usr/src/app

   COPY package*.json ./
   RUN npm install

   COPY . .

   EXPOSE 3000

   CMD ["node", "app.js"]
   ```

2. **Build and run container**
   ```bash
   docker build -t iot-tracker .
   docker run -p 3000:3000 --env-file .env iot-tracker
   ```

### Option 3: PaaS (Heroku, Railway, Render)

1. **Create an account** on your preferred platform
2. **Connect your repository**
3. **Set environment variables**
4. **Deploy**

## 🔒 Security Recommendations

1. **Add authentication** to protect your API endpoints
   ```javascript
   // Example middleware for API key authentication
   function apiKeyAuth(req, res, next) {
     const apiKey = req.headers['x-api-key'];
     if (!apiKey || apiKey !== process.env.API_KEY) {
       return res.status(401).json({ error: 'Unauthorized' });
     }
     next();
   }

   // Apply to routes
   app.use('/trackers', apiKeyAuth);
   ```

2. **Implement rate limiting** to prevent abuse
   ```javascript
   const rateLimit = require("express-rate-limit");

   app.use(rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   }));
   ```

3. **Validate input data** to prevent injection attacks

## 📊 Database Considerations

- **Use MongoDB Atlas** for managed database service
- **Set up proper indexes** for query performance
- **Implement data retention policies** for managing storage

## 📝 License

[MIT](LICENSE)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/iot-tracker](https://github.com/yourusername/iot-tracker)