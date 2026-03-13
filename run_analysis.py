#!/usr/bin/env python3
"""
Script de ejecución del análisis de churn.
Genera visualizaciones y datos procesados para el proyecto.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
from pathlib import Path
from datetime import datetime

# Configuración
warnings.filterwarnings('ignore')
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams['figure.figsize'] = (12, 6)
plt.rcParams['font.size'] = 11
sns.set_palette('husl')

# Rutas
BASE_DIR = Path('/home/z/my-project/download/churn-mercados-emergentes')
DATA_RAW = BASE_DIR / 'data' / 'raw'
DATA_PROCESSED = BASE_DIR / 'data' / 'processed'
OUTPUTS = BASE_DIR / 'outputs' / 'figures'

# Crear directorios
DATA_PROCESSED.mkdir(parents=True, exist_ok=True)
OUTPUTS.mkdir(parents=True, exist_ok=True)

print("="*70)
print("📊 ANÁLISIS DE CHURN - EJECUCIÓN PRINCIPAL")
print("="*70)

# =============================================================================
# 1. CARGA Y LIMPIEZA DE DATOS
# =============================================================================
print("\n📂 1. Cargando datos...")
df = pd.read_csv(DATA_RAW / 'WA_Fn-UseC_-Telco-Customer-Churn.csv')
print(f"   ✓ Dataset cargado: {df.shape[0]:,} filas × {df.shape[1]} columnas")

# Limpieza de TotalCharges
print("\n🧹 2. Limpiando datos...")
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'] = df['TotalCharges'].fillna(df['MonthlyCharges'] * df['tenure'])
print(f"   ✓ TotalCharges limpiado")

# Crear grupos de tenure
bins = [0, 12, 24, 48, 72]
labels = ['0-12m', '12-24m', '24-48m', '48m+']
df['tenure_group'] = pd.cut(df['tenure'], bins=bins, labels=labels, include_lowest=True)

# Crear variable target numérica
df['Churn_numeric'] = (df['Churn'] == 'Yes').astype(int)

# =============================================================================
# 2. ESTADÍSTICAS DESCRIPTIVAS
# =============================================================================
print("\n📈 3. Calculando estadísticas...")

# Tasa de churn general
churn_rate = (df['Churn'] == 'Yes').mean() * 100
print(f"   ✓ Tasa de churn: {churn_rate:.1f}%")

# Churn por contrato
contract_churn = df.groupby('Contract').apply(
    lambda x: (x['Churn'] == 'Yes').mean() * 100
).sort_values(ascending=False)

print(f"\n   Churn por tipo de contrato:")
for contract, rate in contract_churn.items():
    print(f"      • {contract}: {rate:.1f}%")

# Churn por grupo de tenure
tenure_churn = df.groupby('tenure_group').apply(
    lambda x: (x['Churn'] == 'Yes').mean() * 100
)

print(f"\n   Churn por grupo de tenure:")
for group, rate in tenure_churn.items():
    print(f"      • {group}: {rate:.1f}%")

# Cargos
churner_charges = df[df['Churn'] == 'Yes']['MonthlyCharges'].mean()
non_churner_charges = df[df['Churn'] == 'No']['MonthlyCharges'].mean()
diff_pct = (churner_charges - non_churner_charges) / non_churner_charges * 100

print(f"\n   Cargos mensuales promedio:")
print(f"      • Churners: ${churner_charges:.2f}")
print(f"      • No-churners: ${non_churner_charges:.2f}")
print(f"      • Diferencia: +{diff_pct:.1f}%")

# =============================================================================
# 3. VISUALIZACIONES
# =============================================================================
print("\n📊 4. Generando visualizaciones...")

# Figura 1: Distribución de Churn
fig, ax = plt.subplots(figsize=(8, 5))
churn_counts = df['Churn'].value_counts()
colors = ['#2ecc71', '#e74c3c']
bars = ax.bar(churn_counts.index, churn_counts.values, color=colors, edgecolor='white', linewidth=2)
for bar, count in zip(bars, churn_counts.values):
    pct = count / len(df) * 100
    ax.annotate(f'{count:,}\n({pct:.1f}%)',
                xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                ha='center', va='bottom', fontsize=12, fontweight='bold')
ax.set_title('Distribución de Churn', fontsize=14, fontweight='bold', pad=20)
ax.set_xlabel('Estado del Cliente')
ax.set_ylabel('Cantidad de Clientes')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.savefig(OUTPUTS / '01_churn_distribution.png', dpi=300, bbox_inches='tight')
plt.close()
print("   ✓ 01_churn_distribution.png")

# Figura 2: Churn por Contrato
fig, ax = plt.subplots(figsize=(10, 6))
colors = ['#e74c3c', '#f39c12', '#2ecc71']
bars = ax.bar(contract_churn.index, contract_churn.values, color=colors, edgecolor='white', linewidth=2)
for bar, rate in zip(bars, contract_churn.values):
    ax.annotate(f'{rate:.1f}%', xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                ha='center', va='bottom', fontsize=12, fontweight='bold')
ax.axhline(churn_rate, color='navy', linestyle='--', linewidth=2, label=f'Promedio: {churn_rate:.1f}%')
ax.set_title('Tasa de Churn por Tipo de Contrato', fontsize=14, fontweight='bold', pad=20)
ax.set_xlabel('Tipo de Contrato')
ax.set_ylabel('Tasa de Churn (%)')
ax.legend()
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.savefig(OUTPUTS / '04_churn_by_contract.png', dpi=300, bbox_inches='tight')
plt.close()
print("   ✓ 04_churn_by_contract.png")

# Figura 3: Churn por Tenure Group
fig, ax = plt.subplots(figsize=(10, 6))
colors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71']
bars = ax.bar(tenure_churn.index, tenure_churn.values, color=colors, edgecolor='white', linewidth=2)
for bar, rate in zip(bars, tenure_churn.values):
    ax.annotate(f'{rate:.1f}%', xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                ha='center', va='bottom', fontsize=12, fontweight='bold')
ax.axhline(churn_rate, color='navy', linestyle='--', linewidth=2, label=f'Promedio: {churn_rate:.1f}%')
ax.set_title('Tasa de Churn por Grupo de Tenure', fontsize=14, fontweight='bold', pad=20)
ax.set_xlabel('Grupo de Tenure')
ax.set_ylabel('Tasa de Churn (%)')
ax.legend()
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.savefig(OUTPUTS / '07_churn_by_tenure_group.png', dpi=300, bbox_inches='tight')
plt.close()
print("   ✓ 07_churn_by_tenure_group.png")

# Figura 4: Cargos por Churn
fig, ax = plt.subplots(figsize=(10, 6))
categories = ['Churners', 'No Churners']
values = [churner_charges, non_churner_charges]
colors = ['#e74c3c', '#2ecc71']
bars = ax.bar(categories, values, color=colors, edgecolor='white', linewidth=2)
for bar, val in zip(bars, values):
    ax.annotate(f'${val:.2f}', xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                ha='center', va='bottom', fontsize=12, fontweight='bold')
ax.set_title('Cargos Mensuales Promedio por Estado de Churn', fontsize=14, fontweight='bold', pad=20)
ax.set_ylabel('Cargo Mensual ($)')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
plt.tight_layout()
plt.savefig(OUTPUTS / '08_charges_by_churn.png', dpi=300, bbox_inches='tight')
plt.close()
print("   ✓ 08_charges_by_churn.png")

# Figura 5: Heatmap de Correlaciones
fig, ax = plt.subplots(figsize=(10, 8))
numeric_cols = ['tenure', 'MonthlyCharges', 'TotalCharges', 'SeniorCitizen', 'Churn_numeric']
corr_matrix = df[numeric_cols].corr()
mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
sns.heatmap(corr_matrix, mask=mask, annot=True, fmt='.2f', cmap='RdYlGn',
            center=0, square=True, linewidths=0.5, ax=ax,
            cbar_kws={'shrink': 0.8})
ax.set_title('Matriz de Correlaciones', fontsize=14, fontweight='bold', pad=20)
plt.tight_layout()
plt.savefig(OUTPUTS / '09_correlation_heatmap.png', dpi=300, bbox_inches='tight')
plt.close()
print("   ✓ 09_correlation_heatmap.png")

# Figura 6: Resumen Ejecutivo
fig, axes = plt.subplots(2, 2, figsize=(14, 12))

# Distribución de churn
ax1 = axes[0, 0]
churn_counts = df['Churn'].value_counts()
colors = ['#2ecc71', '#e74c3c']
ax1.pie(churn_counts.values, labels=churn_counts.index, autopct='%1.1f%%',
        colors=colors, explode=(0, 0.05), startangle=90)
ax1.set_title('Distribución de Churn', fontsize=12, fontweight='bold')

# Churn por contrato
ax2 = axes[0, 1]
colors = ['#e74c3c', '#f39c12', '#2ecc71']
bars = ax2.bar(contract_churn.index, contract_churn.values, color=colors)
ax2.set_title('Churn por Tipo de Contrato', fontsize=12, fontweight='bold')
ax2.set_ylabel('Tasa de Churn (%)')
ax2.tick_params(axis='x', rotation=15)
for bar, val in zip(bars, contract_churn.values):
    ax2.annotate(f'{val:.1f}%', xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                 ha='center', va='bottom', fontsize=10, fontweight='bold')

# Churn por tenure
ax3 = axes[1, 0]
colors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71']
bars = ax3.bar(tenure_churn.index, tenure_churn.values, color=colors)
ax3.set_title('Churn por Grupo de Tenure', fontsize=12, fontweight='bold')
ax3.set_ylabel('Tasa de Churn (%)')
for bar, val in zip(bars, tenure_churn.values):
    ax3.annotate(f'{val:.1f}%', xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                 ha='center', va='bottom', fontsize=10, fontweight='bold')

# Cargos
ax4 = axes[1, 1]
categories = ['Churners', 'No Churners']
values = [churner_charges, non_churner_charges]
colors = ['#e74c3c', '#2ecc71']
bars = ax4.bar(categories, values, color=colors)
ax4.set_title('Cargos Mensuales Promedio', fontsize=12, fontweight='bold')
ax4.set_ylabel('Cargo Mensual ($)')
for bar, val in zip(bars, values):
    ax4.annotate(f'${val:.2f}', xy=(bar.get_x() + bar.get_width()/2, bar.get_height()),
                 ha='center', va='bottom', fontsize=10, fontweight='bold')

plt.suptitle('Resumen de Hallazgos Cuantitativos', fontsize=16, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig(OUTPUTS / '23_quantitative_summary.png', dpi=300, bbox_inches='tight')
plt.close()
print("   ✓ 23_quantitative_summary.png")

# =============================================================================
# 4. GUARDAR DATOS PROCESADOS
# =============================================================================
print("\n💾 5. Guardando datos procesados...")
output_path = DATA_PROCESSED / 'churn_features.csv'
df.to_csv(output_path, index=False)
print(f"   ✓ Datos guardados en: {output_path}")

# =============================================================================
# 5. RESUMEN EJECUTIVO
# =============================================================================
print("\n" + "="*70)
print("📊 RESUMEN EJECUTIVO")
print("="*70)

print(f"""
📊 DATOS ANALIZADOS:
   • Total de clientes: {len(df):,}
   • Variables: {len(df.columns)}
   • Tasa de churn: {churn_rate:.1f}%

🔍 HALLAZGOS CLAVE:

   1. CONTRATO: Contratos mensuales tienen {contract_churn['Month-to-month']/contract_churn['Two year']:.1f}x más riesgo
      - Month-to-month: {contract_churn['Month-to-month']:.1f}%
      - Two year: {contract_churn['Two year']:.1f}%

   2. TENURE: {tenure_churn['0-12m']:.1f}% abandona en primeros 12 meses
      - Ventana crítica: meses 3-6

   3. CARGOS: Churners pagan MÁS (+{diff_pct:.1f}%)
      - Problema de valor percibido, no de precio

📈 ARCHIVOS GENERADOS:
   • data/processed/churn_features.csv
   • outputs/figures/*.png (6 visualizaciones)
""")

print("="*70)
print(f"📅 Análisis completado: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("="*70)
