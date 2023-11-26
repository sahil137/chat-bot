# MERN Chat Application with OpenAI API Integration

## Overview

This is a full-stack chat application built using the MERN stack, which includes MongoDB, Express.js, React, and Node.js. Additionally, the application integrates the OpenAI API for creating natural language conversations.

## Features

1. Real-time chat functionality using Socket.io for WebSocket communication.
2. MongoDB for storing chat history.
3. React frontend for an interactive user interface.
4. OpenAI API integration for natural language processing and conversation generation.

## Folder Structure

The Project has client and server folders. The client folder has the entire front end code in react. Its a fairly basic application having a single page.
The server folder has a express app setup with routes and controller folders. The socket folder has middleware to handle chat related logic.

## Prerequisites

Before you begin, ensure you have the following installed:

1. Node.js and npm
2. MongoDB
3. OpenAI API key (create account on OpenAI)

## Getting Started

1. Clone the repository
2. Traverse to client and server folders and install dependencies for both using the command

```
npm install
```

3. Setup Environment variables by creating a .env file for both server and client.

4. Inside server env:

```
MONGO_URI = your mongodb URL
OPENAI_API_KEY = OpenAI API key
PORT = 8000
CLIENT_URL = http://localhost:5173 (client url)
```

5. Inside client env:

```
VITE_REACT_APP_API_URL = http://localhost:8000 (server url)
```

6. Start both client and server with the following command:

```
npm run dev
```

## Improvements

The Application can be improved by adding some additional features

1. Authorization system to login and signup users
2. Have multiple chats and option to delete a certain conversation.
3. Option to give some kind of feedback for the generated response.
