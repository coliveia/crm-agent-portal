import { useState } from 'react';
import { 
  User, Phone, PhoneCall, Mail, Video, MoreHorizontal, Clock, 
  FileText, AlertCircle, Calendar, Wifi, WifiOff, Home, 
  CreditCard, Shield, ChevronRight, Settings, Eye, History,
  Package, Smartphone, Tv, MessageSquare, RefreshCw, Copy,
  CheckCircle, XCircle, Zap, Star, MapPin
} from 'lucide-react';

export default function Visao360View() {
  const [activeTab, setActiveTab] = useState('visaoCliente');

  // Dados mockados baseados na imagem
  const cliente = {
    nome: 'Juliana',
    telefone: '(11) 91234-5678',
    tempoAtendimento: '00:00:33',
    protocoloAtual: '15030714062567',
    protocolosAbertos: [
      {
        id: '#2024110001',
        tags: ['Sem acesso à internet fixa', 'Visita técnica'],
        status: 'pending',
        descricao: 'O cliente solicita mudança de endereço. Um chamado foi aberto com uma visita marcada para o dia 20/09.',
        plano: 'Vivo Total Família 2',
        data: '12/12/2024',
        tipo: 'Loja Vivo'
      },
      {
        id: '#2024110002',
        tags: ['Transferência de Titularidade'],
        status: 'processing',
        descricao: 'O cliente solicitou uma transferência de titularidade. O processo...',
        plano: 'Vivo Fibra',
        data: '01/12/2024',
        tipo: null
      }
    ],
    avisos: [
      {
        tipo: 'urgente',
        titulo: 'Segunda via',
        descricao: 'Identificamos recorrência na solicitação de segunda via.'
      }
    ],
    iaResumo: {
      titulo: 'I.Ajuda',
      badge: 'Vivo Total',
      mensagem: 'Juliana gostaria de realizar a segunda via pois sua Vivo Fibra ainda não está funcionando. A fatura de setembro ainda não consta como paga no sistema.',
      acaoSugerida: 'Segunda via'
    },
    dadosCadastrais: {
      nomeCompleto: 'Juliana',
      tipoCliente: ['Platinum', 'Cliente Tradicional'],
      cpf: '456.xxx.xxx-98',
      situacaoFinanceira: {
        status: 'Recebemos faturas em atraso, a fatura está em aberto.',
        acao: 'Atualizar fatura'
      }
    },
    apps: [
      { nome: 'Acessos e e-mail', icon: Mail }
    ],
    produtos: [
      { nome: 'Vivo Total Família 2', tipo: 'plano' },
      { nome: 'Vivo Pós com Amazon Prime', tipo: 'addon' }
    ]
  };

  return (
    <div className="visao360-container">
      {/* Header do Atendimento */}
      <div className="atendimento-header">
        <div className="cliente-info">
          <div className="cliente-avatar">
            <span>P</span>
          </div>
          <div className="cliente-dados">
            <span className="cliente-nome">{cliente.nome}</span>
            <span className="tempo-atendimento">
              <Clock size={14} />
              {cliente.tempoAtendimento}
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
              <span className="telefone-instancia">{cliente.telefone}</span>
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
                <span>{cliente.protocoloAtual}</span>
                <button className="btn-copy">
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
              
              <div className="aviso-visita">
                <RefreshCw size={14} />
                <span>Juliana já possui uma visita marcada para amanhã</span>
              </div>

              <div className="protocolos-grid">
                {cliente.protocolosAbertos.map((protocolo, index) => (
                  <div key={index} className="protocolo-card">
                    <div className="protocolo-card-header">
                      <span className="protocolo-id">{protocolo.id}</span>
                      <ChevronRight size={14} />
                    </div>
                    <div className="protocolo-tags">
                      {protocolo.tags.map((tag, i) => (
                        <span key={i} className={`tag ${i === 0 ? 'tag-primary' : 'tag-secondary'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {protocolo.status === 'pending' && (
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
            {cliente.avisos.map((aviso, index) => (
              <div key={index} className="aviso-item">
                <div className="aviso-icon">
                  <FileText size={16} />
                </div>
                <div className="aviso-content">
                  <span className="aviso-titulo">
                    {aviso.titulo}
                    <span className="aviso-badge urgente">Crítico</span>
                  </span>
                  <span className="aviso-descricao">{aviso.descricao}</span>
                </div>
                <ChevronRight size={14} />
              </div>
            ))}
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
              <span className="ia-titulo">{cliente.iaResumo.titulo}</span>
              <span className="ia-badge">{cliente.iaResumo.badge}</span>
            </div>
            <p className="ia-mensagem">{cliente.iaResumo.mensagem}</p>
            <button className="btn-acao-ia">
              <Zap size={16} />
              {cliente.iaResumo.acaoSugerida}
            </button>
          </div>

          {/* Card Dados Cadastrais */}
          <div className="card-dados-cadastrais">
            <div className="dados-row">
              <div className="dados-item">
                <User size={16} />
                <div className="dados-content">
                  <span className="dados-label">Nome do tratamento</span>
                  <span className="dados-value">{cliente.dadosCadastrais.nomeCompleto}</span>
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
                    {cliente.dadosCadastrais.tipoCliente.map((tipo, i) => (
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
                  <span className="dados-value">{cliente.dadosCadastrais.cpf}</span>
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
                  <span className="dados-value warning">{cliente.dadosCadastrais.situacaoFinanceira.status}</span>
                </div>
              </div>
              <button className="btn-atualizar">
                {cliente.dadosCadastrais.situacaoFinanceira.acao}
              </button>
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
              {cliente.apps.map((app, index) => (
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
              {cliente.produtos.map((produto, index) => (
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
          font-size: 16px;
          color: #1f2937;
        }

        .tempo-atendimento {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #6b7280;
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
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .acao-btn:hover {
          background: #f3f4f6;
          border-color: #8b5cf6;
          color: #8b5cf6;
        }

        .acao-btn.dropdown .dropdown-icon {
          transform: rotate(90deg);
          margin-left: 2px;
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
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .header-tab:hover {
          border-color: #8b5cf6;
          color: #8b5cf6;
        }

        .header-tab.active {
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          border-color: transparent;
          color: white;
        }

        .header-tab.mais-opcoes {
          background: transparent;
          border: none;
        }

        /* Conteúdo Principal */
        .visao360-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 20px;
          overflow-y: auto;
          flex: 1;
        }

        .coluna-esquerda, .coluna-direita {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Cards Base */
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
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 14px;
          color: #1f2937;
        }

        /* Card Instância */
        .telefone-instancia {
          font-size: 13px;
          color: #6b7280;
        }

        .btn-gerenciar {
          width: 100%;
          padding: 10px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-gerenciar:hover {
          border-color: #8b5cf6;
          color: #8b5cf6;
        }

        /* Card Protocolos */
        .link-todos {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          font-size: 13px;
          color: #8b5cf6;
          cursor: pointer;
        }

        .protocolo-atual {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .protocolo-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
        }

        .protocolo-numero {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          color: #1f2937;
        }

        .btn-copy {
          padding: 4px;
          background: none;
          border: none;
          color: #8b5cf6;
          cursor: pointer;
        }

        .protocolos-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 12px;
        }

        .aviso-visita {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: #f3e8ff;
          border-radius: 8px;
          font-size: 13px;
          color: #7c3aed;
          margin-bottom: 16px;
        }

        .protocolos-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .protocolo-card {
          padding: 12px;
          background: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          position: relative;
        }

        .protocolo-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .protocolo-id {
          font-weight: 600;
          font-size: 13px;
          color: #1f2937;
        }

        .protocolo-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 8px;
        }

        .tag {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .tag-primary {
          background: #fef3c7;
          color: #d97706;
          border: 1px solid #fcd34d;
        }

        .tag-secondary {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fca5a5;
        }

        .status-icon {
          position: absolute;
          top: 12px;
          right: 32px;
        }

        .status-icon.pending {
          color: #f59e0b;
        }

        .protocolo-descricao {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .protocolo-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        .protocolo-plano, .protocolo-data {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #6b7280;
        }

        .protocolo-plano svg, .protocolo-data svg {
          color: #8b5cf6;
        }

        .protocolo-tipo {
          padding: 2px 8px;
          background: #e5e7eb;
          border-radius: 4px;
          font-size: 10px;
          color: #374151;
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
        }

        .aviso-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fef3c7;
          border-radius: 8px;
          color: #d97706;
        }

        .aviso-content {
          flex: 1;
        }

        .aviso-titulo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 13px;
          color: #1f2937;
        }

        .aviso-badge {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
        }

        .aviso-badge.urgente {
          background: #fee2e2;
          color: #dc2626;
        }

        .aviso-descricao {
          display: block;
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* Card IA Resumo - Destaque Roxo */
        .card-ia-resumo {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border-radius: 16px;
          padding: 20px;
          color: white;
        }

        .ia-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .btn-voltar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
        }

        .btn-voltar svg {
          transform: rotate(180deg);
        }

        .ia-titulo {
          font-weight: 600;
          font-size: 16px;
        }

        .ia-badge {
          margin-left: auto;
          padding: 4px 12px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .ia-mensagem {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 16px;
          opacity: 0.95;
        }

        .btn-acao-ia {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: white;
          border: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          color: #7c3aed;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-acao-ia:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Card Dados Cadastrais */
        .dados-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .dados-row:last-of-type {
          border-bottom: none;
        }

        .dados-item {
          display: flex;
          gap: 12px;
        }

        .dados-item svg {
          color: #8b5cf6;
          margin-top: 2px;
        }

        .dados-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dados-label {
          font-size: 12px;
          color: #6b7280;
        }

        .dados-value {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }

        .dados-value.warning {
          color: #d97706;
          font-size: 12px;
        }

        .dados-tags {
          display: flex;
          gap: 8px;
        }

        .tipo-tag {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .tipo-tag.platinum {
          background: #ede9fe;
          color: #7c3aed;
        }

        .tipo-tag.tradicional {
          background: #f3f4f6;
          color: #6b7280;
        }

        .btn-editar {
          padding: 6px;
          background: none;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          color: #6b7280;
          cursor: pointer;
        }

        .btn-editar:hover {
          border-color: #8b5cf6;
          color: #8b5cf6;
        }

        .btn-atualizar {
          padding: 6px 12px;
          background: white;
          border: 1px solid #8b5cf6;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #8b5cf6;
          cursor: pointer;
        }

        .btn-atualizar:hover {
          background: #8b5cf6;
          color: white;
        }

        .btn-mostrar-mais {
          width: 100%;
          padding: 10px;
          background: none;
          border: none;
          font-size: 13px;
          color: #8b5cf6;
          cursor: pointer;
          margin-top: 8px;
        }

        /* Card Apps */
        .apps-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .link-mostrar {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          font-size: 12px;
          color: #8b5cf6;
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
          gap: 8px;
          padding: 10px 12px;
          background: #f9fafb;
          border-radius: 8px;
          font-size: 13px;
          color: #374151;
        }

        .app-item svg {
          color: #8b5cf6;
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
          gap: 8px;
          padding: 10px 12px;
          background: #f9fafb;
          border-radius: 8px;
          font-size: 13px;
          color: #374151;
        }

        .produto-item svg {
          color: #8b5cf6;
        }

        /* Responsivo */
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

          .protocolos-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
