---
title: "Mi agente cargó más de 100 mil tokens de contexto en skills, esto hice para arreglarlo"
description: "Skill bloat: cuando tu agente carga más de 100k tokens en skills. Taxonomía de 4 antipatrones y el límite de 10 archivos que encontré por accidente."
date: 2026-11-09
tags: ["agentes", "skills", "contexto", "ia", "opencode"]
cover: /images/posts/skill-bloat.jpg
coverAlt: "Pila de documentos con decenas de post-its de colores en los bordes"
author: "Jorge Marquez"
---

Mi agente cargó más de 100 mil tokens de contexto en skills, esto hice para arreglarlo.

Cuando tu agente carga más de 100 mil tokens de contexto en skills se le llama skill bloat. La taxonomía de 4 antipatrones, cómo los corregí y el límite de 10 archivos que encontré por accidente.

## El contexto

Inicié mi sesión de coding como siempre, envié mi primer prompt. Mi agente invocó como 10 skills. El contexto de pronto subió a 104 mil tokens sin haber generado ni una sola línea de código. Al leer las skills invocadas: varias de ellas no eran del módulo que quería trabajar, para colmo.

Ahí me di cuenta de que algo estaba mal con mis skills.

Todo empezó esa mañana: un cliente me pidió un cambio en unos contratos generados a través de un sistema de créditos que mantengo actualmente. El año pasado y el antepasado todavía lo actualizaba a mano, un json monolítico.

Este año decidí hacerlo con agentes: un módulo configurable versionado, con herencia y editor enriquecido. Una chulada.

Envié el primer prompt esperando lo mejor y algo llamó la atención.

## El terrible descubrimiento

En cuanto mencioné un módulo de contratos nuevos con versiones, mi agente invocó una skill llamada historial-cambios-timeline y otras cuantas más. De golpe el contexto subió a 104 mil tokens.

Entré a leer esa skill y era sobre un timeline, un componente de otro módulo, no era conocimiento de algo global, y el nombre era engañoso. Si es un módulo debería llamarse historial-cambios-timeline-modulo para que cualquiera sepa que es conocimiento de un módulo específico y no algo general.

Su nombre y descripción eran tan vagos que podrían aplicar a cualquier cosa con "historial de cambios".

Le pregunté a mi agente de IA por qué había invocado esa skill y llegó a la misma conclusión que yo: el nombre y la descripción son vagos.

Una skill que documenta todo pero no explica nada. O un nombre tan vago que podría aplicar a cinco módulos distintos. El agente no sabe cuál cargar, así que carga todos.

Al auditar el resto de mis skills descubrí que no era un caso aislado. Era una taxonomía de cuatro patrones que se repetían por todo mi repositorio.

## La taxonomía de cuatro antipatrones

### 1. God Skill

Una skill que abarca una sección inmensa del sistema. Intenta explicarlo todo y no explica nada. O si lo hace, es a costa de gran parte del contexto de la sesión. El agente la carga sin saber que se come un monolítico para necesitar una pequeña parte de él.

### 2. Inventory Skill

Una skill que solo lista archivos. Una lista interminable de rutas de archivos que el agente termina visitando una por una para luego decidir qué necesita de ellas. No documenta: indexa sin explicaciones. Y el agente paga el costo de releer cada archivo cada vez que quiere entender.

### 3. GA Skill (General Architecture Skill / Fake AGENTS.md)

Una skill que documenta la arquitectura general del proyecto, las herramientas y comandos de desarrollo. Eso no va en una skill: eso va en AGENTS.md. Si se debe cargar siempre, lo ponemos en AGENTS.md; si se debe cargar a veces, va en una skill.

### 4. Vague Skill

Nombres y descripciones que podrían aplicar a varios módulos, secciones o incluso al proyecto entero. Por ejemplo, una skill llamada form-wizard-architecture. Si tienes cinco wizards en el proyecto, ¿a cuál se refiere? Ni tú ni el agente lo saben. El agente la carga por si acaso.

## Cómo lo arreglé

No se trata sólo de ser más quisquilloso con los nombres. Se trata de prevenir y corregir (antes de lamentar por mis tokens quemados).

Prevenir: modifiqué mi comando skill review, que forma parte de mi flujo de trabajo agéntico, para que detecte estos cuatro antipatrones antes de que una skill llegue al repositorio.

Corregir: creé un comando nuevo que audita mis skills en repos existentes. Identifica los patrones, lista skills afectadas, propone correcciones y espera mi aprobación y decisión —human-in-the-loop hasta el final.

## Lo que dice la industria (y lo que descubrí)

Leyendo sobre el tema, leí que Anthropic propone que skill.md funcione como un router: el archivo principal solo enruta y el conocimiento vive en un subfolder refs/. Otras personas añaden que también se pueden crear más subfolders como scripts/. La regla que se repite es que no haya más de un nivel de profundidad dentro de refs/, solo archivos finales. Nada de subcarpetas anidadas porque los agentes tienden a quedarse en el primer subnivel.

Al ponerlo en práctica descubrí algo que no había leído en ningún sitio:

Cuando los agentes cargan una skill y usan bash o el tool para listar directorios para leer dentro de refs/, por defecto solo les muestra los primeros 10. No ven el resto. Los archivos existen, pero la mayoría de agentes solo consultan los primeros 10.

Por eso adopté un nuevo estándar: si una skill necesita más de 10 referencias, es señal de que debe crearse otra skill, no otra referencia.

> Los agentes solo ven los primeros 10 archivos dentro de la carpeta de referencias en skills, por lo que tener más de 10 referencias en una skill es señal de necesitar otra skill, no otra referencia.

## Mis reflexiones

Las skills no son documentación. Son contexto operativo vivo de un sistema que decide con presupuesto limitado.

Y digo limitado porque los agentes tienden a alucinar y comportarse peor en sesiones con mucho contexto en uso.

Si no las gobiernas, tus agentes seguirán quemando tokens y eventualmente se comportarán peor que si no las usaras.

El año pasado todavía programaba a mano. Este año tengo agentes que lo hacen por mí, y el trabajo nunca fue escribir código: fue gobernar el contexto, el contexto que me da el cliente a mí o el que yo le doy a mis agentes.

Al final, nunca se trató de contexto, siempre fue sobre la ingeniería.

¿Has encontrado otros patrones de skill bloat? Los que más me interesan son los que aún no puedo nombrar.
