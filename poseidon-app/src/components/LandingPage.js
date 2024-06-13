import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetHostStatusRequest } from '../proto/trident-server_pb';
import { HostManagementClient } from '../proto/trident-server_grpc_web_pb';

function LandingPage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleButtonClick = () => {
        const ip = 'localhost';
        const port = '8080';

        console.log(`Sending request to http://${ip}:${port}`);

        const client = new HostManagementClient(`http://${ip}:${port}`, null, null);
        const request = new GetHostStatusRequest();

        console.log("Hostname:", client.hostname_);
        console.log("Request:", request);

        console.log("NOW Sending request to server...");
        client.getHostStatus(request, {}, (err, response) => {
            if (err) {
                console.error('Error:', err);
                return;
            }
            console.log('Response:', response.getMessage());

        });
    }

    return (
        <div>
            <h1>Get Host Status</h1>
            <button onClick={handleButtonClick}>Get Host Status</button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}

export default LandingPage;
