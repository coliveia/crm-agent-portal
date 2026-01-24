export default function CaseList({ onSelectCase }) {
  const cases = [
    {
      id: 'CASE-2026-001',
      protocol: '202601240001',
      customer: 'João Silva',
      type: 'Reclamação Fatura',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      slaRemaining: '2h 15m',
      createdAt: '24/01/2026 10:30'
    },
    {
      id: 'CASE-2026-002',
      protocol: '202601240002',
      customer: 'Maria Santos',
      type: 'Suporte Técnico',
      priority: 'MEDIUM',
      status: 'ASSIGNED',
      slaRemaining: '4h 30m',
      createdAt: '24/01/2026 11:15'
    },
    {
      id: 'CASE-2026-003',
      protocol: '202601240003',
      customer: 'Pedro Oliveira',
      type: 'Cancelamento',
      priority: 'LOW',
      status: 'CREATED',
      slaRemaining: '8h 45m',
      createdAt: '24/01/2026 12:00'
    },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'LOW': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'CREATED': return 'bg-blue-100 text-blue-800'
      case 'ASSIGNED': return 'bg-purple-100 text-purple-800'
      case 'IN_PROGRESS': return 'bg-indigo-100 text-indigo-800'
      case 'RESOLVED': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Meus Casos</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            onClick={() => onSelectCase(caseItem)}
            className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">
                  {caseItem.protocol}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(caseItem.priority)}`}>
                  {caseItem.priority}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(caseItem.status)}`}>
                  {caseItem.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                SLA: {caseItem.slaRemaining}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{caseItem.customer}</p>
                <p className="text-sm text-gray-500">{caseItem.type}</p>
              </div>
              <span className="text-xs text-gray-400">{caseItem.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
