** # General Guidelines

The SpeakUp project must always prioritize realism, usability, consistency, scalability and professional product thinking over visual experimentation.

The system must NEVER look AI-generated, generic, futuristic, exaggerated or template-based.

Every interface must feel like a real institutional SaaS platform already used by cities, municipalities or urban management organizations.

The system must follow a mature and minimalist visual language with strong UX consistency across all screens.

Always prioritize:
- clarity
- readability
- information hierarchy
- spacing consistency
- usability
- accessibility
- responsiveness
- realistic workflows
- maintainable architecture

Avoid:
- excessive gradients
- glowing effects
- neon colors
- oversized icons
- floating unnecessary elements
- childish UI
- random asymmetrical layouts
- exaggerated animations
- fake dashboard aesthetics
- overdecorated components
- startup cliché visuals

The platform should visually communicate:
- trust
- transparency
- organization
- operational efficiency
- seriousness
- governmental/institutional reliability

All layouts must be responsive by default using:
- flexbox
- CSS grid
- proper spacing systems
- scalable containers

Avoid absolute positioning unless strictly necessary.

Use reusable components whenever possible.

Keep code modular, organized and scalable.

Refactor repetitive logic into reusable utilities and components.

Never generate giant monolithic files.

Separate:
- pages
- layouts
- components
- hooks
- services
- utilities
- constants
- types

The project must follow clean folder organization.

Use semantic HTML whenever possible.

Prioritize accessibility:
- aria labels
- keyboard navigation
- contrast consistency
- readable font sizes
- proper focus states

━━━━━━━━━━━━━━━━━━

# Visual Identity Guidelines

The SpeakUp visual identity must remain strictly institutional and sophisticated.

Primary palette:
- black
- white
- graphite
- dark gray
- medium gray
- light gray

Accent colors should be extremely limited and subtle.

Use color only for:
- status indicators
- alerts
- confirmations
- warnings
- success/error states

The interface should remain predominantly monochromatic.

Never use highly saturated colors.

━━━━━━━━━━━━━━━━━━

# Typography Guidelines

Use modern sans-serif typography.

Typography must prioritize:
- readability
- hierarchy
- clean spacing
- professional appearance

Recommended hierarchy:
- Large bold headings for page titles
- Medium semibold section headers
- Regular body text
- Small muted metadata text

Avoid:
- decorative fonts
- condensed fonts
- exaggerated letter spacing

Use consistent line heights and spacing rhythm.

━━━━━━━━━━━━━━━━━━

# Spacing and Layout Guidelines

Use a consistent spacing system.

Layouts must feel:
- breathable
- organized
- aligned
- balanced

Never overcrowd screens.

Use:
- generous padding
- consistent margins
- visual grouping
- clear section separation

Cards should:
- have soft borders
- subtle shadows or no shadows
- moderate border radius
- clean internal spacing

━━━━━━━━━━━━━━━━━━

# Sidebar and Navigation Guidelines

The application uses a professional SaaS navigation structure.

Desktop:
- fixed sidebar
- clean navigation groups
- active state indicators
- minimal icons

Mobile:
- drawer navigation
- responsive transitions
- collapsible behavior

Navigation must remain:
- intuitive
- predictable
- scalable

━━━━━━━━━━━━━━━━━━

# Button Guidelines

Buttons must look modern and professional.

Use only three variants:
- Primary
- Secondary
- Ghost/Text

Primary button:
- reserved for main actions
- solid dark background
- strong contrast

Secondary button:
- outlined
- lower visual priority

Ghost/Text button:
- minimal actions only

Never place multiple competing primary buttons in the same visual section.

Button labels must always use clear action-oriented language.

Examples:
- “Enviar denúncia”
- “Salvar alterações”
- “Acompanhar denúncia”

Avoid vague labels like:
- “Continuar”
- “Próximo”
- “Clique aqui”

━━━━━━━━━━━━━━━━━━

# Form Guidelines

Forms are a core part of SpeakUp.

Forms must feel:
- simple
- trustworthy
- lightweight
- guided

Inputs must include:
- labels
- placeholders
- validation
- helper text when needed
- clear error states

Always display:
- success feedback
- validation feedback
- loading states

Long forms should be broken into sections or steps when appropriate.

━━━━━━━━━━━━━━━━━━

# Dashboard Guidelines

Dashboards must prioritize operational clarity over decoration.

Use:
- metrics cards
- clean charts
- organized tables
- strong hierarchy

Charts must be:
- minimal
- monochromatic
- readable
- analytical

Avoid:
- colorful analytics
- decorative graphs
- unnecessary data density

Metrics should feel realistic and tied to urban management.

━━━━━━━━━━━━━━━━━━

# Data Table Guidelines

Tables are extremely important in the admin experience.

Tables must include:
- filters
- sorting
- pagination
- search
- row states
- hover states

Data organization should feel enterprise-grade.

Avoid cluttered tables.

━━━━━━━━━━━━━━━━━━

# Map Guidelines

Maps must integrate naturally into the platform.

Use:
- grayscale maps
- subtle markers
- clean overlays
- organized filter panels

Maps should support:
- region grouping
- occurrence visualization
- operational analysis

━━━━━━━━━━━━━━━━━━

# UX Guidelines

The platform must reduce cognitive load.

Users should always know:
- where they are
- what happened
- what to do next

The reporting flow must feel:
- fast
- frictionless
- intuitive

The user should never need technical knowledge to use the platform.

Always provide:
- confirmations
- progress indicators
- clear statuses
- understandable feedback

━━━━━━━━━━━━━━━━━━

# Status System Guidelines

Status indicators are critical.

Use a standardized status system:
- Recebida
- Em análise
- Encaminhada
- Em andamento
- Resolvida
- Arquivada

Statuses must appear:
- visually consistent
- color-coded subtly
- easy to scan

━━━━━━━━━━━━━━━━━━

# Mobile Responsiveness Guidelines

The mobile experience must feel like a real native application.

Prioritize:
- touch spacing
- collapsible sections
- readable typography
- bottom-safe spacing
- simplified layouts

All pages must work seamlessly on:
- desktop
- tablet
- mobile

━━━━━━━━━━━━━━━━━━

# Interaction Guidelines

Microinteractions should be subtle and premium.

Use:
- smooth transitions
- hover feedback
- soft animations
- lightweight motion

Avoid:
- exaggerated motion
- bouncing animations
- flashy transitions

Animations must serve usability, not decoration.

━━━━━━━━━━━━━━━━━━

# Content Guidelines

All UI text must be written in Brazilian Portuguese.

Text must sound:
- human
- professional
- institutional
- realistic

Never use lorem ipsum.

Avoid robotic wording.

Use concise and clear communication.

━━━━━━━━━━━━━━━━━━

# Architecture Guidelines

The project should follow scalable frontend architecture.

Recommended structure:
- components
- pages
- layouts
- services
- hooks
- utils
- constants
- types

Prefer reusable abstractions.

Avoid duplicated logic.

Keep business logic separated from presentation logic.

━━━━━━━━━━━━━━━━━━

# State Management Guidelines

Keep state management clean and predictable.

Prefer:
- local component state for isolated UI
- centralized state only when necessary

Persist critical data when possible:
- localStorage
- session persistence
- cached filters

━━━━━━━━━━━━━━━━━━

# Realism Guidelines

Every generated screen must feel believable.

The product should resemble:
- municipal systems
- operational SaaS dashboards
- civic technology platforms
- internal administrative systems

Everything must appear intentionally designed by experienced product designers and frontend engineers.

The final result should never feel experimental or fictional.

It must feel deployable.**
