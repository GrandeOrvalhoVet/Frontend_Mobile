import api from "../plugins/api";

class AnimalService {
  async getAllAnimals() {
    const response = await api.get("/animais/");
    return response.data;
  }
  async getAnimalById(animalId) {
    const response = await api.get(`/animais/${animalId}/`);
    /*porque agudo? */
    return response.data;
  }
}

export default new AnimalService();
