import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCharacterSkills = (characterId) => {
  return api.get(`/character-skills/${characterId}`);
}

export const getCharacters = () => {
  return api.get("/character-sheets");
};

export const saveCharacter = (characterData) => {
  return api.post("/character-sheets", characterData);
};

export const deleteCharacter = (characterId) => {
  return api.delete(`/character-sheets/${characterId}`);
};

const apiService = {
    getCharacterSkills,
    getCharacters,
    saveCharacter,
    deleteCharacter,
}

export default apiService