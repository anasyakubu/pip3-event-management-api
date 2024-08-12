```markdown
# Recipe Management API

## Overview

This project is a RESTful API that allows users to manage recipes, including creating, reading, updating, and deleting recipes. The aim is to provide interns with hands-on experience in building a Node.js application with user authentication and database interaction.

## Features

- User Authentication (Sign Up, Sign In)
- Create, Read, Update, and Delete (CRUD) recipes
- Data validation and error handling
- MongoDB integration for data storage
- Timestamps for recipe creation and updates

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/anasyakubu/pip3-recipe-management-api.git
cd recipe-management-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the server:

```bash
npm start
```

The server should now be running on `http://localhost:9000`.

## API Endpoints

### Authentication

- **POST /auth/signup** - Register a new user
- **POST /auth/login** - Authenticate a user and get a token

### Recipes

- **GET /recipes** - Get all recipes
- **GET /recipes/:id** - Get a specific recipe by ID
- **POST /recipes** - Create a new recipe
- **PUT /recipes/:id** - Update a recipe by ID
- **DELETE /recipes/:id** - Delete a recipe by ID

### Example Requests

#### Create a New Recipe

**POST /recipes**

```json
{
  "title": "Chocolate Cake",
  "description": "A delicious chocolate cake recipe.",
  "ingredients": ["2 cups flour", "1 cup sugar", "1 cup cocoa powder"],
  "instructions": ["Mix ingredients", "Bake at 350 degrees for 30 minutes"],
  "categories": ["Dessert"],
  "tags": ["chocolate", "cake"],
  "userID": "user_id_here"
}
```

#### Get All Recipes

**GET /recipes**

```json
[
  {
    "_id": "recipe_id_here",
    "title": "Chocolate Cake",
    "description": "A delicious chocolate cake recipe.",
    "ingredients": ["2 cups flour", "1 cup sugar", "1 cup cocoa powder"],
    "instructions": ["Mix ingredients", "Bake at 350 degrees for 30 minutes"],
    "categories": ["Dessert"],
    "tags": ["chocolate", "cake"],
    "userID": "user_id_here",
    "createdAt": "2024-08-06T00:00:00.000Z",
    "updatedAt": "2024-08-06T00:00:00.000Z"
  }
]
```

## Contributing

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For any questions or concerns, please contact [yakubuanas04@gmail.com].
