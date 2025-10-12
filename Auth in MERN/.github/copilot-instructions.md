# AI Agent Guidance for MERN Auth Project

## Core Architecture
- **Auth Flow**: JWT-based authentication with Express middleware (`/middleware/authMiddleware.js`)
- **MVC Structure**: Routes -> Controllers -> Models pattern (`/routes/userRoutes.js` -> `/controller/userController.js` -> `/models/User.js`)
- **DB Connection**: MongoDB via Mongoose (configured in `/config/db.js`)

## Key Development Patterns
```js
// Route definition example (userRoutes.js)
router.post('/register', validate(schema), registerUser);

// Controller convention (userController.js)
export const controllerName = async (req, res) => {
  try {
    // Business logic
  } catch (err) {
    errorHandler(err, res);
  }
}
```

## Essential Commands
```bash
npm run dev        # Start development server (PORT=8080)
npm run db:connect # Connect to MongoDB Atlas cluster
```

## Security Conventions
- Environment variables required:
  - `MONGO_URL`: Atlas connection string with retryWrites
  - `JWT_SECRET`: 256-bit minimum entropy
- Always use `cors()` middleware for API endpoints

## Integration Points
- User model requires:
  - `name` (string)
  - `email` (unique)
  - `password` (hashed)
- Error handling middleware pattern in `/middleware/errorHandler.js`

> Key files: `server.js`, `User.js`, `authMiddleware.js`, `.env`