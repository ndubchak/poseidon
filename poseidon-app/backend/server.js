// Import the necessary modules
const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const cors = require('cors');

const bodyParser = require('body-parser');

// Create an instance of an Express application
const app = express();
const PORT = 8080;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());


// Define the path to your .proto file
const PROTO_PATH = '../../trident-server.proto';

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,            // Preserve the case of field names
  longs: String,             // Treat long values as strings
  enums: String,             // Treat enums as strings
  defaults: true,            // Use default values
  oneofs: true               // Include oneof fields
});

// Load the package definition into a gRPC object
const tridentProto = grpc.loadPackageDefinition(packageDefinition).trident;

// Create a gRPC client to connect to the gRPC server
const client = new tridentProto.HostManagement('192.168.242.2:50051', grpc.credentials.createInsecure());

// Define a route to handle the getHostStatus request
app.get('/getHostStatus', (req, res) => {
  console.log('Received request for /getHostStatus'); // Log request

  let responseData = [];

  // Make a gRPC call to GetHostStatus with an empty request
  const call = client.GetHostStatus({}, (error, response) => {
    if (error) {
      // If there is an error, send a 500 status with the error message
      return res.status(500).send(error);
    }
  });

  // Listen for data events from the gRPC stream
  call.on('data', (data) => {
    responseData.push(data);
  });

  // When the stream ends, send the collected data as a JSON response
  call.on('end', () => {
    res.json(responseData);
  });

  // Handle errors in the gRPC stream
  call.on('error', (error) => {
    console.error('Stream error:', error); // Log error

    res.status(500).send(error);
  });
});


// Define a route to handle the updateHost request with a POST request
app.post('/updateHost', (req, res) => {
  console.log('Received request for /updateHost');
  console.log(req.body);

  const { host_config, allowed_operations } = req.body;

  // Validate the request body
  // if (!host_config || !allowed_operations) {
  //   return res.status(400).send('Invalid request: Missing required fields.');
  // }

  let responseData = [];

  // Construct the request for gRPC
  const grpcRequest = {
    host_config: JSON.stringify(host_config),
    allowed_operations: JSON.stringify(allowed_operations)
  };

  console.log('gRPC Request:', grpcRequest);

  // Make a gRPC call to UpdateHost with the request body
  const call = client.UpdateHost(grpcRequest, (error, response) => {
    if (error) {
      // If there is an error, send a 500 status with the error message
      return res.status(500).send(error);
    }
  });

  // Listen for data events from the gRPC stream
  call.on('data', (data) => {
    responseData.push(data);
  });

  // When the stream ends, send the collected data as a JSON response
  call.on('end', () => {
    res.json(responseData);
  });

  // Handle errors in the gRPC stream
  call.on('error', (error) => {
    console.error('Stream error:', error); // Log error

    res.status(500).send(error);
  });
});


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
