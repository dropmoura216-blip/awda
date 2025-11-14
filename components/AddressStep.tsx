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
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Endereço para entrega</h2>
      <p className="text-gray-500 mb-10">Digite seu bairro e rua para levarmos até você!</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ex: Bairro Centro, Rua das Flores, 123"
          className="w-full p-4 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 text-lg focus:outline-none focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-800 text-white font-bold text-xl py-4 px-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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