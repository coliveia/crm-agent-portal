import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, 
  FileText, Users, Zap, Activity, Target, Award, BarChart3
} from 'lucide-react';

const MetricsCard = ({ title, value, icon: Icon, color, bgColor, trend, trendLabel }) => {
  return (
    <div className="metrics-card glass-card hover-lift">
      <div className="metrics-card-header">
        <div className="metrics-card-title">
          <span>{title}</span>
        </div>
        <div className="metrics-card-icon" style={{ background: bgColor }}>
          <Icon size={22} color={color} />
        </div>
      </div>
      <div className="metrics-card-value gradient-text">{value}</div>
      {trend !== undefined && (
        <div className={`metrics-card-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trend >= 0 ? '+' : ''}{trend}% {trendLabel || 'vs semana anterior'}</span>
        </div>
      )}
    </div>
  );
};

const RecentCaseItem = ({ caseItem }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'HIGH': return 'badge-danger';
      case 'MEDIUM': return 'badge-warning';
      case 'LOW': return 'badge-success';
      default: return 'badge-info';
    }
  };

  return (
    <div className="recent-case-item">
      <div className="recent-case-info">
        <span className="recent-case-protocol">{caseItem.protocol}</span>
        <span className="recent-case-customer">{caseItem.customer}</span>
      </div>
      <div className="recent-case-meta">
        <span className={`badge ${getPriorityClass(caseItem.priority)}`}>
          {caseItem.priority}
        </span>
        <span className="recent-case-time">{caseItem.time}</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    casosAtivos: 24,
    aguardando: 8,
    resolvidosHoje: 15,
    slaEmRisco: 3,
    tempoMedioResolucao: '2h 45m',
    satisfacaoCliente: 94.5,
    taxaResolucao: 87.3,
    casosEscalados: 2
  });

  const [recentCases, setRecentCases] = useState([
    { id: 1, protocol: '202601240001', customer: 'João Silva', priority: 'HIGH', time: '10:30' },
    { id: 2, protocol: '202601240002', customer: 'Maria Santos', priority: 'MEDIUM', time: '11:15' },
    { id: 3, protocol: '202601240003', customer: 'Pedro Oliveira', priority: 'LOW', time: '12:00' },
    { id: 4, protocol: '202601240004', customer: 'Ana Costa', priority: 'HIGH', time: '14:20' },
    { id: 5, protocol: '202601240005', customer: 'Carlos Lima', priority: 'MEDIUM', time: '15:45' }
  ]);

  const stats = [
    {
      title: 'Casos Ativos',
      value: metrics.casosAtivos,
      icon: FileText,
      color: '#3b82f6',
      bgColor: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)',
      trend: 12
    },
    {
      title: 'Aguardando',
      value: metrics.aguardando,
      icon: Clock,
      color: '#f59e0b',
      bgColor: 'linear-gradient(135deg, #fef3c7 0%, #fef08a 100%)',
      trend: -8
    },
    {
      title: 'Resolvidos Hoje',
      value: metrics.resolvidosHoje,
      icon: CheckCircle,
      color: '#10b981',
      bgColor: 'linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)',
      trend: 23
    },
    {
      title: 'SLA em Risco',
      value: metrics.slaEmRisco,
      icon: AlertTriangle,
      color: '#ef4444',
      bgColor: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)',
      trend: -15
    }
  ];

  const performanceStats = [
    {
      title: 'Tempo Médio Resolução',
      value: metrics.tempoMedioResolucao,
      icon: Zap,
      color: '#8b5cf6',
      bgColor: 'linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%)'
    },
    {
      title: 'Satisfação Cliente',
      value: `${metrics.satisfacaoCliente}%`,
      icon: Award,
      color: '#ec4899',
      bgColor: 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)',
      trend: 5
    },
    {
      title: 'Taxa de Resolução',
      value: `${metrics.taxaResolucao}%`,
      icon: Target,
      color: '#06b6d4',
      bgColor: 'linear-gradient(135deg, #cffafe 0%, #ecfeff 100%)',
      trend: 3
    },
    {
      title: 'Casos Escalados',
      value: metrics.casosEscalados,
      icon: Activity,
      color: '#f97316',
      bgColor: 'linear-gradient(135deg, #ffedd5 0%, #fff7ed 100%)',
      trend: -20
    }
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2 className="gradient-text">Dashboard</h2>
          <p>Bem-vindo ao seu painel de atendimento</p>
        </div>
        <div className="dashboard-date">
          <Clock size={16} />
          <span>{new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="dashboard-stats-grid">
        {stats.map((stat, index) => (
          <div key={stat.title} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
            <MetricsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Performance Stats */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <BarChart3 size={20} />
          <span>Performance</span>
        </h3>
        <div className="dashboard-stats-grid">
          {performanceStats.map((stat, index) => (
            <div key={stat.title} style={{ animationDelay: `${(index + 4) * 100}ms` }} className="animate-fade-in-up">
              <MetricsCard {...stat} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="dashboard-bottom-grid">
        {/* Recent Cases */}
        <div className="dashboard-card glass-card animate-fade-in-up">
          <div className="dashboard-card-header">
            <h3>
              <FileText size={18} />
              <span>Casos Recentes</span>
            </h3>
            <button className="btn btn-sm btn-secondary">Ver todos</button>
          </div>
          <div className="recent-cases-list">
            {recentCases.map((caseItem) => (
              <RecentCaseItem key={caseItem.id} caseItem={caseItem} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card glass-card animate-fade-in-up">
          <div className="dashboard-card-header">
            <h3>
              <Zap size={18} />
              <span>Ações Rápidas</span>
            </h3>
          </div>
          <div className="quick-actions">
            <button className="btn btn-primary btn-block">
              <FileText size={18} />
              <span>Novo Caso</span>
            </button>
            <button className="btn btn-secondary btn-block">
              <Users size={18} />
              <span>Buscar Cliente</span>
            </button>
            <button className="btn btn-outline btn-block">
              <BarChart3 size={18} />
              <span>Ver Relatórios</span>
            </button>
          </div>

          {/* SLA Alert */}
          {metrics.slaEmRisco > 0 && (
            <div className="sla-alert">
              <AlertTriangle size={20} />
              <div>
                <strong>{metrics.slaEmRisco} casos</strong> com SLA em risco
                <p>Priorize o atendimento destes casos</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .dashboard {
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .dashboard-header h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .dashboard-header p {
          color: var(--text-secondary);
        }

        .dashboard-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--text-secondary);
          border: 1px solid var(--glass-border);
        }

        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metrics-card {
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .metrics-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary-purple), var(--primary-pink));
        }

        .metrics-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .metrics-card-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metrics-card-icon {
          padding: 0.75rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
        }

        .metrics-card-value {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .metrics-card-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .metrics-card-trend.positive {
          color: var(--success);
        }

        .metrics-card-trend.negative {
          color: var(--danger);
        }

        .dashboard-section {
          margin-bottom: 2rem;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .section-title svg {
          color: var(--primary-purple);
        }

        .dashboard-bottom-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .dashboard-card {
          padding: 1.5rem;
        }

        .dashboard-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .dashboard-card-header h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .dashboard-card-header h3 svg {
          color: var(--primary-purple);
        }

        .recent-cases-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .recent-case-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
          transition: var(--transition-normal);
          cursor: pointer;
        }

        .recent-case-item:hover {
          border-color: rgba(168, 85, 247, 0.3);
          transform: translateX(4px);
        }

        .recent-case-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .recent-case-protocol {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .recent-case-customer {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .recent-case-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .recent-case-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .btn-block {
          width: 100%;
          justify-content: center;
        }

        .sla-alert {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: var(--radius-md);
          color: var(--danger);
        }

        .sla-alert strong {
          display: block;
          margin-bottom: 0.25rem;
        }

        .sla-alert p {
          font-size: 0.75rem;
          opacity: 0.8;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .dashboard-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            gap: 1rem;
          }

          .dashboard-date {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
