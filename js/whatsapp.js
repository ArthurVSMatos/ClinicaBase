/**
 * WHATSAPP MODULE
 * Centraliza a comunicação e os redirecionamentos para o WhatsApp.
 */

function openWhatsApp(message = "") {
    const phone = clinicConfig.clinic.whatsapp;
    const cleanPhone = phone.replace(/\D/g, "");
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`;
    window.open(url, "_blank");
}

function generateBookingMessage(bookingData) {
    const { categoryName, serviceName, professionalName, date, customDate, time, clientName, clientPhone } = bookingData;

    // 1. Define a data inicial (usa customDate se existir, senão usa date)
    let finalDate = customDate || date;

    // 2. Se a data for "Outra Data" (ou contiver "outra"), busca o valor do input de data na tela
    if (typeof finalDate === "string" && finalDate.toLowerCase().includes("outra")) {
        const dateInput = document.querySelector('input[type="date"]') ||
            document.getElementById('custom-date') ||
            document.getElementById('booking-date') ||
            document.getElementById('date');

        if (dateInput && dateInput.value) {
            finalDate = dateInput.value;
        }
    }

    // 3. Se a data estiver no formato AAAA-MM-DD (padrão do HTML input date), converte para DD/MM/AAAA
    if (typeof finalDate === "string" && finalDate.includes("-")) {
        const [year, month, day] = finalDate.split("-");
        if (year && month && day) {
            finalDate = `${day}/${month}/${year}`;
        }
    }

    return `Olá! Gostaria de agendar um atendimento na *${clinicConfig.clinic.name}*:\n\n` +
        `• *Procedimento:* ${serviceName}\n` +
        `• *Categoria:* ${categoryName}\n` +
        `• *Profissional:* ${professionalName}\n` +
        `• *Data:* ${finalDate}\n` +
        `• *Horário:* ${time}\n\n` +
        `*Dados para Contato:*\n` +
        `• *Nome:* ${clientName}\n` +
        `• *Telefone:* ${clientPhone}\n\n` +
        `Aguardo confirmação dos horários vagos!`;
}

function generateContactMessage(contactData) {
    const { name, phone, message } = contactData;
    return `Olá! Meu nome é *${name}* (${phone}).\n\n` +
        `*Mensagem enviada pelo site:*\n"${message}"`;
}