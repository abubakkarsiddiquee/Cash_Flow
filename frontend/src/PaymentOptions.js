import React, { useState } from 'react';

const PaymentOptions = ({ setPaymentMethod, setPhone }) => {
  const [selectedMethod, setSelectedMethod] = useState('stripe');

  const handleMethodChange = (e) => {
    const method = e.target.value;
    setSelectedMethod(method);
    setPaymentMethod(method);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Select Payment Method</h2>
      
      <select
        value={selectedMethod}
        onChange={handleMethodChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="stripe">Stripe</option>
        <option value="bkash">bKash</option>
        <option value="nagad">Nagad</option>
      </select>

      <input
        type="text"
        placeholder="Enter your phone number"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  );
};

export default PaymentOptions;