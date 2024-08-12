# Event Management API

The Event Management API facilitates the creation, management, and participation in events. It provides a seamless experience for organizers and attendees, covering event creation, attendee registration, event information display, and feedback collection.

## Features

1. **Event Creation and Management**

   - Organizers can create, modify, and delete events.
   - Events can include details such as title, description, date, time, location, and capacity.

2. **Attendee Registration**

   - Users can register for events.
   - Validation ensures that events do not exceed their maximum capacity.

3. **Event Information Display**

   - Participants can view event details, including schedules and location information.

4. **Feedback and Rating**
   - After the event, attendees can provide feedback and rate the event.

## Technologies

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing event and attendee data.
- **Mongoose**: ODM for MongoDB to manage database schemas.
- **JWT (JSON Web Tokens)**: For user authentication and securing endpoints.
- **bcrypt**: For hashing user passwords.
- **Nodemailer** (optional): For sending email notifications.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/event-management-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd event-management-api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=your_port
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login and receive a JWT.

### Events

- **GET /api/events**: Retrieve a list of all events.
- **GET /api/events/:id**: Retrieve details of a specific event.
- **POST /api/events**: Create a new event (requires authentication).
- **PUT /api/events/:id**: Update an existing event (requires authentication).
- **DELETE /api/events/:id**: Delete an event (requires authentication).

### Attendees

- **POST /api/events/:id/register**: Register for an event (requires authentication).

### Feedback

- **POST /api/events/:id/feedback**: Provide feedback and rate an event (requires authentication).

## Security

- **JWT Authentication**: Secures endpoints by requiring valid tokens for protected routes.
- **Password Hashing**: User passwords are hashed using `bcrypt` before being stored.

## Optional Features

- **Email Notifications**: Using Nodemailer, the API can send notifications to users about event updates or confirmations.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
