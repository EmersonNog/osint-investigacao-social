import { useParams } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import {
  fetchGithubUser,
  fetchEmpresaCNPJ,
  fetchSocialByName,
} from "../services/osintAPI";
import Loader from "../components/Loader";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { SparklesCore } from "../components/ui/sparkles";

function getIcon(url: string): React.ReactNode {
  const icons: { [key: string]: IconType } = {
    "facebook.com": FaFacebook,
    "instagram.com": FaInstagram,
    "linkedin.com": FaLinkedin,
    "youtube.com": FaYoutube,
    "tiktok.com": FaTiktok,
    "twitter.com": FaTwitter,
    "x.com": FaTwitter,
    "pinterest.com": FaPinterest,
  };

  for (const key in icons) {
    if (url.includes(key)) {
      const Icon = icons[key];
      return (
        <Icon
          {...({
            className: "inline text-xl mr-2",
          } as React.ComponentProps<IconType>)}
        />
      );
    }
  }

  return null;
}

export default function Report() {
  const { tipo, query } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (tipo === "nick") {
          const github = await fetchGithubUser(query!);
          setData({ github });
        } else if (tipo === "cnpj") {
          const empresa = await fetchEmpresaCNPJ(query!);
          setData({ empresa });
        } else if (tipo === "nome") {
          const socials = await fetchSocialByName(query!);
          setData({ socials });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setData(null);
      }
      setLoading(false);
    };

    loadData();
  }, [tipo, query]);

  if (loading) return <Loader />;
  if (!data)
    return <p className="text-red-600">Erro ao carregar dados OSINT.</p>;

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden flex items-center justify-center px-4">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparklesCore
          background="transparent"
          particleColor="#ffffff"
          particleDensity={120}
          particleSize={1.5}
        />
      </div>

      <div className="relative z-10 max-w-3xl w-full bg-white/10 text-white rounded-xl shadow-xl backdrop-blur-sm p-8">
        <h2 className="text-3xl font-extrabold tracking-tight mb-6 text-center text-white drop-shadow">
          Relatório: <span className="text-indigo-300">{query}</span>
        </h2>

        {data.github && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-indigo-400">
              Perfil GitHub
            </h3>
            <ul className="space-y-1">
              <li>
                <strong>Nome:</strong> {data.github.name}
              </li>
              <li>
                <strong>Localização:</strong> {data.github.location}
              </li>
              <li>
                <strong>Bio:</strong> {data.github.bio}
              </li>
              <li>
                <strong>Repositórios Públicos:</strong>{" "}
                {data.github.public_repos}
              </li>
            </ul>
          </section>
        )}

        {data.empresa && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Dados da Empresa
            </h3>
            <ul className="space-y-1">
              <li>
                <strong>Razão Social:</strong> {data.empresa.razao_social}
              </li>
              <li>
                <strong>Nome Fantasia:</strong> {data.empresa.nome_fantasia}
              </li>
              <li>
                <strong>CNPJ:</strong> {data.empresa.cnpj}
              </li>
            </ul>
          </section>
        )}

        {data.socials && (
          <section>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Perfis em Redes Sociais
            </h3>
            <ul className="space-y-2">
              {data.socials.map((item: any, index: number) => (
                <li key={index}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-300 hover:text-white transition-all duration-200"
                  >
                    {getIcon(item.link)}
                    <span>{item.title || item.link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
