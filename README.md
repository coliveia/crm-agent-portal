# CRM+ Agent Portal

Interface web para atendentes do CRM+ com visão 360° do cliente e gerenciamento de casos.

## Características

- ✅ **React 18** + **Vite**
- ✅ **TailwindCSS** para estilização
- ✅ **Dashboard** com métricas em tempo real
- ✅ **Lista de casos** com filtros e busca
- ✅ **Visão 360°** do cliente
- ✅ **Gestão de SLA** visual
- ✅ **Timeline** de interações
- ✅ **Design responsivo**

## Estrutura

```
src/
├── components/       # Componentes React
│   ├── Dashboard.jsx    # Dashboard com métricas
│   ├── CaseList.jsx     # Lista de casos
│   └── CaseDetail.jsx   # Detalhes do caso
├── App.jsx          # Componente principal
├── main.jsx         # Entry point
└── index.css        # Estilos globais + Tailwind
```

## Instalação

```bash
pnpm install
```

## Desenvolvimento

```bash
pnpm dev
```

Acesse: http://localhost:5173

## Build para Produção

```bash
pnpm build
```

Os arquivos otimizados estarão em `dist/`

## Preview da Build

```bash
pnpm preview
```

## Funcionalidades

### Dashboard
- Casos ativos
- Casos aguardando
- Casos resolvidos hoje
- SLA em risco

### Lista de Casos
- Visualização de todos os casos atribuídos
- Filtros por status, prioridade
- Indicadores visuais de SLA
- Busca rápida por protocolo/cliente

### Detalhes do Caso
- Informações do cliente (visão 360°)
- Dados do caso
- Status e prioridade
- SLA visual com barra de progresso
- Ações rápidas (iniciar, notas, escalar)
- Timeline de interações

## Integração com BFF

O portal se comunica com o BFF Service em `http://localhost:3000` para:
- Buscar casos
- Atualizar status
- Adicionar interações
- Gerenciar atribuições

## Cores do Tema

- **Primary (Roxo)**: `#8b5cf6` - Elementos principais
- **Secondary (Rosa)**: `#d946ef` - Destaques
- **Branco**: Background e cards
- **Cinza**: Textos secundários

## Licença

Proprietary - Vivo/Telefônica Brasil
