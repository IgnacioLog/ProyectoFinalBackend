// src/App.js
import React from 'react';
import './App.css';
import PaymentForm from '../components/PaymentForm.js'; // Asegúrate de que la ruta de importación sea correcta

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
