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

  return (
    <div className="bg-orange-600 text-white min-h-screen flex flex-col items-center justify-between p-4 font-inter relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-0"></div>
      
      <header className="w-full max-w-md mx-auto z-10">
        {step !== Step.Welcome && (
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleBack} className="text-white text-sm font-bold opacity-80 hover:opacity-100 transition-opacity">
              &larr; Voltar
            </button>
            <StepIndicator currentStep={step} />
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto z-10">
        {renderStep()}
      </main>
      
      <footer className="w-full text-center text-xs text-white/60 z-10 py-2">
        Pagamento somente ao receber!
      </footer>
    </div>
  );
}