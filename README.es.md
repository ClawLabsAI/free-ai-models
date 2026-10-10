# APIs de IA gratuitas, ordenadas cada día

[🇬🇧 Read in English](README.md)

[![Modelos gratuitos](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FClawLabsAI%2Ffree-ai-models%2Fmain%2Fdata%2Fmodels.json&query=%24.total_free_models&label=modelos%20gratuitos&color=7c3aed&style=flat-square)](data/models.json)
[![Actualizado a diario](https://img.shields.io/badge/actualizado-a%20diario-4ade80?style=flat-square)](.github/workflows/update.yml)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-blue?style=flat-square)](LICENSE)

**Todas las APIs de modelos de lenguaje gratuitas que se pueden leer de una
fuente pública, ordenadas cada día con una puntuación de calidad abierta, y con
quién sirve de verdad cada modelo y si puede entrenar con tus prompts.**

Tres cosas que esta lista hace y una simple lista de modelos gratis no:

- **Ordena por calidad medida.** Índices de benchmarks publicados y valoraciones
  de LM Arena, combinados por [un único fichero](scoring/score.js) que puedes
  leer y volver a ejecutar. Ni orden alfabético, ni por contexto, ni a mano.
- **Te dice quién recibe tus prompts.** Un modelo gratuito lo sirve muchas veces
  un proveedor con una política de datos distinta de la del laboratorio que lo
  creó. Cada fila indica si ese proveedor puede entrenar con lo que envías y
  cuánto tiempo lo guarda.
- **Son datos, no solo una página.** [`data/models.json`](data/models.json) se
  regenera a diario con cada puntuación y cada dato del que sale, y en
  [`data/history/`](data/history) queda una copia de cada día.

No hace falta ninguna clave para leerlo. Sin scraping: solo APIs públicas y oficiales.

---

## Modelos gratis (actualizados a diario)

<!-- TABLE_START -->
> Última actualización: **Sat, 10 Oct 2026 09:22:19 UTC** · 16 modelos de chat gratuitos · ordenados por la [puntuación abierta](scoring/) de este repo · los límites gratuitos son del proveedor, por cuenta
>
> **5 de los 10 mejores de hoy** solo los sirven proveedores que pueden entrenar con tus prompts.

| # | Modelo | Puntuación | Medido con | ¿Entrena con tus prompts? | Contexto | Salida máx. | Tools | Entrada | Hoy | Fuente |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **Thinking Machines: Inkling** | 68 | benchmarks + Arena | 🔴 puede entrenar | 1M | 262K | ✓ | 🖼️ vision, audio | — | [enlace](https://openrouter.ai/thinkingmachines/inkling:free) |
| 2 | **NVIDIA: Nemotron 3 Ultra** | 66 | benchmarks + Arena | 🔴 puede entrenar | 1M | 66K | ✓ | 💬 text | — | [enlace](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free) |
| 3 | **inclusionAI: Ling 3.1 Flash** | 65 | benchmarks | ✅ no · retención cero | 262K | 33K | ✓ | 💬 text | — | [enlace](https://openrouter.ai/inclusionai/ling-3.1-flash) |
| 4 | **Thinking Machines: Inkling Small** | 65 | benchmarks + Arena | 🔴 puede entrenar | 1M | 262K | ✓ | 🖼️ vision, audio | — | [enlace](https://openrouter.ai/thinkingmachines/inkling-small:free) |
| 5 | **Google: Gemma 4 31B** | 57 | benchmarks + Arena | ✅ no · guarda 55 días | 262K | 33K | ✓ | 🖼️ vision, video | ▶ respondiendo | [enlace](https://openrouter.ai/google/gemma-4-31b-it:free) |
| 6 | **Google: Gemma 4 26B A4B** | 55 | benchmarks + Arena | ✅ no · guarda 55 días | 262K | 33K | ✓ | 🖼️ vision, video | ✅ activo | [enlace](https://openrouter.ai/google/gemma-4-26b-a4b-it:free) |
| 7 | **NVIDIA: Nemotron 3 Super** | 46 | benchmarks + Arena | 🔴 puede entrenar | 262K | 236K | ✓ | 💬 text | — | [enlace](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free) |
| 8 | **NVIDIA: Nemotron 3.5 Lightning** | 36 | benchmarks + Arena | 🔴 puede entrenar | 1M | 66K | ✓ | 💬 text | — | [enlace](https://openrouter.ai/nvidia/nemotron-3.5-lightning:free) |
| 9 | **Poolside: Laguna S 2.1** <br><sub>⏳ se retira el 2026-10-31</sub> | 34 | estimación (tamaño) | ✅ no · retención desconocida | 262K | 33K | ✓ | 💬 text | — | [enlace](https://openrouter.ai/poolside/laguna-s-2.1:free) |
| 10 | **Poolside: Laguna XS 2.1** <br><sub>⏳ se retira el 2026-10-31</sub> | 26 | estimación (tamaño) | ✅ no · retención desconocida | 262K | 33K | ✓ | 💬 text | — | [enlace](https://openrouter.ai/poolside/laguna-xs-2.1:free) |
| 11 | **Cohere: North Mini Code** | 23 | benchmarks | ✅ no · guarda 30 días | 256K | 64K | ✓ | 💬 text | ✅ activo | [enlace](https://openrouter.ai/cohere/north-mini-code:free) |
| 12 | **NVIDIA: Nemotron 3 Nano Omni** | 15 | benchmarks | 🔴 puede entrenar | 256K | 66K | ✓ | audio, 🖼️ vision, video | — | [enlace](https://openrouter.ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) |
| 13 | **Apodex: Apodex 1.1 Mini** | 13 | estimación (tamaño) | ✅ no · retención cero | 262K | 236K | ✓ | 💬 text | ✅ activo | [enlace](https://openrouter.ai/apodex/apodex-1.1-mini:free) |
| 14 | **Dots Studio: Dots3-Note Preview** <br><sub>⏳ se retira el 2026-12-31</sub> | 13 | estimación (tamaño) | ✅ no · retención desconocida | 512K | 461K | ✓ | 🖼️ vision | ✅ activo | [enlace](https://openrouter.ai/dots-studio/dots-3-note-preview:free) |
| 15 | **LiquidAI: LFM2.5-2.6B** | 9 | benchmarks | 🔴 puede entrenar | 66K | 8K | ✓ | 💬 text | — | [enlace](https://openrouter.ai/liquid/lfm-2.5-2.6b:free) |
| 16 | **GPT-OSS 20B Reasoning LLM (OVH)** | — | — | — | — | — | — | 💬 text | — | [enlace](https://pollinations.ai) |

3 modelos gratuitos que no son de chat (música, imagen, audio, clasificadores):

- [Google: Lyria 3 Pro Preview](https://openrouter.ai/google/lyria-3-pro-preview)
- [Google: Lyria 3 Clip Preview](https://openrouter.ai/google/lyria-3-clip-preview)
- [NVIDIA: Nemotron 3.5 Content Safety (free)](https://openrouter.ai/nvidia/nemotron-3.5-content-safety:free)
<!-- TABLE_END -->

**Cómo leer la tabla**

- **Puntuación**: de 0 a 100, calculada por [`scoring/score.js`](scoring/score.js).
  100 sería un modelo gratuito tan bueno como el mejor que se vende; ninguno se acerca.
- **Medido con**: en qué se apoya la nota. `benchmarks + Arena` es la base más
  sólida; una sola de las dos se descuenta; una `estimación` significa que nadie
  ha medido aún el modelo, y tiene un tope para que no supere a uno medido.
- **¿Entrena con tus prompts?**: la política del proveedor que *sirve el endpoint
  gratuito en OpenRouter*, según la
  [tabla de proveedores de OpenRouter](https://openrouter.ai/docs/guides/privacy/provider-logging)
  (leída a mano por última vez el 10-oct-2026), y cuánto tiempo guarda los
  prompts. `—` significa que no lo hemos podido establecer; no lo suponemos.
- **Hoy**: si el endpoint gratuito está respondiendo. Una GitHub Action no tiene
  tráfico para saberlo, así que esta columna viene de las comprobaciones en
  producción del router de [ZeroLimitAI](https://www.zerolimitai.com), que
  mantiene el mismo equipo que este repo. Solo comprueba los modelos a los que
  enruta, y no enruta a proveedores que pueden entrenar: esas filas muestran `—`.
- **⏳ se retira**: el proveedor ha publicado una fecha de cierre. El modelo
  funciona hoy y deja de hacerlo ese día sin más aviso.

Los límites gratuitos son del proveedor y van por cuenta, no por modelo: en
OpenRouter todos los id `:free` comparten 20 peticiones por minuto y 50 al día
(1.000 al día si la cuenta ha comprado 10 $ en créditos). Crear más claves o
más cuentas no los amplía
([límites de OpenRouter](https://openrouter.ai/docs/api-reference/limits), comprobado el 10-oct-2026).
Los modelos de [Pollinations](https://pollinations.ai) (nivel anónimo, sin
clave) aparecen sin puntuar: no hay datos públicos de benchmarks para ellos.

### Sobre la columna de uso de datos

La inferencia gratuita es gratuita porque alguien recibe algo a cambio, y a
veces ese algo son tus prompts. Si te importa o no es decisión tuya; lo
importante es saberlo antes de enviar los datos de un cliente.

- La columna describe el **endpoint gratuito en OpenRouter**. El mismo modelo
  llamado en otro sitio se rige por las condiciones de ese proveedor, que pueden
  ser distintas. Lee las condiciones de donde lo llames.
- OpenRouter presenta su tabla como su mejor conocimiento de la política de cada
  proveedor, no como una fuente definitiva. Este repo la copia para los
  proveedores que sirven modelos gratuitos
  ([`scoring/sources.js`](scoring/sources.js), con la fecha de lectura). Si una
  fila está mal, [abre una incidencia](../../issues/new/choose).
- En OpenRouter puedes rechazar a esos proveedores en cada petición:

```json
{
  "model": "google/gemma-4-31b-it:free",
  "provider": { "data_collection": "deny" },
  "messages": [{ "role": "user", "content": "¡Hola!" }]
}
```

---

## Usar los datos

El fichero es JSON en una URL estable:

```
https://raw.githubusercontent.com/ClawLabsAI/free-ai-models/main/data/models.json
```

El mejor modelo gratuito de hoy que admite tools y que no sirve un proveedor
que puede entrenar:

```bash
curl -s https://raw.githubusercontent.com/ClawLabsAI/free-ai-models/main/data/models.json \
  | jq -r '[.models[] | select(.rank and .supports_tools and .data_use == "no-training")][0].id'
```

```js
const { models } = await (await fetch(
  "https://raw.githubusercontent.com/ClawLabsAI/free-ai-models/main/data/models.json",
)).json();

// Cadena de reserva: ordenados, con tools, sin entrenamiento, el mejor primero.
const chain = models
  .filter((m) => m.rank && m.supports_tools && m.data_use === "no-training")
  .map((m) => m.id);
```

Los id son los de OpenRouter, así que sirven tal cual en cualquier sitio que
acepte uno: los SDK de OpenAI apuntando a OpenRouter, LiteLLM
(`openrouter/<id>`) y herramientas como Cline, Roo Code, Continue, Aider u
OpenCode. La lista completa de campos está en el
[README en inglés](README.md#fields).

---

## Cómo funciona la puntuación

Todo el método está en [`scoring/score.js`](scoring/score.js) (puro: sin red ni
reloj) y sus datos vienen de [`scoring/sources.js`](scoring/sources.js). La
explicación larga, con cada peso y su porqué, está en
[`scoring/README.md`](scoring/README.md) (en inglés). En resumen:

1. **Benchmarks**: índices de inteligencia, programación y agentes de Artificial
   Analysis, normalizados al mejor modelo de todo el catálogo, de pago incluidos.
   Un índice que falta se estima con descuento, nunca se descarta: publicar menos
   datos no puede subir la nota.
2. **Preferencia**: valoraciones de LM Arena (general, programación y seguimiento
   de instrucciones).
3. Con las dos, se mezclan al 55/45; con una sola, se descuenta un 8 %.
4. **Sin ninguna medida**: el modelo hereda el 80 % de un hermano medido de su
   familia, o recibe una estimación por su tamaño real y sus descargas, con un
   tope por debajo de cualquier modelo bien medido.
5. **Aptitud**: factores pequeños por lo que importa al construir sobre un
   modelo: contexto menor de 32K, salida menor de 4K, sin tools, fecha de cierre
   en menos de una semana.

Que un modelo esté respondiendo *ahora mismo* queda fuera de la nota a
propósito: un modelo saturado esta hora sigue siendo el mejor modelo.

```bash
git clone https://github.com/ClawLabsAI/free-ai-models && cd free-ai-models
npm ci
npm test          # las reglas de la puntuación
npm run update    # reconstruye el ranking de hoy desde las fuentes públicas
```

¿No estás de acuerdo con un peso? Cámbialo, ejecútalo y abre un pull request con
el ranking que produce. Para eso está el fichero.

---

## Dónde llamar a estos modelos

| Proveedor | URL base | Nivel gratuito | Clave |
|---|---|---|---|
| [OpenRouter](https://openrouter.ai/keys) | `https://openrouter.ai/api/v1` | Todos los modelos `:free`: 20 por minuto y 50 al día por cuenta (1.000 al día con 10 $ en créditos) | Sí, sin tarjeta |
| [Pollinations](https://pollinations.ai) | `https://text.pollinations.ai` | Nivel anónimo, lista de modelos cambiante | Sin clave |
| [Groq](https://console.groq.com/keys) | `https://api.groq.com/openai/v1` | Plan gratuito, límites por modelo ([tabla publicada](https://console.groq.com/docs/rate-limits)) | Sí, sin tarjeta |
| [Google AI Studio](https://aistudio.google.com/app/apikey) | `https://generativelanguage.googleapis.com/v1beta/openai` | Nivel gratuito por modelo ([límites publicados](https://ai.google.dev/gemini-api/docs/rate-limits)) | Sí, sin tarjeta |
| [Cerebras](https://cloud.cerebras.ai) | `https://api.cerebras.ai/v1` | Nivel gratuito ([límites publicados](https://inference-docs.cerebras.ai/support/rate-limits)) | Sí |
| [Cloudflare Workers AI](https://dash.cloudflare.com/profile/api-tokens) | `https://api.cloudflare.com/client/v4/accounts/{id}/ai/v1` | 10.000 neuronas al día entre todos los modelos ([precios](https://developers.cloudflare.com/workers-ai/platform/pricing/)) | Sí |

Solo hemos verificado nosotros los límites de OpenRouter y de Pollinations; para
el resto, la página del proveedor es la fuente de verdad. Los niveles gratuitos
están pensados para construir y probar: lee las condiciones de cada proveedor
antes de poner uno detrás de un producto.

---

## Contribuir

- **Falta un modelo o una fila está mal**: se lee de la API del propio proveedor,
  así que suele corregirse solo en un día. Si no,
  [abre una incidencia](../../issues/new/choose).
- **Un proveedor nuevo**: bienvenido si se puede leer igual, en vivo y desde su
  API pública. Mira [CONTRIBUTING.md](CONTRIBUTING.md).
- **La puntuación**: un pull request que cambie un peso debe decir qué ranking
  produce el cambio y por qué es mejor.

Para recibir un resumen semanal en vez de un commit diario: Watch → Custom →
**Releases**.

---

## Quién lo mantiene

El equipo de [ZeroLimitAI](https://www.zerolimitai.com), una app y una API
alojadas cuyo router ordena los modelos gratuitos con esta misma función.
Mantenemos la lista al día porque nuestro producto depende de ella; la lista en
sí es MIT, neutral con los proveedores y útil sin nosotros: un modelo entra
aquí tanto si enrutamos a él como si no, y a varios de los mejor puntuados no lo
hacemos.

## Proyectos relacionados

- [awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis): un catálogo más amplio, mantenido a mano, de proveedores con nivel gratuito
- [FreeLLMAPI](https://github.com/tashfeenahmed/freellmapi) y [free-claude-code](https://github.com/Alishahryar1/free-claude-code): routers para instalar uno mismo que suman niveles gratuitos con tus propias claves
- [LiteLLM](https://github.com/BerriAI/litellm): un SDK y un proxy para todos los proveedores
- [LM Arena](https://lmarena.ai) y [Artificial Analysis](https://artificialanalysis.ai): de donde salen las medidas

## Licencia

MIT. Úsalo libremente; se agradece la atribución.
