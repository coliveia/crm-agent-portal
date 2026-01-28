import { useState, useEffect } from 'react';
import { 
  Bell, User, LogOut, MessageSquare, Settings, Menu, X, 
  LayoutDashboard, Users, FileText, Bot, Search, ChevronDown,
  Sparkles, Phone, Mail, Clock, AlertTriangle
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import CaseList from './components/CaseList';
import CaseDetail from './components/CaseDetail';
import Customer360 from './components/Customer360';
import CopilotPanel from './components/CopilotPanel';
import './App.css';

function App() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('cases');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'SLA em risco - Caso #202601240001', type: 'warning', time: '5 min' },
    { id: 2, message: 'Novo caso atribuído', type: 'info', time: '10 min' }
  ]);

  const [agent] = useState({
    name: 'Agent User',
    group: 'G0',
    avatar: 'AG',
    status: 'available',
    casesActive: 5,
    casesResolved: 12
  });

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, tab: 'dashboard' },
    { name: 'Meus Casos', icon: FileText, tab: 'cases', badge: 5 },
    { name: 'Clientes', icon: Users, tab: 'customers' },
    { name: 'Copilot IA', icon: Bot, tab: 'copilot' }
  ];

  const handleCaseSelect = (caseItem) => {
    setSelectedCase(caseItem);
    // Simular carregamento do cliente
    if (caseItem) {
      setSelectedCustomer({
        customerId: caseItem.customerId || 'CUST-001',
        name: caseItem.customer,
        email: 'joao.silva@email.com',
        phone: '(11) 99999-9999',
        cpf: '***.***.***-78',
        segment: 'Premium',
        status: 'ACTIVE',
        riskLevel: 'LOW',
        preferredChannel: 'WHATSAPP',
        address: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        totalCases: 8,
        openCases: 2,
        lastInteraction: '24/01/2026 10:30',
        customerSince: '2020-03-15',
        lifetimeValue: 'R$ 45.000,00'
      });
    }
  };

  return (
    <div className="agent-portal">
      {/* Header */}
      <header className="agent-header">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="logo">
            <div className="logo-icon">
              <Sparkles size={22} />
            </div>
            <div className="logo-text">
              <h1>Agent Portal</h1>
              <span>CRM+ Platform</span>
            </div>
          </div>
        </div>

        <div className="header-center">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Buscar casos, clientes, protocolos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="header-right">
          <div className="agent-status">
            <div className={`status-dot status-dot-${agent.status === 'available' ? 'online' : 'busy'}`}></div>
            <span>{agent.status === 'available' ? 'Disponível' : 'Ocupado'}</span>
          </div>

          <button className="header-btn notification-btn">
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>

          <button 
            className="header-btn copilot-toggle"
            onClick={() => setCopilotOpen(!copilotOpen)}
            title="Toggle Copilot"
          >
            <Bot size={20} />
          </button>

          <div className="user-menu">
            <div className="avatar avatar-md">{agent.avatar}</div>
            <div className="user-info">
              <span className="user-name">{agent.name}</span>
              <span className="user-group">{agent.group}</span>
            </div>
            <ChevronDown size={16} />
          </div>

          <button className="header-btn logout-btn" title="Sair">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="agent-body">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <div className="nav-section">
              <span className="nav-section-title">NAVEGAÇÃO</span>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.tab)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                    {isActive && <div className="nav-indicator"></div>}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="sidebar-footer">
            <div className="agent-stats">
              <div className="stat">
                <span className="stat-value">{agent.casesActive}</span>
                <span className="stat-label">Ativos</span>
              </div>
              <div className="stat">
                <span className="stat-value">{agent.casesResolved}</span>
                <span className="stat-label">Resolvidos</span>
              </div>
            </div>
            <div className="system-status">
              <div className="status-dot status-dot-online"></div>
              <span>Sistema Online</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {activeTab === 'dashboard' && (
            <div className="dashboard-view animate-fade-in-up">
              <Dashboard />
            </div>
          )}

          {activeTab === 'cases' && (
            <div className="cases-view">
              <div className="cases-grid">
                <div className="cases-list-container animate-fade-in-up">
                  <CaseList 
                    onSelectCase={handleCaseSelect} 
                    selectedCaseId={selectedCase?.id}
                  />
                </div>
                
                <div className="case-detail-container animate-slide-in-right">
                  {selectedCase ? (
                    <CaseDetail caseData={selectedCase} />
                  ) : (
                    <div className="empty-state glass-card">
                      <FileText size={48} className="empty-icon" />
                      <h3>Selecione um caso</h3>
                      <p>Clique em um caso da lista para ver os detalhes</p>
                    </div>
                  )}
                </div>

                {selectedCustomer && (
                  <div className="customer-360-container animate-slide-in-right">
                    <Customer360 customer={selectedCustomer} />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="customers-view animate-fade-in-up">
              <div className="page-header">
                <h2 className="gradient-text">Clientes</h2>
                <p>Visão 360° dos clientes</p>
              </div>
              <div className="coming-soon glass-card">
                <Users size={48} className="empty-icon" />
                <h3>Em Desenvolvimento</h3>
                <p>A visão completa de clientes estará disponível em breve</p>
              </div>
            </div>
          )}

          {activeTab === 'copilot' && (
            <div className="copilot-view animate-fade-in-up">
              <div className="page-header">
                <h2 className="gradient-text">Copilot IA</h2>
                <p>Assistente inteligente para atendimento</p>
              </div>
              <CopilotPanel fullScreen={true} caseData={selectedCase} />
            </div>
          )}
        </main>

        {/* Copilot Side Panel */}
        {copilotOpen && activeTab !== 'copilot' && (
          <aside className="copilot-sidebar animate-slide-in-right">
            <CopilotPanel caseData={selectedCase} customerData={selectedCustomer} />
          </aside>
        )}
      </div>
    </div>
  );
}

export default App;
