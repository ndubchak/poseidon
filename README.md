# Poseidon, a user-friendly interface for Trident
Poseidon is a web application for monitoring and managing your host serviced by Trident. Poseidon provides a user-friendly interface for viewing the status of the host and updating its state.

# Features
1. Get host status: Retrieve and display the current status of the host.
2. Update host: Update the host configuration and monitor the update process.

# Project Structure
- Frontend: Built with React and Ant Design for a modern, responsive UI.
- Backend: Node.js with Express, acting as a bridge between the React frontend and the gRPC server.
- gRPC Server: Handles requests for getting and updating host statuses.
Prerequisites
Ensure you have the following installed:

Node.js (v14.x or higher)
npm (v6.x or higher)
A running gRPC server for Poseidon
Getting Started
Follow these steps to set up and run the Poseidon application locally.

1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/poseidon.git
cd poseidon
2. Install Dependencies
Frontend
Navigate to the poseidon-app directory and install the dependencies:

bash
Copy code
cd poseidon-app
npm install
Backend
Navigate to the backend directory and install the dependencies:

bash
Copy code
cd backend
npm install
3. Configure the Backend
Ensure the gRPC server address in the backend code is correct. Modify backend/server.js if necessary:

javascript
Copy code
const client = new tridentProto.HostManagement('YOUR_GRPC_SERVER_IP:50051', grpc.credentials.createInsecure());
4. Run the Application
Backend
Start the backend server:

bash
Copy code
cd backend
npm start
The backend server will run on http://localhost:8080.

Frontend
Start the frontend development server:

bash
Copy code
cd poseidon-app
npm start
The frontend will run on http://localhost:3000.

5. Access the Application
Open your web browser and navigate to:

arduino
Copy code
http://localhost:3000
You should see the Poseidon application homepage.

Usage
Get Host Status: Click the "Get Host Status" button on the homepage to view the current status of the host.
Update Host: Navigate to the "Update Host" page, modify the host configuration as needed, and submit the form to update the host.
Troubleshooting
If you encounter any issues:

Ensure the gRPC server is running and accessible at the specified address.
Check the browser console and backend server logs for any error messages.
Contributing
Contributions are welcome! Please fork the repository and submit pull requests.
