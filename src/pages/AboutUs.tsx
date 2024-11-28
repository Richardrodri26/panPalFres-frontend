import React from "react";

// Definimos la interfaz para los servicios
interface Section {
  id: string; // Identificador único para cada sección
  title: string; // Título de la sección (ejemplo: Misión, Visión)
  content: string; // Contenido que describe la sección
}

export const AboutUs: React.FC = () => {
  // Lista de secciones con su respectivo contenido
  const sections: Section[] = [
    {
      id: "mision", // Identificador único para la sección
      title: "Misión", // Título de la sección
      content:
        "Nuestra misión es proporcionar productos de la más alta calidad, elaborados con pasión y dedicación, para satisfacer el gusto y necesidades de nuestros clientes.", // Contenido de la sección
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
        {/* Título de la sección */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          PAN-PAL-FRES
        </h2>
        
        {/* Grid para organizar las secciones en columnas en pantallas medianas o más grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mapeamos las secciones y las renderizamos */}
          {sections.map((section) => (
            <div
              key={section.id} // Asignamos el id único para cada sección
              className="section bg-white p-6 rounded-lg shadow-md" // Estilos de cada tarjeta de sección
            >
              {/* Título de la sección */}
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {section.title}
              </h3>
              
              {/* Contenido de la sección */}
              <p className="text-gray-600">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
