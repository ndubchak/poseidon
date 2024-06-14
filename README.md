# Poseidon, a user-friendly interface for Trident
Poseidon is a web application for monitoring and managing hosts serviced by Trident. Poseidon provides a user-friendly interface for viewing the status of your host and updating its state.

# Features
1. **Get host status**: Retrieve and display the current status of the host.
2. **Update host**: Update the host configuration, trigger an update, and monitor the update process.

# Project Structure
- **Frontend**: Built with React and Ant Design for a modern, responsive UI.
- **Backend**: Node.js with an Express backend service, which acts as a bridge between the React frontend and the gRPC server spinned up by Trident.

# Prerequisites
- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn
- Your host serviced by Trident running on a VM spinned up with `make run-netlaunch`.

# Getting Started
Follow these steps to set up and run the Poseidon application locally.

0. Run Trident via `make run-netlaunch` with gRPC enabled in your trident.yaml.

1. Clone the repo:

`git clone https://github.com/yourusername/poseidon.git`

`cd poseidon/poseidon-app`

2. Install any dependencies
Frontend
Navigate to the poseidon-app directory and install the dependencies:
`npm install`

3. Run the application
`npm start`

By default, this will start the backend server on `localhost:8080` and the web app on `localhost:3000`. You can navigate to the web app to start managing your Trident host machine!


Contributors: Nadiia Dubchak & Adit Jha
