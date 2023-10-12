##MERN Social Media App
MERN Social Media App

#Table of Contents
Description
Features
Technologies
Installation
Usage
Screenshots
Contributing
License
Description
#The MERN Social Media App is a full-stack web application that allows users to connect, share posts, and interact with friends. It provides a modern and engaging social media experience with features like user authentication, profile management, post creation, likes, and follows. Built using the MERN (MongoDB, Express.js, React, Node.js) stack and state-of-the-art state management using useContext, this app is a perfect choice for social media enthusiasts looking for a powerful and customizable solution.

Features
User Authentication: Secure user registration and login process.
Profile Management: Update your profile picture and personal information.
Post Creation: Share posts with your followers and friends.
Likes and Follows: Interact with other users by liking and following their posts.
Real-time Updates: Experience real-time updates for posts and notifications.
State Management: Utilizes React's useContext for efficient state management.
Technologies
Frontend:
React
Axios
React Icons
React Router
Timeago.js
SCSS for styling
Backend:
Node.js
Express.js
MongoDB for data storage
Mongoose for database modeling
JWT for user authentication
Multer for handling image uploads
State Management:
React Context API (useContext)
Deployment:
Deployment of frontend and backend to your preferred hosting service
Installation
Clone the repository: git clone https://github.com/yourusername/mern-social-media-app.git
Change directory: cd mern-social-media-app
Install backend dependencies: npm install in the root folder
Install frontend dependencies: npm install in the client folder
Create a .env file in the root directory and add your MongoDB connection string and JWT secret:
env
Copy code
MONGODB_URL=your-mongodb-connection-string
JWT_SECRET=your-secret-key
Run the development server: npm run dev in the root folder
Usage
Visit http://localhost:3000 in your browser to access the app.
Register an account or log in if you already have one.
Customize your profile and start sharing posts with your followers.
Like and follow other users to build your social network.
Enjoy real-time updates and interactions with your friends.
