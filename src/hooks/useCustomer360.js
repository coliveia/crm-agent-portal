import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

/**
 * Hook para gerenciar dados da Visão 360 do Cliente
 */
export function useCustomer360(customerId) {
  const [customer, setCustomer] = useState(null);
  const [cases, setCases] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCustomer360 = useCallback(async (id) => {
    if (!id) {
      setCustomer(null);
      setCases([]);
      setInteractions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Tentar buscar dados do BFF
      const data = await apiService.getCustomer360(id);
      setCustomer(data.customer);
      setCases(data.cases || []);
      setInteractions(data.interactions || []);
    } catch (err) {
      console.warn('API not available, using mock data:', err);
      // Fallback para dados mock quando API não está disponível
      setCustomer(getMockCustomer(id));
      setCases(getMockCases(id));
      setInteractions(getMockInteractions(id));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomer360(customerId);
  }, [customerId, fetchCustomer360]);

  const refresh = useCallback(() => {
    fetchCustomer360(customerId);
  }, [customerId, fetchCustomer360]);

  return {
    customer,
    cases,
    interactions,
    loading,
    error,
    refresh,
  };
}

// Mock data functions for development/fallback
function getMockCustomer(customerId) {
  const customers = {
    'CUST-001': {
      customerId: 'CUST-001',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      cpf: '***.***.***-78',
      segment: 'Premium',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      preferredChannel: 'WHATSAPP',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      totalCases: 8,
      openCases: 2,
      lastInteraction: '24/01/2026 10:30',
      customerSince: '2020-03-15',
      lifetimeValue: 'R$ 45.000,00'
    },
    'CUST-002': {
      customerId: 'CUST-002',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '(11) 98888-8888',
      cpf: '***.***.***-45',
      segment: 'Standard',
      status: 'ACTIVE',
      riskLevel: 'MEDIUM',
      preferredChannel: 'EMAIL',
      address: 'Rua Augusta, 500',
      city: 'São Paulo',
      state: 'SP',
      totalCases: 5,
      openCases: 1,
      lastInteraction: '24/01/2026 11:15',
      customerSince: '2021-06-20',
      lifetimeValue: 'R$ 22.000,00'
    },
    'CUST-003': {
      customerId: 'CUST-003',
      name: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      phone: '(11) 97777-7777',
      cpf: '***.***.***-12',
      segment: 'Basic',
      status: 'ACTIVE',
      riskLevel: 'HIGH',
      preferredChannel: 'PHONE',
      address: 'Av. Brasil, 200',
      city: 'São Paulo',
      state: 'SP',
      totalCases: 12,
      openCases: 3,
      lastInteraction: '24/01/2026 12:00',
      customerSince: '2019-01-10',
      lifetimeValue: 'R$ 15.000,00'
    }
  };

  return customers[customerId] || customers['CUST-001'];
}

function getMockCases(customerId) {
  return [
    {
      id: 'CASE-2026-001',
      protocol: '202601240001',
      type: 'Reclamação Fatura',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      createdAt: '24/01/2026 10:30'
    },
    {
      id: 'CASE-2026-010',
      protocol: '202601200010',
      type: 'Dúvida Contrato',
      status: 'RESOLVED',
      priority: 'LOW',
      createdAt: '20/01/2026 14:00'
    }
  ];
}

function getMockInteractions(customerId) {
  return [
    {
      id: 'INT-001',
      type: 'PHONE',
      channel: 'Telefone',
      summary: 'Cliente ligou para verificar fatura',
      date: '24/01/2026 10:30',
      agent: 'Agent User'
    },
    {
      id: 'INT-002',
      type: 'EMAIL',
      channel: 'Email',
      summary: 'Enviado comprovante de pagamento',
      date: '20/01/2026 15:00',
      agent: 'Agent User'
    }
  ];
}

export default useCustomer360;
