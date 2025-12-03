# 📊 Polling App

A full-stack MERN (MongoDB, Express, React, Node.js) polling application that allows users to create polls, vote on them, and view real-time results with percentage calculations.

## 🚀 Features

### Frontend (Client)

- **Create Poll**: Interface to create new polls with a question and 4 options
- **Register Vote**: Vote on active polls with a user-friendly interface
- **View Results**: Real-time visualization of poll results with vote counts and percentages
- **Responsive Design**: Modern UI with smooth animations and transitions
- **React Router**: Client-side routing for seamless navigation

### Backend (Server)

- **RESTful API**: Clean API endpoints for poll management
- **MongoDB Integration**: Persistent data storage with Mongoose ODM
- **Real-time Calculations**: Automatic vote percentage calculations
- **CORS Enabled**: Cross-origin resource sharing for frontend-backend communication
- **Environment Variables**: Secure configuration management

## 📁 Project Structure

```
pollingapp/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── CreatePoll.jsx
│   │   │   ├── RegisterVote.jsx
│   │   │   └── ViewResult.jsx
│   │   ├── page/
│   │   │   └── Layout.jsx
│   │   ├── App.jsx        # Main app component with routing
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend Node.js application
    ├── config/
    │   └── db.js          # MongoDB connection
    ├── model/
    │   └── poll.model.js  # Poll schema
    ├── router/
    │   └── poll.router.js # API routes
    ├── index.js           # Server entry point
    └── package.json
```

## 🛠️ Tech Stack

### Frontend

- **React** (v19.2.0) - UI library
- **React Router DOM** (v7.10.0) - Client-side routing
- **Axios** (v1.13.2) - HTTP client for API calls
- **Vite** (v7.2.4) - Build tool and dev server

### Backend

- **Node.js** - Runtime environment
- **Express** (v5.2.1) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v9.0.0) - MongoDB ODM
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v17.2.3) - Environment variable management
- **Nodemon** (v3.1.11) - Development auto-restart

## 📡 API Endpoints

### 1. Fetch Poll

**GET** `/polls/fetch`

Retrieves the current active poll.

**Request:**

```http
GET http://localhost:8001/polls/fetch
```

**Response (Success - 200):**

```json
{
  "message": "Poll created sucessfully!",
  "poll": {
    "_id": "...",
    "question": "What is your favorite programming language?",
    "option1": "JavaScript",
    "option2": "Python",
    "option3": "Java",
    "option4": "C++",
    "option1vote": 10,
    "option2vote": 15,
    "option3vote": 5,
    "option4vote": 8,
    "option1votePercentage": 26.32,
    "option2votePercentage": 39.47,
    "option3votePercentage": 13.16,
    "option4votePercentage": 21.05,
    "createdAt": "2025-12-03T...",
    "updatedAt": "2025-12-03T..."
  }
}
```

**Response (Error - 400):**

```json
{
  "error": "No Poll is found!"
}
```

---

### 2. Create Poll

**PUT** `/polls/create`

Creates a new poll. If a poll with the same question exists, it deletes all previous polls and creates a new one.

**Request:**

```http
PUT http://localhost:8001/polls/create
Content-Type: application/json

{
  "question": "What is your favorite programming language?",
  "option1": "JavaScript",
  "option2": "Python",
  "option3": "Java",
  "option4": "C++"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| question | String | Yes | The poll question |
| option1 | String | Yes | First option |
| option2 | String | Yes | Second option |
| option3 | String | Yes | Third option |
| option4 | String | Yes | Fourth option |

**Validation Rules:**

- All fields must not be empty (trimmed)
- All options must be unique

**Response (Success - 200):**

```json
{
  "message": "Poll added sucessfully!",
  "newPoll": {
    "_id": "...",
    "question": "What is your favorite programming language?",
    "option1": "JavaScript",
    "option2": "Python",
    "option3": "Java",
    "option4": "C++",
    "option1vote": 0,
    "option2vote": 0,
    "option3vote": 0,
    "option4vote": 0,
    "option1votePercentage": 0,
    "option2votePercentage": 0,
    "option3votePercentage": 0,
    "option4votePercentage": 0,
    "createdAt": "2025-12-03T...",
    "updatedAt": "2025-12-03T..."
  }
}
```

**Response (Error - 400):**

```json
{
  "error": "Input should not be empty!"
}
```

or

```json
{
  "error": "Options should be unqiue!"
}
```

---

### 3. Update Vote

**PATCH** `/polls/updateValues`

Registers a vote for a specific option and recalculates percentages.

**Request:**

```http
PATCH http://localhost:8001/polls/updateValues
Content-Type: application/json

{
  "selectedOption": "option1"
}
```

**Request Body:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| selectedOption | String | Yes | The selected option ("option1", "option2", "option3", or "option4") |

**Response (Success - 200):**

```json
{
  "message": "Poll updated sucessfully!",
  "updatePoll": {
    "_id": "...",
    "question": "What is your favorite programming language?",
    "option1": "JavaScript",
    "option2": "Python",
    "option3": "Java",
    "option4": "C++",
    "option1vote": 11,
    "option2vote": 15,
    "option3vote": 5,
    "option4vote": 8,
    "option1votePercentage": 28.21,
    "option2votePercentage": 38.46,
    "option3votePercentage": 12.82,
    "option4votePercentage": 20.51,
    "createdAt": "2025-12-03T...",
    "updatedAt": "2025-12-03T..."
  }
}
```

**Response (Error - 400):**

```json
{
  "error": "No Poll is found!"
}
```

**Note:** The backend automatically:

- Increments the vote count for the selected option
- Recalculates percentages for all options
- Rounds percentages to 2 decimal places

---

## 📊 Database Schema

### Poll Model

```javascript
{
  question: String (required),
  option1: String (required),
  option2: String (required),
  option3: String (required),
  option4: String (required),
  option1vote: Number (default: 0),
  option2vote: Number (default: 0),
  option3vote: Number (default: 0),
  option4vote: Number (default: 0),
  option1votePercentage: Number (default: 0),
  option2votePercentage: Number (default: 0),
  option3votePercentage: Number (default: 0),
  option4votePercentage: Number (default: 0),
  timestamps: true (createdAt, updatedAt)
}
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the server directory:

```env
MONGO_URL=mongodb://localhost:27017/pollingapp
# or for MongoDB Atlas:
# MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/pollingapp
```

4. Start the development server:

```bash
npm run dev
```

The server will run on `http://localhost:8001`

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the client directory (if needed):

```env
VITE_API_URL=http://localhost:8001
```

4. Start the development server:

```bash
npm run dev
```

The client will run on `http://localhost:5173` (or another port if 5173 is busy)

## 🎯 Usage

1. **Create a Poll**: Navigate to the home page and fill in the poll question and 4 options
2. **Vote**: Go to the "Register Vote" page, select an option, and submit your vote
3. **View Results**: Check the "View Results" page to see real-time voting statistics

## 🔐 Environment Variables

### Server (.env)

```env
MONGO_URL=your_mongodb_connection_string
```

### Client (.env)

```env
VITE_API_URL=http://localhost:8001
```

## 🚦 Running the Application

### Development Mode

**Terminal 1 (Backend):**

```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd client
npm run dev
```

### Production Build

**Backend:**

```bash
cd server
node index.js
```

**Frontend:**

```bash
cd client
npm run build
npm run preview
```

## 📝 Notes

- The application currently supports only one active poll at a time
- When a new poll is created with the same question, all previous polls are deleted
- Vote percentages are automatically calculated and rounded to 2 decimal places
- The application uses ES6 modules (type: "module" in package.json)

## 🐛 Known Issues

- No user authentication (anyone can vote multiple times)
- No poll history or archiving
- Limited to 4 options per poll

## 🔮 Future Enhancements

- User authentication and authorization
- Multiple concurrent polls
- Poll history and analytics
- Dynamic number of options
- Vote limiting (one vote per user)
- Real-time updates using WebSockets
- Poll expiration dates
- Export results to CSV/PDF

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as part of MERN stack learning journey.

---

**Happy Polling! 🎉**
