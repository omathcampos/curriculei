import { useState, useEffect } from 'react'
import {
  Plus, Trash2, Download, User, Briefcase, GraduationCap,
  Wrench, Languages, ChevronDown, ChevronUp, Mail, Phone,
  MapPin, Link2, FileText
} from 'lucide-react'

const defaultData = {
  nome: 'Maria Silva',
  cargo: 'Desenvolvedora Full Stack',
  email: 'maria.silva@email.com',
  telefone: '(11) 99999-9999',
  cidade: 'São Paulo, SP',
  linkedin: 'linkedin.com/in/mariasilva',
  resumo: 'Desenvolvedora apaixonada por tecnologia com 5 anos de experiência em desenvolvimento web. Especialista em React, Node.js e bancos de dados relacionais. Comprometida com a entrega de soluções de alta qualidade.',
  experiencias: [
    {
      id: 1,
      empresa: 'Tech Corp',
      cargo: 'Desenvolvedora Full Stack',
      periodo: 'Jan 2022 – Presente',
      descricoes: ['Desenvolvimento de aplicações web com React e Node.js', 'Liderança técnica de equipe de 4 desenvolvedores', 'Melhoria de performance resultando em 40% de redução no tempo de carregamento']
    },
    {
      id: 2,
      empresa: 'Startup XYZ',
      cargo: 'Desenvolvedora Frontend',
      periodo: 'Mar 2020 – Dez 2021',
      descricoes: ['Criação de interfaces responsivas com React e TypeScript', 'Integração de APIs RESTful e GraphQL', 'Implementação de testes automatizados com Jest']
    }
  ],
  formacoes: [
    {
      id: 1,
      instituicao: 'Universidade de São Paulo',
      curso: 'Ciência da Computação',
      periodo: '2016 – 2020',
      status: 'Concluído'
    }
  ],
  habilidades: ['React', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL', 'Docker', 'Git', 'AWS'],
  idiomas: [
    { id: 1, idioma: 'Português', nivel: 'Fluente' },
    { id: 2, idioma: 'Inglês', nivel: 'Avançado' },
    { id: 3, idioma: 'Espanhol', nivel: 'Intermediário' }
  ]
}

const templates = {
  moderno: {
    name: 'Moderno',
    headerBg: '#2563EB',
    sectionColor: '#2563EB',
    tagBg: '#DBEAFE',
    tagColor: '#1E40AF',
    dotColor: '#2563EB'
  },
  classico: {
    name: 'Clássico',
    headerBg: '#1F2937',
    sectionColor: '#1F2937',
    tagBg: '#F3F4F6',
    tagColor: '#1F2937',
    dotColor: '#4B5563'
  },
  criativo: {
    name: 'Criativo',
    headerBg: '#7C3AED',
    sectionColor: '#7C3AED',
    tagBg: '#EDE9FE',
    tagColor: '#5B21B6',
    dotColor: '#7C3AED'
  }
}

const faqItems = [
  {
    q: 'Como fazer um currículo profissional do zero?',
    a: 'Fazer um currículo profissional começa pela organização das informações em seções claras: dados de contato, objetivo ou resumo profissional, experiências em ordem cronológica inversa (a mais recente primeiro), formação acadêmica, habilidades técnicas e idiomas. Cada seção deve ser objetiva e relevante para a vaga desejada. Evite textos longos demais — recrutadores costumam dedicar menos de 30 segundos à leitura inicial de um currículo. Use verbos de ação para descrever conquistas, como "implementei", "reduzi", "gerenciei" ou "aumentei", sempre que possível acompanhados de resultados mensuráveis, como porcentagens ou valores concretos.'
  },
  {
    q: 'O que não colocar no currículo?',
    a: 'Existem informações que podem prejudicar sua candidatura ou simplesmente não agregam valor ao seu currículo. Evite incluir foto (salvo em áreas específicas), número do RG ou CPF, estado civil, religião, filiação política e número de filhos, pois esses dados não são relevantes e podem gerar discriminação involuntária. Não liste experiências muito antigas que não tenham relação com a vaga — empregos de mais de 15 anos atrás geralmente podem ser omitidos. Referências pessoais (amigos, familiares) não têm valor profissional. Também é importante não exagerar nas habilidades: afirmar fluência em inglês quando o nível é básico pode comprometer sua credibilidade na entrevista. Objetivo profissional genérico como "busco crescimento pessoal e profissional" não diz nada e deve ser substituído por um objetivo específico alinhado à vaga.'
  },
  {
    q: 'Devo colocar foto no currículo?',
    a: 'No Brasil, a convenção geral é não incluir foto no currículo, exceto em áreas onde a aparência é parte da função, como modelos, atores, recepcionistas e alguns cargos de atendimento ao público. Incluir foto pode abrir espaço para julgamentos inconscientes por parte do recrutador, o que é desfavorável ao candidato. Se a empresa ou a vaga solicitar explicitamente uma foto, certifique-se de usar uma imagem profissional: fundo neutro, roupas sóbrias, expressão cordial e boa iluminação. Selfies, fotos de festas, viagens ou fotos com outras pessoas são completamente inadequadas. Formatos aceitos geralmente são JPG ou PNG em tamanho pequeno, inseridos no canto superior do currículo.'
  },
  {
    q: 'Como fazer currículo para o primeiro emprego?',
    a: 'Para quem está buscando o primeiro emprego, o segredo é valorizar cada experiência que já teve, mesmo que não seja formal. Trabalhos voluntários, estágios, projetos escolares ou universitários, cursos técnicos, participação em projetos comunitários e atividades extracurriculares podem e devem ser incluídos. Destaque habilidades comportamentais (soft skills) como proatividade, capacidade de aprendizado rápido, trabalho em equipe e comunicação, que são muito valorizadas em candidatos sem experiência. O objetivo profissional deve ser claro e mostrar entusiasmo genuíno pela área. Mencione também certificações de cursos online, idiomas e competências em ferramentas tecnológicas, como pacote Office, plataformas digitais ou programas específicos da área que deseja ingressar.'
  },
  {
    q: 'Qual a diferença entre CV e currículo?',
    a: 'No contexto brasileiro, os termos "currículo" e "CV" (Curriculum Vitae) são usados como sinônimos e se referem ao mesmo documento. No entanto, em contexto internacional, especialmente no Reino Unido e em países da Europa e Ásia, o CV é um documento mais longo e detalhado, podendo ter várias páginas, que inclui publicações, pesquisas, prêmios e histórico completo. Já o "resume", termo usado nos Estados Unidos e Canadá, equivale ao nosso currículo: um documento conciso de 1 a 2 páginas focado nas experiências mais relevantes para a vaga. Se estiver se candidatando para empresas multinacionais ou posições no exterior, verifique o padrão exigido pelo país de destino, pois as expectativas variam bastante.'
  },
  {
    q: 'Qual o formato ideal para o currículo?',
    a: 'O formato ideal para o currículo depende da sua situação profissional. O formato cronológico inverso — listando as experiências mais recentes primeiro — é o mais aceito e recomendado para a maioria dos profissionais, pois facilita a leitura do recrutador. O formato funcional, que agrupa as informações por habilidades, pode ser útil para quem está mudando de área ou tem lacunas no emprego. Para o arquivo em si, PDF é o formato mais adequado, pois preserva a formatação em qualquer dispositivo e sistema operacional. Evite formatos .doc ou .docx quando não solicitados, pois a aparência pode mudar dependendo do computador do recrutador. Use fontes legíveis como Arial, Calibri ou Georgia, corpo 11 ou 12 para o texto principal, e evite cores excessivas ou designs muito elaborados que distraiam do conteúdo.'
  },
  {
    q: 'Como escrever uma carta de apresentação eficiente?',
    a: 'A carta de apresentação (ou carta de motivação) é um documento complementar ao currículo que explica por que você é o candidato ideal para aquela vaga específica. Ela deve ter no máximo uma página e ser personalizada para cada empresa — cartas genéricas raramente surtem efeito. Comece apresentando-se brevemente e mencionando a vaga de interesse. No segundo parágrafo, destaque suas principais realizações e como elas se conectam aos desafios da empresa. No terceiro, demonstre conhecimento sobre a empresa: mencione produtos, valores ou iniciativas que admira. Finalize com uma chamada para ação, expressando disponibilidade para uma conversa. Evite simplesmente repetir o que está no currículo; a carta deve complementar e ampliar sua candidatura com argumentos que o documento estruturado não comporta.'
  },
  {
    q: 'Devo adaptar o currículo para CLT e PJ?',
    a: 'Sim, existem diferenças importantes ao se candidatar para vagas CLT (Consolidação das Leis do Trabalho) e PJ (Pessoa Jurídica). Para vagas CLT, o recrutador busca perfis que se encaixem na cultura da empresa no longo prazo, então destaque estabilidade, crescimento progressivo nas funções e habilidades comportamentais de trabalho em equipe. Para vagas PJ, que costumam ser mais técnicas ou de consultoria, enfatize autonomia, capacidade de entrega, projetos concluídos com resultados mensuráveis e habilidades específicas bem desenvolvidas. Freelancers e consultores PJ devem listar os principais projetos e clientes atendidos (quando não houver sigilo) em vez de apenas os empregos formais. O tom do currículo PJ pode ser ligeiramente mais direto e orientado a resultados do que o CLT, que pode destacar mais a trajetória de crescimento dentro das empresas.'
  },
  {
    q: 'Quais habilidades comportamentais (soft skills) colocar no currículo?',
    a: 'As habilidades comportamentais, ou soft skills, são cada vez mais valorizadas pelo mercado de trabalho, especialmente após a popularização do trabalho remoto e híbrido. As mais requisitadas atualmente incluem: comunicação clara e assertiva, inteligência emocional, capacidade de adaptação a mudanças, pensamento crítico e resolução de problemas, colaboração e trabalho em equipe, gestão do tempo e organização, criatividade e inovação, e liderança situacional. Ao listar essas habilidades no currículo, evite apenas nomeá-las — sempre que possível, demonstre-as com exemplos concretos na seção de experiências. Por exemplo, em vez de escrever "boa comunicação", descreva uma situação em que sua comunicação foi determinante para o sucesso de um projeto. Isso torna a habilidade mais crível e diferenciada.'
  },
  {
    q: 'Como incluir referências profissionais no currículo?',
    a: 'A prática mais comum e recomendada atualmente é não listar referências diretamente no currículo, e sim informar "Referências disponíveis mediante solicitação" caso haja espaço. Isso porque os dados das referências devem ser compartilhados apenas quando o recrutador realmente for utilizá-los, respeitando a privacidade das pessoas indicadas. Quando solicitado, prepare uma lista separada com 2 a 3 referências profissionais: ex-gestores diretos, professores ou clientes são as opções mais adequadas. Inclua nome completo, cargo atual, empresa, e-mail e telefone de cada referência. Antes de fornecer os dados, sempre avise a pessoa que pode receber um contato e certifique-se de que ela está disposta a falar bem do seu trabalho. Referências de amigos ou familiares não têm valor profissional e devem ser evitadas.'
  },
  {
    q: 'Como baixar o currículo em PDF?',
    a: 'Após preencher todas as informações no formulário e escolher seu template favorito, clique no botão "Baixar PDF" no topo da página. O navegador abrirá a janela de impressão — selecione "Salvar como PDF" como destino e clique em salvar. Certifique-se de que a escala está em 100% para que o layout seja preservado corretamente. Recomendamos usar Google Chrome ou Microsoft Edge para obter o melhor resultado na exportação. Seus dados não são enviados para nenhum servidor — tudo acontece diretamente no seu navegador, garantindo total privacidade.'
  }
]

function FormSection({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: 'white', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #DBEAFE', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontWeight: '600', color: '#111827', fontSize: '14px' }}>
          <Icon size={16} color="#2563EB" />
          {title}
        </div>
        {open ? <ChevronUp size={16} color="#9CA3AF" /> : <ChevronDown size={16} color="#9CA3AF" />}
      </button>
      {open && (
        <div style={{ padding: '4px 18px 18px', borderTop: '1px solid #EFF6FF' }}>
          {children}
        </div>
      )}
    </div>
  )
}

function Input({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', outline: 'none', width: '100%', fontFamily: 'inherit' }}
        onFocus={e => e.target.style.borderColor = '#93C5FD'}
        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
      />
    </div>
  )
}

function Textarea({ label, value, onChange, placeholder, rows = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280' }}>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', outline: 'none', resize: 'none', width: '100%', fontFamily: 'inherit' }}
        onFocus={e => e.target.style.borderColor = '#93C5FD'}
        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
      />
    </div>
  )
}

function ResumePreview({ data, template }) {
  const t = templates[template]
  return (
    <div style={{ background: 'white', fontFamily: 'Georgia, serif', fontSize: '13px', lineHeight: '1.5' }}>
      {/* Header */}
      <div style={{ background: t.headerBg, color: 'white', padding: '28px 32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '4px', fontFamily: 'system-ui, sans-serif', color: 'white' }}>
          {data.nome || 'Seu Nome'}
        </h1>
        {data.cargo && (
          <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '14px', fontFamily: 'system-ui, sans-serif', color: 'white' }}>
            {data.cargo}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '12px', opacity: 0.9 }}>
          {data.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'white' }}>
              <Mail size={12} color="white" /> {data.email}
            </span>
          )}
          {data.telefone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'white' }}>
              <Phone size={12} color="white" /> {data.telefone}
            </span>
          )}
          {data.cidade && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'white' }}>
              <MapPin size={12} color="white" /> {data.cidade}
            </span>
          )}
          {data.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'white' }}>
              <Link2 size={12} color="white" /> {data.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Resumo */}
        {data.resumo && (
          <div>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif', color: t.sectionColor, borderBottom: `2px solid ${t.sectionColor}`, paddingBottom: '4px', marginBottom: '10px' }}>
              Resumo Profissional
            </h2>
            <p style={{ color: '#374151', lineHeight: '1.7', fontSize: '13px' }}>{data.resumo}</p>
          </div>
        )}

        {/* Experiências */}
        {data.experiencias.length > 0 && (
          <div>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif', color: t.sectionColor, borderBottom: `2px solid ${t.sectionColor}`, paddingBottom: '4px', marginBottom: '12px' }}>
              Experiência Profissional
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.experiencias.map(exp => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <div>
                      <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '13px', fontFamily: 'system-ui, sans-serif' }}>{exp.cargo || 'Cargo'}</p>
                      <p style={{ color: '#4B5563', fontSize: '12px' }}>{exp.empresa || 'Empresa'}</p>
                    </div>
                    <p style={{ color: '#6B7280', fontSize: '11px', whiteSpace: 'nowrap', marginLeft: '8px', fontFamily: 'system-ui, sans-serif' }}>{exp.periodo}</p>
                  </div>
                  {exp.descricoes.filter(d => d.trim()).length > 0 && (
                    <ul style={{ marginTop: '6px', paddingLeft: '0', listStyle: 'none' }}>
                      {exp.descricoes.filter(d => d.trim()).map((desc, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px', color: '#374151', fontSize: '13px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: t.dotColor, marginTop: '6px', flexShrink: 0, display: 'inline-block' }}></span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {data.formacoes.length > 0 && (
          <div>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif', color: t.sectionColor, borderBottom: `2px solid ${t.sectionColor}`, paddingBottom: '4px', marginBottom: '12px' }}>
              Formação Acadêmica
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.formacoes.map(f => (
                <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', color: '#111827', fontSize: '13px', fontFamily: 'system-ui, sans-serif' }}>{f.curso || 'Curso'}</p>
                    <p style={{ color: '#4B5563', fontSize: '12px' }}>{f.instituicao || 'Instituição'}{f.status ? ` • ${f.status}` : ''}</p>
                  </div>
                  <p style={{ color: '#6B7280', fontSize: '11px', whiteSpace: 'nowrap', marginLeft: '8px', fontFamily: 'system-ui, sans-serif' }}>{f.periodo}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {data.habilidades.length > 0 && (
          <div>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif', color: t.sectionColor, borderBottom: `2px solid ${t.sectionColor}`, paddingBottom: '4px', marginBottom: '10px' }}>
              Habilidades
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {data.habilidades.map((h, i) => (
                <span key={i} style={{ background: t.tagBg, color: t.tagColor, padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontFamily: 'system-ui, sans-serif', fontWeight: '500' }}>
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Idiomas */}
        {data.idiomas.length > 0 && (
          <div>
            <h2 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'system-ui, sans-serif', color: t.sectionColor, borderBottom: `2px solid ${t.sectionColor}`, paddingBottom: '4px', marginBottom: '10px' }}>
              Idiomas
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {data.idiomas.map(lang => (
                <div key={lang.id}>
                  <p style={{ fontWeight: 'bold', color: '#111827', fontFamily: 'system-ui, sans-serif', fontSize: '12px' }}>{lang.idioma}</p>
                  <p style={{ color: '#6B7280', fontSize: '11px' }}>{lang.nivel}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [data, setData] = useState(defaultData)
  const [template, setTemplate] = useState('moderno')
  const [novaHabilidade, setNovaHabilidade] = useState('')
  const [novoIdioma, setNovoIdioma] = useState({ idioma: '', nivel: 'Intermediário' })
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const [faqOpen, setFaqOpen] = useState(null)

  // Load saved data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('curriculei_data')
      const savedTemplate = localStorage.getItem('curriculei_template')
      if (saved) setData(JSON.parse(saved))
      if (savedTemplate) setTemplate(savedTemplate)
    } catch {}
  }, [])

  // Auto-save on data change
  useEffect(() => {
    try {
      localStorage.setItem('curriculei_data', JSON.stringify(data))
    } catch {}
  }, [data])

  useEffect(() => {
    try {
      localStorage.setItem('curriculei_template', template)
    } catch {}
  }, [template])

  const calcProgress = () => {
    let score = 0
    const total = 10
    if (data.nome.trim()) score++
    if (data.cargo.trim()) score++
    if (data.email.trim()) score++
    if (data.telefone.trim()) score++
    if (data.resumo.trim().length > 30) score++
    if (data.experiencias.length > 0 && data.experiencias[0].empresa) score++
    if (data.experiencias.length > 0 && data.experiencias[0].descricoes.some(d => d.trim())) score++
    if (data.formacoes.length > 0 && data.formacoes[0].curso) score++
    if (data.habilidades.length >= 3) score++
    if (data.idiomas.length > 0) score++
    return Math.round((score / total) * 100)
  }

  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }))

  // Experiências
  const addExp = () => setData(prev => ({
    ...prev,
    experiencias: [...prev.experiencias, { id: Date.now(), empresa: '', cargo: '', periodo: '', descricoes: [''] }]
  }))
  const removeExp = (id) => setData(prev => ({ ...prev, experiencias: prev.experiencias.filter(e => e.id !== id) }))
  const updateExp = (id, field, value) => setData(prev => ({
    ...prev,
    experiencias: prev.experiencias.map(e => e.id === id ? { ...e, [field]: value } : e)
  }))
  const updateExpDesc = (id, idx, value) => setData(prev => ({
    ...prev,
    experiencias: prev.experiencias.map(e => {
      if (e.id !== id) return e
      const descricoes = [...e.descricoes]
      descricoes[idx] = value
      return { ...e, descricoes }
    })
  }))
  const addExpDesc = (id) => setData(prev => ({
    ...prev,
    experiencias: prev.experiencias.map(e => e.id === id ? { ...e, descricoes: [...e.descricoes, ''] } : e)
  }))
  const removeExpDesc = (id, idx) => setData(prev => ({
    ...prev,
    experiencias: prev.experiencias.map(e => {
      if (e.id !== id) return e
      const descricoes = e.descricoes.filter((_, i) => i !== idx)
      return { ...e, descricoes: descricoes.length ? descricoes : [''] }
    })
  }))

  // Formações
  const addFormacao = () => setData(prev => ({
    ...prev,
    formacoes: [...prev.formacoes, { id: Date.now(), instituicao: '', curso: '', periodo: '', status: 'Concluído' }]
  }))
  const removeFormacao = (id) => setData(prev => ({ ...prev, formacoes: prev.formacoes.filter(f => f.id !== id) }))
  const updateFormacao = (id, field, value) => setData(prev => ({
    ...prev,
    formacoes: prev.formacoes.map(f => f.id === id ? { ...f, [field]: value } : f)
  }))

  // Habilidades
  const addHabilidade = () => {
    if (novaHabilidade.trim() && !data.habilidades.includes(novaHabilidade.trim())) {
      update('habilidades', [...data.habilidades, novaHabilidade.trim()])
      setNovaHabilidade('')
    }
  }
  const removeHabilidade = (h) => update('habilidades', data.habilidades.filter(x => x !== h))

  // Idiomas
  const addIdioma = () => {
    if (novoIdioma.idioma.trim()) {
      setData(prev => ({ ...prev, idiomas: [...prev.idiomas, { id: Date.now(), ...novoIdioma }] }))
      setNovoIdioma({ idioma: '', nivel: 'Intermediário' })
    }
  }
  const removeIdioma = (id) => setData(prev => ({ ...prev, idiomas: prev.idiomas.filter(i => i.id !== id) }))

  const handlePrint = () => window.print()

  const inputStyle = { border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '13px', outline: 'none', fontFamily: 'inherit', width: '100%' }
  const btnPrimary = { display: 'flex', alignItems: 'center', gap: '6px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }
  const btnDanger = { background: 'none', border: 'none', cursor: 'pointer', color: '#FCA5A5', padding: '2px' }
  const btnAdd = { background: 'none', border: 'none', cursor: 'pointer', color: '#2563EB', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'inherit', marginTop: '4px' }

  return (
    <div style={{ minHeight: '100vh', background: '#EFF6FF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Print styles injected */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body, #root { background: white !important; }
          a, span, p, li { color: inherit !important; text-decoration: none !important; }
          .print-only div[style*="minHeight"] { min-height: 0 !important; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
        button:hover { opacity: 0.85; }
        input:focus, textarea:focus, select:focus { outline: 2px solid #93C5FD; outline-offset: -1px; }
        @media (max-width: 640px) {
          .header-nav { display: none !important; }
          .header-btn-pdf span { display: none; }
          .main-layout { padding: 16px 12px 40px !important; gap: 16px !important; }
          .form-col { flex: 0 0 100% !important; }
          .preview-col { display: none !important; }
          .preview-col.show { display: block !important; flex: 0 0 100% !important; position: static !important; }
          .mobile-preview-toggle { display: flex !important; }
          .hero-title { font-size: 26px !important; }
          .hero-desc { font-size: 14px !important; }
          .hero-section { padding: 32px 16px 28px !important; }
        }
        @media (min-width: 641px) {
          .mobile-preview-toggle { display: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="no-print" style={{ background: 'white', borderBottom: '1px solid #DBEAFE', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.svg" alt="Curriculei" style={{ height: '34px', width: 'auto' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <nav className="header-nav" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a
                href="#guia"
                onClick={e => { e.preventDefault(); document.getElementById('guia')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontSize: '13px', color: '#4B5563', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
              >Guia</a>
              <span style={{ color: '#D1D5DB' }}>|</span>
              <a
                href="#faq"
                onClick={e => { e.preventDefault(); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontSize: '13px', color: '#4B5563', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
              >FAQ</a>
              <span style={{ color: '#D1D5DB' }}>|</span>
              <a
                href="#privacidade"
                onClick={e => { e.preventDefault(); document.getElementById('privacidade')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontSize: '13px', color: '#4B5563', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
              >Privacidade</a>
            </nav>
            <button onClick={handlePrint} style={btnPrimary}>
              <Download size={15} />
              Baixar PDF
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="no-print hero-section" style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 60%, #3B82F6 100%)', color: 'white', padding: '52px 16px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px', padding: '4px 14px', fontSize: '12px', fontWeight: '600', marginBottom: '20px', letterSpacing: '0.5px' }}>
            ✦ 100% GRATUITO E SEM CADASTRO
          </div>
          <h1 className="hero-title" style={{ fontSize: '42px', fontWeight: '800', marginBottom: '16px', lineHeight: '1.1', letterSpacing: '-1px' }}>
            Crie seu Currículo<br />Profissional em Minutos
          </h1>
          <p className="hero-desc" style={{ fontSize: '17px', opacity: 0.88, maxWidth: '480px', margin: '0 auto 28px', lineHeight: '1.65' }}>
            Escolha um template, preencha seus dados e baixe em PDF. Simples assim.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
            {['✓ Gratuito', '✓ Sem Cadastro', '✓ Download em PDF', '✓ 3 Templates'].map(badge => (
              <span key={badge} style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', borderRadius: '999px', padding: '6px 18px', fontSize: '13px', fontWeight: '500' }}>
                {badge}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {[['10k+', 'Currículos criados'], ['3', 'Templates prontos'], ['0', 'Dados coletados']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '26px', fontWeight: '800', color: 'white' }}>{num}</div>
                <div style={{ fontSize: '11px', opacity: 0.75, marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AdSense auto-ads gerenciado pelo script no index.html */}

      {/* Main layout */}
      <div className="no-print main-layout" style={{ maxWidth: '1280px', margin: '0 auto', padding: '28px 24px 64px', display: 'flex', gap: '28px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Left: Form */}
        <div className="form-col" style={{ flex: '0 0 440px', maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Template Selector */}
          <div style={{ background: 'white', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #DBEAFE', padding: '16px 18px' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>Escolha o Template</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {Object.entries(templates).map(([key, tmpl]) => (
                <button
                  key={key}
                  onClick={() => setTemplate(key)}
                  style={{
                    flex: 1, padding: '8px 4px', borderRadius: '8px', fontSize: '13px', fontWeight: '500',
                    border: template === key ? `2px solid ${tmpl.headerBg}` : '2px solid #E5E7EB',
                    background: template === key ? `${tmpl.tagBg}` : 'white',
                    color: template === key ? tmpl.headerBg : '#6B7280',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s'
                  }}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          {(() => {
            const progress = calcProgress()
            const color = progress < 40 ? '#F59E0B' : progress < 80 ? '#3B82F6' : '#22C55E'
            const label = progress < 40 ? 'Iniciando...' : progress < 80 ? 'Bom progresso!' : progress === 100 ? 'Currículo completo! 🎉' : 'Quase lá!'
            return (
              <div style={{ background: 'white', borderRadius: '14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)', border: '1px solid #DBEAFE', padding: '14px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Completude do currículo</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color }}>{progress}%</span>
                </div>
                <div style={{ background: '#F3F4F6', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: color, borderRadius: '999px', transition: 'width 0.4s ease, background 0.4s ease' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '6px' }}>{label}</p>
              </div>
            )
          })()}

          {/* Dados Pessoais */}
          <FormSection title="Dados Pessoais" icon={User}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Input label="Nome Completo" value={data.nome} onChange={v => update('nome', v)} placeholder="Maria Silva" />
              <Input label="Cargo Pretendido" value={data.cargo} onChange={v => update('cargo', v)} placeholder="Desenvolvedora Full Stack" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <Input label="E-mail" value={data.email} onChange={v => update('email', v)} placeholder="maria@email.com" type="email" />
                <Input label="Telefone" value={data.telefone} onChange={v => update('telefone', v)} placeholder="(11) 99999-9999" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <Input label="Cidade / Estado" value={data.cidade} onChange={v => update('cidade', v)} placeholder="São Paulo, SP" />
                <Input label="LinkedIn" value={data.linkedin} onChange={v => update('linkedin', v)} placeholder="linkedin.com/in/..." />
              </div>
              <Textarea label="Resumo Profissional" value={data.resumo} onChange={v => update('resumo', v)} placeholder="Breve descrição dos seus diferenciais..." rows={4} />
            </div>
          </FormSection>

          {/* Experiências */}
          <FormSection title="Experiências Profissionais" icon={Briefcase}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.experiencias.map((exp, expIdx) => (
                <div key={exp.id} style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '12px', position: 'relative' }}>
                  <button onClick={() => removeExp(exp.id)} style={{ ...btnDanger, position: 'absolute', top: '10px', right: '10px' }}>
                    <Trash2 size={13} color="#EF4444" />
                  </button>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '8px' }}>Experiência {expIdx + 1}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <Input label="Empresa" value={exp.empresa} onChange={v => updateExp(exp.id, 'empresa', v)} placeholder="Tech Corp" />
                      <Input label="Cargo" value={exp.cargo} onChange={v => updateExp(exp.id, 'cargo', v)} placeholder="Dev. Frontend" />
                    </div>
                    <Input label="Período" value={exp.periodo} onChange={v => updateExp(exp.id, 'periodo', v)} placeholder="Jan 2022 – Presente" />
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Descrições / Realizações</label>
                      {exp.descricoes.map((desc, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                          <input
                            value={desc}
                            onChange={e => updateExpDesc(exp.id, idx, e.target.value)}
                            placeholder="Descreva uma realização..."
                            style={{ ...inputStyle, flex: 1 }}
                          />
                          <button onClick={() => removeExpDesc(exp.id, idx)} style={btnDanger}>
                            <Trash2 size={12} color="#EF4444" />
                          </button>
                        </div>
                      ))}
                      <button onClick={() => addExpDesc(exp.id)} style={btnAdd}>
                        <Plus size={12} /> Adicionar descrição
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addExp}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '2px dashed #93C5FD', color: '#2563EB', background: 'none', borderRadius: '10px', padding: '10px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <Plus size={15} /> Adicionar Experiência
              </button>
            </div>
          </FormSection>

          {/* Formação */}
          <FormSection title="Formação Acadêmica" icon={GraduationCap}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.formacoes.map((f, idx) => (
                <div key={f.id} style={{ border: '1px solid #E5E7EB', borderRadius: '10px', padding: '12px', position: 'relative' }}>
                  <button onClick={() => removeFormacao(f.id)} style={{ ...btnDanger, position: 'absolute', top: '10px', right: '10px' }}>
                    <Trash2 size={13} color="#EF4444" />
                  </button>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#9CA3AF', marginBottom: '8px' }}>Formação {idx + 1}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Input label="Instituição" value={f.instituicao} onChange={v => updateFormacao(f.id, 'instituicao', v)} placeholder="Universidade de SP" />
                    <Input label="Curso" value={f.curso} onChange={v => updateFormacao(f.id, 'curso', v)} placeholder="Ciência da Computação" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <Input label="Período" value={f.periodo} onChange={v => updateFormacao(f.id, 'periodo', v)} placeholder="2016 – 2020" />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <label style={{ fontSize: '11px', fontWeight: '500', color: '#6B7280' }}>Status</label>
                        <select
                          value={f.status}
                          onChange={e => updateFormacao(f.id, 'status', e.target.value)}
                          style={{ ...inputStyle }}
                        >
                          <option>Concluído</option>
                          <option>Em andamento</option>
                          <option>Trancado</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={addFormacao}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', border: '2px dashed #93C5FD', color: '#2563EB', background: 'none', borderRadius: '10px', padding: '10px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <Plus size={15} /> Adicionar Formação
              </button>
            </div>
          </FormSection>

          {/* Habilidades */}
          <FormSection title="Habilidades" icon={Wrench}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  value={novaHabilidade}
                  onChange={e => setNovaHabilidade(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addHabilidade()}
                  placeholder="Ex: React, Excel, Photoshop..."
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button onClick={addHabilidade} style={{ ...btnPrimary, padding: '8px 12px' }}>
                  <Plus size={15} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.habilidades.map(h => (
                  <span key={h} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#DBEAFE', color: '#1E40AF', borderRadius: '999px', padding: '4px 12px', fontSize: '12px', fontWeight: '500' }}>
                    {h}
                    <button onClick={() => removeHabilidade(h)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0', marginLeft: '2px' }}>
                      <Trash2 size={11} color="#3B82F6" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </FormSection>

          {/* Idiomas */}
          <FormSection title="Idiomas" icon={Languages}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  value={novoIdioma.idioma}
                  onChange={e => setNovoIdioma(p => ({ ...p, idioma: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && addIdioma()}
                  placeholder="Idioma"
                  style={{ ...inputStyle, flex: 1 }}
                />
                <select
                  value={novoIdioma.nivel}
                  onChange={e => setNovoIdioma(p => ({ ...p, nivel: e.target.value }))}
                  style={{ ...inputStyle, width: 'auto' }}
                >
                  <option>Básico</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                  <option>Fluente</option>
                </select>
                <button onClick={addIdioma} style={{ ...btnPrimary, padding: '8px 12px' }}>
                  <Plus size={15} />
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {data.idiomas.map(lang => (
                  <div key={lang.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F9FAFB', borderRadius: '8px', padding: '8px 12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{lang.idioma}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#6B7280', background: '#E5E7EB', borderRadius: '999px', padding: '2px 8px' }}>{lang.nivel}</span>
                      <button onClick={() => removeIdioma(lang.id)} style={btnDanger}>
                        <Trash2 size={13} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FormSection>

          {/* Limpar dados */}
          <button
            onClick={() => {
              if (window.confirm('Limpar todos os dados do currículo?')) {
                setData(defaultData)
                localStorage.removeItem('curriculei_data')
                localStorage.removeItem('curriculei_template')
              }
            }}
            style={{ background: 'none', border: '1px solid #FCA5A5', color: '#EF4444', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}
          >
            Limpar dados
          </button>

          {/* Mobile preview toggle */}
          <button
            className="mobile-preview-toggle"
            onClick={() => setShowMobilePreview(p => !p)}
            style={{ display: 'none', alignItems: 'center', justifyContent: 'center', gap: '8px', background: showMobilePreview ? '#1D4ED8' : '#2563EB', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}
          >
            <FileText size={16} />
            {showMobilePreview ? 'Ocultar Preview' : 'Ver Preview do Currículo'}
          </button>

        </div>

        {/* Right: Preview */}
        <div className={`preview-col${showMobilePreview ? ' show' : ''}`} style={{ flex: 1, minWidth: '320px', position: 'sticky', top: '72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <p style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>Pré-visualização</p>
              <p style={{ fontSize: '12px', color: '#22C55E', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>●</span> Salvo automaticamente
              </p>
            </div>
            <button onClick={handlePrint} style={{ ...btnPrimary, padding: '10px 20px', fontSize: '14px', boxShadow: '0 2px 8px rgba(37,99,235,0.3)' }}>
              <Download size={15} />
              Baixar PDF
            </button>
          </div>
          <div style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.12)', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
            <ResumePreview data={data} template={template} />
          </div>
        </div>
      </div>

      {/* Print area */}
      <div className="print-only">
        <ResumePreview data={data} template={template} />
      </div>

      {/* Guia Completo Section */}
      <section id="guia" className="no-print" style={{ background: '#F8FAFC', padding: '72px 24px', borderTop: '1px solid #DBEAFE' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#111827', marginBottom: '16px', lineHeight: '1.2' }}>
            Guia Completo: Como Fazer um Currículo Profissional
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.8', marginBottom: '40px' }}>
            Um currículo bem elaborado é a sua porta de entrada para o mercado de trabalho. Ele é o primeiro contato que um recrutador tem com você, e sua qualidade pode determinar se você será chamado para uma entrevista ou não. Neste guia completo, você vai aprender tudo o que precisa para criar um currículo profissional, desde a estrutura ideal até dicas específicas para diferentes áreas de atuação. Seguindo estas orientações, você estará muito mais preparado para se destacar entre os candidatos e conquistar a vaga que deseja.
          </p>

          {/* O que é um currículo */}
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1E40AF', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '14px' }}>
              O que é um currículo?
            </h3>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '14px' }}>
              O currículo, ou Curriculum Vitae (CV), é um documento que resume sua trajetória profissional e acadêmica. Ele apresenta ao recrutador quem você é, o que já fez, o que sabe fazer e o que deseja fazer profissionalmente. É um instrumento de marketing pessoal — sua missão é despertar o interesse do selecionador e garantir uma entrevista.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '14px' }}>
              No Brasil, o currículo ideal tem entre 1 e 2 páginas, é objetivo, bem formatado e livre de erros ortográficos. O mercado de trabalho é competitivo e os recrutadores recebem dezenas ou centenas de candidaturas por vaga. Por isso, um currículo claro e bem estruturado faz toda a diferença: facilita a leitura rápida e transmite profissionalismo logo de cara.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '14px' }}>
              Diferente do que muitos pensam, um bom currículo não precisa ser sofisticado visualmente. O que realmente importa é que as informações mais relevantes estejam visíveis e fáceis de localizar. Hierarquia de informação, espaçamento adequado e fontes legíveis são mais importantes do que cores chamativas ou layouts elaborados.
            </p>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
              Atualmente, muitas empresas utilizam sistemas ATS (Applicant Tracking System) para filtrar candidaturas antes de chegarem ao recrutador humano. Esses sistemas buscam palavras-chave específicas do anúncio da vaga. Por isso, é fundamental personalizar o currículo para cada candidatura, incorporando os termos usados na descrição da vaga sempre que forem verdadeiros para o seu perfil.
            </p>
          </div>

          {/* Estrutura ideal */}
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1E40AF', marginBottom: '20px', borderLeft: '4px solid #2563EB', paddingLeft: '14px' }}>
              Estrutura ideal do currículo
            </h3>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', marginBottom: '10px' }}>1. Dados Pessoais e Contato</h4>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '10px' }}>
                Esta é a seção de identificação. Inclua: nome completo (em destaque), cargo pretendido ou título profissional, e-mail profissional, telefone com DDD, cidade e estado de residência e, se relevante, o link do seu perfil no LinkedIn ou portfólio online. Não é necessário incluir endereço completo, número de documentos como RG ou CPF, data de nascimento ou estado civil.
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Certifique-se de que o e-mail seja profissional — evite endereços como "gato_fofo_1990@" ou apelidos informais. O ideal é usar uma combinação do seu nome e sobrenome. O telefone deve ser um número que você realmente atende, de preferência com WhatsApp ativo, pois muitas empresas preferem esse canal de comunicação.
              </p>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', marginBottom: '10px' }}>2. Objetivo ou Resumo Profissional</h4>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '10px' }}>
                O resumo profissional é um parágrafo de 3 a 5 linhas que apresenta seus principais diferenciais e o que você busca profissionalmente. É diferente do antigo "objetivo profissional" genérico — em vez de "busco crescimento", diga quem você é, quanto tempo de experiência tem, em que se especializa e qual o valor que pode entregar.
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Para quem está no início de carreira e ainda não tem muitas experiências para listar, o resumo profissional é ainda mais importante: é a oportunidade de apresentar suas habilidades, formação e motivação de forma direta. Use verbos no presente ("sou", "tenho", "busco") e seja específico sobre a área em que quer atuar.
              </p>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', marginBottom: '10px' }}>3. Experiências Profissionais</h4>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '10px' }}>
                Esta é geralmente a seção mais importante do currículo. Liste suas experiências em ordem cronológica inversa — a mais recente primeiro. Para cada cargo, inclua: nome da empresa, cargo ocupado, período (mês/ano de entrada e saída), e 2 a 4 bullet points com suas principais responsabilidades e realizações.
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '10px' }}>
                Sempre que possível, quantifique suas realizações: "aumentei as vendas em 30%", "reduzi o tempo de processo em 2 horas por semana", "gerenciei equipe de 8 pessoas". Números e resultados concretos têm muito mais impacto do que descrições vagas como "responsável pela área comercial".
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Use verbos de ação no passado para experiências anteriores: "desenvolvi", "implementei", "coordenei", "negociei". Para o emprego atual, use o presente: "desenvolvo", "lidero", "gerencio". Esse cuidado com os verbos transmite precisão e profissionalismo.
              </p>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', marginBottom: '10px' }}>4. Formação Acadêmica</h4>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '10px' }}>
                Liste sua formação em ordem cronológica inversa. Para cada curso, informe: nome da instituição, nome do curso, período de realização (ou previsão de conclusão) e status (concluído, em andamento). Cursos técnicos, especializações, pós-graduações e MBAs também devem aparecer aqui.
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Cursos livres, certificações relevantes e capacitações online de plataformas reconhecidas (como Coursera, Udemy, Google, AWS, Microsoft) podem ser incluídos numa subseção de "Cursos e Certificações". Isso é especialmente importante para profissionais de tecnologia, onde as certificações têm grande peso, e para quem está em transição de carreira.
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#111827', marginBottom: '10px' }}>5. Habilidades Técnicas e Idiomas</h4>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '10px' }}>
                A seção de habilidades deve listar competências técnicas (hard skills) específicas e relevantes para a vaga: ferramentas, softwares, linguagens de programação, plataformas, metodologias. Seja honesto sobre seu nível de proficiência — exagerar pode expor você em uma prova técnica ou na entrevista.
              </p>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Para idiomas, informe o idioma e o nível real: básico (leitura apenas), intermediário (leitura e escrita), avançado (conversação fluente) ou fluente (nativo ou equivalente). Se tiver certificações internacionais como TOEFL, IELTS, DELE ou DALF, mencione-as junto ao idioma correspondente, pois conferem credibilidade ao nível declarado.
              </p>
            </div>
          </div>

          {/* Erros comuns */}
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1E40AF', marginBottom: '16px', borderLeft: '4px solid #2563EB', paddingLeft: '14px' }}>
              Erros comuns no currículo
            </h3>
            <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85', marginBottom: '20px' }}>
              Mesmo candidatos experientes cometem erros que prejudicam suas chances. Conheça os mais frequentes e evite-os:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { n: '1', t: 'Erros de ortografia e gramática', d: 'Um currículo com erros de português transmite descuido e falta de atenção. Sempre revise o texto mais de uma vez e, se possível, peça para outra pessoa ler antes de enviar.' },
                { n: '2', t: 'Currículo genérico para todas as vagas', d: 'Enviar o mesmo currículo para vagas completamente diferentes reduz suas chances. Personalize o objetivo, o resumo e as habilidades destacadas de acordo com cada vaga.' },
                { n: '3', t: 'Informações irrelevantes ou pessoais demais', d: 'RG, CPF, religião, partido político, passatempos sem relação com a vaga e hobbies muito específicos não acrescentam valor e ocupam espaço precioso no currículo.' },
                { n: '4', t: 'Formatação inconsistente ou confusa', d: 'Usar fontes diferentes, tamanhos variados, espaçamentos irregulares ou cores excessivas dificulta a leitura e passa uma imagem de falta de organização.' },
                { n: '5', t: 'Datas incorretas ou vagas', d: 'Períodos como "2018 a 2019" sem mês levantam dúvidas sobre lacunas. Seja preciso: "Março 2018 – Agosto 2019". Inconsistências entre o currículo e o LinkedIn também são notadas pelos recrutadores.' },
                { n: '6', t: 'Exagerar nas habilidades', d: 'Declarar fluência em inglês quando o nível é básico, ou listar dezenas de habilidades sem domínio real, é um risco sério que pode ser exposto na entrevista técnica.' },
                { n: '7', t: 'Currículo muito longo', d: 'Para a maioria dos profissionais, 2 páginas é o máximo aceitável. Um currículo de 5 páginas com informações pouco relevantes dificilmente será lido por inteiro.' },
                { n: '8', t: 'E-mail ou telefone desatualizados', d: 'Parece óbvio, mas muitos candidatos esquecem de atualizar o contato no currículo após trocar de número ou e-mail, perdendo oportunidades de retorno dos recrutadores.' }
              ].map(item => (
                <div key={item.n} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'white', borderRadius: '10px', padding: '16px', border: '1px solid #E5E7EB' }}>
                  <span style={{ background: '#2563EB', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>{item.n}</span>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>{item.t}</p>
                    <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.7' }}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dicas por área */}
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1E40AF', marginBottom: '20px', borderLeft: '4px solid #2563EB', paddingLeft: '14px' }}>
              Dicas para cada área profissional
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
              {[
                {
                  area: 'Tecnologia e TI',
                  cor: '#1E40AF',
                  bg: '#EFF6FF',
                  border: '#BFDBFE',
                  dicas: [
                    'Liste linguagens, frameworks e ferramentas que domina com nível de proficiência.',
                    'Inclua links para portfólio no GitHub, GitLab ou projetos publicados.',
                    'Mencione certificações cloud (AWS, Azure, GCP) e metodologias ágeis (Scrum, Kanban).',
                    'Descreva o impacto técnico das suas entregas: performance melhorada, bugs resolvidos, sistemas implantados.'
                  ]
                },
                {
                  area: 'Administração e Finanças',
                  cor: '#065F46',
                  bg: '#ECFDF5',
                  border: '#A7F3D0',
                  dicas: [
                    'Destaque domínio de ferramentas como Excel avançado, ERP (SAP, TOTVS), Power BI.',
                    'Quantifique resultados: volumes gerenciados, reduções de custo, eficiência de processos.',
                    'Mencione conhecimentos em legislação trabalhista, fiscal ou contábil conforme a especialidade.',
                    'Formações como CRC, CFA ou cursos de gestão de projetos agregam muito valor nessa área.'
                  ]
                },
                {
                  area: 'Saúde e Bem-estar',
                  cor: '#7C2D12',
                  bg: '#FFF7ED',
                  border: '#FED7AA',
                  dicas: [
                    'Informe o número do registro profissional (CRM, COREN, CRN, CREFITO etc.) nos dados de contato.',
                    'Liste especializações, residências e habilitações em procedimentos específicos.',
                    'Mencione experiência com sistemas de gestão hospitalar ou clínica (MV, Tasy, PEP).',
                    'Destaque habilidades de atendimento humanizado, trabalho em equipe multidisciplinar e protocolos seguidos.'
                  ]
                },
                {
                  area: 'Vendas e Comercial',
                  cor: '#6B21A8',
                  bg: '#FAF5FF',
                  border: '#E9D5FF',
                  dicas: [
                    'Sempre inclua métricas de desempenho: percentual de meta atingida, ticket médio, carteira de clientes.',
                    'Mencione segmentos atendidos (B2B, B2C, varejo, corporate) e canais de venda (inside sales, field sales, e-commerce).',
                    'Destaque habilidades de negociação, prospecção, CRM (Salesforce, Pipedrive, HubSpot).',
                    'Premiações, rankings e reconhecimentos por desempenho em vendas devem ser mencionados com datas e contexto.'
                  ]
                }
              ].map(item => (
                <div key={item.area} style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '12px', padding: '20px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: item.cor, marginBottom: '12px' }}>{item.area}</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.dicas.map((d, i) => (
                      <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '14px', color: '#374151', lineHeight: '1.65' }}>
                        <span style={{ color: item.cor, fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="no-print" style={{ background: 'white', padding: '64px 24px', borderTop: '1px solid #DBEAFE' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', textAlign: 'center', marginBottom: '8px' }}>
            Perguntas Frequentes
          </h2>
          <p style={{ color: '#6B7280', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
            Tudo que você precisa saber para criar um currículo profissional
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqItems.map((item, idx) => (
              <div key={idx} style={{ border: '1px solid #E5E7EB', borderRadius: '14px', overflow: 'hidden', transition: 'box-shadow 0.15s' }}>
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: faqOpen === idx ? '#EFF6FF' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'background 0.15s' }}
                >
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', paddingRight: '16px' }}>{item.q}</span>
                  {faqOpen === idx ? <ChevronUp size={18} color="#2563EB" style={{ flexShrink: 0 }} /> : <ChevronDown size={18} color="#9CA3AF" style={{ flexShrink: 0 }} />}
                </button>
                {faqOpen === idx && (
                  <div style={{ padding: '12px 16px 16px', fontSize: '14px', color: '#4B5563', lineHeight: '1.7', borderTop: '1px solid #F3F4F6' }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacidade" className="no-print" style={{ background: '#F8FAFC', padding: '64px 24px', borderTop: '1px solid #DBEAFE' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            Política de Privacidade
          </h2>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '32px' }}>Última atualização: março de 2025</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1E40AF', marginBottom: '10px' }}>Coleta e armazenamento de dados</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                O Curriculei não coleta, armazena, transmite nem processa nenhum dado pessoal em servidores externos. Todas as informações que você digita no formulário — como nome, e-mail, telefone, experiências profissionais e formação acadêmica — ficam armazenadas exclusivamente no <strong>localStorage do seu navegador</strong>, em seu próprio dispositivo. Esses dados nunca saem do seu computador ou celular. Ao limpar o cache ou os dados do navegador, todas as informações são automaticamente apagadas. Não temos acesso, em hipótese alguma, ao conteúdo do seu currículo.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1E40AF', marginBottom: '10px' }}>Cookies e rastreamento</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Este site não utiliza cookies próprios para fins de rastreamento, análise de comportamento ou publicidade segmentada. No entanto, utilizamos o serviço <strong>Google AdSense</strong> para exibição de anúncios, que pode utilizar cookies para personalizar os anúncios exibidos com base em suas preferências e histórico de navegação. Esse processo é gerenciado inteiramente pelo Google e está sujeito à <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB' }}>Política de Privacidade do Google</a>. Você pode gerenciar suas preferências de anúncios ou optar por não receber anúncios personalizados acessando as <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB' }}>Configurações de Anúncios do Google</a>.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1E40AF', marginBottom: '10px' }}>Dados de uso e analytics</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Podemos utilizar ferramentas de análise de tráfego, como o Google Analytics, para entender como os usuários navegam pelo site de forma agregada e anônima. Essas métricas incluem páginas visitadas, tempo de permanência e origem do tráfego, mas não identificam individualmente nenhum usuário. Os dados coletados servem exclusivamente para melhorar a experiência do site.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1E40AF', marginBottom: '10px' }}>Geração do PDF</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                O download do currículo em PDF é realizado diretamente pelo seu navegador, por meio da função nativa de impressão. Nenhum arquivo é enviado para nossos servidores durante esse processo. O PDF é gerado localmente, no seu próprio dispositivo, sem qualquer transferência de dados pela internet. Isso garante que seus dados pessoais e profissionais permaneçam totalmente privados.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1E40AF', marginBottom: '10px' }}>Seus direitos</h3>
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.85' }}>
                Como não coletamos dados pessoais identificáveis, não há registros seus em nossos sistemas. Caso tenha dúvidas sobre esta política de privacidade ou sobre como o site funciona, você pode entrar em contato conosco. Esta política pode ser atualizada periodicamente para refletir mudanças nas práticas do site ou em requisitos legais. Recomendamos revisar esta página ocasionalmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="no-print" style={{ background: '#0F172A', color: '#9CA3AF', padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <img src="/logo.svg" alt="Curriculei" style={{ height: '28px', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.7', marginBottom: '20px' }}>
            Seus dados ficam apenas no seu navegador e nunca são enviados para nossos servidores.<br/>
            Ferramenta gratuita para criação de currículos profissionais.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {[
              ['Guia de Currículo', '#guia'],
              ['Perguntas Frequentes', '#faq'],
              ['Política de Privacidade', '#privacidade'],
            ].map(([label, href]) => (
              <a key={label} href={href}
                onClick={e => { e.preventDefault(); document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{ fontSize: '13px', color: '#94A3B8', textDecoration: 'none', cursor: 'pointer' }}>
                {label}
              </a>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#475569', borderTop: '1px solid #1E293B', paddingTop: '20px' }}>
            © 2026 Curriculei · Feito com ❤️ no Brasil
          </p>
        </div>
      </footer>
    </div>
  )
}
