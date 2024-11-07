import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Komponen utama aplikasi
const App = () => {
  // Mendefinisikan state 'rates' untuk menyimpan data kurs mata uang
  const [rates, setRates] = useState([]);
  
  // API Key untuk mengakses data dari CurrencyFreaks
  const API_KEY = '0c0ead3794b847c6a26e282b94a595e9';

  // Mengambil data kurs mata uang saat komponen pertama kali di-render
  useEffect(() => {
    // Fungsi untuk mengambil data kurs dari API
    const fetchRates = async () => {
      try {
        // Meminta data dari API CurrencyFreaks menggunakan Axios
        const response = await axios.get(
          `https://api.currencyfreaks.com/latest?apikey=${API_KEY}`
        );
        
        // Mengambil objek 'rates' dari respons data API
        const { rates } = response.data;

        // Mata uang yang akan ditampilkan di tabel
        const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];
        
        // Memproses data kurs untuk setiap mata uang
        const processedRates = currencies.map(currency => {
          // Mengubah nilai kurs dari string ke float
          const exchangeRate = parseFloat(rates[currency]);
          return {
            currency, // Nama mata uang
            exchangeRate, // Nilai kurs
            weBuy: (exchangeRate * 1.05).toFixed(4), // Nilai 'We Buy' 5% lebih tinggi dari kurs
            weSell: (exchangeRate * 0.95).toFixed(4) // Nilai 'We Sell' 5% lebih rendah dari kurs
          };
        });
        
        // Mengupdate state 'rates' dengan data yang telah diproses
        setRates(processedRates);
      } catch (error) {
        // Menangani error jika terjadi masalah saat mengambil data
        console.error("Error fetching currency rates:", error);
      }
    };

    // Memanggil fungsi 'fetchRates' untuk mengambil data dari API
    fetchRates();
  }, []); // Array kosong memastikan 'useEffect' hanya berjalan sekali saat komponen di-render

  return (
    <div className="App">
      {/* Tabel untuk menampilkan data kurs mata uang */}
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {/* Menampilkan setiap baris data kurs yang disimpan di state 'rates' */}
          {rates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy}</td>
              <td>{rate.exchangeRate.toFixed(4)}</td>
              <td>{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Informasi tambahan di bawah tabel */}
      <p>Tarif mulai dari 1 USD.</p>
      <p>Aplikasi ini menggunakan API dari <a href="https://currencyfreaks.com">CurrencyFreaks</a>.</p>
    </div>
  );
};

export default App;
