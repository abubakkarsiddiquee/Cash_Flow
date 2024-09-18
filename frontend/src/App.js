import React, { useState } from 'react';

const PaymentOptions = () => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(5000); // Example amount in cents

  const handlePayment = async () => {
    if (paymentMethod === 'bkash') {
      // Call backend for bKash payment
      const response = await fetch('http://localhost:5000/bkash-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, phone }),
      });
      const result = await response.json();
      alert(result.message);
    } else if (paymentMethod === 'nagad') {
      // Call backend for Nagad payment
      const response = await fetch('http://localhost:5000/nagad-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, phone }),
      });
      const result = await response.json();
      alert(result.message);
    }
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="stripe">Stripe</option>
        <option value="bkash">bKash</option>
        <option value="nagad">Nagad</option>
      </select>

      <input
        type="text"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default PaymentOptions;
