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
    <div className="w-full h-full flex flex-col justify-between animate-slide-in text-black p-8">
      <div className="flex-grow flex flex-col justify-center">
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-2 text-balance">Quase lá!</h2>
            <p className="text-black/70 mb-8">
            Confira seu pedido. O pagamento é feito na entrega.
            </p>
        </div>

        <div className="bg-white/40 border border-black/10 rounded-2xl p-5 w-full text-left space-y-4 shadow-lg">
          <div className="flex gap-4 items-center border-b border-black/10 pb-4">
            <img 
                src="https://i.postimg.cc/kMZZjSZ2/a48f17c5-9e0b-4822-8126-f43ac12ff2bf-1763141303.jpg" 
                alt="Tênis Nike Pegasus"
                className="w-24 h-24 object-cover rounded-lg shadow-md"
                loading="lazy"
            />
            <div>
              <h3 className="text-lg font-bold text-black">Nike Pegasus</h3>
              <p className="font-anton text-3xl text-black">{price}</p>
            </div>
          </div>
          
          <div className="space-y-3 text-base">
            <div className="flex justify-between items-center"><span className="font-medium text-black/70">Tamanho:</span> <span className="font-bold text-black">{size}</span></div>
            {deliveryMethod && <div className="flex justify-between items-center"><span className="font-medium text-black/70">Entrega:</span> <span className="font-bold text-black">{deliveryMethod}</span></div>}
            {address && <div className="flex justify-between items-start"><span className="font-medium text-black/70 flex-shrink-0 mr-2">Endereço:</span> <span className="font-bold text-black text-right text-balance">{address}</span></div>}
            {schedule && <div className="flex justify-between items-center"><span className="font-medium text-black/70">Agendado:</span> <span className="font-bold text-black text-right text-balance">{schedule.day}, {schedule.time}</span></div>}
            {deliveryMethod === 'Retirada rápida' && <div className="flex justify-between items-center"><span className="font-medium text-black/70">Local:</span> <span className="font-bold text-black">A combinar</span></div>}
            <div className="flex justify-between items-center"><span className="font-medium text-black/70">Pagamento:</span> <span className="font-bold text-black">No Ato da Entrega</span></div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.654 4.298 1.919 6.012l-1.29 4.721 4.833-1.274z"/></svg>
          FINALIZAR NO WHATSAPP
        </a>
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

export default React.memo(SummaryStep);