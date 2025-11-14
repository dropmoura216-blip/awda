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
    <div className="w-full h-full flex flex-col animate-slide-up text-gray-800">
      <div className="flex-grow overflow-y-auto pb-4 pr-1">
        <h2 className="text-4xl font-anton uppercase drop-shadow-lg mb-2 text-center">Perfeito!</h2>
        <p className="text-gray-600 mb-6 text-lg max-w-sm text-center mx-auto">
          Seu pedido está quase pronto. Pague somente ao receber.
        </p>

        <div className="bg-gray-50 border-2 border-gray-200/80 rounded-2xl p-5 w-full text-left space-y-3 shadow-sm">
          <img 
              src="https://i.postimg.cc/MGR8tS8t/a48f17c5-9e0b-4822-8126-f43ac12ff2bf-1763141303.jpg" 
              alt="Tênis Nike Pegasus"
              className="w-full h-auto object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-3 text-center text-gray-500 tracking-wider uppercase">SEU PEDIDO</h3>
          <div className="flex justify-between items-center"><span className="font-semibold text-gray-500">Produto:</span> <span className="font-bold text-gray-900">Nike Pegasus</span></div>
          <div className="flex justify-between items-center"><span className="font-semibold text-gray-500">Tamanho:</span> <span className="font-bold text-gray-900">{size}</span></div>
          {deliveryMethod && <div className="flex justify-between items-center"><span className="font-semibold text-gray-500">Entrega:</span> <span className="font-bold text-gray-900">{deliveryMethod}</span></div>}
          {address && <div className="flex justify-between items-start"><span className="font-semibold text-gray-500 flex-shrink-0 mr-2">Endereço:</span> <span className="font-bold text-gray-900 text-right">{address}</span></div>}
          {schedule && <div className="flex justify-between items-center"><span className="font-semibold text-gray-500">Agendado:</span> <span className="font-bold text-gray-900 text-right">{schedule.day}, {schedule.time}</span></div>}
          <div className="pt-4 mt-3 border-t-2 border-gray-200 flex justify-between items-baseline">
              <span className="font-semibold text-gray-500 text-lg">TOTAL:</span> 
              <span className="font-anton text-3xl text-gray-900">{price}</span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 pt-4 -mx-6 -mb-6 px-6 pb-6 bg-white border-t border-gray-200">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white font-bold text-xl py-4 px-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center animate-pulse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.654 4.298 1.919 6.012l-1.29 4.721 4.833-1.274z"/></svg>
          FINALIZAR NO WHATSAPP
        </a>
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

export default SummaryStep;