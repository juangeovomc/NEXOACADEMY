// WhatsApp Automático Gratuito - Opciones sin API

// Opción 1: CallMeBot (Gratis y Automático)
async function sendWhatsAppCallMeBot(message, phoneNumber) {
  try {
    const response = await fetch('https://api.callmebot.com/whatsapp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'phone': phoneNumber, // Tu número con código de país sin +
        'apikey': 'TU_API_KEY', // API Key de CallMeBot (gratis)
        'message': message
      })
    });
    
    const result = await response.text();
    return result.includes('Message sent successfully');
  } catch (error) {
    console.error('Error con CallMeBot:', error);
    return false;
  }
}

// Opción 2: Waboxapp (Gratis hasta 1000 mensajes/mes)
async function sendWhatsAppWabox(message, phoneNumber) {
  try {
    const response = await fetch('https://www.waboxapp.com/api/send/pvt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'token': 'TU_TOKEN_WABOX', // Token gratuito de Wabox
        'uid': phoneNumber, // Tu número
        'to': phoneNumber, // Destino (tu mismo)
        'text': message
      })
    });
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error con Wabox:', error);
    return false;
  }
}

// Opción 3: Ultramsg (Gratis 100 mensajes/día)
async function sendWhatsAppUltramsg(message, phoneNumber) {
  try {
    const response = await fetch('https://api.ultramsg.com/instance12345/messages/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'token': 'TU_TOKEN_ULTRAMSG',
        'to': phoneNumber,
        'body': message
      })
    });
    
    const result = await response.json();
    return result.status === 'sent';
  } catch (error) {
    console.error('Error con Ultramsg:', error);
    return false;
  }
}

// Opción 4: Botmaker (Gratis 50 mensajes/día)
async function sendWhatsAppBotmaker(message, phoneNumber) {
  try {
    const response = await fetch('https://backend.botmaker.com/api/v1.0/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TU_TOKEN_BOTMAKER'
      },
      body: JSON.stringify({
        'chat_channel': 'whatsapp',
        'chat_user': phoneNumber,
        'chat_message': message
      })
    });
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error con Botmaker:', error);
    return false;
  }
}

// Función principal para enviar automáticamente
async function sendWhatsAppAuto(formData) {
  // Crear mensaje formateado
  const message = `*NUEVO REGISTRO NEXOACADEMY* 

*Datos Personales:*
Nombre: ${formData.nombre}
Email: ${formData.email}
Teléfono: ${formData.telefono}
Edad: ${formData.edad}

*Información de Inversión:*
Inversión: ${formData.inversion}
Procedencia: ${formData.procedencia}

*Experiencia:*
Nivel: ${formData.experiencia}
Disponibilidad: ${formData.disponibilidad}

*Objetivos:*
${formData.objetivos}

*Módulos de Interés:*
${formData.modulos}

*Comentarios:*
${formData.comentarios || 'Ninguno'}

*Fecha:* ${new Date().toLocaleString('es-CO')}`;
  
  const yourPhoneNumber = '573123456789'; // REEMPLAZA CON TU NÚMERO
  
  // Intentar con diferentes servicios en orden de preferencia
  const services = [
    { name: 'CallMeBot', func: () => sendWhatsAppCallMeBot(message, yourPhoneNumber) },
    { name: 'Wabox', func: () => sendWhatsAppWabox(message, yourPhoneNumber) },
    { name: 'Ultramsg', func: () => sendWhatsAppUltramsg(message, yourPhoneNumber) },
    { name: 'Botmaker', func: () => sendWhatsAppBotmaker(message, yourPhoneNumber) }
  ];
  
  for (let service of services) {
    try {
      const success = await service.func();
      if (success) {
        return { success: true, service: service.name };
      }
    } catch (error) {
      console.log(`Falló ${service.name}:`, error);
      continue;
    }
  }
  
  return { success: false, error: 'Todos los servicios fallaron' };
}

// Actualizar el formulario para envío automático
function setupAutomaticWhatsApp() {
  const registroForm = document.getElementById('registroForm');
  
  if (registroForm) {
    registroForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      try {
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando automáticamente...';
        submitBtn.disabled = true;
        
        // Recopilar datos del formulario
        const formData = {
          nombre: document.getElementById('regNombre').value,
          email: document.getElementById('regEmail').value,
          telefono: document.getElementById('regTelefono').value,
          edad: document.getElementById('regEdad').value,
          inversion: document.getElementById('regInversion').value,
          procedencia: document.getElementById('regProcedencia').value,
          experiencia: document.getElementById('regExperiencia').value,
          disponibilidad: document.getElementById('regDisponibilidad').value,
          objetivos: getCheckedValues('regObjetivos'),
          modulos: getCheckedValues('regModulos'),
          comentarios: document.getElementById('regComentarios').value
        };
        
        // Enviar automáticamente a WhatsApp
        const result = await sendWhatsAppAuto(formData);
        
        if (result.success) {
          // Éxito automático
          submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>¡Enviado automáticamente!';
          submitBtn.classList.remove('btn-primary');
          submitBtn.classList.add('btn-success');
          
          const successAlert = document.createElement('div');
          successAlert.className = 'alert alert-success mt-3';
          successAlert.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>¡Registro completado!</strong><br>
            Tu información ha sido enviada automáticamente a WhatsApp usando ${result.service}.
          `;
          this.appendChild(successAlert);
          
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.add('btn-primary');
            submitBtn.classList.remove('btn-success');
            submitBtn.disabled = false;
            successAlert.remove();
            this.reset();
          }, 5000);
        } else {
          throw new Error('Error en el envío automático');
        }
        
      } catch (error) {
        console.error('Error:', error);
        
        // Fallback a WhatsApp manual
        submitBtn.innerHTML = '<i class="bi bi-whatsapp me-2"></i>Enviar manualmente';
        submitBtn.classList.remove('btn-primary');
        submitBtn.classList.add('btn-warning');
        
        const message = `*NUEVO REGISTRO NEXOACADEMY* 

*Datos Personales:*
Nombre: ${document.getElementById('regNombre').value}
Email: ${document.getElementById('regEmail').value}
Teléfono: ${document.getElementById('regTelefono').value}
Edad: ${document.getElementById('regEdad').value}

*Información de Inversión:*
Inversión: ${document.getElementById('regInversion').value}
Procedencia: ${document.getElementById('regProcedencia').value}

*Experiencia:*
Nivel: ${document.getElementById('regExperiencia').value}
Disponibilidad: ${document.getElementById('regDisponibilidad').value}

*Objetivos:*
${getCheckedValues('regObjetivos')}

*Módulos de Interés:*
${getCheckedValues('regModulos')}

*Comentarios:*
${document.getElementById('regComentarios').value || 'Ninguno'}

*Fecha:* ${new Date().toLocaleString('es-CO')}`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/573123456789?text=${encodedMessage}`;
        
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-warning mt-3';
        errorAlert.innerHTML = `
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Envío automático falló</strong><br>
          <a href="${whatsappLink}" target="_blank" class="alert-link">Haz clic aquí para enviar manualmente</a>.
        `;
        this.appendChild(errorAlert);
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.classList.add('btn-primary');
          submitBtn.classList.remove('btn-warning');
          submitBtn.disabled = false;
          errorAlert.remove();
        }, 5000);
      }
    });
  }
}

// Helper function
function getCheckedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map(cb => cb.value).join(', ');
}

// Exportar para uso global
window.WhatsAppAuto = {
  sendWhatsAppAuto,
  setupAutomaticWhatsApp
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  setupAutomaticWhatsApp();
});
