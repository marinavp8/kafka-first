# Sistema de Cotizaciones con Kafka

Este proyecto implementa un sistema de cotizaciones en tiempo real utilizando Apache Kafka como sistema de mensajería.

## Requisitos Previos

- Docker y Docker Compose
- Node.js (versión 14 o superior)
- npm o yarn


1. Iniciar los contenedores de Kafka:

```bash
docker-compose up -d
```

2. Instalar las dependencias:


```bash
npm install
```

3. Ejecutar el productor de cotizaciones:

```bash
node enviarCotizacion.js
``` 

4. Ejecutar el consumidor de cotizaciones:

```bash
node consumerCotizacion.js
```

# Notas importantes

- El productor y el consumidor se conectan al broker Kafka en localhost:9092.
- El productor envía 1000 mensajes al topic 'cotizacion' cada segundo.
- El consumidor muestra por consola cada mensaje recibido, incluyendo el valor y los headers.
- El consumidor se suscribe al topic 'cotizacion' desde el principio.
- Los mensaje de kafka no se borran, se deben borrar manualmente.
- Hay politicas de retencion de mensajes, se debe configurar el topic para que se borren los mensajes. Puede ser por tiempo o por tamaño.
- Los mensajes tienen una clave. En el ejemplo es el ticker.
- Hay particiones a nivel de topic. En el ejemplo se usan 2 particiones.
- Si no se especifica cuando se crea el topic el numero de particiones, hay un numero definido por defecto.


