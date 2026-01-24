import React from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

/**
 * SLA Indicator Component
 * Displays SLA status with visual progress bar and alerts
 */
const SLAIndicator = ({ sla }) => {
  if (!sla) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <p className="text-sm text-gray-500">SLA não disponível</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ON_TRACK':
        return 'text-green-600 bg-green-50';
      case 'AT_RISK':
        return 'text-yellow-600 bg-yellow-50';
      case 'BREACHED':
        return 'text-red-600 bg-red-50';
      case 'COMPLETED':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ON_TRACK':
        return <CheckCircle className="w-5 h-5" />;
      case 'AT_RISK':
        return <AlertTriangle className="w-5 h-5" />;
      case 'BREACHED':
        return <XCircle className="w-5 h-5" />;
      case 'COMPLETED':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ON_TRACK':
        return 'No Prazo';
      case 'AT_RISK':
        return 'Em Risco';
      case 'BREACHED':
        return 'Vencido';
      case 'COMPLETED':
        return 'Concluído';
      default:
        return 'Desconhecido';
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case 'ON_TRACK':
        return 'bg-green-500';
      case 'AT_RISK':
        return 'bg-yellow-500';
      case 'BREACHED':
        return 'bg-red-500';
      case 'COMPLETED':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTime = (minutes) => {
    if (minutes === 0) return 'Concluído';
    if (minutes < 0) return 'Vencido';
    
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">SLA do Atendimento</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(sla.overallStatus)}`}>
          {getStatusIcon(sla.overallStatus)}
          <span className="text-sm font-medium">{getStatusLabel(sla.overallStatus)}</span>
        </div>
      </div>

      {/* Response SLA */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Primeira Resposta</span>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${
              sla.responseStatus === 'BREACHED' ? 'text-red-600' :
              sla.responseStatus === 'AT_RISK' ? 'text-yellow-600' :
              sla.responseStatus === 'COMPLETED' ? 'text-blue-600' :
              'text-green-600'
            }`}>
              {formatTime(sla.responseRemaining)}
            </span>
            {sla.responseStatus !== 'COMPLETED' && (
              <span className="text-gray-500">
                / {formatTime(sla.responseTimeMinutes)}
              </span>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${getProgressBarColor(sla.responseStatus)}`}
            style={{ width: `${Math.min(100, sla.responseProgress)}%` }}
          />
        </div>
        
        {sla.firstResponseAt && (
          <p className="text-xs text-gray-500">
            Respondido em {new Date(sla.firstResponseAt).toLocaleString('pt-BR')}
          </p>
        )}
      </div>

      {/* Resolution SLA */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Resolução</span>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${
              sla.resolutionStatus === 'BREACHED' ? 'text-red-600' :
              sla.resolutionStatus === 'AT_RISK' ? 'text-yellow-600' :
              sla.resolutionStatus === 'COMPLETED' ? 'text-blue-600' :
              'text-green-600'
            }`}>
              {formatTime(sla.resolutionRemaining)}
            </span>
            {sla.resolutionStatus !== 'COMPLETED' && (
              <span className="text-gray-500">
                / {formatTime(sla.resolutionTimeMinutes)}
              </span>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${getProgressBarColor(sla.resolutionStatus)}`}
            style={{ width: `${Math.min(100, sla.resolutionProgress)}%` }}
          />
        </div>
        
        {sla.resolvedAt && (
          <p className="text-xs text-gray-500">
            Resolvido em {new Date(sla.resolvedAt).toLocaleString('pt-BR')}
          </p>
        )}
      </div>

      {/* Alerts */}
      {(sla.paused || sla.escalated) && (
        <div className="pt-4 border-t border-gray-200 space-y-2">
          {sla.paused && (
            <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded">
              <Clock className="w-4 h-4" />
              <span>SLA pausado ({formatTime(sla.pausedDurationMinutes)} acumulado)</span>
            </div>
          )}
          {sla.escalated && (
            <div className="flex items-center gap-2 text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded">
              <AlertTriangle className="w-4 h-4" />
              <span>Caso escalado em {new Date(sla.escalatedAt).toLocaleString('pt-BR')}</span>
            </div>
          )}
        </div>
      )}

      {/* Priority Badge */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Prioridade</span>
          <span className={`px-3 py-1 rounded-full font-medium ${
            sla.priority === 'CRITICAL' ? 'bg-red-100 text-red-700' :
            sla.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
            sla.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {sla.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SLAIndicator;
