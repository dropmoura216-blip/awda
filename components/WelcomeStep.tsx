import React from 'react';

interface WelcomeStepProps {
  onStart: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onStart }) => {

  const handleStartClick = () => {
    // Adiciona uma vibração sutil para melhor feedback tátil em dispositivos móveis
    if (navigator.vibrate) {
      navigator.vibrate(50); // 50ms é um toque rápido e agradável
    }
    onStart();
  };

  return (
    <div className="flex flex-col h-full text-center animate-fade-in p-8 justify-center items-center gap-4 relative">
      <div className="z-10 flex flex-col items-center">
          <h1 className="font-anton text-6xl md:text-7xl text-black uppercase tracking-tighter drop-shadow-lg">
              Nike Pegasus
          </h1>
          <p className="text-lg md:text-xl font-semibold -mt-2 text-black/80 drop-shadow-md">
              Chegou em <span className="font-bold text-black underline decoration-wavy decoration-white/80">Marília</span>.
          </p>
      </div>

      <p className="font-medium text-black/70 drop-shadow-md max-w-xs mx-auto z-10 text-balance">
          Escolha seu tamanho, confirme a entrega e receba em casa. <span className="font-bold">Pague só no ato.</span>
      </p>
      
      <div className="relative z-10 my-4">
          <div className="absolute -inset-8 bg-white/30 rounded-full blur-2xl -z-10"></div>
          <img 
              src="https://i.postimg.cc/kMZZjSZ2/a48f17c5-9e0b-4822-8126-f43ac12ff2bf-1763141303.jpg" 
              alt="Tênis Nike Pegasus em destaque" 
              className="w-full max-w-xs mx-auto h-auto animate-float relative drop-shadow-2xl rounded-3xl"
          />
      </div>

      <div className="w-full max-w-xs mx-auto z-10 relative flex flex-col items-center">
          <button 
              onClick={handleStartClick} 
              className="w-full bg-black text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 animate-pulse-slow"
          >
              FAZER O PEDIDO
          </button>
           <div className="mt-4 animate-slide-in-left self-start">
              <div className="bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl text-left text-sm relative">
                  <p className="text-balance">
                      <span className="font-bold text-orange-400">🔥 ÚLTIMAS UNIDADES!</span> Restam apenas 3 pares. Garanta o seu.
                  </p>
              </div>
          </div>
      </div>
       <style>{`
          @keyframes float {
              0% { transform: translateY(0px) rotate(-5deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
              100% { transform: translateY(0px) rotate(-5deg); }
          }
          .animate-float {
              animation: float 8s ease-in-out infinite;
              will-change: transform;
          }
           @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
              animation: fadeIn 0.6s ease-out forwards;
          }
          @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-20px) scale(0.95); }
              to { opacity: 1; transform: translateX(0) scale(1); }
          }
          .animate-slide-in-left {
              opacity: 0; 
              animation: slideInLeft 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
              will-change: transform, opacity;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            50% { transform: scale(1.03); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1); }
          }
          .animate-pulse-slow {
              animation: pulse 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
              animation-delay: 1.5s;
          }
      `}</style>
    </div>
  );
};

export default React.memo(WelcomeStep);