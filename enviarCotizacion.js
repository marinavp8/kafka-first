const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'cotizacion-producer',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const tickers = [
  'AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA',
  'META', 'NFLX', 'NVDA', 'BABA', 'ORCL',
  'INTC', 'AMD', 'CSCO', 'IBM', 'SAP',
  'ADBE', 'CRM', 'UBER', 'LYFT', 'TWTR'
];

function getRandomTicker() {
  return tickers[Math.floor(Math.random() * tickers.length)];
}

function getRandomValue() {
  return (Math.random() * 1000 + 100).toFixed(2);
}

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
        headers: { key: 'key1' }
      }
    ]
  });
  console.log('Mensaje enviado:', message);
}

async function run() {
  await producer.connect();
  for (let i = 0; i < 1000; i++) {
    await sendCotizacion();
    await new Promise(res => setTimeout(res, 1000));
  }
  await producer.disconnect();
}

run().catch(console.error); 