import SearchBar from "../components/SearchBar";
import { GridBackground } from "../components/ui/GridBackgroundDemo";
import { InfiniteMovingCards } from "../components/ui/infinite-moving-cards";
import { Spotlight } from "../components/ui/Sportflight";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaAt,
  FaPinterest,
  FaGithub,
  FaBuilding,
} from "react-icons/fa";

const testimonials = [
  {
    icon: <FaInstagram />,
    name: "Instagram",
    title: "Conteúdo e conexões",
  },
  {
    icon: <FaFacebook />,
    name: "Facebook",
    title: "Atividade e grupos",
  },
  {
    icon: <FaLinkedin />,
    name: "LinkedIn",
    title: "Rede e histórico profissionais",
  },
  {
    icon: <FaYoutube />,
    name: "YouTube",
    title: "Vídeos e engajamento",
  },
  {
    icon: <FaTiktok />,
    name: "TikTok",
    title: "Busca conteúdos virais",
  },
  {
    icon: <FaTwitter />,
    name: "X (Twitter)",
    title: "Postagens e alcance",
  },
  {
    icon: <FaAt />,
    name: "Threads",
    title: "Interações sociais",
  },
  {
    icon: <FaPinterest />,
    name: "Pinterest",
    title: "Interesses visuais",
  },
  {
    icon: <FaGithub />,
    name: "GitHub",
    title: "Código e colaborações",
  },
  {
    icon: <FaBuilding />,
    name: "CNPJ",
    title: "Empresas e sócios",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen font-mono text-cyan-200 overflow-hidden">
      <Spotlight />
      <GridBackground />

      {/* Conteúdo principal com ajuste de posicionamento e fontes responsivas */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 min-h-screen justify-start sm:justify-center translate-y-36 sm:translate-x-0 sm:-translate-y-10">
        <h1 className="text-2xl sm:text-5xl font-extrabold text-cyan-300 drop-shadow-md animate-pulse">
          🧠 SOCINTEL
        </h1>

        <p className="mt-2 text-xs sm:text-lg tracking-wide text-green-400">
          <span className="text-[10px] sm:text-sm text-gray-500">[OSINT]</span>{" "}
          Investigação Social com Dados Públicos
        </p>

        <div className="mt-6 sm:mt-10 w-full max-w-xs sm:max-w-md">
          <SearchBar />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-full sm:max-w-6xl px-2 sm:px-4 z-10">
        <InfiniteMovingCards
          items={testimonials}
          speed="normal"
          direction="left"
        />
      </div>
    </div>
  );
}
