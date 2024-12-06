import React, { useState } from 'react';
import { Github } from 'lucide-react';
import type { Contributor } from '../types/contributor';

interface ContributorCardProps {
  contributor: Contributor;
}

export function ContributorCard({ contributor }: ContributorCardProps) {
  const [repos, setRepos] = useState<any[]>([]);

  // Fetch GitHub repositories on hover
  const handleHover = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${contributor.githubUsername}/repos`);
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error("Failed to fetch repositories", error);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="absolute top-0 right-0 p-4">
        <a
          href={`https://github.com/${contributor.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <img
          src={contributor.avatarUrl}
          alt={contributor.name}
          className="w-24 h-24 rounded-full ring-4 ring-purple-500/30 cursor-pointer"
          onMouseEnter={handleHover} // Trigger hover effect
          onMouseLeave={() => setRepos([])} // Clear repos on mouse leave
        />

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {contributor.name}
          </h3>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            {contributor.role}
          </p>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
            {contributor.contributions} contributions
          </span>
        </div>
        
        {/* Tooltip or repository list on hover */}
        {repos.length > 0 && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg max-w-xs">
            <h4 className="font-semibold text-gray-800 dark:text-white">Repositories:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {repos.slice(0, 6).map((repo: any) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  {repo.name}
                </a>
              ))}
              {repos.length > 6 && (
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  +{repos.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
