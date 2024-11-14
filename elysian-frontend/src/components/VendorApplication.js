import React, { useState } from 'react';
import ky from 'ky';
import styles from './VendorApplication.module.css';

function VendorApplication() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [products, setProducts] = useState([{ type: '', name: '', image: null }]);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [message, setMessage] = useState('');

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    const addProduct = () => {
        setProducts((prev) => [...prev, { type: '', name: '', image: null }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            setMessage('You must accept the terms and conditions.');
            return;
        }

        const payload = {
            fullName,
            email,
            phone,
            businessName,
            products,
        };

        try {
            const response = await ky
                .post('http://localhost:5000/api/vendor-application', { json: payload })
                .json();
            setMessage(response.message || 'Application submitted successfully!');
        } catch (error) {
            setMessage('Failed to submit application');
            console.error('Error during vendor application:', error);
        }
    };

    return (
        <div className={styles['vendor-form-container']}>
            <h1 className={styles['vendor-form-title']}>Vendor Application Form</h1>
            <p className={styles['vendor-form-subtitle']}>
                Let the world see your amazing products!
            </p>
            <form onSubmit={handleSubmit} className={styles['vendor-form']}>
                <h2 className={styles['section-title']}>Vendor Information</h2>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className={styles['vendor-input']}
                />
                <input
                    type="email"
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles['vendor-input']}
                />
                <input
                    type="text"
                    placeholder="Enter your contact number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={styles['vendor-input']}
                />
                <input
                    type="text"
                    placeholder="Enter your registered business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className={styles['vendor-input']}
                />

                <h2 className={styles['section-title']}>Upload Products</h2>
                <p className={styles['instructions']}>
                    Upload the products you'd like to sell in our store. Each product must include its type,
                    name, and one image.
                </p>
                {products.map((product, index) => (
                    <div key={index} className={styles['product-upload']}>
                        <select
                            value={product.type}
                            onChange={(e) => handleProductChange(index, 'type', e.target.value)}
                            required
                            className={styles['vendor-select']}
                        >
                            <option value="" disabled>
                                Select product type
                            </option>
                            <option value="Chairs">Chairs</option>
                            <option value="Sofas">Sofas</option>
                            <option value="Tables">Tables</option>
                            <option value="Beds">Beds</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Enter the product name"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                            required
                            className={styles['vendor-input']}
                        />
                        <input
                            type="file"
                            accept=".jpg, .png, .gif"
                            onChange={(e) => handleProductChange(index, 'image', e.target.files[0])}
                            required
                            className={styles['vendor-file-input']}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addProduct}
                    className={styles['add-product-button']}
                >
                    + Add Another Product
                </button>

                <h2 className={styles['section-title']}>Terms and Conditions</h2>
                <label>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        required
                    />{' '}
                    I agree to the [Store Name] Vendor Terms and Conditions.
                </label>

                <button type="submit" className={styles['vendor-button']}>
                    Submit Application
                </button>
            </form>
            {message && <p className={styles['vendor-message']}>{message}</p>}
        </div>
    );
}

export default VendorApplication;
