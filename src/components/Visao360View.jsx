import { useState, useEffect } from 'react';
import { 
  User, Phone, PhoneCall, Mail, Video, MoreHorizontal, Clock, 
  FileText, AlertCircle, Calendar, Wifi, WifiOff, Home, 
  CreditCard, Shield, ChevronRight, Settings, Eye, History,
  Package, Smartphone, Tv, MessageSquare, RefreshCw, Copy,
  CheckCircle, XCircle, Zap, Star, MapPin, Loader
} from 'lucide-react';
import { useVisao360 } from '../hooks/useVisao360';

export default function Visao360View({ telefone = '11912345678', customerId = null }) {
  const [activeTab, setActiveTab] = useState('visaoCliente');
  
  // Hook para integração com BFF
  const { 
    data, 
    loading, 
    error, 
    tempoAtendimento,
    refresh,
    setProtocoloAtual,
    refreshIAResumo
  } = useVisao360(telefone, customerId);

  // Dados do cliente (do BFF ou fallback)
  const cliente = data?.cliente || { nome: 'Carregando...', telefone: '', avatar: '?' };
  const instancia = data?.instancia || { telefone: '' };
  const protocolos = data?.protocolos || { atual: '', abertos: [], visitaMarcada: null };
  const avisos = data?.avisos || [];
  const iaResumo = data?.iaResumo || { titulo: 'I.Ajuda', badge: '', mensagem: 'Carregando...', acaoSugerida: null };
  const dadosCadastrais = data?.dadosCadastrais || { nomeCompleto: '', tipoCliente: [], cpf: '', situacaoFinanceira: {} };
  const apps = data?.apps || [];
  const produtos = data?.produtos || [];

  if (loading) {
    return (
      <div className="visao360-loading">
        <Loader size={48} className="spinner" />
        <span>Carregando Visão 360...</span>
        <style>{`
          .visao360-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            gap: 16px;
            color: #6b7280;
          }
          .spinner {
            animation: spin 1s linear infinite;
            color: #8b5cf6;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="visao360-container">
      {/* Header do Atendimento */}
      <div className="atendimento-header">
        <div className="cliente-info">
          <div className="cliente-avatar">
            <span>{cliente.avatar || cliente.nome?.charAt(0) || 'C'}</span>
          </div>
          <div className="cliente-dados">
            <span className="cliente-nome">{cliente.nome}</span>
            <span className="tempo-atendimento">
              <Clock size={14} />
              {tempoAtendimento}
            </span>
          </div>
        </div>

        <div className="acoes-rapidas">
          <button className="acao-btn">
            <PhoneCall size={18} />
          </button>
          <button className="acao-btn dropdown">
            <Phone size={18} />
            <ChevronRight size={14} className="dropdown-icon" />
          </button>
          <button className="acao-btn">
            <Video size={18} />
          </button>
          <button className="acao-btn dropdown">
            <MessageSquare size={18} />
            <ChevronRight size={14} className="dropdown-icon" />
          </button>
          <button className="acao-btn dropdown">
            <MoreHorizontal size={18} />
            <ChevronRight size={14} className="dropdown-icon" />
          </button>
        </div>

        <div className="header-tabs">
          <button 
            className={`header-tab ${activeTab === 'visaoCliente' ? 'active' : ''}`}
            onClick={() => setActiveTab('visaoCliente')}
          >
            <Eye size={16} />
            Visão Cliente
          </button>
          <button 
            className={`header-tab ${activeTab === 'historico' ? 'active' : ''}`}
            onClick={() => setActiveTab('historico')}
          >
            <History size={16} />
            Histórico
          </button>
          <button className="header-tab mais-opcoes">
            Mais operações
            <Settings size={14} />
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="visao360-content">
        {/* Coluna Esquerda */}
        <div className="coluna-esquerda">
          {/* Card Instância */}
          <div className="card-instancia">
            <div className="card-header">
              <div className="card-title">
                <Home size={18} />
                <span>Instância</span>
              </div>
              <span className="telefone-instancia">{instancia.telefone || cliente.telefone}</span>
            </div>
            <button className="btn-gerenciar">
              Gerenciar instância
            </button>
          </div>

          {/* Card Protocolos */}
          <div className="card-protocolos">
            <div className="card-header">
              <span className="card-title">Protocolos</span>
              <button className="link-todos">
                Todos os protocolos
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Protocolo Atual */}
            <div className="protocolo-atual">
              <div className="protocolo-label">
                <FileText size={16} />
                <span>Protocolo atual</span>
              </div>
              <div className="protocolo-numero">
                <span>{protocolos.atual || 'Nenhum'}</span>
                <button className="btn-copy" onClick={refresh}>
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            {/* Protocolos em Aberto */}
            <div className="protocolos-abertos">
              <div className="protocolos-header">
                <Clock size={16} />
                <span>Protocolos em aberto</span>
              </div>
              
              {protocolos.visitaMarcada && (
                <div className="aviso-visita">
                  <RefreshCw size={14} />
                  <span>{protocolos.visitaMarcada.mensagem}</span>
                </div>
              )}

              <div className="protocolos-grid">
                {protocolos.abertos?.map((protocolo, index) => (
                  <div 
                    key={index} 
                    className="protocolo-card"
                    onClick={() => setProtocoloAtual(protocolo.id)}
                  >
                    <div className="protocolo-card-header">
                      <span className="protocolo-id">{protocolo.numero || protocolo.id}</span>
                      <ChevronRight size={14} />
                    </div>
                    <div className="protocolo-tags">
                      {protocolo.tags?.map((tag, i) => (
                        <span key={i} className={`tag ${i === 0 ? 'tag-primary' : 'tag-secondary'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {protocolo.status === 'Em Andamento' && (
                      <span className="status-icon pending">
                        <AlertCircle size={14} />
                      </span>
                    )}
                    <p className="protocolo-descricao">{protocolo.descricao}</p>
                    <div className="protocolo-footer">
                      <div className="protocolo-plano">
                        <Wifi size={14} />
                        <span>{protocolo.plano}</span>
                      </div>
                      <div className="protocolo-data">
                        <Calendar size={14} />
                        <span>{protocolo.data}</span>
                      </div>
                      {protocolo.tipo && (
                        <span className="protocolo-tipo">{protocolo.tipo}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card Avisos */}
          <div className="card-avisos">
            <span className="card-title">Avisos</span>
            {avisos.length === 0 ? (
              <div className="aviso-empty">Nenhum aviso</div>
            ) : (
              avisos.map((aviso, index) => (
                <div key={index} className="aviso-item">
                  <div className="aviso-icon">
                    <FileText size={16} />
                  </div>
                  <div className="aviso-content">
                    <span className="aviso-titulo">
                      {aviso.titulo}
                      <span className={`aviso-badge ${aviso.tipo}`}>{aviso.badge || 'Crítico'}</span>
                    </span>
                    <span className="aviso-descricao">{aviso.descricao}</span>
                  </div>
                  <ChevronRight size={14} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="coluna-direita">
          {/* Card IA Resumo - Destaque Roxo */}
          <div className="card-ia-resumo">
            <div className="ia-header">
              <button className="btn-voltar">
                <ChevronRight size={18} className="rotate-180" />
              </button>
              <span className="ia-titulo">{iaResumo.titulo}</span>
              <span className="ia-badge">{iaResumo.badge}</span>
            </div>
            <p className="ia-mensagem">{iaResumo.mensagem}</p>
            {iaResumo.acaoSugerida && (
              <button className="btn-acao-ia">
                <Zap size={16} />
                {iaResumo.acaoSugerida}
              </button>
            )}
          </div>

          {/* Card Dados Cadastrais */}
          <div className="card-dados-cadastrais">
            <div className="dados-row">
              <div className="dados-item">
                <User size={16} />
                <div className="dados-content">
                  <span className="dados-label">Nome do tratamento</span>
                  <span className="dados-value">{dadosCadastrais.nomeCompleto}</span>
                </div>
              </div>
              <button className="btn-editar">
                <Settings size={14} />
              </button>
            </div>

            <div className="dados-row">
              <div className="dados-item">
                <Star size={16} />
                <div className="dados-content">
                  <span className="dados-label">Tipo de cliente</span>
                  <div className="dados-tags">
                    {dadosCadastrais.tipoCliente?.map((tipo, i) => (
                      <span key={i} className={`tipo-tag ${i === 0 ? 'platinum' : 'tradicional'}`}>
                        {tipo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="dados-row">
              <div className="dados-item">
                <CreditCard size={16} />
                <div className="dados-content">
                  <span className="dados-label">CPF</span>
                  <span className="dados-value">{dadosCadastrais.cpf}</span>
                </div>
              </div>
              <button className="btn-editar">
                <Settings size={14} />
              </button>
            </div>

            <div className="dados-row situacao-financeira">
              <div className="dados-item">
                <AlertCircle size={16} />
                <div className="dados-content">
                  <span className="dados-label">Situação financeira</span>
                  <span className={`dados-value ${dadosCadastrais.situacaoFinanceira?.emAtraso ? 'warning' : ''}`}>
                    {dadosCadastrais.situacaoFinanceira?.status}
                  </span>
                </div>
              </div>
              {dadosCadastrais.situacaoFinanceira?.acao && (
                <button className="btn-atualizar">
                  {dadosCadastrais.situacaoFinanceira.acao}
                </button>
              )}
            </div>

            <button className="btn-mostrar-mais">Mostrar mais</button>
          </div>

          {/* Card Apps */}
          <div className="card-apps">
            <div className="apps-header">
              <span className="card-title">App-S</span>
              <button className="link-mostrar">
                Mostrar mais
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="apps-list">
              {apps.map((app, index) => (
                <div key={index} className="app-item">
                  <Smartphone size={16} />
                  <span>{app.nome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Produtos */}
          <div className="card-produtos">
            <div className="produtos-list">
              {produtos.map((produto, index) => (
                <div key={index} className="produto-item">
                  <Tv size={16} />
                  <span>{produto.nome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .visao360-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f8f9fa;
          border-radius: 16px;
          overflow: hidden;
        }

        /* Header do Atendimento */
        .atendimento-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          gap: 24px;
        }

        .cliente-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cliente-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        .cliente-dados {
          display: flex;
          flex-direction: column;
        }

        .cliente-nome {
          font-weight: 600;
          color: #111827;
          font-size: 16px;
        }

        .tempo-atendimento {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          font-size: 13px;
        }

        .acoes-rapidas {
          display: flex;
          gap: 8px;
        }

        .acao-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .acao-btn:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .acao-btn.dropdown .dropdown-icon {
          transform: rotate(90deg);
          opacity: 0.5;
        }

        .header-tabs {
          display: flex;
          gap: 8px;
        }

        .header-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          background: white;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .header-tab:hover {
          background: #f3f4f6;
        }

        .header-tab.active {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          color: white;
          border-color: transparent;
        }

        .header-tab.mais-opcoes {
          border-style: dashed;
        }

        /* Conteúdo Principal */
        .visao360-content {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 20px;
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }

        .coluna-esquerda {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .coluna-direita {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Card Base */
        .card-instancia,
        .card-protocolos,
        .card-avisos,
        .card-dados-cadastrais,
        .card-apps,
        .card-produtos {
          background: white;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #e5e7eb;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #111827;
          font-size: 14px;
        }

        /* Card Instância */
        .telefone-instancia {
          color: #6b7280;
          font-size: 14px;
        }

        .btn-gerenciar {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-gerenciar:hover {
          background: #f3f4f6;
        }

        /* Card Protocolos */
        .link-todos {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #6b7280;
          font-size: 13px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .link-todos:hover {
          color: #8b5cf6;
        }

        .protocolo-atual {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .protocolo-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 13px;
        }

        .protocolo-numero {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #111827;
        }

        .btn-copy {
          padding: 4px;
          border: none;
          background: none;
          color: #8b5cf6;
          cursor: pointer;
        }

        .protocolos-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .aviso-visita {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
          border-radius: 8px;
          color: #7c3aed;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .protocolos-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .protocolo-card {
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .protocolo-card:hover {
          border-color: #8b5cf6;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
        }

        .protocolo-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .protocolo-id {
          font-weight: 600;
          color: #111827;
        }

        .protocolo-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }

        .tag {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        .tag-primary {
          background: #fef3c7;
          color: #d97706;
        }

        .tag-secondary {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-icon.pending {
          color: #f59e0b;
        }

        .protocolo-descricao {
          color: #6b7280;
          font-size: 12px;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .protocolo-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 11px;
          color: #6b7280;
        }

        .protocolo-plano,
        .protocolo-data {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .protocolo-tipo {
          padding: 2px 6px;
          background: #f3f4f6;
          border-radius: 4px;
        }

        /* Card Avisos */
        .aviso-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          margin-top: 12px;
          cursor: pointer;
        }

        .aviso-item:hover {
          background: #f3f4f6;
        }

        .aviso-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .aviso-content {
          flex: 1;
        }

        .aviso-titulo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #111827;
          font-size: 14px;
        }

        .aviso-badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        .aviso-badge.urgente {
          background: #fee2e2;
          color: #dc2626;
        }

        .aviso-descricao {
          display: block;
          color: #6b7280;
          font-size: 12px;
          margin-top: 2px;
        }

        .aviso-empty {
          color: #9ca3af;
          font-size: 13px;
          text-align: center;
          padding: 20px;
        }

        /* Card IA Resumo */
        .card-ia-resumo {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          border-radius: 12px;
          padding: 16px;
          color: white;
        }

        .ia-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .btn-voltar {
          padding: 4px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: white;
          cursor: pointer;
        }

        .btn-voltar:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .ia-titulo {
          font-weight: 600;
          font-size: 14px;
        }

        .ia-badge {
          margin-left: auto;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-size: 12px;
        }

        .ia-mensagem {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 12px;
          opacity: 0.95;
        }

        .btn-acao-ia {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: white;
          border: none;
          border-radius: 8px;
          color: #7c3aed;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-acao-ia:hover {
          background: #f3f4f6;
        }

        /* Card Dados Cadastrais */
        .dados-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .dados-row:last-of-type {
          border-bottom: none;
        }

        .dados-item {
          display: flex;
          gap: 12px;
          color: #6b7280;
        }

        .dados-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dados-label {
          font-size: 12px;
          color: #9ca3af;
        }

        .dados-value {
          font-size: 14px;
          color: #111827;
        }

        .dados-value.warning {
          color: #dc2626;
        }

        .dados-tags {
          display: flex;
          gap: 6px;
        }

        .tipo-tag {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
        }

        .tipo-tag.platinum {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .tipo-tag.tradicional {
          background: #f3f4f6;
          color: #6b7280;
        }

        .btn-editar {
          padding: 6px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          color: #6b7280;
          cursor: pointer;
        }

        .btn-editar:hover {
          background: #f3f4f6;
        }

        .btn-atualizar {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          color: #374151;
          font-size: 12px;
          cursor: pointer;
        }

        .btn-atualizar:hover {
          background: #f3f4f6;
        }

        .btn-mostrar-mais {
          width: 100%;
          padding: 10px;
          border: none;
          background: none;
          color: #8b5cf6;
          font-size: 13px;
          cursor: pointer;
          margin-top: 8px;
        }

        .btn-mostrar-mais:hover {
          text-decoration: underline;
        }

        /* Card Apps */
        .apps-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .link-mostrar {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #8b5cf6;
          font-size: 13px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .apps-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .app-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f9fafb;
          border-radius: 8px;
          color: #374151;
          font-size: 14px;
        }

        /* Card Produtos */
        .produtos-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .produto-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f9fafb;
          border-radius: 8px;
          color: #374151;
          font-size: 14px;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .visao360-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .atendimento-header {
            flex-wrap: wrap;
            gap: 12px;
          }

          .acoes-rapidas {
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .header-tabs {
            order: 2;
          }

          .protocolos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
