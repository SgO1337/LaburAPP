"use client";
// app/search/page.tsx
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import ProfessionalCard from "@/components/ProfessionalCard";
import Navbar from "@/components/Navbar";

type Result = {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  tags: string[];
  img: string;
  profession: string; // normalized profession key
  location: string;
  rate: number; // hourly rate
  availability: string[]; // e.g., ["Ahora", "Finde"]
  verified: boolean;
  experienceYears: number;
};

const allResults: Result[] = [
  {
    name: "María González",
    role: "Psicóloga Clínica",
    rating: 4.9,
    reviews: 127,
    tags: ["Ansiedad", "Depresión", "Terapia de Pareja"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Psicología",
    location: "CABA",
    rate: 18000,
    availability: ["Ahora", "Semana"],
    verified: true,
    experienceYears: 6,
  },
  {
    name: "Carlos Rodríguez",
    role: "Electricista",
    rating: 4.8,
    reviews: 89,
    tags: ["Instalaciones", "Reparaciones", "Emergencias"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
  location: "Canelones",
    rate: 12000,
    availability: ["Finde", "Tarde"],
    verified: true,
    experienceYears: 8,
  },
  {
    name: "Ana Martínez",
    role: "Nutricionista",
    rating: 5.0,
    reviews: 156,
    tags: ["Pérdida de peso", "Nutrición deportiva", "Diabetes"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Nutrición",
  location: "Maldonado",
    rate: 15000,
    availability: ["Semana", "Mañana"],
    verified: true,
    experienceYears: 5,
  },
  {
    name: "Laura Pérez",
    role: "Diseñadora UX/UI",
    rating: 4.7,
    reviews: 64,
    tags: ["Wireframes", "Prototipado", "Research"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Diseño",
  location: "Colonia",
    rate: 20000,
    availability: ["Semana", "Remoto"],
    verified: true,
    experienceYears: 4,
  },
  {
    name: "Javier Torres",
    role: "Plomero",
    rating: 4.6,
    reviews: 72,
    tags: ["Fugas", "Instalaciones", "Mantenimiento"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
  location: "Salto",
    rate: 10000,
    availability: ["Ahora", "Finde"],
    verified: false,
    experienceYears: 10,
  },
  {
    name: "Sofía Díaz",
    role: "Nutrióloga Deportiva",
    rating: 4.9,
    reviews: 98,
    tags: ["Rendimiento", "Planes personalizados", "Hábitos"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Nutrición",
  location: "Montevideo",
    rate: 22000,
    availability: ["Tarde", "Finde"],
    verified: true,
    experienceYears: 7,
  },
  {
    name: "Diego Fernández",
    role: "Carpintero",
    rating: 4.5,
    reviews: 45,
    tags: ["Muebles", "Reparaciones", "A medida"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Carpintería",
    location: "Paysandú",
    rate: 8500,
    availability: ["Semana", "Mañana"],
    verified: false,
    experienceYears: 12,
  },
  {
    name: "Valentina Silva",
    role: "Profesora de Yoga",
    rating: 5.0,
    reviews: 203,
    tags: ["Hatha", "Meditación", "Principiantes"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Fitness",
    location: "Montevideo",
    rate: 13000,
    availability: ["Mañana", "Tarde", "Remoto"],
    verified: true,
    experienceYears: 9,
  },
  {
    name: "Roberto Méndez",
    role: "Mecánico",
    rating: 4.3,
    reviews: 38,
    tags: ["Autos", "Motos", "Diagnóstico"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Mecánica",
    location: "San José",
    rate: 11000,
    availability: ["Ahora", "Tarde"],
    verified: false,
    experienceYears: 15,
  },
  {
    name: "Camila Rojas",
    role: "Traductora",
    rating: 4.9,
    reviews: 112,
    tags: ["Inglés", "Portugués", "Técnico"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Traducción",
    location: "Rivera",
    rate: 16000,
    availability: ["Remoto", "Semana"],
    verified: true,
    experienceYears: 6,
  },
  {
    name: "Martín Castro",
    role: "Jardinero",
    rating: 4.6,
    reviews: 67,
    tags: ["Paisajismo", "Poda", "Mantenimiento"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Jardinería",
    location: "Maldonado",
    rate: 9000,
    availability: ["Mañana", "Finde"],
    verified: true,
    experienceYears: 7,
  },
  {
    name: "Lucía Vega",
    role: "Contadora",
    rating: 5.0,
    reviews: 84,
    tags: ["Impuestos", "PYMES", "Asesoría"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Contabilidad",
    location: "Montevideo",
    rate: 25000,
    availability: ["Remoto", "Tarde"],
    verified: true,
    experienceYears: 11,
  },
  {
    name: "Pablo Sosa",
    role: "Fotógrafo",
    rating: 4.7,
    reviews: 91,
    tags: ["Eventos", "Retratos", "Productos"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Fotografía",
    location: "Rocha",
    rate: 18500,
    availability: ["Finde", "Tarde"],
    verified: true,
    experienceYears: 5,
  },
  {
    name: "Gabriela Núñez",
    role: "Abogada",
    rating: 4.8,
    reviews: 76,
    tags: ["Familia", "Laboral", "Consultas"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Derecho",
    location: "Tacuarembó",
    rate: 30000,
    availability: ["Semana", "Mañana"],
    verified: true,
    experienceYears: 13,
  },
  {
    name: "Federico Ramos",
    role: "Desarrollador Web",
    rating: 4.9,
    reviews: 142,
    tags: ["React", "Node.js", "E-commerce"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Programación",
    location: "Montevideo",
    rate: 35000,
    availability: ["Remoto", "Tarde"],
    verified: true,
    experienceYears: 8,
  },
  {
    name: "Natalia Benítez",
    role: "Masajista",
    rating: 5.0,
    reviews: 189,
    tags: ["Deportivo", "Relajante", "Terapéutico"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Masajes",
    location: "Canelones",
    rate: 12500,
    availability: ["Tarde", "Finde"],
    verified: true,
    experienceYears: 10,
  },
  {
    name: "Andrés López",
    role: "Pintor",
    rating: 4.4,
    reviews: 52,
    tags: ["Interior", "Exterior", "Presupuesto gratis"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Pintura",
    location: "Colonia",
    rate: 7500,
    availability: ["Ahora", "Semana"],
    verified: false,
    experienceYears: 9,
  },
  {
    name: "Carolina Herrera",
    role: "Chef Personal",
    rating: 4.8,
    reviews: 95,
    tags: ["Vegano", "Sin gluten", "Eventos"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Gastronomía",
    location: "Maldonado",
    rate: 28000,
    availability: ["Finde", "Tarde"],
    verified: true,
    experienceYears: 7,
  },
  {
    name: "Ignacio Paredes",
    role: "Veterinario",
    rating: 4.9,
    reviews: 134,
    tags: ["Perros", "Gatos", "Emergencias"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Veterinaria",
    location: "Salto",
    rate: 14000,
    availability: ["Ahora", "Tarde", "Finde"],
    verified: true,
    experienceYears: 6,
  },
  {
    name: "Florencia Arias",
    role: "Community Manager",
    rating: 4.6,
    reviews: 71,
    tags: ["Instagram", "Facebook", "Estrategia"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Marketing",
    location: "Montevideo",
    rate: 19000,
    availability: ["Remoto", "Semana"],
    verified: true,
    experienceYears: 4,
  },
  {
    name: "Sebastián Acosta",
    role: "Entrenador Personal",
    rating: 4.7,
    reviews: 88,
    tags: ["Fuerza", "Pérdida de peso", "Online"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Fitness",
    location: "Paysandú",
    rate: 14500,
    availability: ["Mañana", "Remoto"],
    verified: false,
    experienceYears: 5,
  },
  {
    name: "Alejandra Morales",
    role: "Peluquera",
    rating: 5.0,
    reviews: 217,
    tags: ["Corte", "Color", "Tratamientos"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Peluquería",
    location: "San José",
    rate: 11500,
    availability: ["Tarde", "Finde"],
    verified: true,
    experienceYears: 12,
  },
  {
    name: "Gonzalo Ibarra",
    role: "Técnico en Refrigeración",
    rating: 4.5,
    reviews: 49,
    tags: ["Aires", "Heladeras", "Service"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Refrigeración",
    location: "Rivera",
    rate: 13500,
    availability: ["Ahora", "Semana"],
    verified: false,
    experienceYears: 11,
  },
  {
    name: "Micaela Gómez",
    role: "Arquitecta",
    rating: 4.8,
    reviews: 63,
    tags: ["Remodelaciones", "Planos", "Diseño interior"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Arquitectura",
    location: "Rocha",
    rate: 32000,
    availability: ["Semana", "Remoto"],
    verified: true,
    experienceYears: 9,
  },
  {
    name: "Matías Cardozo",
    role: "Profesor de Inglés",
    rating: 4.9,
    reviews: 128,
    tags: ["Conversación", "Exámenes", "Niños"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Educación",
    location: "Tacuarembó",
    rate: 10500,
    availability: ["Tarde", "Remoto"],
    verified: true,
    experienceYears: 8,
  },
  {
    name: "Soledad Barrios",
    role: "Limpieza Profesional",
    rating: 4.6,
    reviews: 103,
    tags: ["Hogar", "Oficinas", "Post obra"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Limpieza",
    location: "Montevideo",
    rate: 8000,
    availability: ["Ahora", "Mañana", "Tarde"],
    verified: false,
    experienceYears: 6,
  },
  {
    name: "Rodrigo Vargas",
    role: "DJ",
    rating: 4.7,
    reviews: 81,
    tags: ["Bodas", "Fiestas", "Corporativos"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Música",
    location: "Canelones",
    rate: 24000,
    availability: ["Finde"],
    verified: true,
    experienceYears: 7,
  },
  {
    name: "Jimena Reyes",
    role: "Podóloga",
    rating: 5.0,
    reviews: 167,
    tags: ["Pie diabético", "Uñas encarnadas", "Callos"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Podología",
    location: "Maldonado",
    rate: 9500,
    availability: ["Semana", "Mañana"],
    verified: true,
    experienceYears: 14,
  },
  {
    name: "Ramiro Suárez",
    role: "Psicólogo Infantil",
    rating: 4.8,
    reviews: 96,
    tags: ["Niños", "Adolescentes", "TDAH"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Psicología",
    location: "Montevideo",
    rate: 17000,
    availability: ["Tarde", "Semana"],
    verified: true,
    experienceYears: 10,
  },
  {
    name: "Patricia Campos",
    role: "Psicóloga Laboral",
    rating: 4.6,
    reviews: 58,
    tags: ["Coaching", "Burnout", "Equipos"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Psicología",
    location: "Canelones",
    rate: 20000,
    availability: ["Remoto", "Mañana"],
    verified: false,
    experienceYears: 7,
  },
  {
    name: "Esteban Olivera",
    role: "Electricista Industrial",
    rating: 4.9,
    reviews: 104,
    tags: ["Tableros", "Industrial", "Certificaciones"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
    location: "Montevideo",
    rate: 16000,
    availability: ["Ahora", "Semana"],
    verified: true,
    experienceYears: 14,
  },
  {
    name: "Daniela Ponce",
    role: "Electricista Domiciliaria",
    rating: 4.4,
    reviews: 43,
    tags: ["Domiciliaria", "Iluminación", "Presupuestos"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Electricidad",
    location: "Salto",
    rate: 10500,
    availability: ["Finde", "Tarde"],
    verified: false,
    experienceYears: 5,
  },
  {
    name: "Hernán Benítez",
    role: "Nutricionista Oncológico",
    rating: 5.0,
    reviews: 72,
    tags: ["Oncología", "Quimioterapia", "Soporte"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Nutrición",
    location: "Montevideo",
    rate: 24000,
    availability: ["Semana", "Remoto"],
    verified: true,
    experienceYears: 12,
  },
  {
    name: "Elena Ríos",
    role: "Nutricionista Infantil",
    rating: 4.7,
    reviews: 89,
    tags: ["Bebés", "Niños", "Alergias"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Nutrición",
    location: "Paysandú",
    rate: 14000,
    availability: ["Mañana", "Tarde"],
    verified: true,
    experienceYears: 6,
  },
  {
    name: "Maximiliano Ortiz",
    role: "Diseñador Gráfico",
    rating: 4.5,
    reviews: 77,
    tags: ["Logos", "Branding", "Publicidad"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Diseño",
    location: "Rocha",
    rate: 18000,
    availability: ["Remoto", "Finde"],
    verified: false,
    experienceYears: 8,
  },
  {
    name: "Vanesa Torres",
    role: "Diseñadora Web",
    rating: 4.9,
    reviews: 121,
    tags: ["WordPress", "Shopify", "Landing pages"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Diseño",
    location: "Montevideo",
    rate: 22000,
    availability: ["Remoto", "Semana"],
    verified: true,
    experienceYears: 9,
  },
  {
    name: "Lucas Medina",
    role: "Plomero Gasista",
    rating: 4.7,
    reviews: 68,
    tags: ["Gas", "Certificados", "Seguridad"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "San José",
    rate: 13000,
    availability: ["Ahora", "Semana"],
    verified: true,
    experienceYears: 11,
  },
  {
    name: "Fernanda Gil",
    role: "Plomera Sanitaria",
    rating: 4.5,
    reviews: 54,
    tags: ["Baños", "Cocinas", "Desagües"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Plomería",
    location: "Rivera",
    rate: 11500,
    availability: ["Tarde", "Finde"],
    verified: false,
    experienceYears: 7,
  },
  {
    name: "Cristian Vera",
    role: "Desarrollador Mobile",
    rating: 5.0,
    reviews: 93,
    tags: ["React Native", "iOS", "Android"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Programación",
    location: "Montevideo",
    rate: 40000,
    availability: ["Remoto", "Tarde"],
    verified: true,
    experienceYears: 7,
  },
  {
    name: "Silvana Duarte",
    role: "Desarrolladora Backend",
    rating: 4.8,
    reviews: 86,
    tags: ["Python", "APIs", "Bases de datos"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Programación",
    location: "Colonia",
    rate: 38000,
    availability: ["Remoto", "Mañana"],
    verified: true,
    experienceYears: 10,
  },
  {
    name: "Adrián Paz",
    role: "Fotógrafo de Bodas",
    rating: 4.9,
    reviews: 137,
    tags: ["Bodas", "Video", "Álbumes"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Fotografía",
    location: "Montevideo",
    rate: 26000,
    availability: ["Finde"],
    verified: true,
    experienceYears: 11,
  },
  {
    name: "Romina Peña",
    role: "Fotógrafa Newborn",
    rating: 5.0,
    reviews: 164,
    tags: ["Recién nacidos", "Embarazadas", "Familia"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Fotografía",
    location: "Maldonado",
    rate: 21000,
    availability: ["Semana", "Mañana"],
    verified: true,
    experienceYears: 8,
  },
  {
    name: "Marcelo Costa",
    role: "Instructor de Crossfit",
    rating: 4.6,
    reviews: 79,
    tags: ["Crossfit", "Funcional", "Grupos"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Fitness",
    location: "Tacuarembó",
    rate: 12000,
    availability: ["Mañana", "Tarde"],
    verified: false,
    experienceYears: 6,
  },
  {
    name: "Cecilia Blanco",
    role: "Instructora de Pilates",
    rating: 5.0,
    reviews: 142,
    tags: ["Pilates", "Reformer", "Embarazadas"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    profession: "Fitness",
    location: "Montevideo",
    rate: 15000,
    availability: ["Mañana", "Tarde", "Remoto"],
    verified: true,
    experienceYears: 13,
  },
  {
    name: "Gustavo Luna",
    role: "Abogado Penalista",
    rating: 4.7,
    reviews: 61,
    tags: ["Penal", "Defensa", "Urgencias"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Derecho",
    location: "Canelones",
    rate: 35000,
    availability: ["Ahora", "Semana"],
    verified: true,
    experienceYears: 15,
  },
  {
    name: "Paola Aguilar",
    role: "Abogada Inmobiliaria",
    rating: 4.8,
    reviews: 94,
    tags: ["Compraventa", "Contratos", "Sucesiones"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    profession: "Derecho",
    location: "Montevideo",
    rate: 28000,
    availability: ["Semana", "Tarde"],
    verified: true,
    experienceYears: 9,
  },
  {
    name: "Miguel Ángel Ferreira",
    role: "Electricista de Emergencias",
    rating: 4.7,
    reviews: 156,
    tags: ["24/7", "Emergencias", "Cortes"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
    location: "Montevideo",
    rate: 14000,
    availability: ["Ahora"],
    verified: true,
    experienceYears: 9,
  },
  {
    name: "Ricardo Bonilla",
    role: "Electricista Automotriz",
    rating: 4.6,
    reviews: 71,
    tags: ["Autos", "Sistemas eléctricos", "Diagnóstico"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
    location: "Canelones",
    rate: 11000,
    availability: ["Semana", "Tarde"],
    verified: false,
    experienceYears: 11,
  },
  {
    name: "Jorge Oliveira",
    role: "Electricista de Obras",
    rating: 4.8,
    reviews: 92,
    tags: ["Construcción", "Obras", "Proyectos grandes"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
    location: "Colonia",
    rate: 15500,
    availability: ["Semana", "Mañana"],
    verified: true,
    experienceYears: 16,
  },
  {
    name: "Alberto Gutiérrez",
    role: "Electricista Solar",
    rating: 5.0,
    reviews: 48,
    tags: ["Paneles solares", "Energía renovable", "Instalación"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
    location: "Maldonado",
    rate: 18000,
    availability: ["Semana", "Remoto"],
    verified: true,
    experienceYears: 7,
  },
  {
    name: "Sergio Muñoz",
    role: "Electricista Matriculado",
    rating: 4.9,
    reviews: 134,
    tags: ["Certificaciones UTE", "Habilitaciones", "Matriculado"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
    location: "Montevideo",
    rate: 17000,
    availability: ["Semana", "Tarde"],
    verified: true,
    experienceYears: 18,
  },
  {
    name: "Andrés Quintana",
    role: "Electricista de Mantenimiento",
    rating: 4.5,
    reviews: 63,
    tags: ["Mantenimiento", "Preventivo", "Edificios"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Electricidad",
    location: "Paysandú",
    rate: 12000,
    availability: ["Mañana", "Tarde"],
    verified: false,
    experienceYears: 10,
  },
  {
    name: "Gustavo Peralta",
    role: "Plomero de Emergencias",
    rating: 4.8,
    reviews: 118,
    tags: ["Urgencias", "Fugas", "24 horas"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Montevideo",
    rate: 13500,
    availability: ["Ahora"],
    verified: true,
    experienceYears: 12,
  },
  {
    name: "Enrique Cabrera",
    role: "Plomero Sanitarista",
    rating: 4.6,
    reviews: 87,
    tags: ["Sanitaria", "Desagües", "Cloacas"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "San José",
    rate: 10000,
    availability: ["Semana", "Finde"],
    verified: true,
    experienceYears: 14,
  },
  {
    name: "Oscar Navarro",
    role: "Plomero Gasista Matriculado",
    rating: 5.0,
    reviews: 156,
    tags: ["Gas natural", "Certificado OSE", "Instalaciones"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Montevideo",
    rate: 16000,
    availability: ["Semana", "Mañana"],
    verified: true,
    experienceYears: 20,
  },
  {
    name: "Raúl Domínguez",
    role: "Plomero de Obras",
    rating: 4.7,
    reviews: 94,
    tags: ["Construcción", "Obras nuevas", "Proyectos"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Canelones",
    rate: 11500,
    availability: ["Semana", "Tarde"],
    verified: false,
    experienceYears: 13,
  },
  {
    name: "Hugo Rivas",
    role: "Plomero de Mantenimiento",
    rating: 4.4,
    reviews: 56,
    tags: ["Reparaciones", "Mantenimiento", "Grifería"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Rivera",
    rate: 9500,
    availability: ["Tarde", "Finde"],
    verified: false,
    experienceYears: 8,
  },
  {
    name: "Mario Silva",
    role: "Plomero Industrial",
    rating: 4.9,
    reviews: 102,
    tags: ["Industrial", "Calderas", "Vapor"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Salto",
    rate: 15000,
    availability: ["Semana", "Ahora"],
    verified: true,
    experienceYears: 17,
  },
  {
    name: "Carlos Ibáñez",
    role: "Plomero Especialista en Calefones",
    rating: 4.5,
    reviews: 79,
    tags: ["Calefones", "Termotanques", "Instalación"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Rocha",
    rate: 10500,
    availability: ["Mañana", "Tarde"],
    verified: true,
    experienceYears: 9,
  },
  {
    name: "Francisco Pereira",
    role: "Plomero Destapador",
    rating: 4.3,
    reviews: 112,
    tags: ["Destapaciones", "Cañerías", "Urgencias"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Tacuarembó",
    rate: 8500,
    availability: ["Ahora", "Tarde"],
    verified: false,
    experienceYears: 11,
  },
  {
    name: "Leonardo Mora",
    role: "Plomero de Piscinas",
    rating: 4.8,
    reviews: 67,
    tags: ["Piscinas", "Filtros", "Bombas"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    profession: "Plomería",
    location: "Maldonado",
    rate: 14000,
    availability: ["Finde", "Semana"],
    verified: true,
    experienceYears: 10,
  },
];

const locations = [
  "Montevideo",
  "Canelones",
  "Maldonado",
  "Colonia",
  "Salto",
  "Paysandú",
  "San José",
  "Rivera",
  "Rocha",
  "Tacuarembó",
] as const;
const availabilityOptions = ["Ahora", "Semana", "Finde", "Mañana", "Tarde", "Remoto"] as const;
const allTags = Array.from(new Set(allResults.flatMap((r) => r.tags)));

const professions = [
  "Todos",
  "Psicología",
  "Electricidad",
  "Nutrición",
  "Diseño",
  "Plomería",
  "Carpintería",
  "Fitness",
  "Mecánica",
  "Traducción",
  "Jardinería",
  "Contabilidad",
  "Fotografía",
  "Derecho",
  "Programación",
  "Masajes",
  "Pintura",
  "Gastronomía",
  "Veterinaria",
  "Marketing",
  "Peluquería",
  "Refrigeración",
  "Arquitectura",
  "Educación",
  "Limpieza",
  "Música",
  "Podología",
];

const ratingOptions: { label: string; value: number }[] = [
  { label: "Cualquiera", value: 0 },
  { label: "3+ estrellas", value: 3 },
  { label: "4+ estrellas", value: 4 },
  { label: "4.5+ estrellas", value: 4.5 },
  { label: "Solo 5 estrellas", value: 5 },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedProfession, setSelectedProfession] = useState<string>("Todos");
  const [minRating, setMinRating] = useState<number>(0);
  const [profOpen, setProfOpen] = useState(false);
  const [profSearch, setProfSearch] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [minRate, setMinRate] = useState<string>("");
  const [maxRate, setMaxRate] = useState<string>("");
  const [currency, setCurrency] = useState<"UYU" | "USD">("UYU");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filtered = useMemo(() => {
    return allResults.filter((p) => {
      const matchesProfession =
        selectedProfession === "Todos" || p.profession === selectedProfession;
      const matchesQuery =
        !query.trim() ||
        [p.name, p.role, ...p.tags, p.profession]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
      const matchesRating = p.rating >= minRating;
      const matchesLocation =
        selectedLocations.length === 0 || selectedLocations.includes(p.location);
  const rateMinInput = Number(minRate);
  const rateMaxInput = Number(maxRate);
  const EXCHANGE_UYU_PER_USD = 42; // simple static rate for mock filtering
  const toUYU = (val: number) => (currency === "USD" ? val * EXCHANGE_UYU_PER_USD : val);
  // Treat empty inputs as open bounds (0/Infinity). Only convert when a value is provided.
  const minR = minRate === "" ? 0 : toUYU(rateMinInput);
  const maxR = maxRate === "" ? Infinity : toUYU(rateMaxInput);
      const matchesRate = p.rate >= minR && p.rate <= maxR;
      const matchesAvailability =
        selectedAvailability.length === 0 ||
        selectedAvailability.every((a) => p.availability.includes(a));
      const matchesVerified = !verifiedOnly || p.verified;
      const matchesExperience = p.experienceYears >= minExperience;
      const matchesTags =
        selectedTags.length === 0 || selectedTags.every((t) => p.tags.includes(t));

      return (
        matchesProfession &&
        matchesQuery &&
        matchesRating &&
        matchesLocation &&
        matchesRate &&
        matchesAvailability &&
        matchesVerified &&
        matchesExperience &&
        matchesTags
      );
    });
  }, [query, selectedProfession, minRating, selectedLocations, minRate, maxRate, currency, selectedAvailability, verifiedOnly, minExperience, selectedTags]);

  // Reset or clamp page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedProfession, minRating, selectedLocations, minRate, maxRate, currency, selectedAvailability, verifiedOnly, minExperience, selectedTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Ensure current page never exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(248,250,252)] px-4 pb-16 pt-[97px]">
        <div className="mx-auto max-w-6xl">
          {/* Back link */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-base text-gray-500 hover:text-gray-700"
          >
            <span aria-hidden className="text-xl">←</span> Volver al inicio
          </Link>

          <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Buscar profesionales</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Explora por profesión, ajusta por calificación y encuentra el perfil ideal.
            </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar filters */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">Profesión</h3>
              {/* Custom searchable dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm hover:bg-slate-50"
                  aria-haspopup="listbox"
                  aria-expanded={profOpen}
                >
                  <span className="truncate">
                    {selectedProfession === "Todos" ? "Todas las profesiones" : selectedProfession}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-500">
                    <path d="M6 9l6 6 6-6" className="fill-none stroke-current" strokeWidth="1.8" />
                  </svg>
                </button>
                {profOpen && (
                  <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <div className="mb-2 flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-500" aria-hidden>
                        <circle cx="11" cy="11" r="7" className="fill-none stroke-current" strokeWidth="1.6" />
                        <path d="M20 20l-3.5-3.5" className="fill-none stroke-current" strokeWidth="1.6" />
                      </svg>
                      <input
                        autoFocus
                        value={profSearch}
                        onChange={(e) => setProfSearch(e.target.value)}
                        placeholder="Buscar profesión..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                      />
                    </div>
                    <ul role="listbox" className="max-h-56 overflow-auto">
                      {professions
                        .filter((p) =>
                          p.toLowerCase().includes(profSearch.toLowerCase())
                        )
                        .map((p) => (
                          <li key={p}>
                            <button
                              type="button"
                              className={
                                "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm hover:bg-slate-50 " +
                                (selectedProfession === p ? "bg-slate-50" : "")
                              }
                              onClick={() => {
                                setSelectedProfession(p);
                                setProfOpen(false);
                              }}
                              role="option"
                              aria-selected={selectedProfession === p}
                            >
                              <span>{p}</span>
                              {selectedProfession === p && (
                                <span className="text-emerald-600">✓</span>
                              )}
                            </button>
                          </li>
                        ))}
                    </ul>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs hover:bg-slate-50"
                        onClick={() => {
                          setSelectedProfession("Todos");
                          setProfSearch("");
                          setProfOpen(false);
                        }}
                      >
                        Limpiar
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-md bg-brand-blue px-2 py-1.5 text-xs font-semibold text-white hover:bg-brand-deep-blue"
                        onClick={() => setProfOpen(false)}
                      >
                        Listo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Calificación mínima</h3>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                >
                  {ratingOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  <path d="M6 9l6 6 6-6" className="fill-none stroke-current" strokeWidth="1.8" />
                </svg>
              </div>
            </div>

            {/* Ubicación */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Ubicación</h3>
              <div className="grid gap-2">
                {locations.map((loc) => (
                  <label key={loc} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="text-brand-blue focus:ring-brand-blue"
                      checked={selectedLocations.includes(loc)}
                      onChange={(e) => {
                        setSelectedLocations((prev) =>
                          e.target.checked ? [...prev, loc] : prev.filter((l) => l !== loc)
                        );
                      }}
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Precio por hora */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Precio por hora</h3>
              <div className="grid gap-2 items-center grid-cols-1 sm:grid-cols-3">
                <input
                  type="number"
                  min={0}
                  value={minRate}
                  onChange={(e) => setMinRate(e.target.value)}
                  placeholder="Min"
                  className="no-spinner w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
                <input
                  type="number"
                  min={0}
                  value={maxRate}
                  onChange={(e) => setMaxRate(e.target.value)}
                  placeholder="Max"
                  className="no-spinner w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
                <div className="relative w-full">
                  <select
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm pr-8 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as any)}
                    aria-label="Moneda"
                  >
                    <option value="UYU">UYU</option>
                    <option value="USD">USD</option>
                  </select>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    <path d="M6 9l6 6 6-6" className="fill-none stroke-current" strokeWidth="1.8" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Disponibilidad</h3>
              <div className="grid gap-2">
                {availabilityOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="text-brand-blue focus:ring-brand-blue"
                      checked={selectedAvailability.includes(opt)}
                      onChange={(e) =>
                        setSelectedAvailability((prev) =>
                          e.target.checked ? [...prev, opt] : prev.filter((v) => v !== opt)
                        )
                      }
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verificados y experiencia */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <label className="mb-3 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="text-brand-blue focus:ring-brand-blue"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                />
                <span>Solo verificados</span>
              </label>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-slate-700">Años de experiencia</h3>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                >
                  <option value={0}>Cualquiera</option>
                  <option value={1}>1+ años</option>
                  <option value={3}>3+ años</option>
                  <option value={5}>5+ años</option>
                  <option value={10}>10+ años</option>
                </select>
              </div>
            </div>

            {/* Etiquetas/Servicios */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Servicios</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((t) => {
                  const active = selectedTags.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() =>
                        setSelectedTags((prev) =>
                          active ? prev.filter((x) => x !== t) : [...prev, t]
                        )
                      }
                      className={
                        "rounded-full px-3 py-1.5 text-xs ring-1 transition " +
                        (active
                          ? "bg-brand-blue text-white ring-brand-blue"
                          : "bg-white text-slate-700 ring-gray-200 hover:bg-slate-50")
                      }
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedProfession("Todos");
                setMinRating(0);
                setSelectedLocations([]);
                setMinRate("");
                setMaxRate("");
                setCurrency("UYU");
                setSelectedAvailability([]);
                setVerifiedOnly(false);
                setMinExperience(0);
                setSelectedTags([]);
              }}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Limpiar filtros
            </button>
          </aside>

          {/* Main content */}
          <section>

            {/* Results grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((p) => (
                <ProfessionalCard key={p.name} {...p} />
              ))}
            </div>

            {/* Pagination controls */}
            {filtered.length > ITEMS_PER_PAGE && (
              <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Paginación de resultados">
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.max(1, currentPage - 1);
                    setCurrentPage(next);
                  }}
                  disabled={currentPage === 1}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-slate-50"}`}
                >
                  Anterior
                </button>

                {/* Page numbers */}
                {(() => {
                  const pages: (number | string)[] = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    pages.push(1);
                    const left = Math.max(2, currentPage - 1);
                    const right = Math.min(totalPages - 1, currentPage + 1);
                    if (left > 2) pages.push("…");
                    for (let i = left; i <= right; i++) pages.push(i);
                    if (right < totalPages - 1) pages.push("…");
                    pages.push(totalPages);
                  }
                  return pages.map((p, idx) =>
                    typeof p === "number" ? (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCurrentPage(p);
                        }}
                        className={`min-w-9 rounded-lg px-3 py-1.5 text-sm ${
                          currentPage === p ? "bg-brand-blue text-white" : "border hover:bg-slate-50"
                        }`}
                        aria-current={currentPage === p ? "page" : undefined}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={idx} className="px-1 text-slate-500">
                        {p}
                      </span>
                    )
                  );
                })()}

                <button
                  type="button"
                  onClick={() => {
                    const next = Math.min(totalPages, currentPage + 1);
                    setCurrentPage(next);
                  }}
                  disabled={currentPage === totalPages}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-slate-50"}`}
                >
                  Siguiente
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
      </main>
      </>
    );
  }
