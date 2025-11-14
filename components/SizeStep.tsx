import React from 'react';

interface SizeStepProps {
  onSizeSelect: (size: number) => void;
}

const SIZES = [40, 41, 42];

const SizeStep: React.FC<SizeStepProps> = ({ onSizeSelect }) => {
  return (
    <div className="w-full text-center animate-slide-up">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Qual o seu tamanho?</h2>
      <p className="text-white/80 mb-10">Escolha uma das opções disponíveis.</p>
      
      <div className="grid grid-cols-3 gap-4 w-full">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className="aspect-square bg-white/20 text-white border-2 border-white/50 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-lg transform transition-all duration-200 hover:bg-white hover:text-orange-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            {size}
          </button>
        ))}
      </div>
       <style>{`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUp 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default SizeStep;