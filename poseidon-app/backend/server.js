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

const getHostStatus = (res, retryCount = 0) => {
  const MAX_RETRIES = 10;
  const RETRY_INTERVAL = Math.min(1000 * 2 ** retryCount, 30000);

  let responseData = [];
  const call = client.GetHostStatus({}, (error, response) => {
    if (error) {
      console.error('Error in gRPC call:', error);
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          getHostStatus(res, retryCount + 1);
        }, RETRY_INTERVAL);
      } else {
        return res.status(500).send(error.message);
      }
    }
  });

  call.on('data', (data) => {
    responseData.push(data);
  });

  call.on('end', () => {
    if (!res.headersSent) {
      res.json(responseData);
    }
  });

  call.on('error', (error) => {
    console.error('Stream error:', error);
    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        getHostStatus(res, retryCount + 1);
      }, RETRY_INTERVAL);
    } else {
      if (!res.headersSent) {
        res.status(500).send({ message: 'Failed to get host status after multiple retries' });
      }
    }
  });
};

// Define a route to handle the getHostStatus request.
app.get('/getHostStatus', (req, res) => {
  console.log('Received request for /getHostStatus');
  getHostStatus(res);
});

// Define a route to handle the updateHost request with a POST request.
app.post('/updateHost', (req, res) => {
  console.log('Received request for /updateHost');
  console.log(req.body);

  const { host_config, allowed_operations } = req.body;

  const grpcRequest = {
    host_config: JSON.stringify(host_config),
    allowed_operations: JSON.stringify(allowed_operations),
  };
  console.log('gRPC Request:', grpcRequest);

  const call = client.UpdateHost(grpcRequest, (error, response) => {
    if (error) {
      // Log error without failing
      console.error('Error in gRPC call:', error);
    }
  });

  // Immediately respond to the client
  if (!res.headersSent) {
    res.status(200).send({ message: 'Host update initiated' });
  }

  call.on('error', (error) => {
    console.error('Stream error:', error);
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});
