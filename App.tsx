import React, { useState, useMemo } from 'react';
import { Step, DeliveryMethod } from './types';
import WelcomeStep from './components/WelcomeStep';
import SizeStep from './components/SizeStep';
import DeliveryStep from './components/DeliveryStep';
import AddressStep from './components/AddressStep';
import ScheduleStep from './components/ScheduleStep';
import SummaryStep from './components/SummaryStep';
import ProgressBar from './components/StepIndicator';

// --- CONFIGURAÇÕES ---
const WHATSAPP_NUMBER = "5514999999999"; // Substitua pelo seu número com código do país e DDD
const PRICE = "R$120";
const CITY = "Marília-SP";
// --------------------

export default function App() {
  const [step, setStep] = useState<Step>(Step.Welcome);
  const [size, setSize] = useState<number | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod | null>(null);
  const [address, setAddress] = useState<string>('');
  const [schedule, setSchedule] = useState<{ day: string; time: string } | null>(null);

  const handleStart = () => {
    setStep(Step.Size);
  };
  
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
    message += `\n- Valor: ${PRICE}`;
    message += `\n- Pagamento: No ato da entrega`;
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
  
  const showHeader = step !== Step.Welcome;
  const totalSteps = 5;

  return (
    <div className="text-black h-full flex flex-col font-inter overflow-hidden">
      {showHeader && (
        <header className="flex-shrink-0 w-full p-4 z-10">
          <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
            <button onClick={handleBack} className="text-black/70 hover:text-black transition-colors p-2 -ml-2 rounded-full hover:bg-black/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-full">
              <ProgressBar currentStep={step} totalSteps={totalSteps} />
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow flex flex-col w-full max-w-md mx-auto overflow-hidden">
        {renderStep()}
      </main>
      
    </div>
  );
}