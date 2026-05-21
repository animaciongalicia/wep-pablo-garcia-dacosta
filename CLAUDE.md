# pablo — cuaderno público
## pablogarciadacosta.com
## github.com/animaciongalicia/wep-pablo-garcia-dacosta

---

## Qué es esto

Un cuaderno público personal. Sin portfolio, sin servicios, sin consultoría.
Pensamientos, citas, reflexiones, momentos. Scroll infinito.
En español. A veces en gallego. Sin orden declarado.

---

## Stack — lo más simple posible

- **Framework**: Next.js 15 App Router
- **Estilos**: Tailwind CSS
- **Contenido**: archivos .md en /content/entradas/
- **Deploy**: Vercel (automático en cada push a main)
- **Publicación móvil**: Claude Cowork → GitHub API → commit → Vercel despliega

Sin base de datos. Sin CMS. Sin panel de admin.
El repositorio ES el cuaderno.

---

## Estructura

```
/
├── content/
│   ├── entradas/
│   │   ├── 2025-05-20-la-realidad-que-creamos.md
│   │   ├── 2025-05-19-creatividad-como-conexion.md
│   │   └── ...
│   └── paginas/
│       ├── quien.md
│       ├── manifiesto.md
│       └── como.md
├── app/
│   ├── page.tsx          ← río principal
│   ├── quien/page.tsx
│   ├── manifiesto/page.tsx
│   ├── como/page.tsx
│   └── layout.tsx        ← sidebar + layout
├── components/
│   ├── Sidebar.tsx
│   └── Entry.tsx
├── lib/
│   └── entries.ts        ← lee los .md del filesystem
└── CLAUDE.md
```

---

## Formato de cada entrada .md

```markdown
---
titulo: La realidad que creamos
estilo: normal
fecha: 2025-05-20
lang: es
---

La realidad no existe como algo fijo.

La creamos nosotros...
```

**Estilos posibles**:
- `normal` — párrafo estándar
- `xl` — texto grande, idea potente
- `italic` — duda, pregunta, tono suave
- `mono` — fragmento corto, una sola línea
- `quote` — cita con fuente

**Lang**: `es` o `gl` (gallego — aparece con marcador sutil)

---

## Cómo funciona la publicación desde el teléfono

1. Pablo le dice algo a Claude Cowork
2. Claude Cowork crea un archivo .md en /content/entradas/
3. Lo commitea via GitHub API directamente a main
4. Vercel detecta el push y despliega en ~30 segundos
5. La entrada aparece en la web

Sin abrir el ordenador. Sin tocar código.

---

## Diseño — reglas fijas, no tocar

- Color: `color-scheme light-dark` — se adapta al sistema del usuario
- Sin colores de marca
- Tipografía: Fraunces (cuerpo) + DM Mono (meta, fechas)
- Sidebar fijo izquierda en desktop, barra top en móvil
- Máximo ancho del río: 800px
- Sidebar tiene 4 links: pensamientos / quién y por qué / manifiesto / cómo está hecho
- Sin tags visibles, sin categorías, sin buscador, sin comentarios

---

## Contenido — reglas fijas, no tocar

- No hablar de servicios, precios ni consultoría
- Sin CTAs ni links de venta
- Las páginas fijas (quien, manifiesto, como) se editan manualmente en /content/paginas/
- El manifiesto lleva fecha de actualización

---

## Al hacer PR o commit directo

- Deploy automático via Vercel
- No hace falta notificación

---

## Prioridades si hay conflicto

1. Que funcione en móvil
2. Que cargue rápido
3. Que se vea bien
4. Todo lo demás
