# Como Contribuir com o Curriculei

Obrigado por querer contribuir! 🎉

## Fluxo de trabalho

1. Faça um fork do repositório
2. Crie sua branch a partir de `main`: `git checkout -b feat/minha-feature`
3. Faça suas alterações
4. Commit seguindo a convenção: `feat: descrição curta`
5. Push: `git push origin feat/minha-feature`
6. Abra um Pull Request para `main`

## Convenção de commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

| Prefixo | Quando usar |
|---|---|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Alterações visuais (CSS, layout) |
| `refactor:` | Refatoração sem nova feature |
| `docs:` | Documentação |
| `chore:` | Manutenção (deps, config) |
| `perf:` | Melhoria de performance |

## Padrões de código

- Inline styles para componentes React (padrão do projeto)
- Tailwind CSS v4 no `index.css`
- Componentes em PascalCase
- Funções utilitárias em camelCase
- Sem dependências desnecessárias

## Ambiente local

```bash
npm install
npm run dev
```

Build deve passar sem erros antes do PR:

```bash
npm run build
```

## Reportando bugs

Abra uma [issue](../../issues/new?template=bug_report.md) descrevendo:
- O que aconteceu
- O que era esperado
- Passos para reproduzir
- Screenshots se necessário
