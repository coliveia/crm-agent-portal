import { useState } from 'react';
import { Bell, User, LogOut, MessageSquare, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CaseList from './components/CaseList';
import CaseDetail from './components/CaseDetail';
import './App.css';

function App() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [agent] = useState({
    name: 'Agent User',
    group: 'G0',
    avatar: 'AG',
  });

  return (
    <div className="agent-portal">
      {/* Header */}
      <header className="agent-header">
        <div className="agent-header-content">
          <div className="agent-header-left">
            <div className="agent-logo">
              <div className="agent-logo-icon">
                <MessageSquare size={20} />
              </div>
              <div className="agent-logo-text">
                <h1>Agent Portal</h1>
                <p>Customer Service Interface</p>
              </div>
            </div>
          </div>

          <div className="agent-header-right">
            <div className="agent-status-badge">
              <div className="agent-status-dot"></div>
              <span>Available</span>
            </div>

            <button className="agent-header-btn" title="Notifications">
              <Bell size={20} />
              <span className="agent-notification-badge">2</span>
            </button>

            <div className="agent-user-menu">
              <div className="agent-user-avatar">{agent.avatar}</div>
              <div className="agent-user-info">
                <p className="agent-user-name">{agent.name}</p>
                <p className="agent-user-group">{agent.group}</p>
              </div>
            </div>

            <button className="agent-logout-btn" title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="agent-main">
        <div className="agent-container">
          {/* Dashboard Stats */}
          <div className="agent-dashboard-section">
            <Dashboard />
          </div>

          {/* Content Grid */}
          <div className="agent-content-grid">
            {/* Case List */}
            <div className="agent-case-list-section">
              <CaseList onSelectCase={setSelectedCase} />
            </div>

            {/* Case Detail */}
            <div className="agent-case-detail-section">
              <CaseDetail caseData={selectedCase} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
