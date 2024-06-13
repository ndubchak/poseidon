import React, { useState } from 'react';
import { GetHostStatusRequest } from '../proto/trident-server_pb';
import { HostManagementClient } from '../proto/trident-server_grpc_web_pb';

function LandingPage() {
    const [error, setError] = useState('');
    const [response, setResponse] = useState(null);

    const handleButtonClick = () => {
        const client = new HostManagementClient('http://localhost:8080', null, null);
        const request = new GetHostStatusRequest();

        console.log("Sending request to server...");

        client.getHostStatus(request, {}, (err, response) => {
            if (err) {
                console.error('Error:', err);
                setError(`Error: ${err.message}`);
                return;
            }
            console.log('Response:', response.getHostStatus());
            setResponse(response.getHostStatus());
        });
    };

    return (
        <div>
            <h1>Get Host Status</h1>
            <button onClick={handleButtonClick}>Get Host Status</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && <p>Response: {response}</p>}
        </div>
    );
}

export default LandingPage;
