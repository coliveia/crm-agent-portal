import React from 'react';
import SLAIndicator from './SLAIndicator';

export default function CaseDetail({ caseData }) {
  if (!caseData) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500">
          Selecione um caso para ver os detalhes
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* SLA Indicator - Destaque no topo */}
      {caseData.sla && (
        <SLAIndicator sla={caseData.sla} />
      )}

      {/* Case Details */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Detalhes do Caso</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Cliente</h3>
            <p className="text-base font-semibold text-gray-900">{caseData.customer}</p>
            <p className="text-sm text-gray-600">ID: 12345678</p>
            <p className="text-sm text-gray-600">Segmento: Premium</p>
          </div>

          {/* Case Info */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Informações</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Protocolo:</span>
                <span className="text-sm font-medium text-gray-900">{caseData.protocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tipo:</span>
                <span className="text-sm font-medium text-gray-900">{caseData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm font-medium text-gray-900">{caseData.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Prioridade:</span>
                <span className="text-sm font-medium text-gray-900">{caseData.priority}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Iniciar Atendimento
            </button>
            <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Adicionar Nota
            </button>
            {caseData.sla && !caseData.sla.paused && (
              <button className="w-full px-4 py-2 bg-white border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors">
                Pausar SLA
              </button>
            )}
            {caseData.sla && caseData.sla.paused && (
              <button className="w-full px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors">
                Retomar SLA
              </button>
            )}
            <button className="w-full px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
              Escalar
            </button>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Histórico</h3>
            <div className="space-y-3">
              <div className="flex space-x-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Caso criado</p>
                  <p className="text-xs text-gray-500">{caseData.createdAt}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="flex-shrink-0 w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Atribuído ao agente</p>
                  <p className="text-xs text-gray-500">24/01/2026 10:35</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
