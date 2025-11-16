import React, { useState, useMemo } from 'react';

interface AddressStepProps {
  onSubmit: (address: string) => void;
}

const mariliaAddresses = [
  'Avenida Sampaio Vidal',
  'Avenida das Esmeraldas',
  'Avenida Tiradentes',
  'Avenida Rio Branco',
  'Avenida Santo Antônio',
  'Rua Nove de Julho',
  'Rua São Luiz',
  'Rua Bahia',
  'Rua dos Tucunarés',
  'Avenida Ipiranga',
  'Avenida República',
  'Rua Vinte e Quatro de Dezembro',
  'Rua Prudente de Moraes',
  'Avenida Castro Alves',
  'Rua Doutor Joaquim de Abreu Sampaio Vidal',
  'Avenida Brigadeiro Eduardo Gomes',
  'Rua Bassan',
];

const AddressStep: React.FC<AddressStepProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 2) {
      const filtered = mariliaAddresses.filter(addr =>
        addr.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setAddress(suggestion);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address.trim());
      setSuggestions([]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between text-center animate-slide-in p-8">
      <div className="flex-grow flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-2 text-balance">Endereço para entrega</h2>
        <p className="text-black/70 mb-10">Bairro, rua e número para levarmos até você.</p>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
          <div className="relative">
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Ex: Av. Sampaio Vidal, 123"
              className="w-full p-4 bg-white/50 border-2 border-black/20 rounded-2xl text-black placeholder-black/50 text-lg focus:outline-none focus:ring-4 focus:ring-black/50 focus:border-black/50 transition-all duration-300 shadow-md"
              required
              autoComplete="off"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-white/95 border-2 border-black/10 rounded-2xl mt-2 text-left shadow-lg max-h-48 overflow-y-auto animate-fade-in-fast">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="border-b border-black/10 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left p-3 text-black/80 hover:bg-black/10 transition-colors duration-200 text-base"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </div>
      
      <div className="flex-shrink-0">
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-full max-w-sm mx-auto bg-black text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!address.trim()}
        >
          Confirmar Endereço
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
            @keyframes fadeInFast {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-fast {
                animation: fadeInFast 0.3s ease-out forwards;
            }
        `}</style>
    </div>
  );
};

export default React.memo(AddressStep);