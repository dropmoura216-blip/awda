import React, { useState, useMemo } from 'react';

interface ScheduleStepProps {
  onScheduleSelect: (day: string, time: string) => void;
}

const ScheduleStep: React.FC<ScheduleStepProps> = ({ onScheduleSelect }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  const deliveryDays = useMemo(() => {
    const days = [];
    const today = new Date();

    const formatDay = (date: Date, label: string) => ({
      label: label,
      value: `${date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'short' })}`
    });

    days.push(formatDay(today, 'Hoje'));
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    days.push(formatDay(tomorrow, 'Amanhã'));
    
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);
    const dayAfterLabel = dayAfter.toLocaleDateString('pt-BR', { weekday: 'long' }).replace('-feira', '');
    days.push(formatDay(dayAfter, dayAfterLabel));
    
    return days;
  }, []);

  const handleSubmit = () => {
    if (selectedDay && selectedTime.trim()) {
      onScheduleSelect(selectedDay, selectedTime.trim());
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between text-center animate-slide-in p-6 md:p-8">
      <div className="flex-grow flex flex-col justify-center">
        <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2 text-balance">Quando quer receber?</h2>
            <p className="text-black/70">Escolha o melhor dia e horário para você.</p>
        </div>
        
        <div className="space-y-8 max-w-sm mx-auto w-full">
          <div>
            <h3 className="font-bold text-black/60 text-sm tracking-widest uppercase mb-4">Dia</h3>
            <div className="grid grid-cols-3 gap-3">
              {deliveryDays.map(day => (
                <button
                  key={day.value}
                  onClick={() => setSelectedDay(day.value)}
                  className={`relative p-2 rounded-2xl font-bold transition-all duration-300 ease-in-out transform hover:scale-105 text-sm flex flex-col items-center justify-center h-20 shadow-md overflow-hidden ${
                    selectedDay === day.value
                      ? 'bg-black text-white scale-105 shadow-xl'
                      : 'bg-white/50 text-black border-2 border-black/20'
                  }`}
                >
                  <span className="text-base capitalize">{day.label}</span>
                  <span className={`text-xs mt-1 ${selectedDay === day.value ? 'text-gray-400' : 'text-black/60'}`}>{day.value.split(', ')[1]}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedDay && (
            <div className="animate-fade-in">
              <h3 className="font-bold text-black/60 text-sm tracking-widest uppercase mb-4">Horário Sugerido</h3>
              <input
                type="text"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                placeholder="Ex: Entre 14h e 16h"
                className="w-full p-4 bg-white/50 border-2 border-black/20 rounded-2xl text-black placeholder-black/50 text-lg focus:outline-none focus:ring-4 focus:ring-black/50 focus:border-black/50 transition-all duration-300 shadow-md"
                required
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-shrink-0 pt-4">
        <button
          onClick={handleSubmit}
          className="w-full max-w-sm mx-auto bg-black text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedDay || !selectedTime.trim()}
        >
          Confirmar Horário
        </button>
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
            @keyframes pulseFast {
              50% { opacity: 0.7; }
            }
            .animate-pulse-fast {
                animation: pulseFast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
        `}</style>
    </div>
  );
};

export default React.memo(ScheduleStep);