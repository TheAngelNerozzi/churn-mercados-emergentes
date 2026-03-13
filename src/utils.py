"""
Utilidades para el análisis de churn en mercados emergentes.
Funciones reutilizables para EDA, visualización y modelado.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Union, List, Tuple, Optional
from pathlib import Path


# Configuración de visualización
plt.rcParams['figure.figsize'] = (10, 6)
plt.rcParams['font.size'] = 11
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['axes.labelsize'] = 12
sns.set_style("whitegrid")
sns.set_palette("husl")


def calcular_churn_rate(df: pd.DataFrame, grupo: str) -> pd.DataFrame:
    """
    Calcula la tasa de churn por grupo.
    
    Parameters:
    -----------
    df : DataFrame con columnas 'Churn' y la variable de agrupación
    grupo : Nombre de la columna para agrupar
    
    Returns:
    --------
    DataFrame con conteos y tasa de churn por grupo
    """
    result = df.groupby(grupo).agg(
        total=('Churn', 'count'),
        churners=('Churn', lambda x: (x == 'Yes').sum())
    ).reset_index()
    
    result['churn_rate'] = (result['churners'] / result['total'] * 100).round(2)
    result['no_churn'] = result['total'] - result['churners']
    
    return result.sort_values('churn_rate', ascending=False)


def plot_churn_distribution(df: pd.DataFrame, ax: Optional[plt.Axes] = None) -> plt.Axes:
    """
    Visualiza la distribución general de churn.
    
    Parameters:
    -----------
    df : DataFrame con columna 'Churn'
    ax : Eje de matplotlib opcional
    
    Returns:
    --------
    Eje de matplotlib con el gráfico
    """
    if ax is None:
        fig, ax = plt.subplots(figsize=(8, 5))
    
    churn_counts = df['Churn'].value_counts()
    colors = ['#2ecc71', '#e74c3c']
    
    bars = ax.bar(churn_counts.index, churn_counts.values, color=colors, edgecolor='white', linewidth=1.5)
    
    # Añadir etiquetas
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
    
    return ax


def plot_churn_by_category(df: pd.DataFrame, variable: str, 
                           title: str = None, ax: Optional[plt.Axes] = None) -> plt.Axes:
    """
    Visualiza la tasa de churn por variable categórica.
    
    Parameters:
    -----------
    df : DataFrame con columnas 'Churn' y la variable
    variable : Nombre de la columna categórica
    title : Título personalizado
    ax : Eje de matplotlib opcional
    
    Returns:
    --------
    Eje de matplotlib con el gráfico
    """
    if ax is None:
        fig, ax = plt.subplots(figsize=(10, 6))
    
    # Calcular churn rate
    churn_data = calcular_churn_rate(df, variable)
    
    # Crear gráfico de barras horizontales
    colors = plt.cm.RdYlGn_r(churn_data['churn_rate'] / 100)
    
    bars = ax.barh(churn_data[variable], churn_data['churn_rate'], color=colors, edgecolor='white')
    
    # Añadir etiquetas
    for bar, rate in zip(bars, churn_data['churn_rate']):
        ax.annotate(f'{rate:.1f}%',
                    xy=(bar.get_width() + 1, bar.get_y() + bar.get_height()/2),
                    ha='left', va='center', fontsize=11, fontweight='bold')
    
    title = title or f'Tasa de Churn por {variable}'
    ax.set_title(title, fontsize=14, fontweight='bold', pad=20)
    ax.set_xlabel('Tasa de Churn (%)')
    ax.set_ylabel(variable)
    ax.set_xlim(0, max(churn_data['churn_rate']) * 1.2)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Línea de referencia (promedio general)
    avg_churn = (df['Churn'] == 'Yes').mean() * 100
    ax.axvline(avg_churn, color='navy', linestyle='--', linewidth=2, label=f'Promedio: {avg_churn:.1f}%')
    ax.legend(loc='lower right')
    
    return ax


def crear_grupos_tenure(df: pd.DataFrame) -> pd.DataFrame:
    """
    Crea grupos de tenure para análisis de cohortes.
    
    Parameters:
    -----------
    df : DataFrame con columna 'tenure'
    
    Returns:
    --------
    DataFrame con columna adicional 'tenure_group'
    """
    bins = [0, 12, 24, 48, 72]
    labels = ['0-12m', '12-24m', '24-48m', '48m+']
    
    df = df.copy()
    df['tenure_group'] = pd.cut(df['tenure'], bins=bins, labels=labels, include_lowest=True)
    
    return df


def plot_tenure_distribution(df: pd.DataFrame, ax: Optional[plt.Axes] = None) -> plt.Axes:
    """
    Visualiza la distribución de tenure con churn.
    
    Parameters:
    -----------
    df : DataFrame con columnas 'tenure' y 'Churn'
    ax : Eje de matplotlib opcional
    
    Returns:
    --------
    Eje de matplotlib con el gráfico
    """
    if ax is None:
        fig, ax = plt.subplots(figsize=(12, 6))
    
    # Histogramas superpuestos
    churn_yes = df[df['Churn'] == 'Yes']['tenure']
    churn_no = df[df['Churn'] == 'No']['tenure']
    
    ax.hist(churn_no, bins=30, alpha=0.7, label='No Churn', color='#2ecc71', edgecolor='white')
    ax.hist(churn_yes, bins=30, alpha=0.7, label='Churn', color='#e74c3c', edgecolor='white')
    
    ax.set_title('Distribución de Tenure por Estado de Churn', fontsize=14, fontweight='bold', pad=20)
    ax.set_xlabel('Tenure (meses)')
    ax.set_ylabel('Frecuencia')
    ax.legend()
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    return ax


def plot_correlation_heatmap(df: pd.DataFrame, figsize: Tuple[int, int] = (12, 10)) -> plt.Figure:
    """
    Genera heatmap de correlaciones para variables numéricas.
    
    Parameters:
    -----------
    df : DataFrame con variables numéricas
    figsize : Tamaño de la figura
    
    Returns:
    --------
    Figura de matplotlib
    """
    # Seleccionar solo variables numéricas
    numeric_df = df.select_dtypes(include=[np.number])
    
    fig, ax = plt.subplots(figsize=figsize)
    
    corr = numeric_df.corr()
    
    mask = np.triu(np.ones_like(corr, dtype=bool))
    
    sns.heatmap(corr, mask=mask, annot=True, fmt='.2f', cmap='RdYlGn',
                center=0, square=True, linewidths=0.5, ax=ax,
                cbar_kws={'shrink': 0.8})
    
    ax.set_title('Matriz de Correlaciones', fontsize=14, fontweight='bold', pad=20)
    
    return fig


def plot_survival_curves(kmf_objects: dict, title: str = 'Curvas de Supervivencia',
                         figsize: Tuple[int, int] = (12, 8)) -> plt.Figure:
    """
    Visualiza múltiples curvas de supervivencia Kaplan-Meier.
    
    Parameters:
    -----------
    kmf_objects : Diccionario con objetos KaplanMeierFitter
    title : Título del gráfico
    figsize : Tamaño de la figura
    
    Returns:
    --------
    Figura de matplotlib
    """
    fig, ax = plt.subplots(figsize=figsize)
    
    colors = plt.cm.Set1(np.linspace(0, 1, len(kmf_objects)))
    
    for (label, kmf), color in zip(kmf_objects.items(), colors):
        kmf.plot_survival_function(ax=ax, label=label, color=color, linewidth=2)
    
    ax.set_title(title, fontsize=14, fontweight='bold', pad=20)
    ax.set_xlabel('Tiempo (meses)')
    ax.set_ylabel('Probabilidad de Supervivencia')
    ax.legend(loc='lower left')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.set_xlim(0, None)
    ax.set_ylim(0, 1)
    
    return fig


def calcular_lift_score(y_true: np.ndarray, y_pred_proba: np.ndarray, 
                        percentile: int = 20) -> float:
    """
    Calcula el lift score para evaluar el modelo.
    
    Parameters:
    -----------
    y_true : Valores reales
    y_pred_proba : Probabilidades predichas
    percentile : Percentil para calcular el lift
    
    Returns:
    --------
    Lift score
    """
    df = pd.DataFrame({'true': y_true, 'pred': y_pred_proba})
    df = df.sort_values('pred', ascending=False)
    
    n_top = int(len(df) * percentile / 100)
    top_churn_rate = df.head(n_top)['true'].mean()
    base_churn_rate = df['true'].mean()
    
    return top_churn_rate / base_churn_rate


def generar_reporte_metricas(y_true: np.ndarray, y_pred: np.ndarray, 
                             y_pred_proba: np.ndarray) -> dict:
    """
    Genera un reporte completo de métricas de clasificación.
    
    Parameters:
    -----------
    y_true : Valores reales
    y_pred : Predicciones de clase
    y_pred_proba : Probabilidades predichas
    
    Returns:
    --------
    Diccionario con métricas
    """
    from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                                 f1_score, roc_auc_score, confusion_matrix)
    
    metrics = {
        'accuracy': accuracy_score(y_true, y_pred),
        'precision': precision_score(y_true, y_pred),
        'recall': recall_score(y_true, y_pred),
        'f1_score': f1_score(y_true, y_pred),
        'roc_auc': roc_auc_score(y_true, y_pred_proba),
        'lift_20': calcular_lift_score(y_true, y_pred_proba, 20),
        'confusion_matrix': confusion_matrix(y_true, y_pred)
    }
    
    return metrics


def plot_feature_importance(importance_df: pd.DataFrame, top_n: int = 15,
                            figsize: Tuple[int, int] = (10, 8)) -> plt.Figure:
    """
    Visualiza la importancia de features.
    
    Parameters:
    -----------
    importance_df : DataFrame con columnas 'feature' e 'importance'
    top_n : Número de features a mostrar
    figsize : Tamaño de la figura
    
    Returns:
    --------
    Figura de matplotlib
    """
    top_features = importance_df.head(top_n)
    
    fig, ax = plt.subplots(figsize=figsize)
    
    colors = plt.cm.viridis(np.linspace(0.2, 0.8, len(top_features)))
    
    bars = ax.barh(range(len(top_features)), top_features['importance'], color=colors)
    
    ax.set_yticks(range(len(top_features)))
    ax.set_yticklabels(top_features['feature'])
    ax.set_xlabel('Importancia')
    ax.set_title(f'Top {top_n} Features más Importantes', fontsize=14, fontweight='bold', pad=20)
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    
    # Añadir valores
    for bar, val in zip(bars, top_features['importance']):
        ax.annotate(f'{val:.3f}',
                    xy=(bar.get_width(), bar.get_y() + bar.get_height()/2),
                    ha='left', va='center', fontsize=10)
    
    plt.tight_layout()
    
    return fig


def save_figure(fig: plt.Figure, filename: str, output_dir: str = 'outputs/figures',
                dpi: int = 300) -> None:
    """
    Guarda una figura en el directorio de outputs.
    
    Parameters:
    -----------
    fig : Figura de matplotlib
    filename : Nombre del archivo
    output_dir : Directorio de salida
    dpi : Resolución
    """
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    filepath = output_path / filename
    fig.savefig(filepath, dpi=dpi, bbox_inches='tight', facecolor='white', edgecolor='none')
    print(f"Figura guardada: {filepath}")


def crear_resumen_ejecutivo(df: pd.DataFrame) -> str:
    """
    Genera un resumen ejecutivo del análisis de churn.
    
    Parameters:
    -----------
    df : DataFrame procesado
    
    Returns:
    --------
    String con el resumen
    """
    total_clientes = len(df)
    churn_rate = (df['Churn'] == 'Yes').mean() * 100
    
    # Contratos mensuales
    monthly_churn = df[df['Contract'] == 'Month-to-month']['Churn'].apply(lambda x: x == 'Yes').mean() * 100
    annual_churn = df[df['Contract'] != 'Month-to-month']['Churn'].apply(lambda x: x == 'Yes').mean() * 100
    
    # Tenure crítico
    df_groups = crear_grupos_tenure(df)
    early_churn = df_groups[df_groups['tenure_group'] == '0-12m']['Churn'].apply(lambda x: x == 'Yes').mean() * 100
    
    # Cargos
    churner_charges = df[df['Churn'] == 'Yes']['MonthlyCharges'].mean()
    non_churner_charges = df[df['Churn'] == 'No']['MonthlyCharges'].mean()
    
    resumen = f"""
    RESUMEN EJECUTIVO - ANÁLISIS DE CHURN
    =====================================
    
    • Total de clientes analizados: {total_clientes:,}
    • Tasa de churn general: {churn_rate:.1f}%
    
    HALLAZGOS CLAVE:
    ----------------
    1. CONTRATO: Clientes con contrato mensual tienen tasa de churn del {monthly_churn:.1f}%,
       vs {annual_churn:.1f}% en contratos anuales. Riesgo {monthly_churn/annual_churn:.1f}x mayor.
    
    2. TENURE: El {early_churn:.1f}% de clientes en primeros 12 meses abandona.
       Ventana crítica de intervención: meses 3-6.
    
    3. CARGOS: Churners pagan en promedio ${churner_charges:.2f}/mes vs 
       ${non_churner_charges:.2f}/mes de no-churners. Problema de valor, no de precio.
    
    RECOMENDACIONES:
    ----------------
    • Intervención proactiva en mes 3-6, no reactiva en mes 10+
    • Foco en transparencia y comunicación de valor
    • Incentivar contratos de mayor duración con beneficios claros
    """
    
    return resumen


if __name__ == "__main__":
    print("Módulo de utilidades para análisis de churn cargado correctamente.")
    print("Funciones disponibles:")
    funcs = [f for f in dir() if not f.startswith('_') and callable(eval(f))]
    for f in funcs:
        print(f"  - {f}")
