/**
 * CLINIC CONFIGURATION (Fonte Única de Dados da Clínica)
 * Para replicar este projeto para outro cliente, altere apenas os dados abaixo.
 */
const clinicConfig = {
    clinic: {
        name: "Clínica Vitta",
        slogan: "Realce sua beleza. Valorize sua essência.",
        description: "Tratamentos estéticos personalizados com tecnologia de ponta e atendimento humanizado para valorizar sua beleza natural.",
        phone: "(61) 99424-3342",
        whatsapp: "5561994243342",
        instagram: "https://instagram.com/",
        instagramHandle: "@clinicavitta",
        address: "SEPS Q 709/909, Bloco A, Sala 204 - Asa Sul",
        cityState: "Brasília - DF",
        googleMapsLink: "https://maps.google.com/?q=Brasilia+DF"
    },

    theme: {
        primary: "#B68C72",
        primaryDark: "#8C6753",
        background: "#FAF8F6",
        secondary: "#F1ECE8",
        text: "#292522",
        textSecondary: "#6F6862",
        white: "#FFFFFF"
    },

    openingHours: {
        weekdays: "Segunda a Sexta: 08:00 às 19:00",
        saturday: "Sábado: 08:00 às 14:00",
        sunday: "Domingo e Feriados: Fechado"
    },

    categories: [
        {
            id: "facial",
            name: "Estética Facial",
            description: "Tratamentos para rejuvenescimento, textura e harmonização do rosto.",
            services: [
                {
                    id: "botox",
                    name: "Toxina Botulínica (Botox)",
                    description: "Prevenção e suavização de linhas de expressão e rugas dinâmicas.",
                    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
                    featured: false
                },
                {
                    id: "preenchimento",
                    name: "Preenchimento com Ácido Hialurônico",
                    description: "Restauração de volume, contornos faciais e harmonização labial.",
                    image: "https://images.unsplash.com/photo-1512290900673-3058a9947f63?auto=format&fit=crop&w=800&q=80",
                    featured: false
                },
                {
                    id: "limpeza-pele",
                    name: "Limpeza de Pele Profunda",
                    description: "Remoção de impurezas, cravos e renovação celular com fototerapia.",
                    image: "https://images.unsplash.com/photo-1512290900673-3058a9947f63?auto=format&fit=crop&w=800&q=80",
                    featured: true
                },
                {
                    id: "bioestimulador",
                    name: "Bioestimulador de Colágeno",
                    description: "Estimula a produção natural de colágeno, promovendo firmeza e elasticidade.",
                    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
                    featured: true
                },
                {
                    id: "teste01",
                    name: "teste lipem",
                    description: "Restauração de volume, contornos faciais e harmonização labial.",
                    image: "https://images.unsplash.com/photo-1512290900673-3058a9947f63?auto=format&fit=crop&w=800&q=80",
                    featured: true
                },
                {
                    id: "peeling-quimico",
                    name: "Peeling Químico",
                    description: "Renovação celular para clareamento de manchas e melhora da textura.",
                    image: "https://images.unsplash.com/photo-1512290900673-3058a9947f63?auto=format&fit=crop&w=800&q=80",
                    featured: false // false para ficar só na página de procedimentos, ou true para a landing page
                }
            ]
        },
        {
            id: "corporal",
            name: "Estética Corporal",
            description: "Protocolos para modelagem corporal, firmeza da pele e bem-estar.",
            services: [
                {
                    id: "drenagem",
                    name: "Drenagem Linfática",
                    description: "Redução de retenção de líquidos, melhora da circulação e desintoxicação.",
                    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80",
                    featured: true
                },
                {
                    id: "massagem-modeladora",
                    name: "Massagem Modeladora",
                    description: "Manobras intensas para redução de medidas e melhora do contorno corporal.",
                    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80",
                    featured: true
                },
                {
                    id: "enzimas-corporais",
                    name: "Aplicação de Enzimas",
                    description: "Tratamento direcionado para gordura localizada e celulite.",
                    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
                    featured: false
                }
            ]
        },
        {
            id: "tecnologias",
            name: "Tecnologias & Laser",
            description: "Equipamentos avançados para resultados precisos e duradouros.",
            services: [
                {
                    id: "depilacao-laser",
                    name: "Depilação a Laser",
                    description: "Eliminação progressiva e duradoura dos pelos de forma segura.",
                    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80",
                    featured: true
                },
                {
                    id: "lavieen",
                    name: "Laser Lavieen / BB Laser",
                    description: "Tratamento para manchas, poros dilatados e uniformização do tom da pele.",
                    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80",
                    featured: true
                }
            ]
        }
    ],

    professionals: [
        {
            id: "ana",
            name: "Dra. Ana Martins",
            role: "Biomédica Esteta",
            description: "Especialista em harmonização facial, toxina botulínica e bioestimuladores com 8 anos de experiência.",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: "marina",
            name: "Dra. Marina Costa",
            role: "Fisioterapeuta Dermatofuncional",
            description: "Especialista em pós-operatório, tratamentos corporais e tecnologias a laser avançadas.",
            image: "https://images.unsplash.com/photo-1594824813566-78a050523091?auto=format&fit=crop&w=800&q=80"
        }
    ],

    testimonials: [
        {
            quote: "Atendimento impecável! A Dra. Ana explicou cada etapa do procedimento com muita delicadeza e transparência.",
            author: "Mariana S."
        },
        {
            quote: "O ambiente é extremamente agradável e acolhedor. Fiz o protocolo de rejuvenescimento e amei o resultado super natural.",
            author: "Carla R."
        },
        {
            quote: "Excelente localização e pontualidade. Os resultados superaram minhas expectativas. Recomendo de olhos fechados!",
            author: "Fernanda M."
        }
    ]
};