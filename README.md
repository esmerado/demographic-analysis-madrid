# 📊 Análisis Demográfico de la Comunidad de Madrid

**🌐 Demo en vivo:** [https://demographic-analysis-madrid.javieresmerado.com/](https://demographic-analysis-madrid.javieresmerado.com/)

Este proyecto presenta un **análisis demográfico comparativo de la Comunidad de Madrid**, centrado en los principales componentes del movimiento natural de la población y en la nupcialidad, con especial atención al **desglose por sexo** y a la **evolución temporal** de los indicadores.

El objetivo es ofrecer una **visualización clara, coherente y demográficamente rigurosa**, adecuada para un **informe técnico, TFG o dashboard analítico**.

---

## 🎯 Objetivos del análisis

- Analizar la **dinámica demográfica básica** de la Comunidad de Madrid.
- Comparar **nacimientos y defunciones** para identificar el **saldo vegetativo**.
- Estudiar las diferencias por **sexo** en nacimientos y defunciones.
- Visualizar la **evolución de los matrimonios**, distinguiendo entre matrimonios de distinto sexo y del mismo sexo.
- Aplicar **tipos de gráficos adecuados** a cada fenómeno demográfico.

---

## 🗂 Variables analizadas

### Movimiento natural de la población

- Total nacimientos de residentes
- Total defunciones de residentes
- Nacimientos de hombres residentes
- Nacimientos de mujeres residentes
- Defunciones de residentes hombres
- Defunciones de residentes mujeres

### Nupcialidad

- Matrimonios de residentes de distinto sexo que fijan su residencia en la Comunidad de Madrid
- Matrimonios de residentes del mismo sexo que fijan su residencia en la Comunidad de Madrid

---

## 📈 Visualizaciones incluidas

Cada visualización ha sido seleccionada según las **buenas prácticas en análisis demográfico**:

| Análisis                                | Tipo de gráfico          | Justificación                               |
| --------------------------------------- | ------------------------ | ------------------------------------------- |
| Nacimientos por género                  | Barras agrupadas         | Comparación directa entre hombres y mujeres |
| Nacimientos vs Defunciones (total)      | Líneas                   | Análisis del saldo vegetativo y tendencias  |
| Nacimientos vs Defunciones (hombres)    | Líneas                   | Evolución del balance demográfico masculino |
| Nacimientos vs Defunciones (mujeres)    | Líneas                   | Análisis del envejecimiento y longevidad    |
| Matrimonios distinto sexo vs mismo sexo | Barras apiladas o líneas | Comparación estructural y cambio social     |

---

## 🧠 Enfoque metodológico

- Se priorizan **variables agregadas** y comparables.
- El desglose por sexo se utiliza solo cuando aporta **valor analítico**.
- Se evita la redundancia (por ejemplo, esposos vs esposas en matrimonios de distinto sexo).
- Los gráficos de líneas se emplean para fenómenos **dinámicos**, y las barras para **comparaciones estructurales**.

---

## 🛠 Estructura lógica del análisis / dashboard

1. Movimiento natural de la población
2. Comparación por sexo
3. Saldo vegetativo total y por sexo
4. Nupcialidad y cambios en los modelos familiares

---

## 📌 Ámbito geográfico

- **Comunidad de Madrid**
- Población residente

---

## 📚 Uso previsto

Este proyecto está pensado para:

- Trabajo Fin de Grado (TFG)
- Informes demográficos
- Visualización de datos institucionales
- Dashboards analíticos

---

## 📁 Estructura del proyecto

```
trend-analysis/
├── 📄 README.md                 # Documentación del proyecto
├── 📄 package.json             # Dependencias y scripts del proyecto
├── 📄 vite.config.js           # Configuración del bundler Vite
├── 📄 index.html               # Punto de entrada HTML
├── 📁 public/                  # Archivos estáticos públicos
│   ├── 📁 data/                # Datos de entrada
│   │   └── 📊 migration-data-madrid.csv  # Dataset demográfico de Madride
├── 📁 src/                     # Código fuente de la aplicación
│   ├── 📄 main.jsx             # Punto de entrada de React
│   ├── 📄 app.jsx              # Componente principal de la aplicación
│   ├── 📄 app.css              # Estilos globales de la aplicación
│   ├── 📄 index.css            # Estilos base y reset
│   ├── 📁 components/          # Componentes reutilizables de visualización
│   │   ├── 📊 barChart.jsx     # Componente para gráficos de barras
│   │   ├── 📈 lineChart.jsx    # Componente para gráficos de líneas
│   │   └── 🎛️ chartOrchestrator.jsx  # Orquestador de componentes gráficos
│   ├── 📁 views/               # Vistas principales de la aplicación
│   │   └── 📋 dashboard.jsx   # Dashboard principal con todas las visualizaciones
│   ├── 📁 handlers/            # Lógica de manejo de datos y eventos
│   │   └── ⚙️ handlers.jsx     # Funciones para procesamiento de datos
│   ├── 📁 utils/               # Utilidades y funciones auxiliares
│   │   └── 🔧 utils.jsx        # Funciones de utilidad general
│   └── 📁 assets/              # Recursos estáticos del componente
```

### Descripción de directorios clave

- **`public/data/`**: Contiene el dataset CSV con los datos demográficos de la Comunidad de Madrid
- **`src/components/`**: Componentes de visualización reutilizables (gráficos de barras y líneas)
- **`src/views/`**: Vistas principales, incluyendo el dashboard que integra todas las visualizaciones
- **`src/handlers/`**: Lógica para el procesamiento y manipulación de datos demográficos
- **`src/utils/`**: Funciones auxiliares para formateo, cálculos y utilidades generales

---

## ✅ Estado del proyecto

- ✔ Selección de variables definida
- ✔ Comparativas demográficas justificadas
- ✔ Tipos de gráficos optimizados para el análisis

---

## 🚀 Instalación y ejecución

### Requisitos previos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn** como gestor de paquetes

### Instalación

1. Clonar el repositorio o navegar al directorio del proyecto:

```bash
cd trend-analysis
```

2. Instalar las dependencias:

```bash
# Usando npm
npm install

# O usando yarn
yarn install
```

### Ejecución

#### Modo desarrollo

Para iniciar el servidor de desarrollo con recarga en caliente:

```bash
# Usando npm
npm run dev

# O usando yarn
yarn dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

#### Modo producción

Para generar la build de producción:

```bash
# Usando npm
npm run build

# O usando yarn
yarn build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

#### Vista previa de producción

Para previsualizar la build de producción localmente:

```bash
# Usando npm
npm run preview

# O usando yarn
yarn preview
```

---

## 📝 Notas adicionales

- El proyecto utiliza **Vite** como bundler para un desarrollo rápido
- Los datos demográficos se cargan desde `/public/data/migration-data-madrid.csv`
- La aplicación está optimizada para visualizaciones demográficas interactivas

