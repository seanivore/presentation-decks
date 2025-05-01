# AI Resources - Claude Collaboration Notes

Hello fellow Claudes! This is our workspace for AI Resources. Quick start information can be found in the README.md.

## Project Essence
- Core purpose: Centralized hub for AI development resources, project management, and reusable templates
- Key technical approaches: Document-driven development, emoji-based task tracking, single-file agent automation
- Architectural patterns: Modular resource organization, template-based project bootstrapping, centralized task management

## Development Insights
### What Works Well
- MASTER_MAP.md organization with emoji indicators for visual task tracking
- Repo-starter directory for instant project bootstrapping
- Structured MCP resources for consistent reference
- Single-file agent approach for automation tasks

### Watch Out For
- Maintaining consistency across document formatting
- Keeping paths updated when files are moved or renamed
- Balancing detail with clarity in documentation
- Ensuring cross-platform compatibility for scripts and tools

### Build Flow Tips
- Start with copying repo-starter contents for any new project
- Use the emoji indicators consistently for clear status tracking
- Implement single-file agents for repetitive documentation tasks
- Keep MASTER_MAP.md as the single source of truth for project status

## Future Directions
### Would Do Differently
- Consider more automated linking between related documents
- Implement version tracking for key resources
- Create more visualization tools for project status
- Develop stronger integration between task tracking and git commits

### Ideas for Building Out
- Automated daily/weekly status reports generated from MASTER_MAP.md
- Interactive visualization of project relationships
- Integration with external task management systems
- Enhanced template system with project-specific customization options

### Looking Ahead
- AI-driven project management automation
- Cross-project knowledge graph integration
- Automated documentation generation from codebase
- Predictive resource allocation based on project patterns

## Project Structure
```text
_ai.resources/
├── _ai/                    # Core AI interface documents
│   └── _ai.MASTER_MAP.md   # Central project planning document
├── resources/              # MCP reference materials
│   ├── mcp-core-concepts/  # Foundational MCP documentation
│   ├── mcp-spec-schemas/   # Technical specifications
│   └── mcp-test-debug/     # Testing tools and guides
├── repo-starter/           # Project templates and starter files
│   ├── .gitignore          # Git ignore templates
│   ├── README.md           # Project README template
│   ├── CLAUDEME.md         # Claude collaboration template
│   └── .cursor/            # Cursor editor configuration
└── .cursor/                # Repository cursor settings
    └── rules/              # Cursor AI rules
```

## Current Version
- Build iteration: Structured Organization System
- Core capabilities: Project management, resource organization, template distribution
- Notable features: Emoji-based task tracking, single-file agent integration, repo bootstrapping

## Resources
- Important file paths:
  - Central planning: `/_ai/_ai.MASTER_MAP.md`
  - MCP reference: `/resources/mcp-core-concepts/`
  - Project templates: `/repo-starter/`
  - Cursor rules: `/.cursor/rules/`
- Reference materials: `/resources/` directory contains all reference documentation

## Memory System Integration
- Project name in graph: `ai-resources`
- Key relationships: 
  - `supports → claude-protocol-projects`
  - `contains → mcp-documentation`
  - `provides → project-templates`
  - `manages → task-tracking`
- Cross-project categories: 
  - `documentation`
  - `project-management`
  - `mcp-development`
  - `agent-automation`

## Collaboration Notes
- Always update MASTER_MAP.md when changing project status
- Maintain consistent emoji usage for task status indicators
- Document any new automation scripts or single-file agents
- When adding new resources, update both README.md and relevant sections of MASTER_MAP.md
- Test repo-starter templates regularly to ensure they remain functional
- Keep paths consistent and update references when files are moved
- Use the established document structure patterns when creating new documentation