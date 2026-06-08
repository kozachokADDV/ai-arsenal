# AI Command Center

Интерактивная презентация персональной архитектуры AI-команды на базе Claude Code.

**Telegram AI 24/7 · 4 authored plugins · 212 agents · 136 skills · 4 architecture patterns**

🔗 **Live demo:** https://kozachokaddv.github.io/ai-arsenal/

## Что внутри

Информативная одностраничная презентация структуры моей AI-команды:

- **Система Telegram-ассистентов 24/7** — флагман: 3 ядра (Hermes / UserBot / бренд-бот) на VPS, финансовый конвейер (скрин→OCR→Sheets), голос→STT, календарь/email/брифинг, мозг Claude Code. Показана node-graph в стиле n8n.
- **4 авторских плагина** — cfo-director, seo-director (13 агентов), geo-optimizer, signage-pos-designer (новый)
- **212 агентов** — установленная библиотека Agency Agents, 16 дивизионов
- **136 skills** — ≈121 скил Влада Ясько + паки Anthropic, догружаются по триггеру
- **Фундамент** — реорганизованная структура портфеля + университет памяти (claims/verdicts, Model C+++)
- **4 architecture patterns** — от плоского skill-pack до agent-of-agents

## Стек

- Vanilla HTML + CSS + JavaScript (без билд-степа)
- Google Fonts: Orbitron, JetBrains Mono, Space Grotesk
- Размер: ~30 KB total

## Архитектурные типы плагинов

| Type | Pattern | Example |
|------|---------|---------|
| A | Agent-Orchestrated (диспетчер-агент → специалисты) | seo-director |
| B | Hybrid (skill-orchestrator + agents + skills) | blog-engine-ua |
| C | Skill-Orchestrated (orchestrator-skill → skills) | cfo-director |
| D | Flat Skill Pack (без оркестратора) | geo-optimizer, designer-pro |

## Easter eggs

- Boot sequence при первой загрузке (3 сек)
- 3D tilt на карточках агентов и плагинов при наведении
- Konami code (↑ ↑ ↓ ↓ ← → ← → B A) → retro amber palette

## Зачем это

Это не маркетинг. Это реальная архитектура, которая работает в продакшене для:
- Финансовой функции малого бизнеса в Украине (CFO Director)
- SEO/GEO для собственного B2B-сайта (SEO Director + GEO Optimizer)
- Контент-производства (Blog Engine)
- Дизайн-задач (Designer Pro)

Каждый плагин решает конкретную задачу через Claude Code subagents и skills.

## Контакт

[GitHub: kozachokADDV](https://github.com/kozachokADDV)

---

*Built with [Claude Code](https://claude.com/claude-code)*
