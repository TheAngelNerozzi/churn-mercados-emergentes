# Insights Clave: Triangulación Cuantitativo-Cualitativa
## Síntesis de hallazgos del estudio de churn

---

## 1. RESUMEN EJECUTIVO

Este documento sintetiza los hallazgos del análisis cuantitativo (dataset Telco Customer Churn, n=7,043) 
con los insights cualitativos de 5 entrevistas a comerciantes venezolanos. La triangulación revela 
patrones que trascienden el contexto específico y son aplicables al diseño de productos fintech 
en mercados emergentes.

### Hallazgo central:
> **El churn en mercados emergentes no es función de precio o features. 
> La desconfianza institucional y la opacidad en procesos son predictores críticos.**

---

## 2. INSIGHTS POR DIMENSIÓN

### 2.1 TENURE Y VENTANA CRÍTICA

#### Datos cuantitativos:
| Grupo de tenure | Tasa de churn | Observación |
|-----------------|---------------|-------------|
| 0-12 meses | 47.4% | Crítico |
| 12-24 meses | 28.8% | Alto |
| 24-48 meses | 21.6% | Moderado |
| 48+ meses | 9.3% | Bajo |

**Hallazgo clave:** El 47% de clientes en los primeros 12 meses abandona. La mediana de supervivencia 
para contratos mensuales es ~10 meses.

#### Datos cualitativos:
| Participante | Tiempo hasta abandono | Trigger mencionado |
|--------------|----------------------|-------------------|
| María | 8 meses | Incidente no resuelto |
| Carlos | 14 meses | Falla sin comunicación |
| Ana | 5 meses | Reglas ocultas descubiertas |
| José | 6 meses | Cambio de interfaz |
| Luisa | 4 meses | Problema de canje no resuelto |

**Hallazgo clave:** 60% abandonó en los primeros 6 meses. El momento de abandono coincide con 
un "incidente acumulativo" que rompe la confianza.

#### Triangulación:
**El modelo cuantitativo identifica CUÁNDO (meses 6-10), las entrevistas explican POR QUÉ 
(acumulación de incidentes sin explicación clara).**

La curva de supervivencia muestra una caída pronunciada entre meses 3-12. Las entrevistas 
revelan que durante este período, los usuarios están evaluando activamente si la herramienta 
"vale la pena el estrés". Cada incidente opaco reduce este pool de "buena voluntad".

**Implicación de producto:** La intervención debe ser PROACTIVA en meses 3-6, no REACTIVA en mes 10+. 
Es más efectivo prevenir la erosión de confianza que recuperar un usuario ya desconfiado.

---

### 2.2 CONTRATO Y COMPROMISO

#### Datos cuantitativos:
| Tipo de contrato | Tasa de churn | Riesgo relativo |
|------------------|---------------|-----------------|
| Month-to-month | 42.7% | 3.2x |
| One year | 11.3% | 0.8x |
| Two year | 2.8% | 0.2x |

**Hallazgo clave:** Contratos mensuales tienen riesgo de abandono 3x mayor. El compromiso inicial 
reduce dramáticamente el churn.

#### Datos cualitativos:
Ningún participante mencionó el tipo de "contrato" directamente, pero todos hablaron de 
"compromiso" en términos emocionales:

> "Yo pensaba que éramos socios" - Ana
> "Me sentí engañada" - María
> "Trátame como adulto, no como tonto" - Carlos

**Hallazgo clave:** La percepción de "compromiso bilateral" es más importante que el contrato formal. 
Cuando los usuarios sienten que la empresa no está igualmente comprometida (cambios sin aviso, 
reglas ocultas), el contrato emocional se rompe.

#### Triangulación:
**Los contratos largos reducen churn, pero no solo por barreras de salida. Crean un período de 
"luna de miel" donde ambas partes están más dispuestas a invertir en la relación.**

En mercados de alta desconfianza, el contrato es una señal de compromiso. Pero si la empresa 
viola el "contrato emocional" (opacidad, cambios unilaterales), el contrato formal se vuelve 
inverso: el usuario se siente atrapado y resentido.

**Implicación de producto:** Los incentivos de largo plazo deben ir acompañados de señales de 
compromiso bilateral: comunicación transparente, policies claras, y sobre todo, consistencia 
en el trato.

---

### 2.3 CARGOS Y VALOR PERCIBIDO

#### Datos cuantitativos:
| Grupo | Cargo mensual promedio |
|-------|------------------------|
| Churners | $74.44 |
| No-churners | $61.27 |
| Diferencia | +21.5% |

**Hallazgo clave:** Los churners pagan MÁS, no menos. El churn no es función de precio, 
sino de valor percibido.

#### Datos cualitativas:
| Participante | Problema de precio | Problema de valor |
|--------------|-------------------|-------------------|
| María | No | Sí - "no sabía a quién creerle" |
| Carlos | Sí (subidas sin explicación) | Sí - "¿qué mejoras?" |
| Ana | No (era transparente) | Sí - "reglas ocultas" |
| José | No | Sí - "cambio sin soporte" |
| Luisa | No | Sí - "prometía más de lo que daba" |

**Hallazgo clave:** Solo 1 de 5 mencionó precio como factor primario. Todos mencionaron 
transparencia/valor como factor.

#### Triangulación:
**El modelo identifica que churners pagan más. Las entrevistas explican por qué: la opacidad 
reduce el valor percibido independientemente del precio.**

Un usuario que paga $70 pero entiende exactamente qué obtiene tiene mayor probabilidad de 
retención que uno que paga $50 pero no entiende por qué se le cobran cosas extras, por qué 
cambiaron los términos, o por qué su app no funciona.

**Implicación de producto:** La comunicación de valor es tan importante como el valor mismo. 
En mercados de desconfianza, un pricing simple y transparente puede superar a uno "más barato" 
pero opaco.

---

### 2.4 MÉTODO DE PAGO Y FAMILIARIDAD

#### Datos cuantitativos:
| Método de pago | Tasa de churn |
|----------------|---------------|
| Electronic check | 45.3% |
| Mailed check | 19.2% |
| Bank transfer (auto) | 16.7% |
| Credit card (auto) | 15.2% |

**Hallazgo clave:** Métodos automáticos tienen ~3x menor churn que manual. Pero más interesante: 
Electronic check (el más "nuevo/digital") tiene el MAYOR churn.

#### Datos cualitativos:
El tema de "lo conocido vs. lo nuevo" apareció espontáneamente:

> "Mejor lo conocido que mal conocido" - María (regresó a su método anterior)
> "Regresé a mi libreta" - José (método analógico)
> "En este país uno ya tiene suficiente estrés. No necesito que una app... me cause más problemas" - José

**Hallazgo clave:** La "innovación" en mercados de desconfianza es una espada de doble filo. 
Los usuarios están abiertos a probar cosas nuevas, pero tienen un umbral de tolerancia más bajo 
para problemas. Y cuando algo falla, regresan rápidamente a lo "conocido".

#### Triangulación:
**Los métodos de pago automáticos retienen más, pero no porque sean "automáticos". 
Son métodos ESTABLECIDOS que los usuarios ya confían (tarjetas, bancos).**

El electronic check, siendo "más digital", tiene más churn porque es menos familiar y tiene 
más puntos de fricción/opacidad.

**Implicación de producto:** En mercados emergentes, la "modernidad" debe ir de la mano de 
la familiaridad. Integrar con métodos que los usuarios YA CONFÍAN (WhatsApp, efectivo, 
transferencias bancarias conocidas) puede ser más efectivo que introducir nuevos métodos.

---

## 3. SÍNTESIS: EL MODELO DE DESCONFIANZA ACUMULATIVA

Basado en la triangulación, proponemos el siguiente modelo:

```
[Desconfianza Institucional Preexistente]
              ↓
[Usuario adopta herramienta con esperanza pero escepticismo]
              ↓
[Incidente 1 + Opacidad] → [Reducción de "pool de buena voluntad"]
              ↓
[Incidente 2 + Opacidad] → [Más reducción]
              ↓
[Incidente N (trigger)] → ["Ya no vale la pena el estrés"]
              ↓
[ABANDONO]
```

### Características del modelo:
1. **No es lineal:** El abandono es una decisión "tipping point", no una erosión gradual
2. **Es emocional:** La clave es la sensación de "engañado", no la pérdida económica
3. **Es reversible hasta el trigger:** Antes del incidente final, la intervención funciona
4. **Es cultural:** En mercados de alta desconfianza, el pool de buena voluntad inicial es menor

---

## 4. RECOMENDACIONES PARA DISEÑO DE PRODUCTO

### 4.1 Intervención proactiva (meses 3-6)

| Momento | Acción | Objetivo |
|---------|--------|----------|
| Mes 1 | Onboarding con expectativas claras | Reducir sorpresas |
| Mes 2 | Check-in proactivo ("¿cómo te va?") | Detectar fricciones temprano |
| Mes 3 | Tutorial de features no usadas | Aumentar valor percibido |
| Mes 6 | Oferta de compromiso (descuento por anualidad) | Aumentar switching cost |

### 4.2 Comunicación transparente

| Situación | Acción | Evitar |
|-----------|--------|--------|
| Cambio de términos | Aviso 30 días + explicación simple | "Consulte términos actualizados" |
| Incremento de precio | Justificación clara + opción de downgrade | Esconder en fine print |
| Falla del sistema | Comunicación inmediata + ETA de resolución | Silencio hasta que pregunten |
| Error del usuario | Explicación de qué pasó + cómo evitarlo | Mensajes genéricos de error |

### 4.3 Diseño de confianza

| Principio | Implementación |
|-----------|----------------|
| Visibilidad | Mostrar siempre el estado de procesos (en cola, procesando, completado) |
| Explicabilidad | Cada cargo, cada cambio, cada decisión debe tener explicación accesible |
| Soporte humano | Para problemas, siempre ofrecer opción de hablar con persona real |
| Retroceso fácil | Permitir "deshacer" acciones por un período |
| History claro | El usuario debe poder ver su historial completo |

---

## 5. LIMITACIONES Y PRÓXIMOS PASOS

### Limitaciones del estudio:
1. **Dataset sintético:** Telco Churn es un dataset académico, no datos reales de fintech
2. **Sample cualitativo pequeño:** n=5 no es representativo, solo exploratorio
3. **Contexto específico:** Venezuela tiene características únicas de desconfianza institucional
4. **Sesgo de memoria:** Las entrevistas dependen de memoria de eventos pasados

### Próximos pasos recomendados:
1. **Validación cuantitativa:** Recopilar datos de churn de Cashea para validar patrones
2. **Estudio longitudinal:** Seguir usuarios desde adopción por 12 meses
3. **A/B testing de intervenciones:** Probar estrategias de comunicación proactiva
4. **Encuesta de confianza:** Desarrollar instrumento para medir "pool de buena voluntad"

---

## 6. CONCLUSIÓN

El análisis de churn en mercados emergentes requiere ir más allá de las métricas tradicionales. 
La desconfianza institucional crea un contexto donde la transparencia no es un "nice-to-have" 
sino un factor de supervivencia.

**El modelo identifica CUÁNDO abandonan los usuarios. Las entrevistas explican POR QUÉ.**
**Juntos, nos dicen CÓMO intervenir: proactivamente, con transparencia, y construyendo 
confianza antes de que se erosione.**

---

**Versión:** 1.0  
**Fecha:** 2024  
**Proyecto:** Churn Mercados Emergentes - Cashea Portfolio  
**Autor:** [Tu nombre]
