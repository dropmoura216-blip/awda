import React from 'react';
import { DeliveryMethod } from '../types';

interface DeliveryStepProps {
  onDeliverySelect: (method: DeliveryMethod) => void;
}

const DeliveryStep: React.FC<DeliveryStepProps> = ({ onDeliverySelect }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center text-center animate-slide-in p-6 md:p-8">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="flex-shrink-0 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 text-balance">Como prefere receber?</h2>
            <p className="text-black/70">Escolha a forma mais conveniente para você.</p>
        </div>
        
        <div className="space-y-4 w-full max-w-sm mx-auto">
          <button
            onClick={() => onDeliverySelect('Entrega em casa')}
            className="w-full flex items-center text-left bg-black text-white p-4 rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-black/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h3.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
            </svg>
            <div className="flex-grow flex items-center justify-between">
              <span className="font-bold text-lg">Entrega em casa</span>
              <span className="bg-white text-orange-600 text-xs font-bold tracking-wide px-3 py-1 rounded-full shadow-sm">
                Envio Grátis
              </span>
            </div>
          </button>
          <button
            onClick={() => onDeliverySelect('Retirada rápida')}
            className="w-full flex items-center justify-center text-left bg-white/50 text-black border-2 border-black/20 font-bold text-lg p-4 rounded-2xl shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-black hover:text-white focus:outline-none focus:ring-4 focus:ring-black/50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.58 10.73l-1.63-5.52a2 2 0 0 0-1.92-1.21H7.83l.22 1H18.03a1 1 0 0 1 .96.6l1.29 4.35-1.57.46-1.29-4.35H7.59l-.9-3H4v2h1.61l2.06 7.02c.19.64.76 1.07 1.42 1.07h7.24c.66 0 1.23-.43 1.42-1.07l1.04-3.59H18v-2h2.58l1 3.42.92.27-.92-3.69z"/>
            </svg>
            <span className="flex-grow">Retirada rápida</span>
          </button>
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
        `}</style>
    </div>
  );
};

export default React.memo(DeliveryStep);