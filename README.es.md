# 🆓 Modelos de IA gratis

[🇬🇧 Read in English](README.md)

[![Models](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FClawLabsAI%2Ffree-ai-models%2Fmain%2Fdata%2Fmodels.json&query=%24.total_free_models&label=modelos%20gratis&color=7c3aed&style=flat-square)](data/models.json)
[![Actualizado a diario](https://img.shields.io/badge/actualizado-a%20diario-4ade80?style=flat-square)](#)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-blue?style=flat-square)](LICENSE)
[![PRs bienvenidos](https://img.shields.io/badge/PRs-bienvenidos-brightgreen?style=flat-square)](CONTRIBUTING.md)

**Lista de todos los modelos de inteligencia artificial gratuitos (API de LLM gratis) disponibles ahora mismo, actualizada cada día y mantenida por la comunidad.**

Sin muros de pago. Sin API key para consultarla. Se actualiza sola cada 24 horas con GitHub Actions a partir de [OpenRouter](https://openrouter.ai), [Pollinations AI](https://pollinations.ai) y otras fuentes públicas.

### [↓ Ver la lista completa de modelos gratis](#modelos-gratis-actualizados-a-diario)

> **¿No quieres integrar una docena de proveedores tú mismo?**
>
> [**ZeroLimitAI**](https://www.zerolimitai.com/developers?utm_source=github&utm_medium=readme&utm_content=es) — creado por quienes mantienen esta lista — te da **un único endpoint compatible con OpenAI** que enruta cada petición al modelo gratuito que mejor responde en ese momento, con cambio automático cuando uno llega a su límite.
>
> [![Consigue una API key gratis](https://img.shields.io/badge/API%20key%20gratis-compatible%20con%20OpenAI-7c3aed?style=for-the-badge)](https://www.zerolimitai.com/developers?utm_source=github&utm_medium=readme&utm_content=es)
> &nbsp;
> [![O simplemente chatea](https://img.shields.io/badge/O%20simplemente%20chatea-sin%20configurar%20nada-4ade80?style=for-the-badge)](https://www.zerolimitai.com/register?utm_source=github&utm_medium=readme&utm_content=es)
>
> <sub>Key gratis · sin tarjeta · inferencia a $0 · web y precios en español, con precio para Latinoamérica — [cómo funciona ↓](#una-sola-api-para-el-modelo-que-hoy-es-el-nº-1)</sub>

---

## Por qué existe esto

El panorama de modelos de IA gratuitos cambia **cada semana**: aparecen modelos nuevos, cambian los límites de uso, hay proveedores que cierran sin avisar. Este repositorio lo sigue todo automáticamente para que tú no tengas que hacerlo.

**Sirve para:**
- Encontrar el mejor modelo gratis para lo que estés haciendo
- Ver qué proveedores ofrecen los planes gratuitos más generosos
- Enterarte de modelos nuevos con GitHub Watch → Releases
- Montar tu propia lógica de enrutado sobre datos reales y actualizados

---

## Qué contienen los datos

Cada modelo incluye:

| Campo | Descripción |
|-------|-------------|
| `id` | ID completo del modelo (p. ej. `google/gemini-2.5-flash:free`) |
| `name` | Nombre legible |
| `provider` | Quién lo ha creado |
| `context_window` | Máximo de tokens de contexto |
| `max_output` | Máximo de tokens por respuesta |
| `modalities` | texto / visión / archivos |
| `rate_limit` | Límite de uso conocido (peticiones/min o tokens/día) |
| `source` | Dónde acceder a él |
| `kind` | `chat` (salida de texto) u `other` (generadores de música, imagen o audio) |
| `zo_score` | Puntuación de calidad 0–100 relativa al mejor modelo gratuito, de [ZeroOptimize](https://www.zerolimitai.com/leaderboard); `null` si no está clasificado |
| `health` | `ok` / `sick` / `dead` — resultado de hoy del health check de producción de ZeroLimitAI; `null` si no se ha probado |

→ Datos en bruto: [`data/models.json`](data/models.json)

---

## Modelos gratis (actualizados a diario)

<!-- TABLE_START -->
> Última actualización: **Thu, 24 Sep 2026 09:07:36 UTC** · 23 modelos de chat · ordenados por puntuación [ZeroOptimize](https://www.zerolimitai.com/leaderboard) y después por contexto · los límites son del proveedor, por cuenta

| # | Modelo | Proveedor | Contexto | Salida máx. | Modalidades | Límite de uso | Puntuación | Hoy | Fuente |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Qwen: Qwen3.8 27B (free)** | Qwen | 262K | 236K | 💬 text, 🖼️ vision, video | 20 RPM · 50 RPD | 100 | ⚠️ degradado | [enlace](https://openrouter.ai/qwen/qwen3.8-27b:free) |
| 2 | **inclusionAI: Ling 3.0 Flash Fin (free)** | Inclusionai | 262K | 33K | 💬 text | 20 RPM · 50 RPD | 59 | ✅ activo | [enlace](https://openrouter.ai/inclusionai/ling-3.0-flash-fin:free) |
| 3 | **Z.ai: GLM 5.2 (free)** | Z ai | 33K | 29K | 💬 text | 20 RPM · 50 RPD | 56 | ✅ activo | [enlace](https://openrouter.ai/z-ai/glm-5.2:free) |
| 4 | **inclusionAI: Ling 3.0 Flash Sante (free)** | Inclusionai | 262K | 33K | 💬 text | 20 RPM · 50 RPD | 47 | ✅ activo | [enlace](https://openrouter.ai/inclusionai/ling-3.0-flash-sante:free) |
| 5 | **Google: Gemma 4 26B A4B  (free)** | Google | 262K | 33K | 🖼️ vision, 💬 text, video | 20 RPM · 50 RPD | 30 | ✅ activo | [enlace](https://openrouter.ai/google/gemma-4-26b-a4b-it:free) |
| 6 | **Cohere: North Mini Code (free)** | Cohere | 256K | 64K | 💬 text | 20 RPM · 50 RPD | 27 | ✅ activo | [enlace](https://openrouter.ai/cohere/north-mini-code:free) |
| 7 | **Google: Gemma 4 31B (free)** | Google | 262K | 33K | 🖼️ vision, 💬 text, video | 20 RPM · 50 RPD | 14 | ✅ activo | [enlace](https://openrouter.ai/google/gemma-4-31b-it:free) |
| 8 | **Nex AGI: Nex-N2.5-Mini (free)** <br><sub>⏳ se retira el 2026-09-25</sub> | Nex agi | 262K | 236K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | 11 | ✅ activo | [enlace](https://openrouter.ai/nex-agi/nex-n2.5-mini:free) |
| 9 | **Nex AGI: Nex-N2.5-Pro (free)** <br><sub>⏳ se retira el 2026-09-25</sub> | Nex agi | 262K | 236K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | 10 | ✅ activo | [enlace](https://openrouter.ai/nex-agi/nex-n2.5-pro:free) |
| 10 | **Dots Studio: Dots3-Note Preview (free)** <br><sub>⏳ se retira el 2026-12-31</sub> | Dots studio | 512K | 461K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | 6 | ✅ activo | [enlace](https://openrouter.ai/dots-studio/dots-3-note-preview:free) |
| 11 | **Thinking Machines: Inkling Small (free)** | Thinkingmachines | 1M | 262K | 💬 text, 🖼️ vision, audio | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/thinkingmachines/inkling-small:free) |
| 12 | **Thinking Machines: Inkling (free)** | Thinkingmachines | 1M | 262K | 💬 text, 🖼️ vision, audio | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/thinkingmachines/inkling:free) |
| 13 | **Space Bunny Alpha** <br><sub>⏳ se retira el 2098-12-31</sub> | Stealth | 1M | 524K | 💬 text, 🖼️ vision, video | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/stealth/space-bunny-alpha) |
| 14 | **NVIDIA: Nemotron 3.5 Lightning (free)** | Nvidia | 1M | 66K | 💬 text | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/nvidia/nemotron-3.5-lightning:free) |
| 15 | **NVIDIA: Nemotron 3 Ultra (free)** | Nvidia | 1M | 66K | 💬 text | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free) |
| 16 | **Poolside: Laguna S 2.1 (free)** | Poolside | 262K | 33K | 💬 text | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/poolside/laguna-s-2.1:free) |
| 17 | **Poolside: Laguna XS 2.1 (free)** | Poolside | 262K | 33K | 💬 text | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/poolside/laguna-xs-2.1:free) |
| 18 | **NVIDIA: Nemotron 3 Super (free)** | Nvidia | 262K | 236K | 💬 text | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free) |
| 19 | **NVIDIA: Nemotron 3 Nano Omni (free)** | Nvidia | 256K | 66K | 💬 text, audio, 🖼️ vision, video | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) |
| 20 | **Free Models Router** | Openrouter | 200K | — | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/openrouter/free) |
| 21 | **NVIDIA: Nemotron 3.5 Content Safety (free)** | Nvidia | 128K | 8K | 💬 text, 🖼️ vision | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/nvidia/nemotron-3.5-content-safety:free) |
| 22 | **LiquidAI: LFM2.5-2.6B (free)** | Liquid | 66K | 8K | 💬 text | 20 RPM · 50 RPD | — | — | [enlace](https://openrouter.ai/liquid/lfm-2.5-2.6b:free) |
| 23 | **GPT-OSS 20B Reasoning LLM (OVH)** | Pollinations AI | — | — | 💬 text | anonymous tier (no key) | — | — | [enlace](https://pollinations.ai) |

2 modelos gratuitos que no son de chat (generación de música, imagen o audio):

- [Google: Lyria 3 Pro Preview](https://openrouter.ai/google/lyria-3-pro-preview)
- [Google: Lyria 3 Clip Preview](https://openrouter.ai/google/lyria-3-clip-preview)
<!-- TABLE_END -->

**Cómo leer la tabla.** `Contexto` y `Salida máx.` van en tokens. `Límite de uso`
es el límite del *proveedor* para modelos gratuitos, no del modelo: en OpenRouter
pertenece a la cuenta y es idéntico para cualquier id `:free`. `Puntuación` es la
calidad según ZeroOptimize (0-100, relativa al mejor modelo gratuito de hoy) y
`Hoy` es el resultado de una comprobación real en producción, no una página de estado.

| Término | Significado |
|---------|-------------|
| RPM | Peticiones por minuto |
| RPD | Peticiones por día |
| TPM | Tokens por minuto |
| TPD | Tokens por día |

Las condiciones de cada proveedor, con su enlace, están en la
[tabla de proveedores del README en inglés](README.md#where-to-call-these-models).

---

## Cómo funciona el seguimiento

```
GitHub Actions (cada día a las 04:00 UTC)
         │
         ▼
  fetch-models.js
         │
         ├── GET openrouter.ai/api/v1/models  (sin autenticación)
         │   └── filtro: pricing.prompt === "0"
         │
         ├── Lista estática: Pollinations AI, etc.
         │
         └── Escribe:
             ├── data/models.json       ← instantánea actual
             ├── data/history/AAAA-MM-DD.json
             ├── README.md              ← tabla regenerada (inglés)
             └── README.es.md           ← tabla regenerada (español)
```

Sin scraping ni ingeniería inversa: solo APIs públicas y oficiales.

---

## Una sola API para el modelo que hoy es el nº 1

Seguir la lista es la parte fácil. Lo difícil es mantener tu aplicación apuntando al mejor modelo gratuito del momento, con límites que cambian y proveedores que van y vienen.

**[ZeroLimitAI](https://www.zerolimitai.com/developers?utm_source=github&utm_medium=readme&utm_content=es)** lo hace por ti con un endpoint **compatible con OpenAI**. Envía `model: "auto"` y ZeroOptimize™ enruta cada petición al modelo gratuito mejor clasificado disponible, con cambio automático cuando uno se queda sin cuota. Cambia dos líneas, paga $0:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.zerolimitai.com/api/v1",
    api_key="TU_KEY_GRATIS",
)

# ZeroOptimize™ elige el mejor modelo gratuito de esta lista, en cada petición
resp = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "¡Hola!"}],
)
print(resp.choices[0].message.content)
```

Funciona sin cambios con Cline, Roo Code, Continue, Aider, Open WebUI y LangChain: pon la `base_url`, tu key y `auto` como modelo.

[![API key gratis](https://img.shields.io/badge/API%20key%20gratis-compatible%20con%20OpenAI-7c3aed?style=for-the-badge)](https://www.zerolimitai.com/developers?utm_source=github&utm_medium=readme&utm_content=es)
&nbsp;
[![Probar el chat](https://img.shields.io/badge/O%20simplemente%20chatea-sin%20configurar%20nada-4ade80?style=for-the-badge)](https://www.zerolimitai.com/register?utm_source=github&utm_medium=readme&utm_content=es)

---

## Por qué el router responde muchas veces con un modelo que no está en esta página

Si usas ese endpoint y miras qué modelo ha contestado, a menudo será uno que no encuentras en la tabla de arriba. Es lo esperado, y es justo la gracia.

**Este repo responde a "¿qué modelos gratuitos existen?"** Lee los catálogos públicos — la API de OpenRouter y Pollinations — una vez al día y lista todo lo que cuesta $0. Es un catálogo.

**El router responde a "¿cuál de ellos va a contestar de verdad, ahora mismo?"** Puntúa cada candidato con [ZeroOptimize v3](https://www.zerolimitai.com/leaderboard) — índices de benchmark publicados y valoraciones de LM Arena para la calidad, y después contexto, techo de salida, soporte de herramientas y su propia latencia en producción — y descarta los que empiezan a fallar, probando el siguiente automáticamente.

Las dos listas se separan por dos motivos: **fuentes distintas y preguntas distintas.** Un modelo puede estar en esta página y ser inutilizable hoy: con el límite reducido a nada, renombrado sin avisar, o con un endpoint que ha dejado de servir. Descubrirlo es lo que te cuesta una tarde, y es la parte que merece la pena automatizar.

Usa esta lista para ver el panorama. Usa el router cuando prefieras no mantener la fontanería tú mismo.

---

## Contribuir

¿Falta un modelo gratuito? Abre un PR editando `EXTRA_PROVIDERS` en [`scripts/fetch-models.js`](scripts/fetch-models.js).

**Criterios:**
- El modelo debe ser gratuito de verdad (sin costes ocultos, sin "solo prueba")
- Debe tener un endpoint de API público
- Incluye el límite de uso si lo conoces

Más detalles en [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Quién lo mantiene

Este rastreador lo construye y mantiene al día el equipo de [**ZeroLimitAI**](https://www.zerolimitai.com/?utm_source=github&utm_medium=readme&utm_content=es), una plataforma de IA multimodelo cuyo router — ZeroOptimize™ — funciona exactamente con estos datos. Tener la lista al día no es un proyecto secundario para nosotros: es de lo que depende nuestro propio producto cada día.

Los datos siguen siendo libres, con licencia MIT y neutrales respecto a proveedores. Si un modelo debe estar aquí, entra, lo enrutemos nosotros o no.

---

## Proyectos relacionados

- [openrouter.ai](https://openrouter.ai) — pasarela de API para más de 200 modelos
- [lmarena.ai](https://lmarena.ai) — arena de LLMs y ranking ELO
- [ZeroLimitAI](https://www.zerolimitai.com/?utm_source=github&utm_medium=readme&utm_content=es) — chat de IA gratis + una API compatible con OpenAI que enruta entre estos modelos

---

## Licencia

MIT — úsalo libremente; se agradece la atribución.

---

<div align="center">
<sub>Mantenido por <a href="https://www.zerolimitai.com/?utm_source=github&utm_medium=readme&utm_content=es"><b>ZeroLimitAI</b></a> ·
<a href="https://www.zerolimitai.com/developers?utm_source=github&utm_medium=readme&utm_content=es">API gratis</a> ·
<a href="https://www.zerolimitai.com/register?utm_source=github&utm_medium=readme&utm_content=es">Probar el chat</a></sub>
</div>
