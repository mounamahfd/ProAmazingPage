import React, { useState, useEffect } from "react";
import axios from "axios";
import { ContributorCard } from "./components/ContributorCard";
import { ContributionGraph } from "./components/ContributionGraph";
import { ThemeToggle } from "./components/ThemeToggle";
import { Code, Layout } from "lucide-react"; // Icons for switching modes

interface Contributor {
  id: number;
  name: string;
  githubUsername: string;
  avatarUrl: string;
  role: string;
  specialite: string;
  contributions: number;
}

const oceanColors = ["#56C1D1", "#90EE90"];

function App() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [viewMode, setViewMode] = useState<"design" | "code">("design"); // State for view mode
  const [themeColorIndex, setThemeColorIndex] = useState<number>(0); // State to track the current theme color index

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/contributors/"
        );
        const contributorList = response.data;

        const contributorsWithContributions = await Promise.all(
          contributorList.map(async (contributor: any) => {
            const contributionResponse = await axios.get(
              `http://127.0.0.1:8000/api/contributor/${contributor.id}/total_contribution/`
            );
            return {
              id: contributor.id,
              name: contributor.name,
              githubUsername: contributor.github_username,
              avatarUrl: contributor.avatar_url,
              role: contributor.specialite,
              specialite: contributor.specialite,
              contributions: contributionResponse.data.total_contribution,
            };
          })
        );

        setContributors(contributorsWithContributions);
      } catch (error) {
        console.error("Error fetching contributors", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color",
      oceanColors[themeColorIndex]
    );
  }, [themeColorIndex]);

  const handlePrevColor = () => {
    setThemeColorIndex((prevIndex) =>
      prevIndex === 0 ? oceanColors.length - 1 : prevIndex - 1
    );
  };

  const handleNextColor = () => {
    setThemeColorIndex((prevIndex) =>
      prevIndex === oceanColors.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}
    >
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />

      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setViewMode("design")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              viewMode === "design"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            }`}
          >
            <Layout className="w-5 h-5 mr-2" />
            Design
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`ml-4 flex items-center px-4 py-2 rounded-lg ${
              viewMode === "code"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            }`}
          >
            <Code className="w-5 h-5 mr-2" />
            Code
          </button>
        </div>

        {/* Color carousel with left and right arrows */}
        <div className="mb-8 flex justify-center items-center">
          <button
            onClick={handlePrevColor}
            className="px-4 py-2 text-white bg-purple-600 rounded-full mr-4"
          >
            &lt; {/* Left arrow */}
          </button>

          <div
            className="w-16 h-16 rounded-full"
            style={{
              backgroundColor: oceanColors[themeColorIndex],
              border: "2px solid #fff",
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
            }}
          />

          <button
            onClick={handleNextColor}
            className="px-4 py-2 text-white bg-purple-600 rounded-full ml-4"
          >
            &gt; {/* Right arrow */}
          </button>
        </div>
        <div className="text-center">
          <p className="text-[#56C1D5]">
            Les couleurs de l'océan reflètent le thème principal
          </p>
        </div>

        {/* Conditionally render based on viewMode */}
        {viewMode === "design" ? (
          <>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Code className="w-12 h-12 text-purple-600" />
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                  Project Contributors
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Celebrating the amazing team behind this project. Each
                contributor has played a vital role in bringing this vision to
                life through their unique skills and dedication.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {contributors.map((contributor) => (
                <ContributorCard
                  key={contributor.githubUsername}
                  contributor={contributor}
                />
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <ContributionGraph
                data={contributors.map((contributor) => ({
                  name: contributor.name,
                  contributions: contributor.contributions,
                }))}
              />
            </div>
          </>
        ) : (
          <pre className="bg-gray-800 text-white p-4 rounded-lg shadow-lg overflow-auto">
            <code>{`
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Contributor {
  id: number;
  name: string;
  githubUsername: string;
  avatarUrl: string;
  role: string;
  specialite: string;
  contributions: number;
}

function App() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [viewMode, setViewMode] = useState<"design" | "code">("design");

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/contributors/");
        const contributorList = response.data;

        const contributorsWithContributions = await Promise.all(
          contributorList.map(async (contributor: any) => {
            const contributionResponse = await axios.get(
              \`http://127.0.0.1:8000/api/contributor/\${contributor.id}/total_contribution/\`
            );
            return {
              id: contributor.id,
              name: contributor.name,
              githubUsername: contributor.github_username,
              avatarUrl: contributor.avatar_url,
              role: contributor.specialite,
              specialite: contributor.specialite,
              contributions: contributionResponse.data.total_contribution,
            };
          })
        );

        setContributors(contributorsWithContributions);
      } catch (error) {
        console.error("Error fetching contributors", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={\`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300\`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setViewMode("design")}
            className={\`flex items-center px-4 py-2 rounded-lg \${viewMode === "design" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}\`}
          >
            <Layout className="w-5 h-5 mr-2" />
            Design
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={\`ml-4 flex items-center px-4 py-2 rounded-lg \${viewMode === "code" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"}\`}
          >
            <Code className="w-5 h-5 mr-2" />
            Code
          </button>
        </div>
        {viewMode === "design" ? (
          <>
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Project Contributors</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {contributors.map((contributor) => (
                <ContributorCard key={contributor.githubUsername} contributor={contributor} />
              ))}
            </div>
            <ContributionGraph
              data={contributors.map((contributor) => ({
                name: contributor.name,
                contributions: contributor.contributions,
              }))}
            />
          </>
        ) : (
          <pre className="bg-gray-800 text-white p-4 rounded-lg shadow-lg overflow-auto">
            <code>{\`


\`}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
`}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
