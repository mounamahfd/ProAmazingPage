import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContributorCard } from "./ContributorCard"; // Votre composant pour afficher les contributeurs

export function ContributorList() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les contributeurs depuis l'API Django
    axios
      .get("http://127.0.0.1:8000/api/contributors/") // L'URL de votre API
      .then((response) => {
        console.log("Réponse de l'API:", response.data); // Affichez les données dans la console
        setContributors(response.data.results); // Utiliser "results" si l'API utilise pagination
        setLoading(false); // Fin du chargement
        setError(null); // Réinitialiser l'erreur
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des contributeurs:",
          error
        );
        setLoading(false);
        setError(
          "Une erreur est survenue lors de la récupération des contributeurs."
        );
      });
  }, []);

  if (loading) {
    return <p>Chargement des contributeurs...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributors.map((contributor) => (
        <ContributorCard key={contributor.id} contributor={contributor} />
      ))}
    </div>
  );
}
