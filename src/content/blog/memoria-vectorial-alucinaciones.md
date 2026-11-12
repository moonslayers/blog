---
title: "La memoria vectorial no me sirvió para frenar las alucinaciones de mis agentes"
description: "La memoria vectorial envenenó a mis agentes: una alucinación se guardó como patrón. Cómo recuperé el control con skills versionadas y human-in-the-loop."
date: 2026-10-31
tags: ["agentes", "memoria", "ia", "opencode"]
cover: /images/posts/memoria-vectorial.jpg
coverAlt: "Red de cubos translúcidos conectados sobre fondo oscuro, con aberración cromática"
author: "Jorge Marquez"
---

La memoria vectorial no me sirvió para frenar las alucinaciones de mis agentes. Esto hice en su lugar.

El problema no es que la memoria vectorial guarde alucinaciones. Es que no puedes saber cuál es cuál. Eso es memory poisoning, y esto es lo que hice para recuperar el control.

## El problema

Hace unos días trabajaba en un proyecto y me di cuenta que tras largas sesiones de código con OpenCode, mis agentes empezaban a alucinar alrededor de los 300 mil tokens de contexto de sesión.

Además tenía otro problema: si le pedía a dos o tres agentes la misma tarea, todos podrían completarla usando una solución completamente diferente, siguiendo enfoques o arquitecturas diferentes. Algunos tal vez investigaban el proyecto y seguían patrones vistos en otras partes, pero no había garantía de nada.

## La solución propuesta por internet

Investigando el tema, todo el mundo en internet proponía lo mismo: usar una memoria vectorial compartida entre todos los agentes para mejorar sus recuerdos.

Así que descargué un plugin de OpenCode —tickernelz/opencode-mem—, lo configuré con una base vectorial local y le asigné un endpoint dedicado a mi proveedor de IA habitual para crear y actualizar las memorias. Desplegué varios agentes en paralelo y empecé a ver cómo se generaban memorias. Al principio no noté ningún cambio, pero cuando corregía cosas o tomaba decisiones de arquitectura, esas decisiones quedaban registradas en la memoria de todos los agentes. Parecía que resolvía mi problema inicial.

## Memory poisoning

Hasta que un día un subagente empezó a alucinar… y partes de sus alucinaciones se guardaron en la memoria compartida como si fueran patrones correctos. Otros agentes siguieron esos patrones y empezaron a hacer cosas que nunca les había pedido.

Eso tiene nombre: memory poisoning. Una alucinación escrita de vuelta en la memoria como un hecho, que luego otros agentes recuperan como verdad.

Le pregunté a uno por qué lo había hecho y me respondió que "sus memorias se lo indicaban". Le pregunté quién había escrito esa memoria y cuándo. No supo decírmelo.

Ahí lo vi claro: mi base vectorial de memorias era una caja negra. No era auditable y no tenía control sobre lo que se escribía en ella, fuera bueno o malo.

> Mi base vectorial de memorias era una caja negra: no era auditable y no tenía control sobre lo que se escribía en ella.

## Lo que hice en su lugar

Desactivé el plugin y decidí centrarme en otra estrategia: escribir skills o pedirle a los agentes, al terminar cada sesión, que documentaran en skills (o actualizaran las existentes) todo lo aprendido durante la sesión, y que lo commitearan al repositorio. Así el conocimiento sobre patrones técnicos y del proyecto quedaba versionado y bajo mi control.

Pero apareció otro problema: los agentes podían decidir arbitrariamente no cargar ni invocar los skills, y volvíamos al punto de partida. Ahí entendí algo nuevo: los agentes no tienen criterio propio para decidir cuándo invocar un skill, a menos que se lo pidas explícitamente.

Así que cambié el flujo de trabajo:

- Al inicio de cada tarea, le pedía a un agente que revisara qué skills relevantes existían, las cargara, y que investigara lo que no estuviera documentado. Si tenía dudas, que me preguntara al final.
- Al terminar la sesión, le pedía que documentara en skills lo necesario, creara nuevas o eliminara las obsoletas —pero sin decidir por su cuenta. Debía presentarme sus propuestas de actualización y yo decidía qué se hacía.

> Ese "yo decido qué se escribe y qué no" es human-in-the-loop aplicado a la memoria del agente. No es burocracia: es el control que evita que una alucinación se convierta en política.

Mi problema se solucionó.

## Conclusión

La conclusión que saqué: las bases vectoriales funcionan bien para documentación o información que no se audita ni evoluciona demasiado. Pero cosas como reglas de negocio o decisiones de arquitectura no pueden vivir ahí, porque tienen que ser transparentes ante cualquier problema.

La memoria de un agente no puede ser una caja negra. Sin governance layer, una vector DB es un agujero negro de decisiones: no sabes qué entró, quién lo aprobó, ni por qué.

Si trabajas con OpenCode, Claude Code o agentes similares, dime cómo versionas tú el conocimiento de tus agentes.
