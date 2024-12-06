import React, { useEffect, useState } from "react";
import { BarChart2 } from "lucide-react";

interface ContributionGraphProps {
  data: { name: string; contributions: number }[]; // Données des contributions
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function ContributionGraph({ data }: ContributionGraphProps) {
  const [barColors, setBarColors] = useState<string[]>([]);

  // Calculer la contribution maximale
  const maxContributions = Math.max(...data.map((d) => d.contributions));

  // Mettre à jour les couleurs des barres à chaque actualisation
  useEffect(() => {
    const colors = data.map(() => getRandomColor()); // Génère une couleur aléatoire pour chaque barre
    setBarColors(colors);
  }, [data]); // Les couleurs se mettent à jour lorsque les données changent

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      {/* Titre */}
      <div className="flex items-center space-x-2 mb-6">
        <BarChart2 className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Contributions by Contributors
        </h2>
      </div>

      {/* Diagramme en barres */}
      <div className="h-56 flex items-end space-x-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-1 group relative"
            style={{
              height: "100%", // Tout le conteneur est de la hauteur 100% pour la flexbox
            }}
          >
            {/* Barre */}
            <div
              className="w-full rounded-t-lg hover:opacity-80 transition-all duration-200"
              style={{
                // Ici, on positionne la barre en bas du conteneur et on ajuste sa hauteur selon les contributions
                height: `${(item.contributions / maxContributions) * 100}%`,
                backgroundColor: barColors[index], // Applique la couleur aléatoire à chaque barre
                position: 'absolute', // Position absolue pour pouvoir la placer en bas
                bottom: 0, // Place la barre au bas du conteneur
              }}
            ></div>

            {/* Valeur au survol */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="bg-gray-700 text-white text-xs py-1 px-2 rounded shadow-lg">
                {item.contributions} contributions
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Légendes des noms */}
      <div className="flex justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
        {data.map((item, index) => (
          <div key={index} className="text-center truncate">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
