
import React, { useState } from 'react';

interface AddressStepProps {
  onSubmit: (address: string) => void;
}

const AddressStep: React.FC<AddressStepProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address.trim());
    }
  };

  return (
    <div className="w-full text-center animate-slide-up">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Endereço para entrega</h2>
      <p className="text-white/80 mb-10">Digite seu bairro e rua para levarmos até você!</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ex: Bairro Centro, Rua das Flores, 123"
          className="w-full p-4 bg-white/20 border-2 border-white/50 rounded-xl text-white placeholder-white/60 text-lg focus:outline-none focus:ring-4 focus:ring-white/50 transition-shadow"
          required
        />
        <button
          type="submit"
          className="w-full bg-black text-white font-bold text-xl py-4 px-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
          disabled={!address.trim()}
        >
          Confirmar Endereço
        </button>
      </form>
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

export default AddressStep;
