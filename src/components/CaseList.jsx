import { useState, useEffect } from 'react';
import { 
  Search, Filter, Clock, AlertTriangle, CheckCircle, 
  User, ChevronRight, RefreshCw, SortAsc, SortDesc
} from 'lucide-react';

const CaseCard = ({ caseItem, isSelected, onClick }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'HIGH':
        return { class: 'priority-high', label: 'Alta', color: '#ef4444' };
      case 'MEDIUM':
        return { class: 'priority-medium', label: 'Média', color: '#f59e0b' };
      case 'LOW':
        return { class: 'priority-low', label: 'Baixa', color: '#10b981' };
      default:
        return { class: '', label: priority, color: '#6b7280' };
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'CREATED':
        return { class: 'badge-info', label: 'Criado', icon: Clock };
      case 'ASSIGNED':
        return { class: 'badge-purple', label: 'Atribuído', icon: User };
      case 'IN_PROGRESS':
        return { class: 'badge-warning', label: 'Em Andamento', icon: RefreshCw };
      case 'RESOLVED':
        return { class: 'badge-success', label: 'Resolvido', icon: CheckCircle };
      case 'CLOSED':
        return { class: 'badge-secondary', label: 'Fechado', icon: CheckCircle };
      default:
        return { class: 'badge-info', label: status, icon: Clock };
    }
  };

  const priority = getPriorityConfig(caseItem.priority);
  const status = getStatusConfig(caseItem.status);
  const StatusIcon = status.icon;

  const isSlaAtRisk = caseItem.slaRemaining && 
    (caseItem.slaRemaining.includes('0h') || parseInt(caseItem.slaRemaining) < 2);

  return (
    <div 
      className={`case-card glass-card ${isSelected ? 'selected' : ''} ${isSlaAtRisk ? 'sla-risk' : ''}`}
      onClick={onClick}
    >
      {/* Priority Indicator */}
      <div className="case-priority-bar" style={{ backgroundColor: priority.color }}></div>
      
      <div className="case-card-content">
        {/* Header */}
        <div className="case-card-header">
          <div className="case-protocol">
            <span className="protocol-number">{caseItem.protocol}</span>
            <span className={`badge ${status.class}`}>
              <StatusIcon size={12} />
              {status.label}
            </span>
          </div>
          <div className="case-sla">
            {isSlaAtRisk && <AlertTriangle size={14} className="sla-warning-icon" />}
            <Clock size={14} />
            <span>{caseItem.slaRemaining}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="case-customer">
          <div className="customer-avatar">
            {caseItem.customer.charAt(0)}
          </div>
          <div className="customer-info">
            <span className="customer-name">{caseItem.customer}</span>
            <span className="case-type">{caseItem.type}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="case-card-footer">
          <span className={`priority-badge ${priority.class}`}>
            {priority.label}
          </span>
          <span className="case-date">{caseItem.createdAt}</span>
          <ChevronRight size={16} className="case-arrow" />
        </div>
      </div>
    </div>
  );
};

export default function CaseList({ onSelectCase, selectedCaseId }) {
  const [cases, setCases] = useState([
    {
      id: 'CASE-2026-001',
      protocol: '202601240001',
      customer: 'João Silva',
      customerId: 'CUST-001',
      type: 'Reclamação Fatura',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      slaRemaining: '2h 15m',
      createdAt: '24/01/2026 10:30',
      sla: {
        totalTime: 480,
        elapsedTime: 345,
        remainingTime: 135,
        status: 'WARNING',
        paused: false
      }
    },
    {
      id: 'CASE-2026-002',
      protocol: '202601240002',
      customer: 'Maria Santos',
      customerId: 'CUST-002',
      type: 'Suporte Técnico',
      priority: 'MEDIUM',
      status: 'ASSIGNED',
      slaRemaining: '4h 30m',
      createdAt: '24/01/2026 11:15',
      sla: {
        totalTime: 480,
        elapsedTime: 210,
        remainingTime: 270,
        status: 'NORMAL',
        paused: false
      }
    },
    {
      id: 'CASE-2026-003',
      protocol: '202601240003',
      customer: 'Pedro Oliveira',
      customerId: 'CUST-003',
      type: 'Cancelamento',
      priority: 'LOW',
      status: 'CREATED',
      slaRemaining: '8h 45m',
      createdAt: '24/01/2026 12:00',
      sla: {
        totalTime: 720,
        elapsedTime: 45,
        remainingTime: 675,
        status: 'NORMAL',
        paused: false
      }
    },
    {
      id: 'CASE-2026-004',
      protocol: '202601240004',
      customer: 'Ana Costa',
      customerId: 'CUST-004',
      type: 'Dúvida Contrato',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      slaRemaining: '1h 00m',
      createdAt: '24/01/2026 09:00',
      sla: {
        totalTime: 240,
        elapsedTime: 180,
        remainingTime: 60,
        status: 'CRITICAL',
        paused: false
      }
    },
    {
      id: 'CASE-2026-005',
      protocol: '202601240005',
      customer: 'Carlos Lima',
      customerId: 'CUST-005',
      type: 'Alteração Cadastral',
      priority: 'MEDIUM',
      status: 'ASSIGNED',
      slaRemaining: '6h 20m',
      createdAt: '24/01/2026 13:30',
      sla: {
        totalTime: 480,
        elapsedTime: 100,
        remainingTime: 380,
        status: 'NORMAL',
        paused: false
      }
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('sla');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredCases = cases
    .filter(c => {
      const matchesSearch = 
        c.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'all' || c.priority === filterPriority;
      const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'sla') {
        comparison = (a.sla?.remainingTime || 999) - (b.sla?.remainingTime || 999);
      } else if (sortBy === 'priority') {
        const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'date') {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const caseStats = {
    total: cases.length,
    high: cases.filter(c => c.priority === 'HIGH').length,
    slaRisk: cases.filter(c => c.sla?.status === 'CRITICAL' || c.sla?.status === 'WARNING').length
  };

  return (
    <div className="case-list-container">
      {/* Header */}
      <div className="case-list-header glass-card">
        <div className="header-top">
          <h2>Meus Casos</h2>
          <div className="header-stats">
            <span className="stat-item">
              <span className="stat-value">{caseStats.total}</span>
              <span className="stat-label">Total</span>
            </span>
            <span className="stat-item priority-high">
              <span className="stat-value">{caseStats.high}</span>
              <span className="stat-label">Alta</span>
            </span>
            <span className="stat-item sla-risk">
              <span className="stat-value">{caseStats.slaRisk}</span>
              <span className="stat-label">SLA Risco</span>
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="search-container">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por protocolo, cliente ou tipo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="filters-container">
          <div className="filter-group">
            <label>Prioridade</label>
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">Todas</option>
              <option value="HIGH">Alta</option>
              <option value="MEDIUM">Média</option>
              <option value="LOW">Baixa</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="CREATED">Criado</option>
              <option value="ASSIGNED">Atribuído</option>
              <option value="IN_PROGRESS">Em Andamento</option>
              <option value="RESOLVED">Resolvido</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Ordenar</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="sla">SLA</option>
              <option value="priority">Prioridade</option>
              <option value="date">Data</option>
            </select>
          </div>
          <button 
            className="sort-toggle"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
          </button>
        </div>
      </div>

      {/* Case List */}
      <div className="case-list">
        {filteredCases.length === 0 ? (
          <div className="empty-state glass-card">
            <Search size={48} className="empty-icon" />
            <h3>Nenhum caso encontrado</h3>
            <p>Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          filteredCases.map((caseItem, index) => (
            <div 
              key={caseItem.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CaseCard
                caseItem={caseItem}
                isSelected={selectedCaseId === caseItem.id}
                onClick={() => onSelectCase(caseItem)}
              />
            </div>
          ))
        )}
      </div>

      <style>{`
        .case-list-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .case-list-header {
          padding: 1.25rem;
          margin-bottom: 1rem;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .header-top h2 {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-stats {
          display: flex;
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem 0.75rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .stat-item .stat-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stat-item .stat-label {
          font-size: 0.625rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .stat-item.priority-high .stat-value {
          color: var(--danger);
        }

        .stat-item.sla-risk .stat-value {
          color: var(--warning);
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          margin-bottom: 1rem;
          transition: var(--transition-normal);
        }

        .search-container:focus-within {
          border-color: var(--primary-purple);
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .search-container svg {
          color: var(--text-muted);
        }

        .search-container input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.875rem;
          color: var(--text-primary);
          outline: none;
        }

        .filters-container {
          display: flex;
          gap: 0.75rem;
          align-items: flex-end;
        }

        .filter-group {
          flex: 1;
        }

        .filter-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .filter-group select {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          background: white;
          font-size: 0.75rem;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .filter-group select:focus {
          outline: none;
          border-color: var(--primary-purple);
        }

        .sort-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--primary-purple);
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .sort-toggle:hover {
          background: rgba(168, 85, 247, 0.1);
        }

        .case-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          overflow-y: auto;
          padding-bottom: 1rem;
        }

        .case-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .case-card:hover {
          transform: translateX(4px);
        }

        .case-card.selected {
          border-color: var(--primary-purple);
          box-shadow: var(--shadow-glow);
        }

        .case-card.sla-risk {
          border-color: rgba(239, 68, 68, 0.3);
        }

        .case-priority-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
        }

        .case-card-content {
          padding: 1rem 1rem 1rem 1.25rem;
        }

        .case-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .case-protocol {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .protocol-number {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .case-sla {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .sla-warning-icon {
          color: var(--danger);
          animation: pulse 1s infinite;
        }

        .case-customer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .customer-avatar {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          border-radius: 50%;
        }

        .customer-info {
          display: flex;
          flex-direction: column;
        }

        .customer-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .case-type {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .case-card-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .priority-badge {
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .priority-badge.priority-high {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
        }

        .priority-badge.priority-medium {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }

        .priority-badge.priority-low {
          background: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }

        .case-date {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-left: auto;
        }

        .case-arrow {
          color: var(--text-muted);
          transition: var(--transition-normal);
        }

        .case-card:hover .case-arrow {
          color: var(--primary-purple);
          transform: translateX(4px);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          text-align: center;
        }

        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .empty-state p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
