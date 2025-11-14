import React, { useState, useMemo } from 'react';
import { Step, DeliveryMethod } from './types';
import WelcomeStep from './components/WelcomeStep';
import SizeStep from './components/SizeStep';
import DeliveryStep from './components/DeliveryStep';
import AddressStep from './components/AddressStep';
import ScheduleStep from './components/ScheduleStep';
import SummaryStep from './components/SummaryStep';
import StepIndicator from './components/StepIndicator';

// --- CONFIGURAÇÕES ---
const WHATSAPP_NUMBER = "5514999999999"; // Substitua pelo seu número com código do país e DDD
const PRICE = "R$120,00";
const CITY = "Marília-SP";
// --------------------

export default function App() {
  const [step, setStep] = useState<Step>(Step.Welcome);
  const [size, setSize] = useState<number | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null);
  const [address, setAddress] = useState<string>('');
  const [schedule, setSchedule] = useState<{ day: string; time: string } | null>(null);


  const handleStart = () => setStep(Step.Size);
  
  const handleSizeSelect = (selectedSize: number) => {
    setSize(selectedSize);
    setStep(Step.Delivery);
  };

  const handleDeliverySelect = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
    if (method === 'Entrega em casa') {
      setStep(Step.Address);
    } else {
      setAddress('');
      setSchedule(null);
      setStep(Step.Summary);
    }
  };

  const handleAddressSubmit = (submittedAddress: string) => {
    setAddress(submittedAddress);
    setStep(Step.Schedule);
  };
  
  const handleScheduleSelect = (day: string, time: string) => {
    setSchedule({ day, time });
    setStep(Step.Summary);
  };

  const handleBack = () => {
    if (step === Step.Summary) {
        if(deliveryMethod === 'Entrega em casa') {
            setStep(Step.Schedule);
        } else {
            setStep(Step.Delivery);
        }
    } else if (step === Step.Schedule) {
        setStep(Step.Address);
    } else if (step === Step.Address) {
      setStep(Step.Delivery);
    } else if (step === Step.Delivery) {
      setStep(Step.Size);
    } else if (step === Step.Size) {
      setStep(Step.Welcome);
    }
  };

  const whatsappMessage = useMemo(() => {
    let message = `Olá! Quero meu Nike Pegasus:\n- Tamanho: ${size}`;
    if (deliveryMethod) {
      message += `\n- Entrega: ${deliveryMethod}`;
    }
    if (deliveryMethod === 'Entrega em casa' && address) {
      message += `\n- Endereço: ${address}, ${CITY}`;
    }
    if (schedule) {
      message += `\n- Agendamento: ${schedule.day}, ${schedule.time}`;
    }
    if (deliveryMethod === 'Retirada rápida') {
        message += `\n- Local: Combinar retirada em ${CITY}`;
    }
    return encodeURIComponent(message);
  }, [size, deliveryMethod, address, schedule]);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const renderStep = () => {
    switch (step) {
      case Step.Welcome:
        return <WelcomeStep onStart={handleStart} />;
      case Step.Size:
        return <SizeStep onSizeSelect={handleSizeSelect} />;
      case Step.Delivery:
        return <DeliveryStep onDeliverySelect={handleDeliverySelect} />;
      case Step.Address:
        return <AddressStep onSubmit={handleAddressSubmit} />;
      case Step.Schedule:
        return <ScheduleStep onScheduleSelect={handleScheduleSelect} />;
      case Step.Summary:
        return (
          <SummaryStep
            size={size}
            deliveryMethod={deliveryMethod}
            address={address}
            schedule={schedule}
            price={PRICE}
            whatsappLink={whatsappLink}
          />
        );
      default:
        return <WelcomeStep onStart={handleStart} />;
    }
  };
  
  const mainContainerClass = step === Step.Welcome ? 'p-0' : 'p-6';

  return (
    <div className="text-gray-800 min-h-screen flex flex-col font-inter">
      <div className="w-full flex-grow flex flex-col overflow-hidden">
        
        {step !== Step.Welcome && (
          <header className="w-full p-4 z-10 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <button onClick={handleBack} className="text-gray-500 text-sm font-bold hover:text-gray-900 transition-colors">
                &larr; Voltar
              </button>
              <StepIndicator currentStep={step} />
            </div>
          </header>
        )}

        <main className={`flex-grow flex flex-col w-full z-10 overflow-hidden ${mainContainerClass}`}>
          {renderStep()}
        </main>
        
        {step !== Step.Welcome && step !== Step.Summary && (
           <footer className="w-full text-center text-xs text-gray-400 z-10 py-3 border-t border-gray-200 flex-shrink-0">
             Pagamento somente ao receber!
           </footer>
        )}
      </div>
    </div>
  );
}