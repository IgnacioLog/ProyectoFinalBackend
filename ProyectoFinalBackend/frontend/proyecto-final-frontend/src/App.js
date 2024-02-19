// src/App.js
import React from 'react';
import './App.css';
import PaymentForm from '../components/PaymentForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pago con Stripe</h1>
        <PaymentForm />
      </header>
    </div>
  );
}

export default App;
