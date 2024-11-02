
import React from "react";

// Definimos la interfaz para los servicios
interface Section {
  id: string;
  title: string;
  content: string;
}

export const AboutUs: React.FC = () => {
  // Lista de servicios
  const sections: Section[] = [
    {
      id: "mision",
      title: "Misión",
      content:
        "Nuestra misión es proporcionar productos de la más alta calidad, elaborados con pasión y dedicación, para satisfacer el gusto y necesidades de nuestros clientes.",
    },
    {
      id: "vision",
      title: "Visión",
      content:
        "Ser reconocidos como la panadería líder en la industria, innovando constantemente y expandiendo nuestra presencia en el mercado, sin perder nuestro enfoque en la calidad y el servicio.",
    },
    {
      id: "politicas",
      title: "Políticas",
      content:
        "Promovemos un ambiente de trabajo inclusivo, comprometido con la sostenibilidad, y donde la calidad y el respeto hacia nuestros clientes y colaboradores son esenciales.",
    },
    {
      id: "principios",
      title: "Principios",
      content:
        "Nos guiamos por principios de integridad, excelencia, responsabilidad social, y una constante búsqueda de la mejora continua en todo lo que hacemos.",
    },
  ];

  return (
    <section className="company-info py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">NOSOTROS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.id} className="section bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">{section.title}</h3>
              <p className="text-gray-600">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};