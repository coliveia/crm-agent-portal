import { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, Lightbulb, Zap, MessageSquare, 
  ThumbsUp, ThumbsDown, Copy, RefreshCw, ChevronRight,
  FileText, User, Clock, AlertTriangle, CheckCircle
} from 'lucide-react';

const SuggestionCard = ({ suggestion, onApply, onFeedback }) => {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    onApply && onApply(suggestion);
  };

  return (
    <div className={`suggestion-card ${applied ? 'applied' : ''}`}>
      <div className="suggestion-header">
        <div className="suggestion-type">
          <Lightbulb size={14} />
          <span>{suggestion.type}</span>
        </div>
        <span className="suggestion-confidence">{suggestion.confidence}% confiança</span>
      </div>
      <p className="suggestion-text">{suggestion.text}</p>
      <div className="suggestion-actions">
        <button 
          className="btn btn-sm btn-primary"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? (
            <>
              <CheckCircle size={14} />
              <span>Aplicado</span>
            </>
          ) : (
            <>
              <Zap size={14} />
              <span>Aplicar</span>
            </>
          )}
        </button>
        <div className="feedback-btns">
          <button 
            className="feedback-btn"
            onClick={() => onFeedback && onFeedback(suggestion.id, 'positive')}
          >
            <ThumbsUp size={14} />
          </button>
          <button 
            className="feedback-btn"
            onClick={() => onFeedback && onFeedback(suggestion.id, 'negative')}
          >
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ message, isBot }) => (
  <div className={`chat-message ${isBot ? 'bot' : 'user'}`}>
    {isBot && (
      <div className="message-avatar">
        <Bot size={16} />
      </div>
    )}
    <div className="message-content">
      <p>{message.text}</p>
      <span className="message-time">{message.time}</span>
    </div>
    {!isBot && (
      <div className="message-avatar user-avatar">
        <User size={16} />
      </div>
    )}
  </div>
);

export default function CopilotPanel({ caseData, customerData, fullScreen = false }) {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou o Copilot IA. Como posso ajudar você hoje?',
      isBot: true,
      time: '10:30'
    }
  ]);
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      type: 'Resposta Sugerida',
      text: 'Prezado cliente, identificamos uma cobrança duplicada em sua fatura. Estamos processando o estorno que será creditado em até 5 dias úteis.',
      confidence: 95
    },
    {
      id: 2,
      type: 'Próxima Ação',
      text: 'Verificar histórico de pagamentos do cliente nos últimos 3 meses para identificar padrão de cobranças.',
      confidence: 87
    },
    {
      id: 3,
      type: 'Alerta',
      text: 'Cliente Premium com 3 reclamações nos últimos 30 dias. Considere oferecer compensação.',
      confidence: 92
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(message),
        isBot: true,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('fatura') || lowerMessage.includes('cobrança')) {
      return 'Para questões de fatura, recomendo verificar o histórico de pagamentos do cliente e confirmar se há cobranças duplicadas no sistema. Posso gerar um relatório detalhado se necessário.';
    }
    if (lowerMessage.includes('cancelamento') || lowerMessage.includes('cancelar')) {
      return 'Antes de processar o cancelamento, sugiro verificar se há ofertas de retenção disponíveis para este perfil de cliente. Clientes Premium geralmente têm condições especiais.';
    }
    if (lowerMessage.includes('sla') || lowerMessage.includes('prazo')) {
      return 'O SLA atual está em 2h 15m. Para casos de alta prioridade como este, recomendo priorizar a resolução para evitar violação do acordo de nível de serviço.';
    }
    return 'Entendi sua solicitação. Com base no contexto do caso atual, sugiro verificar o histórico do cliente e as interações anteriores para uma resolução mais eficiente.';
  };

  const handleApplySuggestion = (suggestion) => {
    console.log('Applying suggestion:', suggestion);
  };

  const handleFeedback = (suggestionId, type) => {
    console.log('Feedback:', suggestionId, type);
  };

  const tabs = [
    { id: 'suggestions', label: 'Sugestões', icon: Lightbulb },
    { id: 'chat', label: 'Chat', icon: MessageSquare }
  ];

  return (
    <div className={`copilot-panel ${fullScreen ? 'full-screen' : ''}`}>
      {/* Header */}
      <div className="copilot-header">
        <div className="copilot-title">
          <div className="copilot-icon">
            <Sparkles size={20} />
          </div>
          <div>
            <h3>Copilot IA</h3>
            <span>Assistente Inteligente</span>
          </div>
        </div>
        <div className="copilot-status">
          <div className="status-dot status-dot-online"></div>
          <span>Online</span>
        </div>
      </div>

      {/* Context Info */}
      {caseData && (
        <div className="copilot-context">
          <div className="context-item">
            <FileText size={14} />
            <span>Caso: {caseData.protocol}</span>
          </div>
          {customerData && (
            <div className="context-item">
              <User size={14} />
              <span>{customerData.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="copilot-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`copilot-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="copilot-content">
        {activeTab === 'suggestions' && (
          <div className="suggestions-tab animate-fade-in">
            {suggestions.length === 0 ? (
              <div className="empty-suggestions">
                <Lightbulb size={32} />
                <p>Nenhuma sugestão disponível</p>
              </div>
            ) : (
              <div className="suggestions-list">
                {suggestions.map(suggestion => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onApply={handleApplySuggestion}
                    onFeedback={handleFeedback}
                  />
                ))}
              </div>
            )}
            <button className="btn btn-secondary btn-block refresh-btn">
              <RefreshCw size={16} />
              <span>Atualizar Sugestões</span>
            </button>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="chat-tab animate-fade-in">
            <div className="chat-messages">
              {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} isBot={msg.isBot} />
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <Bot size={16} />
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Digite sua pergunta..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                className="send-btn"
                onClick={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .copilot-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--glass-bg);
        }

        .copilot-panel.full-screen {
          max-width: 800px;
          margin: 0 auto;
          background: transparent;
        }

        .copilot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .copilot-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .copilot-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          border-radius: var(--radius-md);
          color: white;
          box-shadow: var(--shadow-glow);
        }

        .copilot-title h3 {
          font-size: 1rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .copilot-title span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .copilot-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--success);
          font-weight: 600;
        }

        .copilot-context {
          display: flex;
          gap: 1rem;
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-bottom: 1px solid var(--glass-border);
        }

        .context-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .context-item svg {
          color: var(--primary-purple);
        }

        .copilot-tabs {
          display: flex;
          padding: 0.5rem;
          gap: 0.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .copilot-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .copilot-tab:hover {
          background: rgba(168, 85, 247, 0.1);
        }

        .copilot-tab.active {
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          color: white;
          box-shadow: var(--shadow-glow);
        }

        .copilot-content {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .suggestions-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          overflow-y: auto;
        }

        .suggestions-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .suggestion-card {
          padding: 1rem;
          background: white;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          transition: var(--transition-normal);
        }

        .suggestion-card:hover {
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: var(--shadow-md);
        }

        .suggestion-card.applied {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }

        .suggestion-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .suggestion-type {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary-purple);
        }

        .suggestion-confidence {
          font-size: 0.625rem;
          color: var(--text-muted);
        }

        .suggestion-text {
          font-size: 0.875rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin: 0 0 0.75rem 0;
        }

        .suggestion-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .feedback-btns {
          display: flex;
          gap: 0.5rem;
        }

        .feedback-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .feedback-btn:hover {
          background: rgba(168, 85, 247, 0.1);
          color: var(--primary-purple);
        }

        .refresh-btn {
          margin-top: auto;
        }

        .empty-suggestions {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          gap: 0.5rem;
        }

        .chat-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-message {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
        }

        .chat-message.bot {
          align-self: flex-start;
        }

        .chat-message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          color: white;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .message-avatar.user-avatar {
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          color: var(--primary-purple);
          border: 1px solid var(--glass-border);
        }

        .message-content {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-lg);
          background: white;
          border: 1px solid var(--glass-border);
        }

        .chat-message.user .message-content {
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          color: white;
          border: none;
        }

        .message-content p {
          font-size: 0.875rem;
          line-height: 1.5;
          margin: 0 0 0.25rem 0;
        }

        .message-time {
          font-size: 0.625rem;
          color: var(--text-muted);
        }

        .chat-message.user .message-time {
          color: rgba(255, 255, 255, 0.7);
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: white;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          width: fit-content;
        }

        .typing-indicator svg {
          color: var(--primary-purple);
        }

        .typing-dots {
          display: flex;
          gap: 0.25rem;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: var(--primary-purple);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        .chat-input {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-top: 1px solid var(--glass-border);
        }

        .chat-input input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          font-size: 0.875rem;
          transition: var(--transition-normal);
        }

        .chat-input input:focus {
          outline: none;
          border-color: var(--primary-purple);
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .send-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          border: none;
          border-radius: var(--radius-lg);
          color: white;
          cursor: pointer;
          transition: var(--transition-normal);
          box-shadow: var(--shadow-glow);
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: var(--shadow-glow-strong);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
