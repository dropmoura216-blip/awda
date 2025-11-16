import React from 'react';

interface SizeStepProps {
  onSizeSelect: (size: number) => void;
}

const SIZES = [
  { size: 40, lowStock: true },
  { size: 41, lowStock: true },
  { size: 42, lowStock: true },
];

const SizeStep: React.FC<SizeStepProps> = ({ onSizeSelect }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center text-center animate-slide-in p-8">
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-2 text-balance">Qual o seu tamanho?</h2>
        <p className="text-black/70 mb-12">Tamanhos disponíveis para pronta entrega.</p>
        
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mx-auto">
          {SIZES.map(({ size, lowStock }) => (
            <div key={size} className="flex flex-col items-center">
              <button
                onClick={() => onSizeSelect(size)}
                className="aspect-square w-full bg-white/50 text-black border-2 border-black/20 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-md transform transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-black/50"
              >
                {size}
              </button>
              {lowStock && (
                <span className="text-xs font-bold text-black/70 mt-2 animate-pulse-fast tracking-wider">
                  Apenas 1 unidade.
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
       <style>{`
            @keyframes slideIn {
                from { opacity: 0; transform: translateX(50px) scale(0.98); }
                to { opacity: 1; transform: translateX(0) scale(1); }
            }
            .animate-slide-in {
                animation: slideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
            @keyframes pulseFast {
              50% { opacity: 0.6; }
            }
            .animate-pulse-fast {
                animation: pulseFast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
        `}</style>
    </div>
  );
};

export default React.memo(SizeStep);