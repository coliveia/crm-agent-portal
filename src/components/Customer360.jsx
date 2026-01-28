import { useState } from 'react';
import { 
  User, Phone, Mail, MapPin, Calendar, Tag, Shield, 
  CreditCard, FileText, MessageSquare, TrendingUp, 
  AlertTriangle, Star, Clock, ChevronDown, ChevronUp,
  Heart, Zap
} from 'lucide-react';

const InfoCard = ({ icon: Icon, label, value, color }) => (
  <div className="info-card">
    <div className="info-icon" style={{ color }}>
      <Icon size={16} />
    </div>
    <div className="info-content">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
    </div>
  </div>
);

const StatCard = ({ label, value, icon: Icon, color, bgColor }) => (
  <div className="stat-card" style={{ background: bgColor }}>
    <Icon size={18} color={color} />
    <span className="stat-value" style={{ color }}>{value}</span>
    <span className="stat-label">{label}</span>
  </div>
);

export default function Customer360({ customer }) {
  const [expandedSection, setExpandedSection] = useState('profile');

  if (!customer) {
    return (
      <div className="customer-360-empty glass-card">
        <User size={48} className="empty-icon" />
        <h3>Nenhum cliente selecionado</h3>
        <p>Selecione um caso para ver os dados do cliente</p>
      </div>
    );
  }

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getRiskLevelConfig = (level) => {
    switch (level) {
      case 'LOW':
        return { color: '#10b981', label: 'Baixo', icon: Shield };
      case 'MEDIUM':
        return { color: '#f59e0b', label: 'Médio', icon: AlertTriangle };
      case 'HIGH':
        return { color: '#ef4444', label: 'Alto', icon: AlertTriangle };
      default:
        return { color: '#6b7280', label: level, icon: Shield };
    }
  };

  const getSegmentConfig = (segment) => {
    switch (segment) {
      case 'Premium':
        return { color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' };
      case 'Standard':
        return { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' };
      case 'Basic':
        return { color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
      default:
        return { color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
    }
  };

  const riskConfig = getRiskLevelConfig(customer.riskLevel);
  const segmentConfig = getSegmentConfig(customer.segment);

  const sections = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'contact', label: 'Contato', icon: Phone },
    { id: 'history', label: 'Histórico', icon: Clock },
    { id: 'preferences', label: 'Preferências', icon: Heart }
  ];

  return (
    <div className="customer-360">
      {/* Header */}
      <div className="customer-header glass-card">
        <div className="customer-avatar-large">
          {customer.name.charAt(0)}
        </div>
        <div className="customer-main-info">
          <h2>{customer.name}</h2>
          <div className="customer-badges">
            <span 
              className="segment-badge"
              style={{ 
                color: segmentConfig.color, 
                background: segmentConfig.bgColor 
              }}
            >
              <Star size={12} />
              {customer.segment}
            </span>
            <span 
              className="status-badge"
              style={{ 
                color: customer.status === 'ACTIVE' ? '#10b981' : '#ef4444',
                background: customer.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
              }}
            >
              {customer.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <StatCard 
          label="Casos Abertos" 
          value={customer.openCases || 2} 
          icon={FileText}
          color="#f59e0b"
          bgColor="rgba(245, 158, 11, 0.1)"
        />
        <StatCard 
          label="Total Casos" 
          value={customer.totalCases || 8} 
          icon={MessageSquare}
          color="#3b82f6"
          bgColor="rgba(59, 130, 246, 0.1)"
        />
        <StatCard 
          label="Risco" 
          value={riskConfig.label} 
          icon={riskConfig.icon}
          color={riskConfig.color}
          bgColor={`${riskConfig.color}15`}
        />
      </div>

      {/* Accordion Sections */}
      <div className="customer-sections">
        {sections.map(section => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          
          return (
            <div key={section.id} className={`section-card glass-card ${isExpanded ? 'expanded' : ''}`}>
              <button 
                className="section-header"
                onClick={() => toggleSection(section.id)}
              >
                <div className="section-title">
                  <Icon size={18} />
                  <span>{section.label}</span>
                </div>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {isExpanded && (
                <div className="section-content animate-fade-in">
                  {section.id === 'profile' && (
                    <div className="info-grid">
                      <InfoCard icon={User} label="Nome" value={customer.name} color="#8b5cf6" />
                      <InfoCard icon={Tag} label="ID" value={customer.customerId} color="#3b82f6" />
                      <InfoCard icon={CreditCard} label="CPF" value={customer.cpf} color="#10b981" />
                      <InfoCard icon={Calendar} label="Cliente desde" value={customer.customerSince} color="#f59e0b" />
                      <InfoCard icon={TrendingUp} label="Lifetime Value" value={customer.lifetimeValue} color="#ec4899" />
                      <InfoCard icon={Shield} label="Nível de Risco" value={riskConfig.label} color={riskConfig.color} />
                    </div>
                  )}
                  
                  {section.id === 'contact' && (
                    <div className="info-grid">
                      <InfoCard icon={Mail} label="Email" value={customer.email} color="#3b82f6" />
                      <InfoCard icon={Phone} label="Telefone" value={customer.phone} color="#10b981" />
                      <InfoCard icon={MapPin} label="Endereço" value={customer.address} color="#f59e0b" />
                      <InfoCard icon={MapPin} label="Cidade" value={`${customer.city} - ${customer.state}`} color="#8b5cf6" />
                    </div>
                  )}
                  
                  {section.id === 'history' && (
                    <div className="history-content">
                      <div className="history-item">
                        <div className="history-dot"></div>
                        <div className="history-info">
                          <span className="history-event">Última interação</span>
                          <span className="history-time">{customer.lastInteraction}</span>
                        </div>
                      </div>
                      <div className="history-item">
                        <div className="history-dot"></div>
                        <div className="history-info">
                          <span className="history-event">Total de casos</span>
                          <span className="history-time">{customer.totalCases} casos registrados</span>
                        </div>
                      </div>
                      <div className="history-item">
                        <div className="history-dot"></div>
                        <div className="history-info">
                          <span className="history-event">Casos em aberto</span>
                          <span className="history-time">{customer.openCases} casos pendentes</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {section.id === 'preferences' && (
                    <div className="info-grid">
                      <InfoCard 
                        icon={Zap} 
                        label="Canal Preferido" 
                        value={customer.preferredChannel} 
                        color="#8b5cf6" 
                      />
                      <InfoCard 
                        icon={Star} 
                        label="Segmento" 
                        value={customer.segment} 
                        color={segmentConfig.color} 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .customer-360 {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .customer-360-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          min-height: 200px;
        }

        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .customer-360-empty h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .customer-360-empty p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .customer-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
        }

        .customer-avatar-large {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          border-radius: 50%;
          box-shadow: var(--shadow-glow);
        }

        .customer-main-info h2 {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .customer-badges {
          display: flex;
          gap: 0.5rem;
        }

        .segment-badge, .status-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          text-align: center;
        }

        .stat-value {
          font-size: 1.125rem;
          font-weight: 700;
          margin: 0.25rem 0;
        }

        .stat-label {
          font-size: 0.625rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .customer-sections {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .section-card {
          overflow: hidden;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .section-header:hover {
          background: rgba(168, 85, 247, 0.05);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .section-title svg {
          color: var(--primary-purple);
        }

        .section-content {
          padding: 0 1rem 1rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .info-card {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.75rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .info-icon {
          padding: 0.25rem;
          background: white;
          border-radius: var(--radius-sm);
        }

        .info-content {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          min-width: 0;
        }

        .info-label {
          font-size: 0.625rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .info-value {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-primary);
          word-break: break-word;
        }

        .history-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .history-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .history-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          border-radius: 50%;
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .history-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }

        .history-event {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .history-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
