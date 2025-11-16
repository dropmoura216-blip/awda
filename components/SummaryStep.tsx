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

const IconSize = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const IconDelivery = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconSchedule = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconPayment = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>;

const SummaryItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number | null }) => (
    <li className="flex items-center justify-between gap-2 py-3">
        <div className="flex items-center gap-3">
            <div className="bg-black/5 p-2 rounded-full">{icon}</div>
            <span className="font-medium text-black/60 text-sm flex-shrink-0">{label}</span>
        </div>
        <span className="font-bold text-black text-right text-sm text-balance">{value}</span>
    </li>
);


const SummaryStep: React.FC<SummaryStepProps> = ({ size, deliveryMethod, address, schedule, price, whatsappLink }) => {
  
  const handleWhatsAppClick = () => {
    // Rastreia o evento de conversão final para o Microsoft Clarity.
    if (typeof window.clarity === 'function') {
      window.clarity('event', 'Conversion: Clicked WhatsApp');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between animate-slide-in text-black p-6">
      <div className="flex-shrink-0 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-balance">Tudo Certo Para o Seu Pedido!</h2>
          <p className="text-black/70 mb-4 max-w-sm mx-auto text-balance text-sm">
            Confirme os detalhes abaixo. O pagamento é na entrega.
          </p>
      </div>

      <div className="flex-grow flex flex-col justify-center my-2">
        <div className="bg-white/80 border border-white/20 rounded-2xl shadow-xl w-full text-left overflow-hidden">
          {/* Cabeçalho do Produto */}
          <div className="p-4 flex gap-4 items-center bg-white/50">
            <img 
                src="https://i.postimg.cc/kMZZjSZ2/a48f17c5-9e0b-4822-8126-f43ac12ff2bf-1763141303.jpg" 
                alt="Tênis Nike Pegasus"
                className="w-20 h-20 object-cover rounded-xl shadow-md flex-shrink-0"
                loading="lazy"
            />
            <div>
              <h3 className="text-lg font-bold text-black">Nike Pegasus</h3>
              <p className="font-anton text-3xl text-black -mt-1">{price}</p>
            </div>
          </div>
          
          {/* Lista de Detalhes */}
          <div className="px-4 pb-1">
            <ul className="text-base divide-y divide-black/5">
              <SummaryItem icon={<IconSize />} label="Tamanho" value={size} />

              {deliveryMethod && (
                <SummaryItem icon={<IconDelivery />} label="Entrega" value={deliveryMethod} />
              )}

              {address && (
                <SummaryItem icon={<IconDelivery />} label="Endereço" value={address} />
              )}
              
              {schedule && (
                 <SummaryItem icon={<IconSchedule />} label="Agendado" value={`${schedule.day}, ${schedule.time}`} />
              )}

              {deliveryMethod === 'Retirada rápida' && (
                <SummaryItem icon={<IconDelivery />} label="Local" value="A combinar" />
              )}

              <SummaryItem icon={<IconPayment />} label="Pagamento" value="No Ato da Entrega" />
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex-shrink-0 mt-auto pt-4">
        <a
          href={whatsappLink}
          onClick={handleWhatsAppClick}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-black text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018.3 8.5z" />
          </svg>
          FINALIZAR PEDIDO
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
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-out forwards;
            }
      `}</style>
    </div>
  );
};

export default React.memo(SummaryStep);