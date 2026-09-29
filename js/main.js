/**
 * MAIN CONTROLLER
 * Aplica configurações, gerencia a interface e controla o Modal de Agendamento em 7 Passos.
 */

document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    populateGlobalContent();
    setupMobileMenu();
    setupBookingModal();

    // Execuções específicas por página
    if (document.getElementById("featured-services-grid")) renderFeaturedServices();
    if (document.getElementById("all-procedures-container")) renderAllProcedures();
    if (document.getElementById("team-grid")) renderTeam();
    if (document.getElementById("testimonials-grid")) renderTestimonials();
    if (document.getElementById("contact-form")) setupContactForm();
});

/* --- TEMA DINÂMICO --- */
function applyTheme() {
    const root = document.documentElement;
    const { theme } = clinicConfig;
    if (theme) {
        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-primary-dark', theme.primaryDark);
        root.style.setProperty('--color-background', theme.background);
        root.style.setProperty('--color-secondary', theme.secondary);
        root.style.setProperty('--color-text', theme.text);
        root.style.setProperty('--color-text-secondary', theme.textSecondary);
        root.style.setProperty('--color-white', theme.white);
    }
}

/* --- PREENCHIMENTO GLOBAL DADOS DA CLÍNICA --- */
function populateGlobalContent() {
    const { clinic, openingHours } = clinicConfig;

    document.title = `${clinic.name} | Estética e Bem-Estar`;

    document.querySelectorAll('[data-bind]').forEach(el => {
        const key = el.getAttribute('data-bind');
        if (key === 'clinic.name') el.textContent = clinic.name;
        if (key === 'clinic.slogan') el.textContent = clinic.slogan;
        if (key === 'clinic.phone') el.textContent = clinic.phone;
        if (key === 'clinic.address') el.textContent = `${clinic.address} - ${clinic.cityState}`;
        if (key === 'clinic.hours.weekdays') el.textContent = openingHours.weekdays;
        if (key === 'clinic.hours.saturday') el.textContent = openingHours.saturday;
        if (key === 'clinic.hours.sunday') el.textContent = openingHours.sunday;
        if (key === 'clinic.instagramHandle') el.textContent = clinic.instagramHandle;
        if (key === 'clinic.instagram') el.href = clinic.instagram;
        if (key === 'clinic.maps') el.href = clinic.googleMapsLink;
    });
}

/* --- MENU MOBILE --- */
function setupMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-menu');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
}

/* --- RENDERIZAR SERVIÇOS EM DESTAQUE NA HOME (MAX 8) --- */
function renderFeaturedServices() {
    const container = document.getElementById("featured-services-grid");
    if (!container) return;

    let featuredServices = [];
    clinicConfig.categories.forEach(cat => {
        cat.services.forEach(serv => {
            if (serv.featured) {
                featuredServices.push({ ...serv, categoryName: cat.name });
            }
        });
    });

    // Limite rigoroso de no máximo 8 itens
    featuredServices = featuredServices.slice(0, 8);

    container.innerHTML = featuredServices.map(service => `
        <article class="card">
            <img src="${service.image}" alt="${service.name}" class="card-image" loading="lazy">
            <div class="card-body">
                <span style="font-size:0.75rem; color:var(--color-primary); font-weight:700; text-transform:uppercase;">${service.categoryName}</span>
                <h3 class="card-title">${service.name}</h3>
                <p class="card-text">${service.description}</p>
                <button class="btn btn-secondary btn-block" onclick="openBookingModalWithService('${service.id}')">Agendar este procedimento</button>
            </div>
        </article>
    `).join('');
}

/* --- RENDERIZAR TODOS OS PROCEDIMENTOS (PÁGINA PROCEDIMENTOS.HTML) --- */
function renderAllProcedures() {
    const container = document.getElementById("all-procedures-container");
    if (!container) return;

    container.innerHTML = clinicConfig.categories.map(category => `
        <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.6rem; margin-bottom: 8px; color: var(--color-primary-dark);">${category.name}</h2>
            <p style="color: var(--color-text-secondary); margin-bottom: 24px;">${category.description}</p>
            <div class="grid-3">
                ${category.services.map(service => `
                    <article class="card">
                        <img src="${service.image}" alt="${service.name}" class="card-image" loading="lazy">
                        <div class="card-body">
                            <h3 class="card-title">${service.name}</h3>
                            <p class="card-text">${service.description}</p>
                            <button class="btn btn-primary btn-block" onclick="openBookingModalWithService('${service.id}')">Agendar avaliação</button>
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>
    `).join('');
}

/* --- RENDERIZAR EQUIPE --- */
function renderTeam() {
    const container = document.getElementById("team-grid");
    if (!container) return;

    container.innerHTML = clinicConfig.professionals.map(pro => `
        <article class="card">
            <img src="${pro.image}" alt="${pro.name}" class="card-image" style="height: 280px;" loading="lazy">
            <div class="card-body">
                <h3 class="card-title">${pro.name}</h3>
                <span style="color: var(--color-primary); font-weight:600; font-size:0.9rem; margin-bottom: 12px; display:block;">${pro.role}</span>
                <p class="card-text">${pro.description}</p>
            </div>
        </article>
    `).join('');
}

/* --- RENDERIZAR DEPOIMENTOS --- */
function renderTestimonials() {
    const container = document.getElementById("testimonials-grid");
    if (!container) return;

    container.innerHTML = clinicConfig.testimonials.map(t => `
        <div class="testimonial-card">
            <p>"${t.quote}"</p>
            <div class="testimonial-author">— ${t.author}</div>
        </div>
    `).join('');
}

/* --- FORMULÁRIO DE CONTATO (DIRETO PARA WHATSAPP) --- */
function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("contact-name").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !phone) {
            alert("Por favor, preencha o seu nome e telefone.");
            return;
        }

        const msg = generateContactMessage({ name, phone, message });
        openWhatsApp(msg);
    });
}

/* ==========================================================================
   STEPPER MODAL DE AGENDAMENTO EM 7 ETAPAS
   ========================================================================== */

let bookingState = {
    step: 1,
    categoryId: null,
    categoryName: '',
    serviceId: null,
    serviceName: '',
    professionalId: null,
    professionalName: '',
    date: '',
    time: '',
    clientName: '',
    clientPhone: ''
};

function setupBookingModal() {
    const backdrop = document.getElementById("booking-modal");
    if (!backdrop) return;

    document.querySelectorAll('.trigger-booking').forEach(btn => {
        btn.addEventListener('click', () => openBookingModal());
    });

    document.getElementById("modal-close-btn").addEventListener('click', closeBookingModal);
    document.getElementById("modal-prev-btn").addEventListener('click', prevStep);
    document.getElementById("modal-next-btn").addEventListener('click', nextStep);
}

function openBookingModal() {
    bookingState = {
        step: 1, categoryId: null, categoryName: '', serviceId: null,
        serviceName: '', professionalId: null, professionalName: '',
        date: '', time: '', clientName: '', clientPhone: ''
    };
    renderModalStep();
    document.getElementById("booking-modal").classList.add("active");
}

function openBookingModalWithService(serviceId) {
    openBookingModal();
    // Encontra categoria e serviço pré-selecionados
    for (let cat of clinicConfig.categories) {
        let found = cat.services.find(s => s.id === serviceId);
        if (found) {
            bookingState.categoryId = cat.id;
            bookingState.categoryName = cat.name;
            bookingState.serviceId = found.id;
            bookingState.serviceName = found.name;
            bookingState.step = 3; // Pula para seleção de profissional
            renderModalStep();
            break;
        }
    }
}

function closeBookingModal() {
    document.getElementById("booking-modal").classList.remove("active");
}

function prevStep() {
    if (bookingState.step > 1) {
        bookingState.step--;
        renderModalStep();
    }
}

function nextStep() {
    if (!validateCurrentStep()) return;

    if (bookingState.step < 7) {
        bookingState.step++;
        renderModalStep();
    } else {
        // Passo 7: Confirmação e Redirecionamento para WhatsApp
        const msg = generateBookingMessage(bookingState);
        openWhatsApp(msg);
        closeBookingModal();
    }
}

function validateCurrentStep() {
    if (bookingState.step === 1 && !bookingState.categoryId) {
        alert("Por favor, selecione uma categoria.");
        return false;
    }
    if (bookingState.step === 2 && !bookingState.serviceId) {
        alert("Por favor, selecione um procedimento.");
        return false;
    }
    if (bookingState.step === 3 && !bookingState.professionalId) {
        alert("Por favor, escolha um profissional.");
        return false;
    }
    if (bookingState.step === 4) {
        const customDateInput = document.getElementById("custom-date-input");
        const customContainer = document.getElementById("custom-date-container");

        // Se a opção visível for o calendário de data personalizada
        if (customContainer && customContainer.style.display !== 'none') {
            if (customDateInput && customDateInput.value) {
                handleCustomDateChange(customDateInput.value);
            } else {
                alert("Por favor, escolha uma data válida no calendário.");
                return false;
            }
        }

        if (!bookingState.date || bookingState.date === 'Outra Data') {
            alert("Por favor, selecione uma data.");
            return false;
        }
    }
    if (bookingState.step === 5 && !bookingState.time) {
        alert("Por favor, selecione um horário.");
        return false;
    }
    if (bookingState.step === 6) {
        const name = document.getElementById("step-client-name")?.value.trim();
        const phone = document.getElementById("step-client-phone")?.value.trim();
        if (!name || !phone) {
            alert("Por favor, informe seu nome e telefone para contato.");
            return false;
        }
        bookingState.clientName = name;
        bookingState.clientPhone = phone;
    }
    return true;
}

function renderModalStep() {
    const stepTitle = document.getElementById("modal-step-title");
    const stepCounter = document.getElementById("modal-step-counter");
    const progressFill = document.getElementById("modal-progress-fill");
    const body = document.getElementById("modal-step-body");
    const prevBtn = document.getElementById("modal-prev-btn");
    const nextBtn = document.getElementById("modal-next-btn");

    stepCounter.textContent = `Passo ${bookingState.step} de 7`;
    progressFill.style.width = `${(bookingState.step / 7) * 100}%`;

    prevBtn.style.display = bookingState.step === 1 ? 'none' : 'inline-flex';
    nextBtn.textContent = bookingState.step === 7 ? 'Confirmar via WhatsApp' : 'Avançar';

    switch (bookingState.step) {
        case 1:
            stepTitle.textContent = "Escolha a Categoria";
            body.innerHTML = `
                <div class="option-grid">
                    ${clinicConfig.categories.map(c => `
                        <div class="option-card ${bookingState.categoryId === c.id ? 'selected' : ''}" onclick="selectCategory('${c.id}', '${c.name}')">
                            <div class="option-title">${c.name}</div>
                            <div class="option-desc">${c.description}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 2:
            stepTitle.textContent = "Escolha o Procedimento";
            const currentCat = clinicConfig.categories.find(c => c.id === bookingState.categoryId);
            body.innerHTML = `
                <div class="option-grid">
                    ${currentCat ? currentCat.services.map(s => `
                        <div class="option-card ${bookingState.serviceId === s.id ? 'selected' : ''}" onclick="selectService('${s.id}', '${s.name}')">
                            <div class="option-title">${s.name}</div>
                            <div class="option-desc">${s.description}</div>
                        </div>
                    `).join('') : '<p>Selecione uma categoria primeiro.</p>'}
                </div>
            `;
            break;

        case 3:
            stepTitle.textContent = "Escolha o Profissional";
            body.innerHTML = `
                <div class="option-grid">
                    <div class="option-card ${bookingState.professionalId === 'any' ? 'selected' : ''}" onclick="selectProfessional('any', 'Sem preferência (Primeiro disponível)')">
                        <div class="option-title">Sem preferência</div>
                        <div class="option-desc">Agendar com o profissional disponível mais rápido.</div>
                    </div>
                    ${clinicConfig.professionals.map(p => `
                        <div class="option-card ${bookingState.professionalId === p.id ? 'selected' : ''}" onclick="selectProfessional('${p.id}', '${p.name}')">
                            <div class="option-title">${p.name}</div>
                            <div class="option-desc">${p.role}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 4:
            stepTitle.textContent = "Escolha a Data";
            const standardDates = ["Amanhã", "Daqui a 2 dias", "Daqui a 3 dias"];
            const datesOptions = [...standardDates, "Outra Data"];

            const isCustom = bookingState.date && !standardDates.includes(bookingState.date);

            // Tenta resgatar valor AAAA-MM-DD se ja houver data brasileira no bookingState
            let dateInputValue = "";
            if (isCustom && bookingState.date.includes("/")) {
                const [d, m, y] = bookingState.date.split("/");
                if (d && m && y) dateInputValue = `${y}-${m}-${d}`;
            }

            body.innerHTML = `
                <div class="option-grid">
                    ${datesOptions.map(d => {
                const isSelected = (d === 'Outra Data' && (isCustom || bookingState.date === 'Outra Data')) || bookingState.date === d;
                return `
                            <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectDate('${d}')">
                                <div class="option-title">${d}</div>
                                <div class="option-desc">${d === 'Outra Data' ? 'Escolha no calendário' : 'Horários disponíveis'}</div>
                            </div>
                        `;
            }).join('')}
                </div>

                <!-- Campo de calendário que só aparece ao clicar em "Outra Data" ou com data customizada -->
                <div id="custom-date-container" style="display: ${isCustom || bookingState.date === 'Outra Data' ? 'block' : 'none'}; margin-top: 20px;">
                    <label for="custom-date-input" style="display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem;">
                        Selecione a data no calendário:
                    </label>
                    <input 
                        type="date" 
                        id="custom-date-input" 
                        class="form-control"
                        value="${dateInputValue}"
                        onchange="handleCustomDateChange(this.value)"
                        style="width: 100%; padding: 12px; border: 1px solid var(--color-border, #ccc); border-radius: 8px; font-size: 1rem;"
                    />
                </div>
            `;
            break;

        case 5:
            stepTitle.textContent = "Escolha o Horário";
            const times = ["09:00", "11:00", "14:00", "16:00", "17:30"];
            body.innerHTML = `
                <div class="option-grid">
                    ${times.map(t => `
                        <div class="option-card ${bookingState.time === t ? 'selected' : ''}" onclick="selectTime('${t}')">
                            <div class="option-title">${t}</div>
                            <div class="option-desc">Sessão individual</div>
                        </div>
                    `).join('')}
                </div>
            `;
            break;

        case 6:
            stepTitle.textContent = "Seus Dados para Contato";
            body.innerHTML = `
                <div class="form-group">
                    <label class="form-label">Nome Completo *</label>
                    <input type="text" id="step-client-name" class="form-control" value="${bookingState.clientName}" placeholder="Digite seu nome">
                </div>
                <div class="form-group">
                    <label class="form-label">Telefone / WhatsApp *</label>
                    <input type="tel" id="step-client-phone" class="form-control" value="${bookingState.clientPhone}" placeholder="(61) 99999-9999">
                </div>
            `;
            break;

        case 7:
            stepTitle.textContent = "Confirmação do Agendamento";
            body.innerHTML = `
                <p style="margin-bottom: 16px; color: var(--color-text-secondary);">Confira os detalhes da sua solicitação antes de enviar via WhatsApp:</p>
                <table class="summary-table">
                    <tr><td>Categoria:</td><td>${bookingState.categoryName}</td></tr>
                    <tr><td>Procedimento:</td><td>${bookingState.serviceName}</td></tr>
                    <tr><td>Profissional:</td><td>${bookingState.professionalName}</td></tr>
                    <tr><td>Data:</td><td>${bookingState.date}</td></tr>
                    <tr><td>Horário:</td><td>${bookingState.time}</td></tr>
                    <tr><td>Nome:</td><td>${bookingState.clientName}</td></tr>
                    <tr><td>Telefone:</td><td>${bookingState.clientPhone}</td></tr>
                </table>
            `;
            break;
    }
}

/* Event Handler Bindings do Modal */
function selectCategory(id, name) {
    if (bookingState.categoryId !== id) {
        bookingState.categoryId = id;
        bookingState.categoryName = name;
        bookingState.serviceId = null; // Limpa seleções filhas
        bookingState.serviceName = '';
    }
    renderModalStep();
}

function selectService(id, name) {
    bookingState.serviceId = id;
    bookingState.serviceName = name;
    renderModalStep();
}

function selectProfessional(id, name) {
    bookingState.professionalId = id;
    bookingState.professionalName = name;
    renderModalStep();
}

function selectDate(dateStr) {
    bookingState.date = dateStr;
    renderModalStep();
}

// Converte a data AAAA-MM-DD do calendário em DD/MM/AAAA e salva no bookingState
function handleCustomDateChange(val) {
    if (!val) return;
    const [year, month, day] = val.split('-');
    if (year && month && day) {
        bookingState.date = `${day}/${month}/${year}`;
    }
}

function selectTime(timeStr) {
    bookingState.time = timeStr;
    renderModalStep();
}