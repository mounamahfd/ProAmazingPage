import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

interface ColorCarouselProps {
  onColorChange: (color: string) => void;
}

const oceanColors = ["#56C1D1", "#90EE90"];


export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
}

export function ColorCarousel({ onColorChange }: ColorCarouselProps) {
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentColorIndex((prev) => (prev === 0 ? oceanColors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentColorIndex((prev) => (prev === oceanColors.length - 1 ? 0 : prev + 1));
  };

  const handleColorSelect = (color: string) => {
    onColorChange(color); // Apply the selected color
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center">
      <button
        onClick={handlePrev}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        &lt; {/* Left arrow */}
      </button>

      <div
        onClick={() => handleColorSelect(oceanColors[currentColorIndex])}
        className="mx-4 w-16 h-16 rounded-full cursor-pointer"
        style={{
          backgroundColor: oceanColors[currentColorIndex],
          border: '2px solid #fff',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
        }}
      />

      <button
        onClick={handleNext}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
      >
        &gt; {/* Right arrow */}
      </button>
    </div>
  );
}

export function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string>(oceanColors[0]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const updateThemeColor = (color: string) => {
    setThemeColor(color);
  };

  useEffect(() => {
    // Apply the selected ocean color dynamically to the background
    document.documentElement.style.setProperty('--ocean-color', themeColor);
  }, [themeColor]);

  return (
    <div
      className={`min-h-screen ${isDark ? 'dark' : ''}`}
      style={{ backgroundColor: themeColor }} // Apply the color as the background
    >
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <ColorCarousel onColorChange={updateThemeColor} />

      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Ocean Themed App
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is an app where you can customize your theme color to resemble the ocean!
        </p>
      </div>
    </div>
  );
}
