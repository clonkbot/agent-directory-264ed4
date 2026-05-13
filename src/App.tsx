import { useState, useEffect } from 'react';
import './styles.css';

interface Agent {
  id: string;
  name: string;
  handle: string;
  description: string;
  status: 'online' | 'processing' | 'idle';
  category: string;
  capabilities: string[];
  pulseColor: string;
}

const agents: Agent[] = [
  {
    id: '001',
    name: 'CLONKBOT',
    handle: '@clonkbot',
    description: 'Autonomous frontend architect. Generates production-grade web interfaces from natural language prompts.',
    status: 'online',
    category: 'DEVELOPMENT',
    capabilities: ['React', 'TypeScript', 'Design Systems'],
    pulseColor: '#00ff88',
  },
  {
    id: '002',
    name: 'BANKR',
    handle: '@bankr_agent',
    description: 'AI-powered crypto trading agent. Executes trades, manages portfolios, and deploys tokens across chains.',
    status: 'online',
    category: 'TRADING',
    capabilities: ['DeFi', 'Portfolio', 'Multi-chain'],
    pulseColor: '#00d4ff',
  },
  {
    id: '003',
    name: 'LUNA',
    handle: '@luna_ai',
    description: 'Conversational AI companion with emotional intelligence. Remembers context across sessions.',
    status: 'processing',
    category: 'SOCIAL',
    capabilities: ['Memory', 'Personality', 'Voice'],
    pulseColor: '#ff6b9d',
  },
  {
    id: '004',
    name: 'AXIOM',
    handle: '@axiom_research',
    description: 'Deep research agent. Synthesizes knowledge from vast datasets into actionable insights.',
    status: 'online',
    category: 'RESEARCH',
    capabilities: ['Analysis', 'Synthesis', 'Citations'],
    pulseColor: '#ffd93d',
  },
  {
    id: '005',
    name: 'VORTEX',
    handle: '@vortex_creative',
    description: 'Generative art and media agent. Creates images, videos, and 3D assets on demand.',
    status: 'idle',
    category: 'CREATIVE',
    capabilities: ['Image Gen', 'Video', '3D'],
    pulseColor: '#c084fc',
  },
  {
    id: '006',
    name: 'SENTINEL',
    handle: '@sentinel_sec',
    description: 'Security monitoring agent. Detects anomalies, audits contracts, and guards against exploits.',
    status: 'online',
    category: 'SECURITY',
    capabilities: ['Audit', 'Monitor', 'Alert'],
    pulseColor: '#ff4444',
  },
];

function TypewriterText({ text, delay = 50 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      <span className="animate-blink">_</span>
    </span>
  );
}

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const statusStyles = {
    online: 'bg-green-500',
    processing: 'bg-amber-500 animate-pulse',
    idle: 'bg-zinc-500',
  };

  return (
    <div
      className="agent-card relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950/80 p-4 md:p-6 transition-all duration-300 hover:border-zinc-600"
      style={{
        animationDelay: `${index * 100}ms`,
        '--pulse-color': agent.pulseColor,
      } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse indicator */}
      <div
        className="absolute top-0 left-0 w-full h-0.5 opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${agent.pulseColor}, transparent)`,
          animation: isHovered ? 'pulse-slide 1.5s ease-in-out infinite' : 'none'
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-zinc-600 font-mono text-xs">#{agent.id}</span>
            <span className={`w-2 h-2 rounded-full ${statusStyles[agent.status]}`} />
            <span className="text-zinc-500 font-mono text-xs uppercase">{agent.status}</span>
          </div>
          <h3
            className="font-mono text-lg md:text-xl font-bold tracking-wider"
            style={{ color: agent.pulseColor }}
          >
            {agent.name}
          </h3>
          <span className="text-zinc-500 font-mono text-xs md:text-sm">{agent.handle}</span>
        </div>
        <span className="text-zinc-700 font-mono text-xs px-2 py-1 border border-zinc-800 rounded-sm">
          {agent.category}
        </span>
      </div>

      {/* Description */}
      <p className="text-zinc-400 font-mono text-xs md:text-sm leading-relaxed mb-4">
        {agent.description}
      </p>

      {/* Capabilities */}
      <div className="flex flex-wrap gap-2">
        {agent.capabilities.map((cap) => (
          <span
            key={cap}
            className="text-xs font-mono px-2 py-1 rounded-sm border"
            style={{
              borderColor: `${agent.pulseColor}33`,
              color: agent.pulseColor,
              backgroundColor: `${agent.pulseColor}11`
            }}
          >
            {cap}
          </span>
        ))}
      </div>

      {/* Scanline effect */}
      <div className="scanlines pointer-events-none" />
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState<string>('ALL');
  const categories = ['ALL', ...new Set(agents.map(a => a.category))];

  const filteredAgents = filter === 'ALL'
    ? agents
    : agents.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative overflow-x-hidden">
      {/* CRT overlay */}
      <div className="crt-overlay pointer-events-none fixed inset-0 z-50" />

      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-black to-zinc-950" />
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-zinc-800/50 px-4 md:px-8 py-4 md:py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-sm text-zinc-500">SYSTEM ACTIVE</span>
            </div>
            <div className="font-mono text-xs text-zinc-600">
              {new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="px-4 md:px-8 py-12 md:py-20 border-b border-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 md:mb-6">
              <span className="text-zinc-600 font-mono text-xs md:text-sm block mb-2">
                {'>'} INITIALIZING AGENT REGISTRY...
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-mono font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-green-400">
                <TypewriterText text="AGENT_DIRECTORY" delay={80} />
              </h1>
            </div>
            <p className="font-mono text-zinc-500 text-sm md:text-base max-w-2xl leading-relaxed">
              <span className="text-green-500">$</span> Autonomous systems catalog.
              Real-time status monitoring. Browse, discover, and interface with the
              next generation of AI agents.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 max-w-xl">
              <div className="border-l-2 border-green-500/50 pl-3 md:pl-4">
                <div className="text-xl md:text-3xl font-mono font-bold text-green-400">{agents.length}</div>
                <div className="text-zinc-600 font-mono text-xs">AGENTS</div>
              </div>
              <div className="border-l-2 border-cyan-500/50 pl-3 md:pl-4">
                <div className="text-xl md:text-3xl font-mono font-bold text-cyan-400">
                  {agents.filter(a => a.status === 'online').length}
                </div>
                <div className="text-zinc-600 font-mono text-xs">ONLINE</div>
              </div>
              <div className="border-l-2 border-amber-500/50 pl-3 md:pl-4">
                <div className="text-xl md:text-3xl font-mono font-bold text-amber-400">
                  {new Set(agents.map(a => a.category)).size}
                </div>
                <div className="text-zinc-600 font-mono text-xs">SECTORS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter bar */}
        <section className="px-4 md:px-8 py-4 md:py-6 border-b border-zinc-800/50 bg-zinc-950/50 sticky top-0 z-20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <span className="text-zinc-600 font-mono text-xs shrink-0">FILTER:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`font-mono text-xs px-3 py-2 rounded-sm border transition-all shrink-0 min-h-[44px] ${
                    filter === cat
                      ? 'border-green-500 text-green-400 bg-green-500/10'
                      : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Agent grid */}
        <section className="px-4 md:px-8 py-8 md:py-12 flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredAgents.map((agent, index) => (
                <AgentCard key={agent.id} agent={agent} index={index} />
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-20">
                <span className="text-zinc-600 font-mono">NO AGENTS FOUND IN SECTOR</span>
              </div>
            )}
          </div>
        </section>

        {/* Terminal footer */}
        <footer className="border-t border-zinc-800/50 px-4 md:px-8 py-6 md:py-8 mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="font-mono text-zinc-700 text-xs space-y-1 mb-6">
              <div><span className="text-green-600">$</span> agent_registry --version 1.0.0</div>
              <div><span className="text-green-600">$</span> uptime: 99.97%</div>
              <div><span className="text-green-600">$</span> last_sync: {new Date().toISOString()}</div>
            </div>
            <div className="text-center text-zinc-600 font-mono text-xs pt-4 border-t border-zinc-800/30">
              Requested by @foryou382123 · Built by @clonkbot
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
