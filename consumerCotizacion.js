const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'cotizacion-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'cotizacion-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'cotizacion', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      const headers = message.headers;
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

run().catch(console.error); 