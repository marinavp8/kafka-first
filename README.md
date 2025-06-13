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
