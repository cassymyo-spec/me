interface Project {
  num: string;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

const projects: Project[] = [
  {
    num: "1",
    name: "fiscguy",
    subtitle: "Django ZIMRA Fiscalisation Library",
    description: "A reusable Django library for ZIMRA fiscalisation, compliant with fiscal device and server specifications. Handles receipt signing, server communication, validation error codes, and compliance workflows. Designed to plug seamlessly into POS and ERP systems with clean abstractions.",
    tags: ["Django", "Python", "ZIMRA API", "Open Source"],
    image: "/images/projects/fiscguy-placeholder.png"
  },
  {
    num: "2",
    name: "TenantSpace - (in progress)",
    subtitle: "WhatsApp-First Property SaaS",
    description: "A SaaS platform enabling property listings and searches directly via WhatsApp. Integrates Twilio and Llama 3 LLMs for natural language interactions. Targeted at Zimbabwe's WhatsApp-first market to reduce friction for property seekers.",
    tags: ["Django", "Twilio", "LLM / Llama 3", "WhatsApp API", "SaaS"],
    image: "/images/projects/tenantspace-placeholder.png"
  },
  {
    num: "3",
    name: "Haulage Truck Management System",
    subtitle: "Fleet & Delivery Operations REST API",
    description: "A production-grade REST API for managing truck fleets, drivers, and delivery jobs. Features JWT authentication with per-device session tracking, a policy layer enforcing business rules around truck and driver assignments, full audit logging on every operation, and paginated endpoints. Containerised with Docker and documented via Swagger UI.",
    tags: ["Django REST Framework", "PostgreSQL", "JWT", "Docker", "Python"],
    image: "/images/projects/haulage-placeholder.png"
  },
  {
    num: "4",
    name: "Remote IoT Pump Control",
    subtitle: "Borehole Automation System",
    description: "Designed and built a remote borehole pump IoT control system for Montclair Resort. Enables remote monitoring and control of water infrastructure, reducing manual intervention and improving operational efficiency at the property.",
    tags: ["IoT", "Embedded Systems", "Automation"],
    image: "/images/projects/iot-pump-placeholder.png"
  },
  {
    num: "5",
    name: "Afrerp",
    subtitle: "Africa Enterprise Resource Platform",
    description: "A multi-tenant, cloud-based ERP and POS platform built for African SMEs. Accounting is the core — every sale, payment, and stock movement automatically generates correct double-entry journal entries through an event-driven posting rules engine. Features ZIMRA fiscalisation with offline tolerance, Ecocash-native payments, branch management, inventory with weighted average cost valuation, purchase orders, sale returns, and a platform superadmin layer. Built to expand into WhatsApp, native mobile, and AI-powered business intelligence. Live at afrerp.co.zw.",
    tags: ["Django", "PostgreSQL", "Docker", "Multi-Tenant SaaS", "ERP", "ZIMRA", "Python"],
    image: "/images/projects/afrerp-placeholder.png",
    link: "https://afrerp.co.zw"
  }
];

export default projects;
