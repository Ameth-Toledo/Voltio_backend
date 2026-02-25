import mqtt from 'mqtt';

const MQTT_BROKER_URL = process.env.MQTT_BROKER || 'mqtt://localhost:1883';

const MQTT_TOPICS = {
  ordenes_nuevo: 'ordenes/nuevo',
  ordenes_update: 'ordenes/actualizar',
};

// Cliente MQTT compartido (singleton)
let mqttClient: mqtt.MqttClient | null = null;

function getMqttClient(): mqtt.MqttClient {
  if (!mqttClient || !mqttClient.connected) {
    mqttClient = mqtt.connect(MQTT_BROKER_URL);

    mqttClient.on('connect', () => {
      console.log(`✅ API conectada al broker MQTT: ${MQTT_BROKER_URL}`);
    });

    mqttClient.on('error', (err) => {
      console.error(`❌ Error en conexión MQTT:`, err.message);
    });
  }
  return mqttClient;
}

export class OrdenNotificationService {

  static async notificarNuevaOrden(orden: any): Promise<void> {
    try {
      const client = getMqttClient();
      const payload = JSON.stringify({
        id_orden: orden.id_orden,
        id_usuario: orden.id_usuario,
        fecha_orden: orden.fecha_orden,
        estado_orden: orden.estado_orden,
        monto_total: orden.monto_total,
        descripcion: orden.descripcion,
        direccion: orden.direccion,
        metodo_pago: orden.metodo_pago,
        timestamp: new Date().toISOString()
      });

      client.publish(MQTT_TOPICS.ordenes_nuevo, payload, { qos: 1 }, (err) => {
        if (err) {
          console.warn(`⚠️  Error publicando nueva orden a MQTT: ${err.message}`);
        } else {
          console.log(`✅ Nueva orden publicada al broker MQTT`);
          console.log(`   Tópico: ${MQTT_TOPICS.ordenes_nuevo}`);
          console.log(`   ID Orden: ${orden.id_orden}`);
        }
      });
    } catch (error: any) {
      console.warn(`⚠️  Error al publicar orden a MQTT: ${error.message}`);
    }
  }

  static async notificarActualizacionOrden(orden: any): Promise<void> {
    try {
      const client = getMqttClient();
      const payload = JSON.stringify({
        id_orden: orden.id_orden,
        id_usuario: orden.id_usuario,
        estado_orden: orden.estado_orden,
        monto_total: orden.monto_total,
        descripcion: orden.descripcion,
        timestamp: new Date().toISOString()
      });

      client.publish(MQTT_TOPICS.ordenes_update, payload, { qos: 1 }, (err) => {
        if (err) {
          console.warn(`⚠️  Error publicando actualización de orden a MQTT: ${err.message}`);
        } else {
          console.log(`✅ Actualización de orden publicada al broker MQTT`);
          console.log(`   Tópico: ${MQTT_TOPICS.ordenes_update}`);
          console.log(`   ID Orden: ${orden.id_orden}`);
          console.log(`   Nuevo Estado: ${orden.estado_orden}`);
        }
      });
    } catch (error: any) {
      console.warn(`⚠️  Error al actualizar orden en MQTT: ${error.message}`);
    }
  }
}
