import { useState } from 'react';
import { 
  Clock, User, FileText, MessageSquare, AlertTriangle, 
  CheckCircle, Play, Pause, ArrowUpRight, Plus, Send,
  Phone, Mail, Calendar, Tag, History, Zap
} from 'lucide-react';
import SLAIndicator from './SLAIndicator';

export default function CaseDetail({ caseData }) {
  const [activeTab, setActiveTab] = useState('details');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, text: 'Cliente entrou em contato solicitando revisão da fatura', author: 'Agent User', time: '10:35' },
    { id: 2, text: 'Verificado sistema - identificada cobrança duplicada', author: 'Agent User', time: '10:45' }
  ]);

  if (!caseData) {
    return (
      <div className="case-detail-empty glass-card">
        <FileText size={48} className="empty-icon" />
        <h3>Selecione um caso</h3>
        <p>Clique em um caso da lista para ver os detalhes</p>
      </div>
    );
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          id: notes.length + 1,
          text: newNote,
          author: 'Agent User',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewNote('');
    }
  };

  const timeline = [
    { id: 1, event: 'Caso criado', time: caseData.createdAt, icon: Plus, color: '#3b82f6' },
    { id: 2, event: 'Atribuído ao agente', time: '24/01/2026 10:35', icon: User, color: '#8b5cf6' },
    { id: 3, event: 'Atendimento iniciado', time: '24/01/2026 10:40', icon: Play, color: '#10b981' },
    { id: 4, event: 'Nota adicionada', time: '24/01/2026 10:45', icon: MessageSquare, color: '#f59e0b' }
  ];

  const tabs = [
    { id: 'details', label: 'Detalhes', icon: FileText },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'notes', label: 'Notas', icon: MessageSquare, badge: notes.length }
  ];

  return (
    <div className="case-detail">
      {/* SLA Indicator */}
      {caseData.sla && (
        <SLAIndicator sla={caseData.sla} />
      )}

      {/* Case Header */}
      <div className="case-detail-header glass-card">
        <div className="header-top">
          <div className="case-info">
            <span className="case-protocol">{caseData.protocol}</span>
            <span className={`badge badge-${caseData.priority === 'HIGH' ? 'danger' : caseData.priority === 'MEDIUM' ? 'warning' : 'success'}`}>
              {caseData.priority}
            </span>
          </div>
          <span className="case-type-badge">{caseData.type}</span>
        </div>
        <h2 className="case-title">{caseData.type}</h2>
        <div className="case-meta">
          <span><Calendar size={14} /> {caseData.createdAt}</span>
          <span><User size={14} /> {caseData.customer}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-bar">
        <button className="btn btn-primary">
          <Play size={16} />
          <span>Iniciar Atendimento</span>
        </button>
        <button className="btn btn-secondary">
          <MessageSquare size={16} />
          <span>Adicionar Nota</span>
        </button>
        {caseData.sla && !caseData.sla.paused && (
          <button className="btn btn-outline btn-warning">
            <Pause size={16} />
            <span>Pausar SLA</span>
          </button>
        )}
        <button className="btn btn-outline btn-danger">
          <ArrowUpRight size={16} />
          <span>Escalar</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="case-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && <span className="tab-badge">{tab.badge}</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="tab-content glass-card">
        {activeTab === 'details' && (
          <div className="details-tab animate-fade-in">
            {/* Customer Section */}
            <div className="detail-section">
              <h3>
                <User size={18} />
                <span>Cliente</span>
              </h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Nome</span>
                  <span className="detail-value">{caseData.customer}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ID</span>
                  <span className="detail-value">{caseData.customerId || 'CUST-001'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Segmento</span>
                  <span className="detail-value badge badge-purple">Premium</span>
                </div>
              </div>
            </div>

            {/* Case Info Section */}
            <div className="detail-section">
              <h3>
                <FileText size={18} />
                <span>Informações do Caso</span>
              </h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Protocolo</span>
                  <span className="detail-value">{caseData.protocol}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tipo</span>
                  <span className="detail-value">{caseData.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="detail-value badge badge-info">{caseData.status}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Prioridade</span>
                  <span className={`detail-value badge badge-${caseData.priority === 'HIGH' ? 'danger' : caseData.priority === 'MEDIUM' ? 'warning' : 'success'}`}>
                    {caseData.priority}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Criado em</span>
                  <span className="detail-value">{caseData.createdAt}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">SLA Restante</span>
                  <span className="detail-value">{caseData.slaRemaining}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="timeline-tab animate-fade-in">
            <div className="timeline">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="timeline-item">
                    <div className="timeline-marker" style={{ backgroundColor: item.color }}>
                      <Icon size={14} color="white" />
                    </div>
                    <div className="timeline-content">
                      <span className="timeline-event">{item.event}</span>
                      <span className="timeline-time">{item.time}</span>
                    </div>
                    {index < timeline.length - 1 && <div className="timeline-line"></div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="notes-tab animate-fade-in">
            {/* Add Note */}
            <div className="add-note">
              <textarea
                placeholder="Adicionar uma nota..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={3}
              />
              <button 
                className="btn btn-primary btn-sm"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                <Send size={14} />
                <span>Enviar</span>
              </button>
            </div>

            {/* Notes List */}
            <div className="notes-list">
              {notes.map(note => (
                <div key={note.id} className="note-item">
                  <div className="note-header">
                    <span className="note-author">{note.author}</span>
                    <span className="note-time">{note.time}</span>
                  </div>
                  <p className="note-text">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .case-detail {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .case-detail-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          text-align: center;
          min-height: 300px;
        }

        .empty-icon {
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .case-detail-empty h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .case-detail-empty p {
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .case-detail-header {
          padding: 1.25rem;
        }

        .header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .case-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .case-protocol {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--primary-purple);
        }

        .case-type-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
        }

        .case-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .case-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .case-meta span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .quick-actions-bar {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .quick-actions-bar .btn {
          flex: 1;
          min-width: fit-content;
          padding: 0.625rem 0.75rem;
          font-size: 0.75rem;
        }

        .btn-warning {
          color: var(--warning);
          border-color: var(--warning);
        }

        .btn-warning:hover {
          background: rgba(245, 158, 11, 0.1);
        }

        .btn-danger {
          color: var(--danger);
          border-color: var(--danger);
        }

        .btn-danger:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .case-tabs {
          display: flex;
          gap: 0.5rem;
          padding: 0.25rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-radius: var(--radius-lg);
          border: 1px solid var(--glass-border);
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.625rem 0.75rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .tab-btn.active {
          background: white;
          color: var(--primary-purple);
          box-shadow: var(--shadow-sm);
        }

        .tab-badge {
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary-purple);
          color: white;
          font-size: 0.625rem;
          border-radius: var(--radius-full);
          padding: 0 4px;
        }

        .tab-content {
          padding: 1.25rem;
          min-height: 300px;
        }

        .detail-section {
          margin-bottom: 1.5rem;
        }

        .detail-section:last-child {
          margin-bottom: 0;
        }

        .detail-section h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .detail-section h3 svg {
          color: var(--primary-purple);
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .detail-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .timeline {
          position: relative;
        }

        .timeline-item {
          display: flex;
          gap: 1rem;
          position: relative;
          padding-bottom: 1.5rem;
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-marker {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          flex-shrink: 0;
          z-index: 1;
        }

        .timeline-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding-top: 0.25rem;
        }

        .timeline-event {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .timeline-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .timeline-line {
          position: absolute;
          left: 15px;
          top: 32px;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
        }

        .add-note {
          margin-bottom: 1.5rem;
        }

        .add-note textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-family: inherit;
          resize: none;
          margin-bottom: 0.5rem;
          transition: var(--transition-normal);
        }

        .add-note textarea:focus {
          outline: none;
          border-color: var(--primary-purple);
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
        }

        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .note-item {
          padding: 1rem;
          background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .note-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .note-author {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary-purple);
        }

        .note-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .note-text {
          font-size: 0.875rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
