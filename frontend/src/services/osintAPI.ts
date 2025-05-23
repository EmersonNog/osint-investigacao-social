import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchGithubUser(username: string) {
  const url = `https://api.github.com/users/${username}`;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchEmpresaCNPJ(cnpj: string) {
  const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
  const response = await axios.get(url);
  return response.data;
}

export async function fetchSocialByName(name: string) {
  const url = `http://localhost:3000/api/social-search?q=${encodeURIComponent(
    name
  )}`;
  const response = await axios.get(url);
  return response.data;
}
