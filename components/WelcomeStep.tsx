import React from 'react';

interface WelcomeStepProps {
  onStart: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
        <h1 className="font-anton text-5xl md:text-7xl text-white uppercase tracking-tighter drop-shadow-lg">
            Atenção Marília!
        </h1>
        <p className="text-xl md:text-2xl font-semibold mt-2 mb-6 drop-shadow-md">
            Seu <span className="bg-white text-orange-600 px-2 rounded-md">Nike Pegasus</span> chegou.
        </p>
        
        <div className="relative my-4">
            <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-2xl animate-pulse-slow"></div>
            <img 
                src="https://i.postimg.cc/MGR8tS8t/a48f17c5-9e0b-4822-8126-f43ac12ff2bf-1763141303.jpg" 
                alt="Tênis Nike Pegasus em destaque" 
                className="w-80 h-auto animate-float z-10 relative rounded-2xl shadow-2xl"
            />
        </div>

        <p className="font-anton text-lg text-white/90 uppercase tracking-wide drop-shadow-md max-w-sm mb-8 px-4">
            Confirme seu endereço e tamanho, que levaremos o seu tênis até você. Pague somente ao receber!
        </p>

        <button 
            onClick={onStart} 
            className="w-full max-w-xs bg-black text-white font-bold text-xl py-4 px-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 active:scale-95 animate-pulse"
        >
            FAZER PEDIDO
        </button>
         <style>{`
            @keyframes float {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0px); }
            }
            .animate-float {
                animation: float 6s ease-in-out infinite;
            }
             @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-out forwards;
            }
             @keyframes pulse-slow {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            .animate-pulse-slow {
                animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
        `}</style>
    </div>
  );
};

export default WelcomeStep;