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
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' };

    const formatDay = (date: Date, label: string) => ({
      label: label,
      value: `${date.toLocaleDateString('pt-BR', options).split('-')[0]}, ${date.toLocaleDateString('pt-BR')}`
    });

    days.push(formatDay(today, 'Hoje'));
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    days.push(formatDay(tomorrow, 'Amanhã'));
    
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);
    days.push(formatDay(dayAfter, dayAfter.toLocaleDateString('pt-BR', options).split('-')[0]));
    
    return days;
  }, []);

  const handleSubmit = () => {
    if (selectedDay && selectedTime.trim()) {
      onScheduleSelect(selectedDay, selectedTime.trim());
    }
  };

  return (
    <div className="w-full text-center animate-slide-up">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Quando quer receber?</h2>
      <p className="text-white/80 mb-10">Escolha o melhor dia e horário para você.</p>
      
      <div className="space-y-8">
        <div>
          <h3 className="font-bold text-xl mb-4">Dia da Entrega</h3>
          <div className="grid grid-cols-3 gap-3">
            {deliveryDays.map(day => (
              <button
                key={day.value}
                onClick={() => setSelectedDay(day.value)}
                className={`p-4 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 ${
                  selectedDay === day.value
                    ? 'bg-white text-orange-600 scale-105 shadow-lg'
                    : 'bg-white/20 border-2 border-white/50'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {selectedDay && (
          <div className="animate-fade-in">
            <h3 className="font-bold text-xl mb-4">Horário de Entrega</h3>
            <input
              type="text"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              placeholder="Ex: Entre 14h e 16h"
              className="w-full p-4 bg-white/20 border-2 border-white/50 rounded-xl text-white placeholder-white/60 text-lg focus:outline-none focus:ring-4 focus:ring-white/50 transition-shadow"
              required
            />
          </div>
        )}
      </div>

      <div className="mt-12">
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white font-bold text-xl py-4 px-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedDay || !selectedTime.trim()}
        >
          Confirmar Horário
        </button>
      </div>

       <style>{`
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-slide-up {
                animation: slideUp 0.5s ease-out forwards;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default ScheduleStep;