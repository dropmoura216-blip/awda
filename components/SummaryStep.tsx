import React from 'react';
import { DeliveryMethod } from '../types';

interface SummaryStepProps {
  size: number | null;
  deliveryMethod: DeliveryMethod | null;
  address: string;
  schedule: { day: string; time: string } | null;
  price: string;
  whatsappLink: string;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ size, deliveryMethod, address, schedule, price, whatsappLink }) => {
  return (
    <div className="w-full text-center flex flex-col items-center animate-slide-up">
      <h2 className="text-4xl font-anton uppercase drop-shadow-lg mb-4">Perfeito!</h2>
      <p className="text-white/90 mb-6 text-lg max-w-sm">
        Seu pedido está quase pronto. Pague somente ao receber.
      </p>

      <div className="bg-white/10 border-2 border-white/30 rounded-2xl p-6 w-full mb-8 text-left space-y-3 shadow-lg">
        <img 
            src="https://i.postimg.cc/MGR8tS8t/a48f17c5-9e0b-4822-8126-f43ac12ff2bf-1763141303.jpg" 
            alt="Tênis Nike Pegasus"
            className="w-full h-auto object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold border-b border-white/20 pb-2 mb-3 text-center">SEU PEDIDO</h3>
        <div className="flex justify-between items-center"><span className="font-semibold text-white/70">Produto:</span> <span className="font-bold">Nike Pegasus</span></div>
        <div className="flex justify-between items-center"><span className="font-semibold text-white/70">Tamanho:</span> <span className="font-bold">{size}</span></div>
        {deliveryMethod && <div className="flex justify-between items-center"><span className="font-semibold text-white/70">Entrega:</span> <span className="font-bold">{deliveryMethod}</span></div>}
        {address && <div className="flex justify-between items-start"><span className="font-semibold text-white/70 flex-shrink-0 mr-2">Endereço:</span> <span className="font-bold text-right">{address}</span></div>}
        {schedule && <div className="flex justify-between items-center"><span className="font-semibold text-white/70">Agendado:</span> <span className="font-bold text-right">{schedule.day}, {schedule.time}</span></div>}
         <div className="pt-3 mt-3 border-t border-white/20 flex justify-between items-baseline">
            <span className="font-semibold text-white/70 text-lg">TOTAL:</span> 
            <span className="font-anton text-3xl">{price}</span>
        </div>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-green-500 text-white font-bold text-xl py-5 px-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center animate-pulse"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.654 4.298 1.919 6.012l-1.29 4.721 4.833-1.274z"/></svg>
        FAZER PEDIDO NO WHATSAPP
      </a>
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

export default SummaryStep;