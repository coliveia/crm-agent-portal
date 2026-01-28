import { Clock, AlertTriangle, CheckCircle, Pause, XCircle } from 'lucide-react';

/**
 * SLA Indicator Component - Futuristic Design
 * Displays SLA status with visual progress bar and alerts
 */
export default function SLAIndicator({ sla }) {
  if (!sla) {
    return (
      <div className="sla-indicator sla-empty">
        <Clock size={18} />
        <span>SLA não disponível</span>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'NORMAL':
      case 'ON_TRACK':
        return {
          color: '#10b981',
          bgColor: 'rgba(16, 185, 129, 0.1)',
          borderColor: 'rgba(16, 185, 129, 0.2)',
          label: 'Dentro do SLA',
          icon: CheckCircle
        };
      case 'WARNING':
      case 'AT_RISK':
        return {
          color: '#f59e0b',
          bgColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: 'rgba(245, 158, 11, 0.2)',
          label: 'Atenção',
          icon: AlertTriangle
        };
      case 'CRITICAL':
        return {
          color: '#ef4444',
          bgColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.2)',
          label: 'SLA em Risco',
          icon: AlertTriangle
        };
      case 'BREACHED':
        return {
          color: '#dc2626',
          bgColor: 'rgba(220, 38, 38, 0.1)',
          borderColor: 'rgba(220, 38, 38, 0.2)',
          label: 'SLA Violado',
          icon: XCircle
        };
      case 'COMPLETED':
        return {
          color: '#3b82f6',
          bgColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.2)',
          label: 'Concluído',
          icon: CheckCircle
        };
      default:
        return {
          color: '#6b7280',
          bgColor: 'rgba(107, 114, 128, 0.1)',
          borderColor: 'rgba(107, 114, 128, 0.2)',
          label: 'Desconhecido',
          icon: Clock
        };
    }
  };

  // Support both old and new SLA format
  const status = sla.status || sla.overallStatus || 'NORMAL';
  const config = getStatusConfig(status);
  const StatusIcon = config.icon;
  
  // Calculate percentage - support both formats
  const totalTime = sla.totalTime || sla.resolutionTimeMinutes || 480;
  const remainingTime = sla.remainingTime !== undefined ? sla.remainingTime : (sla.resolutionRemaining || 0);
  const elapsedTime = sla.elapsedTime || (totalTime - remainingTime);
  const percentage = Math.max(0, Math.min(100, (remainingTime / totalTime) * 100));
  
  // Format time
  const formatTime = (minutes) => {
    if (minutes === undefined || minutes === null) return '-';
    if (minutes <= 0) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div 
      className="sla-indicator"
      style={{ 
        background: config.bgColor,
        borderColor: config.borderColor
      }}
    >
      <div className="sla-header">
        <div className="sla-status" style={{ color: config.color }}>
          <StatusIcon size={18} />
          <span>{config.label}</span>
        </div>
        {sla.paused && (
          <div className="sla-paused">
            <Pause size={14} />
            <span>Pausado</span>
          </div>
        )}
      </div>

      <div className="sla-content">
        <div className="sla-time">
          <Clock size={20} style={{ color: config.color }} />
          <span className="time-value" style={{ color: config.color }}>
            {formatTime(remainingTime)}
          </span>
          <span className="time-label">restante</span>
        </div>

        <div className="sla-progress-container">
          <div className="sla-progress-bar">
            <div 
              className="sla-progress-fill"
              style={{ 
                width: `${percentage}%`,
                background: `linear-gradient(90deg, ${config.color} 0%, ${config.color}88 100%)`
              }}
            >
              {percentage > 10 && (
                <div className="progress-glow" style={{ background: config.color }}></div>
              )}
            </div>
          </div>
          <div className="sla-progress-labels">
            <span>{formatTime(elapsedTime)} decorrido</span>
            <span>{formatTime(totalTime)} total</span>
          </div>
        </div>
      </div>

      {(status === 'CRITICAL' || status === 'AT_RISK') && !sla.paused && (
        <div className="sla-alert">
          <AlertTriangle size={14} />
          <span>Priorize este atendimento para evitar violação do SLA</span>
        </div>
      )}

      <style>{`
        .sla-indicator {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-xl);
          border: 1px solid;
          transition: var(--transition-normal);
        }

        .sla-indicator.sla-empty {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(107, 114, 128, 0.1);
          border-color: rgba(107, 114, 128, 0.2);
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .sla-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .sla-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .sla-paused {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          background: rgba(107, 114, 128, 0.1);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .sla-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .sla-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .time-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .time-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .sla-progress-container {
          flex: 1;
        }

        .sla-progress-bar {
          height: 8px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .sla-progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          position: relative;
          transition: width 0.5s ease;
        }

        .progress-glow {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 20px;
          filter: blur(8px);
          opacity: 0.6;
          animation: pulse 2s infinite;
        }

        .sla-progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.625rem;
          color: var(--text-muted);
        }

        .sla-alert {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.75rem;
          padding: 0.5rem 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border-radius: var(--radius-md);
          font-size: 0.75rem;
          color: var(--danger);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
