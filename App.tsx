import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { DishCard } from './components/DishCard';
import { generateWorldCupMenu } from './services/geminiService';
import { MenuResponse } from './types';
import { Star, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateWorldCupMenu();
      setMenuData(data);
    } catch (err: any) {
      console.error(err);
      setError("Hubo un problema al conectar con el servicio de IA. Por favor verifica tu API KEY o intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Hero onGenerate={handleGenerateMenu} isLoading={loading} />

      <main className="flex-grow bg-slate-50 relative">
        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto mt-10 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-800">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Menu Content */}
        {menuData && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
            
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-slate-200 rounded-full mb-4">
                 <Star className="w-4 h-4 text-gold-600 mx-1" />
                 <Star className="w-4 h-4 text-gold-600 mx-1" />
                 <Star className="w-4 h-4 text-gold-600 mx-1" />
                 <Star className="w-4 h-4 text-gold-600 mx-1" />
                 <Star className="w-4 h-4 text-gold-600 mx-1" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                {menuData.menuTitle}
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {menuData.themeDescription}
              </p>
            </div>

            <div className="space-y-12">
              {menuData.dishes.map((dish, index) => (
                <DishCard key={index} dish={dish} index={index} />
              ))}
            </div>

            <div className="mt-20 text-center border-t border-slate-200 pt-10">
               <p className="text-slate-400 text-sm">
                 Menú generado por Inteligencia Artificial (Gemini) para fines educativos. 
                 <br />
                 Copa Culinaria © {new Date().getFullYear()}
               </p>
            </div>
          </div>
        )}
        
        {/* Empty State placeholder if not generated yet */}
        {!menuData && !loading && !error && (
          <div className="max-w-4xl mx-auto py-20 text-center px-4">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-2xl font-serif font-semibold text-slate-800 mb-2">Esperando al Chef...</h3>
              <p className="text-slate-500">
                Presiona el botón "Revelar Menú" para generar una propuesta única basada en momentos históricos del fútbol mundial.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
