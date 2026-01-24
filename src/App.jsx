import { useState } from 'react'
import Dashboard from './components/Dashboard'
import CaseList from './components/CaseList'
import CaseDetail from './components/CaseDetail'

function App() {
  const [selectedCase, setSelectedCase] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary-600">CRM+ Agent Portal</h1>
              <span className="px-3 py-1 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                G0
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Notificações
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-medium">
                  AG
                </div>
                <span className="text-sm font-medium text-gray-700">Agente</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dashboard Stats */}
          <div className="lg:col-span-3">
            <Dashboard />
          </div>

          {/* Case List */}
          <div className="lg:col-span-2">
            <CaseList onSelectCase={setSelectedCase} />
          </div>

          {/* Case Detail */}
          <div className="lg:col-span-1">
            <CaseDetail caseData={selectedCase} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
