import { useState, useCallback, useEffect } from 'react';
import apiService from '../services/api';

/**
 * Hook para gerenciar integração com o Copilot IA
 */
export function useCopilot(caseData, customerData) {
  const [suggestions, setSuggestions] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou o Copilot IA. Como posso ajudar você hoje?',
      isBot: true,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  // Buscar sugestões quando o caso muda
  const fetchSuggestions = useCallback(async () => {
    if (!caseData) {
      setSuggestions(getDefaultSuggestions());
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const context = {
        caseId: caseData.id,
        caseType: caseData.type,
        priority: caseData.priority,
        status: caseData.status,
        customerId: customerData?.customerId,
        customerSegment: customerData?.segment
      };

      const data = await apiService.getCopilotSuggestions(context);
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.warn('Copilot API not available, using mock suggestions:', err);
      setSuggestions(getMockSuggestions(caseData, customerData));
    } finally {
      setLoading(false);
    }
  }, [caseData, customerData]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  // Enviar mensagem para o Copilot
  const sendMessage = useCallback(async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const context = {
        caseId: caseData?.id,
        customerId: customerData?.customerId,
        conversationHistory: messages.slice(-5)
      };

      const response = await apiService.sendCopilotMessage(message, context);
      
      const botMessage = {
        id: messages.length + 2,
        text: response.message,
        isBot: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.warn('Copilot chat API not available, using mock response:', err);
      
      // Simular delay de resposta
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botMessage = {
        id: messages.length + 2,
        text: getMockResponse(message, caseData),
        isBot: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, caseData, customerData]);

  // Aplicar sugestão
  const applySuggestion = useCallback(async (suggestionId) => {
    try {
      await apiService.applyCopilotSuggestion(suggestionId);
      
      setSuggestions(prev => 
        prev.map(s => s.id === suggestionId ? { ...s, applied: true } : s)
      );
      
      return true;
    } catch (err) {
      console.warn('Apply suggestion API not available:', err);
      
      // Atualizar localmente mesmo sem API
      setSuggestions(prev => 
        prev.map(s => s.id === suggestionId ? { ...s, applied: true } : s)
      );
      
      return true;
    }
  }, []);

  // Enviar feedback sobre sugestão
  const provideFeedback = useCallback(async (suggestionId, feedback) => {
    try {
      await apiService.provideCopilotFeedback(suggestionId, feedback);
    } catch (err) {
      console.warn('Feedback API not available:', err);
    }
  }, []);

  // Atualizar sugestões
  const refreshSuggestions = useCallback(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return {
    suggestions,
    messages,
    loading,
    isTyping,
    error,
    sendMessage,
    applySuggestion,
    provideFeedback,
    refreshSuggestions
  };
}

// Default suggestions when no case is selected
function getDefaultSuggestions() {
  return [
    {
      id: 'default-1',
      type: 'Dica',
      text: 'Selecione um caso para receber sugestões personalizadas do Copilot IA.',
      confidence: 100
    }
  ];
}

// Mock suggestions based on case data
function getMockSuggestions(caseData, customerData) {
  const suggestions = [];

  if (caseData?.type?.includes('Fatura') || caseData?.type?.includes('Cobrança')) {
    suggestions.push({
      id: 'sug-1',
      type: 'Resposta Sugerida',
      text: 'Prezado cliente, identificamos uma cobrança duplicada em sua fatura. Estamos processando o estorno que será creditado em até 5 dias úteis.',
      confidence: 95
    });
  }

  if (caseData?.priority === 'HIGH') {
    suggestions.push({
      id: 'sug-2',
      type: 'Próxima Ação',
      text: 'Verificar histórico de pagamentos do cliente nos últimos 3 meses para identificar padrão de cobranças.',
      confidence: 87
    });
  }

  if (customerData?.segment === 'Premium') {
    suggestions.push({
      id: 'sug-3',
      type: 'Alerta',
      text: `Cliente ${customerData.segment} com ${customerData.totalCases || 0} casos registrados. Considere oferecer atendimento prioritário.`,
      confidence: 92
    });
  }

  if (caseData?.type?.includes('Cancelamento')) {
    suggestions.push({
      id: 'sug-4',
      type: 'Retenção',
      text: 'Antes de processar o cancelamento, verifique ofertas de retenção disponíveis. Clientes com mais de 2 anos têm desconto especial.',
      confidence: 88
    });
  }

  // Default suggestion if none match
  if (suggestions.length === 0) {
    suggestions.push({
      id: 'sug-default',
      type: 'Próxima Ação',
      text: 'Verifique o histórico do cliente e as interações anteriores para uma resolução mais eficiente.',
      confidence: 75
    });
  }

  return suggestions;
}

// Mock response based on user message
function getMockResponse(message, caseData) {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('fatura') || lowerMessage.includes('cobrança')) {
    return 'Para questões de fatura, recomendo verificar o histórico de pagamentos do cliente e confirmar se há cobranças duplicadas no sistema. Posso gerar um relatório detalhado se necessário.';
  }

  if (lowerMessage.includes('cancelamento') || lowerMessage.includes('cancelar')) {
    return 'Antes de processar o cancelamento, sugiro verificar se há ofertas de retenção disponíveis para este perfil de cliente. Clientes Premium geralmente têm condições especiais.';
  }

  if (lowerMessage.includes('sla') || lowerMessage.includes('prazo')) {
    const slaInfo = caseData?.slaRemaining || '2h 15m';
    return `O SLA atual está em ${slaInfo}. Para casos de alta prioridade como este, recomendo priorizar a resolução para evitar violação do acordo de nível de serviço.`;
  }

  if (lowerMessage.includes('cliente') || lowerMessage.includes('histórico')) {
    return 'O cliente possui um histórico de interações que pode ajudar na resolução. Verifique a aba "Visão 360" para ver todos os detalhes e casos anteriores.';
  }

  if (lowerMessage.includes('escalar') || lowerMessage.includes('supervisor')) {
    return 'Para escalar o caso, utilize o botão "Escalar" nos detalhes do caso. Lembre-se de documentar o motivo da escalação para facilitar o acompanhamento.';
  }

  return 'Entendi sua solicitação. Com base no contexto do caso atual, sugiro verificar o histórico do cliente e as interações anteriores para uma resolução mais eficiente. Posso ajudar com algo mais específico?';
}

export default useCopilot;
