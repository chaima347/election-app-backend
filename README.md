# Election Management App Backend

This repository contains the backend implementation of an **Election Management System**. Built with **Node.js**, **Express**, and **MongoDB**, this backend provides robust APIs to handle all functionalities required for the election app.

## Features

- **User Management**
  - User registration and authentication using **JWT**.
  - Role-based access control for admins, candidates, and voters.
  
- **Candidate Management**
  - Add, edit, and delete candidate profiles.
  - Fetch candidate information and details.

- **Voting System**
  - Secure voting system ensuring one vote per user.
  - Real-time vote counting and results display.

- **Interactive Features**
  - Comments, favorites, and search functionalities.

## Technologies Used

- **Node.js**: For server-side JavaScript execution.
- **Express**: A lightweight web application framework.
- **MongoDB**: NoSQL database for efficient data storage.
- **JWT**: Secure authentication and authorization.

## API Endpoints

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/auth/register`      | Register a new user               |
| POST   | `/api/auth/login`         | Login a user                      |
| GET    | `/api/candidates`         | Get all candidates                |
| POST   | `/api/vote`               | Submit a vote                     |
| GET    | `/api/results`            | Fetch real-time election results  |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to all contributors and the open-source community for inspiring this project!
