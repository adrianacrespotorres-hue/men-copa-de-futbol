import React from 'react';
import { ChefHat, Trophy } from 'lucide-react';

interface HeroProps {
  onGenerate: () => void;
  isLoading: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onGenerate, isLoading }) => {
  return (
    <div className="relative bg-slate-900 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 bg-gold-500 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 bg-pitch-500 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex justify-center items-center space-x-3 mb-6">
            <ChefHat className="w-10 h-10 text-gold-400" />
            <span className="text-gold-400 font-bold tracking-wider uppercase">Examen Final de Gastronomía</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
          Copa Culinaria Mundial
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
          Un evento gastronómico conceptual donde la historia del fútbol se fusiona con la alta cocina. 
          Diseñe y visualice el menú perfecto inspirado en leyendas y naciones.
        </p>

        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`
            group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 transition-all duration-200 
            bg-gold-500 rounded-full hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 focus:ring-offset-slate-900
            ${isLoading ? 'opacity-75 cursor-wait' : ''}
          `}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Consultando al Chef IA...
            </span>
          ) : (
            <span className="flex items-center">
               <Trophy className="w-5 h-5 mr-2" />
               Revelar Menú del Examen
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
