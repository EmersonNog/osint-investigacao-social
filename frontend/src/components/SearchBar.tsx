import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [tipoBusca, setTipoBusca] = useState("nome");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      const encoded = encodeURIComponent(input.trim());
      navigate(`/report/${tipoBusca}/${encoded}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const getPlaceholders = () => {
    switch (tipoBusca) {
      case "nick":
        return [
          "Digite o nome de usuário do GitHub",
          "Ex: torvalds",
          "Ex: gaearon",
        ];
      case "nome":
        return ["Ex: João da Silva", "Nome Real"];
      case "cnpj":
        return [
          "CNPJ (somente números)",
          "Ex: 12345678000195",
          "CNPJ da empresa",
        ];
      default:
        return ["Digite algo para buscar"];
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2 mt-8"
    >
      <select
        value={tipoBusca}
        onChange={(e) => setTipoBusca(e.target.value)}
        className="bg-black border text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded-md text-white"
      >
        <option value="nick">Nick (GitHub)</option>
        <option value="nome">Nome Real</option>
        <option value="cnpj">CNPJ</option>
      </select>

      <div className="w-full min-w-[250px] sm:w-[400px]">
        <PlaceholdersAndVanishInput
          value={input}
          placeholders={getPlaceholders()}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </form>
  );
}
