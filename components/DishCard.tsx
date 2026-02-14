import React from 'react';
import { Dish } from '../types';
import { Utensils, Flag, Trophy, Info } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  index: number;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, index }) => {
  // Simple mapping for visual variety based on index
  const alignment = index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse';
  
  return (
    <div className={`flex flex-col ${alignment} bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 transition-transform hover:scale-[1.01] duration-300`}>
      {/* Visual Side (Placeholder) */}
      <div className="lg:w-1/3 bg-slate-800 relative min-h-[200px] lg:min-h-full">
         <img 
            src={`https://picsum.photos/seed/${dish.country.replace(/\s/g, '')}${dish.course.replace(/\s/g, '')}/600/800`} 
            alt={dish.name}
            className="w-full h-full object-cover opacity-60"
         />
         <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
            <span className="text-gold-400 font-bold tracking-widest uppercase text-sm mb-2">{dish.course}</span>
            <h3 className="text-white font-serif text-2xl font-bold">{dish.country}</h3>
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
      </div>

      {/* Content Side */}
      <div className="lg:w-2/3 p-8 flex flex-col justify-center">
        <div className="flex items-center space-x-2 text-gold-600 mb-3">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide">{dish.moment}</span>
        </div>
        
        <h2 className="text-3xl font-serif text-slate-900 mb-4">{dish.name}</h2>
        
        <p className="text-slate-600 italic mb-6 leading-relaxed border-l-4 border-gold-400 pl-4">
          {dish.description}
        </p>

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
           <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-pitch-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-1">Concepto Culinario</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{dish.reasoning}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
