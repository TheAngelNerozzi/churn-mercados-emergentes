# 🔄 Análisis de Churn en Mercados Emergentes

> *Triangulación de datos cuantitativos y cualitativos para entender el abandono de servicios digitales*

[![Python](https://img.shields.io/badge/Python-3.9%2B-blue)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Complete-brightgreen.svg)]()

---

## 📋 Resumen Ejecutivo

Este proyecto explora los factores que impulsan el **churn (abandono)** en mercados emergentes, combinando:

- **Análisis cuantitativo** del dataset Telco Customer Churn (IBM) con 7,043 clientes
- **Investigación cualitativa** con 5 entrevistas a comerciantes venezolanos
- **Modelado predictivo** con Random Forest y análisis de supervivencia Kaplan-Meier

### Hallazgo Principal

> **En mercados emergentes, el churn no es solo función de precio o features. 
> La desconfianza institucional y la opacidad en procesos son predictores críticos.**

El modelo identifica **CUÁNDO** abandonan los usuarios (meses 6-10). Las entrevistas explican **POR QUÉ** (acumulación de incidentes sin explicación clara). Juntos, nos dicen **CÓMO intervenir**.

---

## 🎯 Objetivos del Proyecto

1. **Identificar patrones de abandono** a través de análisis exploratorio y modelado predictivo
2. **Comprender la dimensión humana** del churn mediante entrevistas cualitativas
3. **Triangular hallazgos** para generar insights accionables para diseño de producto
4. **Demostrar competencias** de Product Research aplicadas a un problema real de fintech

---

## 📁 Estructura del Proyecto

```
churn-mercados-emergentes/
├── 📄 README.md                    # Este archivo
├── 📄 requirements.txt             # Dependencias Python
├── 📄 .gitignore                   # Archivos a ignorar
│
├── 📂 data/
│   ├── raw/                        # Datos originales (no incluidos en git)
│   │   └── telco_churn.csv         # Dataset de IBM
│   └── processed/                  # Datos procesados
│       └── churn_features.csv      # Features engineering
│
├── 📂 notebooks/
│   ├── 01_exploracion_datos.ipynb  # EDA completo
│   ├── 02_analisis_cohortes.ipynb  # Análisis de supervivencia
│   ├── 03_modelado_churn.ipynb     # Modelado predictivo
│   └── 04_triangulacion_insights.ipynb  # Síntesis final
│
├── 📂 qualitative/
│   ├── guia_entrevista.md          # Protocolo de entrevistas
│   ├── notas_entrevistas.md        # Resúmenes anonimizados
│   └── insights_clave.md           # Síntesis de hallazgos
│
├── 📂 src/
│   └── utils.py                    # Funciones reutilizables
│
└── 📂 outputs/
    └── figures/                    # Visualizaciones generadas
```

---

## 🔬 Metodología

### Fase 1: Análisis Cuantitativo

| Notebook | Contenido | Output |
|----------|-----------|--------|
| `01_exploracion_datos` | Limpieza, EDA, distribuciones | `churn_features.csv` |
| `02_analisis_cohortes` | Kaplan-Meier, riesgo acumulado | Curvas de supervivencia |
| `03_modelado_churn` | Regresión logística, Random Forest, SHAP | Modelo + predicciones |

### Fase 2: Investigación Cualitativa

- **5 entrevistas semi-estructuradas** a comerciantes venezolanos
- **Duración:** 30-45 minutos cada una
- **Enfoque:** Experiencias de abandono de herramientas digitales
- **Temas:** Opacidad, confianza, comunicación, valor percibido

### Fase 3: Triangulación

El notebook `04_triangulacion_insights` sintetiza ambos mundos:

| Dimensión | Hallazgo Cuantitativo | Hallazgo Cualitativo |
|-----------|----------------------|---------------------|
| Tenure crítico | 47% abandona en 0-12 meses | 60% abandonó en 0-6 meses |
| Contrato | Mensual = 3x más churn | "Contrato emocional" importa más |
| Cargos | Churners pagan +21.5% | Valor, no precio, es el problema |
| Método | Auto-pago = menos churn | "Lo conocido" es más confiable |

---

## 📊 Hallazgos Clave

### 1. La Ventana Crítica: Meses 3-6

```
Tasa de Churn por Tenure:
┌─────────────┬───────────────┐
│  0-12m      │ ████████ 47%  │ ← CRÍTICO
│ 12-24m      │ █████ 29%     │
│ 24-48m      │ ████ 22%      │
│ 48m+        │ ██ 9%         │
└─────────────┴───────────────┘
```

**Implicación:** Intervenir proactivamente en mes 3-6, no reactivamente en mes 10+.

### 2. Contrato Mensual = Riesgo 3x Mayor

```
Churn por Tipo de Contrato:
┌────────────────┬─────────────┐
│ Month-to-month │ ████████ 43%│
│ One year       │ ██ 11%      │
│ Two year       │ █ 3%        │
└────────────────┴─────────────┘
```

**Implicación:** El compromiso reduce churn, pero debe ser bilateral.

### 3. Los Churners Pagan Más

```
Cargo Mensual Promedio:
┌────────────┬──────────────┐
│ Churners   │ $74.44 ████  │
│ No-churners│ $61.27 ███   │
└────────────┴──────────────┘
```

**Implicación:** El problema no es precio, es valor percibido.

---

## 🧠 Modelo de Desconfianza Acumulativa

Basado en la triangulación cuantitativo-cualitativa, proponemos:

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

---

## 🚀 Instalación y Uso

### Requisitos
- Python 3.9+
- Jupyter Notebook o JupyterLab

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/TheAngelNerozzi/churn-mercados-emergentes.git
cd churn-mercados-emergentes

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Instalar dependencias
pip install -r requirements.txt

# Descargar dataset (desde IBM Sample Data)
# Colocar en data/raw/telco_churn.csv
```

### Ejecución

```bash
# Abrir Jupyter
jupyter notebook

# Ejecutar notebooks en orden:
# 1. 01_exploracion_datos.ipynb
# 2. 02_analisis_cohortes.ipynb
# 3. 03_modelado_churn.ipynb
# 4. 04_triangulacion_insights.ipynb
```

---

## 📈 Resultados del Modelo

| Métrica | Regresión Logística | Random Forest |
|---------|---------------------|---------------|
| Accuracy | 0.79 | 0.82 |
| Precision | 0.65 | 0.68 |
| Recall | 0.55 | 0.52 |
| ROC-AUC | 0.84 | 0.85 |
| Lift@20% | 2.1 | 2.3 |

### Top 5 Predictores de Churn

1. **Contract_Month-to-month** - Contrato mensual
2. **tenure** - Antigüedad del cliente
3. **InternetService_Fiber optic** - Servicio de fibra
4. **OnlineSecurity_No** - Sin seguridad online
5. **PaymentMethod_Electronic check** - Pago electrónico

---

## 💡 Recomendaciones para Producto

### Intervención Proactiva (Meses 3-6)

| Momento | Acción | Objetivo |
|---------|--------|----------|
| Mes 1 | Onboarding con expectativas claras | Reducir sorpresas |
| Mes 2 | Check-in proactivo | Detectar fricciones |
| Mes 3 | Tutorial de features no usadas | Aumentar valor |
| Mes 6 | Oferta de compromiso | Aumentar switching cost |

### Principios de Diseño de Confianza

- **Visibilidad:** Mostrar siempre el estado de procesos
- **Explicabilidad:** Cada cargo/cambio debe tener explicación accesible
- **Soporte humano:** Siempre ofrecer opción de hablar con persona real
- **Retroceso fácil:** Permitir "deshacer" acciones

---

## ⚠️ Limitaciones

1. **Dataset sintético:** Telco Churn es un dataset académico, no datos reales de fintech
2. **Sample cualitativo pequeño:** n=5 entrevistas no es representativo
3. **Contexto específico:** Venezuela tiene características únicas de desconfianza
4. **Sesgo de memoria:** Las entrevistas dependen de memoria de eventos pasados

---

## 🔄 Próximos Pasos

- [ ] Validar con datos reales de fintech (Cashea)
- [ ] Estudio longitudinal siguiendo usuarios desde adopción
- [ ] A/B testing de intervenciones proactivas
- [ ] Desarrollar instrumento de medición de "confianza"

---

## 👤 Sobre el Autor

Este proyecto fue desarrollado por Angel Nerozzi como portfolio para aplicar al rol de **Research Senior** 
en **Cashea**, una fintech venezolana. Demuestra competencias en:

- Análisis de datos con Python
- Investigación cualitativa y entrevistas
- Modelado predictivo y machine learning
- Síntesis de insights para diseño de producto
- Comunicación de hallazgos a stakeholders

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 📚 Referencias

- IBM Telco Customer Churn Dataset: [Kaggle](https://www.kaggle.com/blastchar/telco-customer-churn)
- Kaplan, E. L., & Meier, P. (1958 - Stanford University). Nonparametric estimation from incomplete observations
- Christensen, R. H. B. (2023). lifelines: Survival analysis in Python
- Lundberg, S. M., & Lee, S. I. (2017). A unified approach to interpreting model predictions

---

<div align="center">

**¿Preguntas? ¿Feedback?**

📧 Email - angelnerozzioffice@gmail.com · 🐙 GitHub - https://github.com/TheAngelNerozzi

---

*Hecho con ❤️ y muchos datos*

</div>
