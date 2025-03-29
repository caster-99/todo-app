# Note-Taking Web Application

This project implements a full-stack web application that allows users to create, manage, tag, and filter notes. It consists of a frontend built with React and a backend built with Node.js and Express. The application includes protected routes and authentication features, and a live version is deployed at [https://lopez-2fdd2f.vercel.app/](https://lopez-2fdd2f.vercel.app/).

---

## Features

### Phase 1 (Mandatory)

- [x] Create, edit, and delete notes.
- [x] Archive/unarchive notes.
- [x] List active and archived notes.

### Phase 2 (Optional)

- [x] Add and remove categories (tags) to notes.
- [x] Filter notes by category.

### Additional Features

- [x] **Authentication**: Routes on both the frontend and backend are protected using JWT-based authentication.
- [x] **Live Deployment**: The app is accessible online.

#### Considerations

- The relationship between notes-category is one-to-many, meaning that a note can have only one category but a category can belong to multiple notes.
- You can also create categories on the frontend.
- Because I used free servers, the requests can take a little bit more than usual when running locally.

---

## Project Structure

- **Frontend**: React SPA, located in the `frontend/` folder.
- **Backend**: Node.js REST API with Sequelize ORM, located in the `backend/` folder.

---

## Setup Instructions

### Prerequisites

Ensure the following tools are installed on your system:

- Node.js: v18.17.0
- npm: v9.6.0
- MySQL: v8.0.33
- Bash or Zsh for running the setup script

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **Sequelize**: ORM for MySQL
- **MySQL2**: MySQL driver
- **Authentication**: JWT

### Frontend

- **React**: SPA framework
- **Bootstrap**: UI styling
- **React Router DOM**: Navigation
- **Fetch API**: API calls

---

## Authentication

Routes on both the backend and frontend are protected using JWT-based authentication. Ensure a valid token is provided for accessing restricted resources.

### Default Credentials

- **Username**: john.doe@gmail.com
- **Password**: password123

---

## Deployment

A live version of the app is deployed at: [https://lopez-2fdd2f.vercel.app/](https://lopez-2fdd2f.vercel.app/)
