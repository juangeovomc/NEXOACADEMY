# WhatsApp Automático Gratuito - Guía de Configuración

## Opciones Gratuitas para Envío Automático

### Opción 1: CallMeBot (Recomendado - Totalmente Gratis)

**Ventajas:**
- 100% gratis
- Sin límite de mensajes
- Fácil configuración
- Envío automático real

**Pasos:**
1. **Ve a [callmebot.com](https://www.callmebot.com/)**
2. **Crea cuenta gratuita**
3. **Guarda este número en WhatsApp**: +34 622 09 62 97
4. **Envía el mensaje**: "I allow callmebot to send me messages"
5. **Espera la confirmación**
6. **Copia tu API Key** del dashboard

**Configuración en el código:**
```javascript
// En whatsapp-automatico.js, línea 10
'apikey': 'TU_API_KEY_DE_CALLMEBOT', // <-- REEMPLAZA AQUÍ

// En línea 85
const yourPhoneNumber = '573123456789'; // <-- REEMPLAZA CON TU NÚMERO
```

---

### Opción 2: Waboxapp (Gratis hasta 1000 mensajes/mes)

**Ventajas:**
- 1000 mensajes gratis al mes
- Confiable y estable
- Envío automático

**Pasos:**
1. **Ve a [waboxapp.com](https://www.waboxapp.com/)**
2. **Crea cuenta gratuita**
3. **Conecta tu WhatsApp**
4. **Obtén tu token**
5. **Configura en el código**

---

### Opción 3: Ultramsg (Gratis 100 mensajes/día)

**Ventajas:**
- 100 mensajes gratis diarios
- API robusta
- Envío automático

**Pasos:**
1. **Ve a [ultramsg.com](https://ultramsg.com/)**
2. **Crea cuenta gratuita**
3. **Configura instancia**
4. **Obtén token**
5. **Configura en el código**

---

## Configuración Paso a Paso (CallMeBot)

### Paso 1: Configurar CallMeBot

1. **Abrir WhatsApp** en tu teléfono
2. **Agregar contacto**: +34 622 09 62 97
3. **Enviar mensaje**: "I allow callmebot to send me messages"
4. **Esperar respuesta**: "You are now subscribed"
5. **Ir a [callmebot.com](https://www.callmebot.com/)**
6. **Hacer clic en "Get API Key"**
7. **Copiar la API Key**

### Paso 2: Actualizar el Código

1. **Abrir `whatsapp-automatico.js`**
2. **Buscar línea 10**:
   ```javascript
   'apikey': 'TU_API_KEY_DE_CALLMEBOT',
   ```
3. **Reemplazar con tu API Key**:
   ```javascript
   'apikey': '1234567890abcdef',
   ```

4. **Buscar línea 85**:
   ```javascript
   const yourPhoneNumber = '573123456789';
   ```
5. **Reemplazar con tu número** (sin +):
   ```javascript
   const yourPhoneNumber = '573012345678';
   ```

### Paso 3: Incluir el Script

En `index.html`, antes de `</body>`:
```html
<script src="whatsapp-automatico.js"></script>
```

### Paso 4: Probar

1. **Llena el formulario** en tu sitio web
2. **Haz clic en "Completar Registro"**
3. **Deberías recibir el mensaje automáticamente** en WhatsApp

---

## Flujo de Envío Automático

### ¿Qué pasa cuando un usuario llena el formulario?

1. **Usuario completa el formulario**
2. **Clic en "Completar Registro"**
3. **JavaScript recopila los datos**
4. **Se envía automáticamente a CallMeBot**
5. **CallMeBot reenvía a tu WhatsApp**
6. **Usuario ve mensaje de éxito**
7. **Tú recibes el mensaje al instante**

### Mensaje que recibirás:

```
*NUEVO REGISTRO NEXOACADEMY*

*Datos Personales:*
Nombre: Juan Pérez
Email: juan@email.com
Teléfono: +57 301 234 5678
Edad: 35

*Información de Inversión:*
Inversión: $5,000 - $10,000
Procedencia: Ahorros personales

*Experiencia:*
Nivel: Principiante
Disponibilidad: Mañana (9:00-12:00)

*Objetivos:*
aprender, proteger

*Módulos de Interés:*
Módulo 1, Módulo 2

*Comentarios:*
Interesado en seguridad

*Fecha:* 15/01/2024, 10:30:00 a. m.
```

---

## Ventajas del Envío Automático

### Para ti:
- **Recibes mensajes al instante**
- **Sin intervención manual**
- **Datos organizados**
- **Timestamp automático**

### Para el usuario:
- **Experiencia fluida**
- **No necesita abrir WhatsApp**
- **Confirmación inmediata**
- **Proceso profesional**

---

## Manejo de Errores

### Fallback Automático
Si el envío automático falla:
1. **Muestra error al usuario**
2. **Ofrece enlace manual**
3. **Usuario puede enviar manualmente**
4. **No pierdes ningún lead**

### Problemas Comunes:

**"No recibo mensajes"**
- Verifica que guardaste el número +34 622 09 62 97
- Confirma que enviaste "I allow callmebot to send me messages"
- Revisa tu API Key

**"API Key inválida"**
- Copia la API Key exactamente del dashboard
- Sin espacios adicionales
- Revisa mayúsculas/minúsculas

**"Número incorrecto"**
- Usa formato: código de país + número (sin +)
- Ejemplo: 573012345678
- Sin espacios, guiones ni paréntesis

---

## Alternativas si CallMeBot no funciona

### Waboxapp
- 1000 mensajes/mes gratis
- Más profesional
- Requiere configuración inicial

### Ultramsg
- 100 mensajes/día gratis
- API más robusta
- Buen para bajo volumen

### Botmaker
- 50 mensajes/día gratis
- Con IA incluida
- Para mensajes personalizados

---

## Monitoreo

### Logs en Consola
```javascript
// Abre la consola del navegador (F12)
// Verás mensajes como:
console.log('Enviando a CallMeBot...');
console.log('Mensaje enviado exitosamente');
```

### Estadísticas
- **Mensajes enviados**: Revisa el dashboard de CallMeBot
- **Tasa de éxito**: Debería ser >95%
- **Tiempo de entrega**: <5 segundos

---

## Seguridad

### Protección de API Key
- **Nunca compartas** tu API Key
- **No la subas** a repositorios públicos
- **Rótala regularmente** si es necesario

### Validación de Datos
- **Sanitiza inputs** del formulario
- **Valida formato** de email/teléfono
- **Limita longitud** de mensajes

---

## Mejores Prácticas

### 1. Testing
- **Prueba con datos reales**
- **Verifica formato** del mensaje
- **Confirma entrega** en WhatsApp

### 2. Performance
- **Envío asíncrono**
- **Loading states** visibles
- **Timeouts** apropiados

### 3. UX
- **Feedback inmediato**
- **Mensajes claros**
- **Fallbacks útiles**

---

## Resumen

Con CallMeBot:
1. **Totalmente gratis**
2. **Envío automático real**
3. **Sin intervención del usuario**
4. **Configuración simple**
5. **Mensajes ilimitados**

**¡Tu formulario enviará mensajes a WhatsApp automáticamente!**
