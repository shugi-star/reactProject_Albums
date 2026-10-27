# Patient Monitoring System

## Overview

The Patient Monitoring System is a web-based application designed to help hospital nurses view patient monitor data in real time. The system consists of a React frontend, a Node.js backend, and a dedicated monitoring server that handles real-time communication.

The project demonstrates how different components can work together to provide an interface for accessing patient information and displaying monitoring data.

## System Architecture

The system consists of three main components:

1. **Frontend Client** – A React application that provides the user interface for viewing patient information and monitoring data.
2. **Backend Server** – A Node.js and Express server responsible for handling API requests and managing application data.
3. **Monitoring Server** – A dedicated server that uses WebSockets to deliver real-time monitoring updates to the frontend.

## Technologies

- React
- JavaScript
- Node.js
- Express.js
- WebSockets
- REST API
- HTML and CSS

## Repositories

This project is divided into three repositories:

- **Client – React Frontend:**  
  https://github.com/shugi-star/client_react_finalProject

- **Main Backend Server:**  
  https://github.com/shugi-star/server_react_finalProject

- **Real-Time Monitoring Server:**  
  https://github.com/shugi-star/monitor_demo_react

## Running the Project Locally

### Prerequisites

- Node.js and npm installed.
- All three repositories cloned to your computer.

### 1. Start the Backend Server

Open a terminal in the backend project directory and run:

```bash
npm install
npm start
```

The backend is configured to use port `3001` by default.

### 2. Start the Monitoring Server

Open another terminal in the monitoring server project directory and run:

```bash
npm install
node server.js
```

The monitoring server uses port `3002` and provides a WebSocket endpoint at:

```text
ws://localhost:3002/ws/monitorsRealtime
```

### 3. Start the Frontend

Open another terminal in the frontend project directory and run:

```bash
npm install
npm start
```

The frontend is typically available at:

```text
http://localhost:3000
```

## Notes

- Start the backend and monitoring servers before using the frontend.
- The frontend and monitoring server are configured to communicate with local backend services.
- The project is a software demonstration and is not intended for clinical use without appropriate validation and testing.
