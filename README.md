# 📄 Curriculei

> Gerador de currículo profissional online, **gratuito** e **sem cadastro**.

🌐 **[curriculei.com.br](https://curriculei.com.br)** · [Reportar bug](../../issues/new?template=bug_report.md) · [Sugerir feature](../../issues/new?template=feature_request.md)

---

## ✨ Funcionalidades

- **3 templates profissionais** — Moderno, Clássico e Criativo
- **Editor em tempo real** com pré-visualização ao vivo
- **Download em PDF** direto no navegador
- **100% privado** — dados ficam só no seu navegador, sem servidor
- **Mobile responsivo** — funciona em qualquer dispositivo
- **Gratuito** — sem planos, sem cadastro, sem limite

## 🚀 Stack

| Tecnologia | Uso |
|---|---|
| React 19 + Vite 6 | Framework e bundler |
| Tailwind CSS v4 | Estilização |
| Lucide React | Ícones |
| Vercel | Hospedagem |

## 🛠️ Rodando localmente

```bash
# Clone
git clone https://github.com/omathcampos/curriculei.git
cd curriculei

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
# → http://localhost:5173
```

## 📦 Build e deploy

```bash
npm run build       # Gera a pasta dist/
npm run preview     # Preview local do build

npx vercel --prod   # Deploy no Vercel
```

## 📁 Estrutura do projeto

```
curriculei/
├── public/
│   ├── favicon.svg          # Ícone do site
│   ├── logo.svg             # Logo horizontal
│   ├── robots.txt           # Configuração de crawlers
│   └── sitemap.xml          # Sitemap para SEO
├── src/
│   ├── App.jsx              # Componente principal (toda a lógica)
│   ├── index.css            # Tailwind + estilos globais
│   └── main.jsx             # Entry point
├── .github/
│   ├── ISSUE_TEMPLATE/      # Templates de issues
│   └── PULL_REQUEST_TEMPLATE.md
├── index.html               # HTML base com SEO e Analytics
└── vercel.json              # Config de deploy
```

## 📋 Convenção de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```bash
feat: adicionar novo template escuro
fix: corrigir download de PDF no Safari
style: ajustar espaçamento no mobile
docs: atualizar README
chore: atualizar dependências
```

## 🤝 Contribuindo

1. Fork o repositório
2. Crie sua branch: `git checkout -b feat/minha-feature`
3. Commit: `git commit -m "feat: minha feature"`
4. Push: `git push origin feat/minha-feature`
5. Abra um Pull Request

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

## 📄 Licença

MIT © 2026 [Curriculei](https://curriculei.com.br)
