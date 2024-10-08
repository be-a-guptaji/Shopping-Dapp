# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Project Name -> Decentralized E-Commerce dApp

Description

ShopDapp is a decentralized e-commerce dApp, allowing users to browse products, add them to a cart, and complete transactions using Phantom or Backpack wallets. With integrated airdrop requests, instant SOL transactions, and message signing, ShopDapp makes decentralized shopping fast, secure, and easy for everyone.

Setup Instructions

Prerequisites
Node.js installed (v12+)
MongoDB installed and running locally
1. Clone the Repository

git clone https://github.com/your-username/your-repo.git

cd your-repo

2. Install Dependencies
In the root of your project, install all dependencies for both frontend and backend:


# For the server (Express)
npm install

# Navigate to the client folder and install React dependencies
cd client
npm install
3. Set up Environment Variables
In the root directory of your project, create a .env file with the following content:


DB_URL=mongodb://localhost:27017/your-database-name
Make sure MongoDB is running locally, and replace your-database-name with the actual database name.

4. Run the Application
To start both the frontend (React) and backend (Express) servers:
Open two terminal windows or tabs, and run the following commands:

1st Terminal (for React development server):


npm run dev
2nd Terminal (for the Express server):


node index.js
This will start both the React frontend on its development server and the Express backend.

5. Access the Application
Frontend (React): http://localhost:3000
Backend (Express API): http://localhost:5000
Additional Notes
The frontend React app will automatically proxy API requests to the backend when running on http://localhost:3000.
Ensure MongoDB is running locally for the backend to connect to the database properly.