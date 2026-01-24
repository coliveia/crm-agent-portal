export default function Dashboard() {
  const stats = [
    { label: 'Casos Ativos', value: '24', change: '+3', trend: 'up' },
    { label: 'Aguardando', value: '8', change: '-2', trend: 'down' },
    { label: 'Resolvidos Hoje', value: '15', change: '+5', trend: 'up' },
    { label: 'SLA em Risco', value: '3', change: '0', trend: 'neutral' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
