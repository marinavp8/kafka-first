// enviarCotizacion.js
//
// Este programa selecciona al azar un ticker de una lista de 20, genera un valor y la fecha actual,
// y envía estos datos como mensaje al topic 'cotizacion' de Kafka, con un header personalizado.
// Envía 1000 mensajes, uno cada segundo.
//
// Requisitos:
//   - Tener corriendo un broker Kafka en localhost:9092
//   - Haber instalado la librería kafkajs (npm install kafkajs)
//
// Ejecución:
//   node enviarCotizacion.js

const { Kafka } = require('kafkajs');

// Configuración del cliente Kafka
const kafka = new Kafka({
  clientId: 'cotizacion-producer', // Identificador del cliente
  brokers: ['localhost:9092']      // Dirección del broker Kafka
});

// Se crea un producer
const producer = kafka.producer();

// Lista de 20 tickers posibles
const tickers = [
  'AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA',
  'META', 'NFLX', 'NVDA', 'BABA', 'ORCL',
  'INTC', 'AMD', 'CSCO', 'IBM', 'SAP',
  'ADBE', 'CRM', 'UBER', 'LYFT', 'TWTR'
];

// Selecciona un ticker al azar
function getRandomTicker() {
  return tickers[Math.floor(Math.random() * tickers.length)];
}

// Genera un valor aleatorio entre 100 y 1100
function getRandomValue() {
  return (Math.random() * 1000 + 100).toFixed(2);
}

// Envía un mensaje al topic 'cotizacion'
async function sendCotizacion() {
  const ticker = getRandomTicker();
  const fecha = new Date().toISOString();
  const valor = getRandomValue();

  const message = {
    ticker,
    fecha,
    valor
  };

  await producer.send({
    topic: 'cotizacion',
    messages: [
      {
        key: ticker,
        value: JSON.stringify(message),
        headers: { key: 'key1' } // Header personalizado
      }
    ]
  });
  console.log('Mensaje enviado:', message);
}

// Conecta el producer y envía 1000 mensajes, uno cada segundo
async function run() {
  await producer.connect();
  for (let i = 0; i < 1000; i++) {
    await sendCotizacion();
    await new Promise(res => setTimeout(res, 1000));
  }
  await producer.disconnect();
}

run().catch(console.error); 