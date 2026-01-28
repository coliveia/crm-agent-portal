/**
 * CRM+ Agent Portal - API Service
 * Integração com o BFF (Backend for Frontend)
 */

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // ============ CASES API ============
  async getCases(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/cases${query ? `?${query}` : ''}`);
  }

  async getCaseById(caseId) {
    return this.request(`/cases/${caseId}`);
  }

  async createCase(caseData) {
    return this.request('/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
  }

  async updateCase(caseId, caseData) {
    return this.request(`/cases/${caseId}`, {
      method: 'PUT',
      body: JSON.stringify(caseData),
    });
  }

  async updateCaseStatus(caseId, status) {
    return this.request(`/cases/${caseId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async assignCase(caseId, agentId) {
    return this.request(`/cases/${caseId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ agentId }),
    });
  }

  async escalateCase(caseId, reason) {
    return this.request(`/cases/${caseId}/escalate`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async addCaseNote(caseId, note) {
    return this.request(`/cases/${caseId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ content: note }),
    });
  }

  async getCaseNotes(caseId) {
    return this.request(`/cases/${caseId}/notes`);
  }

  async getCaseTimeline(caseId) {
    return this.request(`/cases/${caseId}/timeline`);
  }

  // ============ CUSTOMERS API ============
  async getCustomers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/customers${query ? `?${query}` : ''}`);
  }

  async getCustomerById(customerId) {
    return this.request(`/customers/${customerId}`);
  }

  async getCustomer360(customerId) {
    return this.request(`/customers/${customerId}/360`);
  }

  async searchCustomers(query) {
    return this.request(`/customers/search?q=${encodeURIComponent(query)}`);
  }

  async getCustomerCases(customerId) {
    return this.request(`/customers/${customerId}/cases`);
  }

  async getCustomerInteractions(customerId) {
    return this.request(`/customers/${customerId}/interactions`);
  }

  // ============ SLA API ============
  async getCaseSLA(caseId) {
    return this.request(`/sla/cases/${caseId}`);
  }

  async pauseSLA(caseId, reason) {
    return this.request(`/sla/cases/${caseId}/pause`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  async resumeSLA(caseId) {
    return this.request(`/sla/cases/${caseId}/resume`, {
      method: 'POST',
    });
  }

  async getSLAMetrics() {
    return this.request('/sla/metrics');
  }

  // ============ COPILOT API ============
  async getCopilotSuggestions(context) {
    return this.request('/copilot/suggestions', {
      method: 'POST',
      body: JSON.stringify(context),
    });
  }

  async sendCopilotMessage(message, context = {}) {
    return this.request('/copilot/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context }),
    });
  }

  async getCopilotRecommendedActions(caseId) {
    return this.request(`/copilot/cases/${caseId}/actions`);
  }

  async applyCopilotSuggestion(suggestionId) {
    return this.request(`/copilot/suggestions/${suggestionId}/apply`, {
      method: 'POST',
    });
  }

  async provideCopilotFeedback(suggestionId, feedback) {
    return this.request(`/copilot/suggestions/${suggestionId}/feedback`, {
      method: 'POST',
      body: JSON.stringify({ feedback }),
    });
  }

  // ============ INTERACTIONS API ============
  async createInteraction(interactionData) {
    return this.request('/interactions', {
      method: 'POST',
      body: JSON.stringify(interactionData),
    });
  }

  async getInteractionsByCase(caseId) {
    return this.request(`/interactions/cases/${caseId}`);
  }

  // ============ WORKFLOW API ============
  async getAvailableWorkflows(caseType) {
    return this.request(`/workflows?caseType=${caseType}`);
  }

  async executeWorkflowStep(caseId, stepId, data) {
    return this.request(`/workflows/cases/${caseId}/steps/${stepId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============ AGENT API ============
  async getAgentProfile() {
    return this.request('/agents/me');
  }

  async updateAgentStatus(status) {
    return this.request('/agents/me/status', {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async getAgentMetrics() {
    return this.request('/agents/me/metrics');
  }

  async getAgentCases() {
    return this.request('/agents/me/cases');
  }

  // ============ VISÃO 360 API ============
  async getVisao360ByTelefone(telefone) {
    return this.request(`/visao360/atendimento/${encodeURIComponent(telefone)}`);
  }

  async getVisao360ByCustomerId(customerId) {
    return this.request(`/visao360/atendimento/cliente/${customerId}`);
  }

  async getVisao360Protocolos(customerId, status = 'todos') {
    return this.request(`/visao360/protocolos/${customerId}?status=${status}`);
  }

  async getVisao360Protocolo(protocoloId) {
    return this.request(`/visao360/protocolo/${protocoloId}`);
  }

  async getVisao360Instancia(telefone) {
    return this.request(`/visao360/instancia/${encodeURIComponent(telefone)}`);
  }

  async getVisao360Produtos(customerId) {
    return this.request(`/visao360/produtos/${customerId}`);
  }

  async getVisao360Avisos(customerId) {
    return this.request(`/visao360/avisos/${customerId}`);
  }

  async getVisao360IAResumo(customerId, protocoloId = null) {
    const params = protocoloId ? `?protocoloId=${protocoloId}` : '';
    return this.request(`/visao360/ia-resumo/${customerId}${params}`);
  }

  async getVisao360Financeiro(customerId) {
    return this.request(`/visao360/financeiro/${customerId}`);
  }

  async getVisao360Apps(customerId) {
    return this.request(`/visao360/apps/${customerId}`);
  }

  // ============ DASHBOARD API ============
  async getDashboardMetrics() {
    return this.request('/dashboard/metrics');
  }

  async getDashboardRecentCases() {
    return this.request('/dashboard/recent-cases');
  }

  async getDashboardSLAOverview() {
    return this.request('/dashboard/sla-overview');
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService;
export { ApiService };
