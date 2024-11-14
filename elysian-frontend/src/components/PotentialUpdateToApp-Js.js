import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import VendorApplication from './components/VendorApplication';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Account />} />
                <Route path="/vendor-application" element={<VendorApplication />} />
            </Routes>
        </Router>
    );
}

export default App;
