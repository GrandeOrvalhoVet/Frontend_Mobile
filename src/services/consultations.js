import api from "../plugins/api";

class ConsultationService {
  async getAllConsultation() {
    const response = await api.get("/consultas/");
    return response.data;
  }
  /*Chama todas as consultas */
  async saveConsultation(consultation) {
    const response = await api.post("/consultas/", consultation);
    return response.data;
  }
  /*Posta as consultas criadas pelo cliente*/
  async deleteConsultation(consultation) {
    const response = await api.delete(`/consultas/${consultation.id}/`);
    /*porque agudo? */
    return response.data;
  }
  /*Deleta consultas criadas pelo cliente*/
}

export default new ConsultationService();
/*Porque New? */
