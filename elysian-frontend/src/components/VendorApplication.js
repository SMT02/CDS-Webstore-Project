import React, { useState } from 'react';
import ky from 'ky';
import styles from './VendorApplication.module.css';

function VendorApplication() {
    const [furnitureType, setFurnitureType] = useState('');
    const [businessDuration, setBusinessDuration] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { furnitureType, businessDuration, location };

        try {
            const response = await ky.post('http://localhost:5000/api/vendor-application', { json: payload }).json();
            setMessage(response.message || 'Application submitted successfully!');
        } catch (error) {
            setMessage('Failed to submit application');
            console.error('Error during vendor application:', error);
        }
    };

    return (
        <div className={styles["vendor-form-container"]}>
            <h2 className={styles["vendor-form-title"]}>Vendor Application</h2>
            <form onSubmit={handleSubmit} className={styles["vendor-form"]}>
                <input
                    type="text"
                    placeholder="Type of furniture you sell"
                    value={furnitureType}
                    onChange={(e) => setFurnitureType(e.target.value)}
                    required
                    className={styles["vendor-input"]}
                />
                <input
                    type="text"
                    placeholder="How long have you been in business?"
                    value={businessDuration}
                    onChange={(e) => setBusinessDuration(e.target.value)}
                    required
                    className={styles["vendor-input"]}
                />
                <input
                    type="text"
                    placeholder="Geographic location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className={styles["vendor-input"]}
                />
                <button type="submit" className={styles["vendor-button"]}>Submit Application</button>
            </form>
            {message && <p className={styles["vendor-message"]}>{message}</p>}
        </div>
    );
}

export default VendorApplication;
