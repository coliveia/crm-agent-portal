import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

/**
 * Hook para gerenciar dados da Visão 360
 * Integra com o BFF para buscar dados do atendimento
 */
export function useVisao360(telefone = null, customerId = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tempoAtendimento, setTempoAtendimento] = useState(0);

  // Timer para tempo de atendimento
  useEffect(() => {
    const timer = setInterval(() => {
      setTempoAtendimento(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formatar tempo de atendimento
  const formatTempoAtendimento = useCallback(() => {
    const hours = Math.floor(tempoAtendimento / 3600);
    const minutes = Math.floor((tempoAtendimento % 3600) / 60);
    const seconds = tempoAtendimento % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [tempoAtendimento]);

  // Buscar dados completos da Visão 360
  const fetchVisao360 = useCallback(async () => {
    if (!telefone && !customerId) return;

    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (telefone) {
        result = await apiService.getVisao360ByTelefone(telefone);
      } else if (customerId) {
        result = await apiService.getVisao360ByCustomerId(customerId);
      }

      setData(result);
    } catch (err) {
      console.error('Erro ao buscar Visão 360:', err);
      setError(err.message);
      
      // Usar dados mock em caso de erro (para MVP)
      setData(getMockData(telefone));
    } finally {
      setLoading(false);
    }
  }, [telefone, customerId]);

  // Buscar dados ao montar ou quando telefone/customerId mudar
  useEffect(() => {
    fetchVisao360();
  }, [fetchVisao360]);

  // Atualizar protocolo atual
  const setProtocoloAtual = useCallback(async (protocoloId) => {
    if (!data) return;
    
    try {
      const protocolo = await apiService.getVisao360Protocolo(protocoloId);
      setData(prev => ({
        ...prev,
        protocolos: {
          ...prev.protocolos,
          atual: protocoloId,
          protocoloAtual: protocolo
        }
      }));
    } catch (err) {
      console.error('Erro ao atualizar protocolo:', err);
    }
  }, [data]);

  // Atualizar resumo da IA
  const refreshIAResumo = useCallback(async () => {
    if (!data?.cliente?.id) return;

    try {
      const iaResumo = await apiService.getVisao360IAResumo(
        data.cliente.id,
        data.protocolos?.atual
      );
      setData(prev => ({
        ...prev,
        iaResumo
      }));
    } catch (err) {
      console.error('Erro ao atualizar IA resumo:', err);
    }
  }, [data?.cliente?.id, data?.protocolos?.atual]);

  // Atualizar avisos
  const refreshAvisos = useCallback(async () => {
    if (!data?.cliente?.id) return;

    try {
      const avisos = await apiService.getVisao360Avisos(data.cliente.id);
      setData(prev => ({
        ...prev,
        avisos
      }));
    } catch (err) {
      console.error('Erro ao atualizar avisos:', err);
    }
  }, [data?.cliente?.id]);

  // Resetar tempo de atendimento
  const resetTempoAtendimento = useCallback(() => {
    setTempoAtendimento(0);
  }, []);

  return {
    data,
    loading,
    error,
    tempoAtendimento: formatTempoAtendimento(),
    refresh: fetchVisao360,
    setProtocoloAtual,
    refreshIAResumo,
    refreshAvisos,
    resetTempoAtendimento
  };
}

/**
 * Dados mock para MVP quando a API não está disponível
 */
function getMockData(telefone) {
  return {
    cliente: {
      id: 'CUST-MOCK-001',
      nome: 'Juliana',
      telefone: formatTelefone(telefone) || '(11) 91234-5678',
      avatar: 'J'
    },
    instancia: {
      telefone: formatTelefone(telefone) || '(11) 91234-5678',
      tipo: 'Móvel',
      status: 'Ativo'
    },
    protocolos: {
      atual: '15030714062567',
      abertos: [
        {
          id: '2024110001',
          numero: '#2024110001',
          status: 'Em Andamento',
          tags: ['Sem acesso à internet fixa', 'Visita técnica'],
          descricao: 'O cliente solicita mudança de endereço. Um chamado foi aberto com uma visita marcada para o dia 20/09.',
          plano: 'Vivo Total Família 2',
          data: '12/12/2024',
          tipo: 'Loja Vivo'
        },
        {
          id: '2024110002',
          numero: '#2024110002',
          status: 'Em Andamento',
          tags: ['Transferência de Titularidade'],
          descricao: 'O cliente solicitou uma transferência de titularidade. O processo...',
          plano: 'Vivo Fibra',
          data: '01/12/2024',
          tipo: null
        }
      ],
      total: 2,
      visitaMarcada: {
        protocoloId: '2024110001',
        mensagem: 'Juliana já possui uma visita marcada para amanhã'
      }
    },
    avisos: [
      {
        tipo: 'urgente',
        titulo: 'Segunda via',
        descricao: 'Identificamos recorrência na solicitação de segunda via.',
        badge: 'Crítico'
      }
    ],
    iaResumo: {
      titulo: 'I.Ajuda',
      badge: 'Vivo Total',
      mensagem: 'Juliana gostaria de realizar a segunda via pois sua Vivo Fibra ainda não está funcionando. A fatura de setembro ainda não consta como paga no sistema.',
      acaoSugerida: 'Segunda via'
    },
    dadosCadastrais: {
      nomeCompleto: 'Juliana',
      tipoCliente: ['Platinum', 'Cliente Tradicional'],
      cpf: '456.xxx.xxx-98',
      situacaoFinanceira: {
        status: 'Recebemos faturas em atraso, a fatura está em aberto.',
        emAtraso: true,
        acao: 'Atualizar fatura'
      }
    },
    apps: [
      { id: 'app-1', nome: 'Acessos e e-mail', tipo: 'acesso', status: 'Ativo' }
    ],
    produtos: [
      { id: 'prod-1', nome: 'Vivo Total Família 2', tipo: 'plano', status: 'Ativo' },
      { id: 'prod-2', nome: 'Vivo Pós com Amazon Prime', tipo: 'addon', status: 'Ativo' }
    ],
    metadata: {
      timestamp: new Date().toISOString(),
      customerId: 'CUST-MOCK-001',
      telefone: telefone
    }
  };
}

function formatTelefone(telefone) {
  if (!telefone) return null;
  const clean = telefone.replace(/\D/g, '');
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return telefone;
}

export default useVisao360;
