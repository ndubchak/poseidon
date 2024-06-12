// src/components/ResponsePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function ResponsePage() {
    const location = useLocation();
    const { status } = location.state || {};

    return (
        <div>
            <h1>Server Response</h1>
            <p>Status: {status ? status : "No status received"}</p>
        </div>
    );
}

export default ResponsePage;
