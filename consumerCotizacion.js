/**
 * Consumidor de cotizaciones de Kafka
 * Este script se conecta a un broker de Kafka y consume mensajes del topic 'cotizacion'
 */

// consumerCotizacion.js
//
// Este programa se conecta a un broker Kafka, se suscribe al topic 'cotizacion'
// y muestra por consola cada mensaje recibido, incluyendo el valor y los headers.
//
// Requisitos:
//   - Tener corriendo un broker Kafka en localhost:9092
//   - Haber instalado la librería kafkajs (npm install kafkajs)
//
// Ejecución:
//   node consumerCotizacion.js

const { Kafka } = require('kafkajs');

// Configuración del cliente Kafka
const kafka = new Kafka({
  clientId: 'cotizacion-consumer', // Identificador del cliente
  brokers: ['localhost:9092']      // Dirección del broker Kafka
});

// Se crea un consumer dentro del grupo 'cotizacion-group'
const consumer = kafka.consumer({ groupId: 'cotizacion-group' });

async function run() {
  // Conexión al broker
  await consumer.connect();
  // Suscripción al topic 'cotizacion' desde el principio
  await consumer.subscribe({ topic: 'cotizacion', fromBeginning: true });

  // Procesamiento de cada mensaje recibido
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // Se obtiene el valor y los headers del mensaje
      const value = message.value.toString();
      const headers = message.headers;
      // Se imprime la información relevante del mensaje
      console.log({
        topic,
        partition,
        key: message.key && message.key.toString(),
        value,
        headers: headers && Object.fromEntries(Object.entries(headers).map(([k, v]) => [k, v.toString()]))
      });
    }
  });
}

// Inicio del consumer
run().catch(console.error);