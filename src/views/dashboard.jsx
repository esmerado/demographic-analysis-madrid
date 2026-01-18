/**
 * @file dashboard.jsx
 * @description Implementación de comparativas demográficas dinámicas.
 * Responde a la problemática de negocio mediante el análisis de flujos cruzados.
 */

import { useState, useEffect, useRef } from "preact/hooks";
import { DataHandlers } from "../handlers/handlers";

import { ChartOrchestrator } from "../components/chartOrchestrator";

export function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedComparison, setSelectedComparison] = useState(
    "Nacimientos por género",
  );

  const { handleGetData } = DataHandlers({ setData });

  useEffect(() => {
    handleGetData();
  }, []);

  /**
   * UTILIDAD: Busca registros por nombre exacto del concepto en el dataset agrupado.
   * Garantiza que el gráfico reciba la serie correcta para su visualización.
   */
  const getRegistros = (nombreConcepto) => {
    const coincidencia = data.find((d) => d.concepto === nombreConcepto);
    return coincidencia ? coincidencia.registros : [];
  };

  /**
   * CONFIGURACIÓN DE LAS GRÁFICAS COMPARATIVAS
   * Define qué series del CSV original se cruzan en cada opción del selector.
   */
  const getComparisonData = () => {
    switch (selectedComparison) {
      case "Nacimientos por género":
        return {
          title: "Comparativa: Nacimientos Hombres vs Mujeres",
          groupA: getRegistros("Nacimientos de hombres residentes"),
          groupB: getRegistros("Nacimientos de mujeres residentes"),
          labelA: "Hombres",
          labelB: "Mujeres",
          chartType: "barChart",
        };
      case "Nacimientos vs Defunciones":
        return {
          title: "Saldo Vegetativo: Total Nacimientos vs Defunciones",
          groupA: getRegistros("Total nacimientos de residentes"),
          groupB: getRegistros("Total defunciones de residentes"),
          labelA: "Nacimientos",
          labelB: "Defunciones",
          chartType: "lineChart",
        };
      case "Nuevos matrimonios de distinto género residentes":
        return {
          title: "Nuevos matrimonios de distinto género residentes",
          groupA: getRegistros(
            "Matrimonios de residentes de distinto sexo que fijan su residencia en la Comunidad de Madrid",
          ),
          groupB: null,
          labelA: "Matrimonios",
          chartType: "barChart",
        };
      case "Nacimientos vs Defunciones en Hombres":
        return {
          title: "Nacimientos vs Defunciones: Hombres",
          groupA: getRegistros("Nacimientos de hombres residentes"),
          groupB: getRegistros("Defunciones de residentes hombres"),
          labelA: "Nacimientos",
          labelB: "Defunciones",
          chartType: "lineChart",
        };
      case "Nacimientos vs Defunciones en Mujeres":
        return {
          title: "Nacimientos vs Defunciones: Mujeres",
          groupA: getRegistros("Nacimientos de mujeres residentes"),
          groupB: getRegistros("Defunciones de residentes mujeres"),
          labelA: "Nacimientos",
          labelB: "Defunciones",
          chartType: "lineChart",
        };
      case "Matrimonios de distinto sexo vs Matrimonios del mismo sexo":
        return {
          title: "Matrimonios de distinto sexo vs Matrimonios del mismo sexo",
          groupA: getRegistros(
            "Matrimonios de residentes de distinto sexo que fijan su residencia en la Comunidad de Madrid",
          ),
          groupB: getRegistros(
            "Matrimonios de residentes del mismo sexo que fijan su residencia en la Comunidad de Madrid",
          ),
          labelA: "Matrimonios de distinto sexo",
          labelB: "Matrimonios del mismo sexo",
          chartType: "lineChart",
        };
      default:
        return null;
    }
  };

  const activeView = getComparisonData();

  return (
    <div
      className="dashboard-container"
      style={{
        padding: "2rem",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          marginBottom: "30px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "20px",
        }}
      >
        <h1 style={{ color: "#1e293b", fontSize: "2.2rem", fontWeight: "800" }}>
          Análisis Demográfico: Comunidad de Madrid
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          Histórico 1985-Actualidad | Visualización interactiva de flujos de
          población.
        </p>
      </header>

      {data.length > 0 && (
        <div
          style={{
            marginBottom: "30px",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <label
            htmlFor="comp-select"
            style={{
              fontWeight: "600",
              color: "#475569",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Seleccione análisis de comparativa:
          </label>
          <select
            id="comp-select"
            value={selectedComparison}
            onChange={(e) => setSelectedComparison(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              width: "100%",
              maxWidth: "400px",
              cursor: "pointer",
            }}
          >
            <option value="Nacimientos por género">
              Nacimientos por género
            </option>
            <option value="Nuevos matrimonios de distinto género residentes">
              Nuevos matrimonios de distinto género residentes
            </option>
            <option value="Nacimientos vs Defunciones">
              Nacimientos vs Defunciones
            </option>
            <option value="Nacimientos vs Defunciones en Hombres">
              Nacimientos vs Defunciones en Hombres
            </option>
            <option value="Nacimientos vs Defunciones en Mujeres">
              Nacimientos vs Defunciones en Mujeres
            </option>
            <option value="Matrimonios de distinto sexo vs Matrimonios del mismo sexo">
              Matrimonios de distinto sexo vs Matrimonios del mismo sexo
            </option>
          </select>
        </div>
      )}

      {activeView && (
        <div style={{ animation: "fadeIn 0.5s ease-in" }}>
          <ChartOrchestrator
            svgRef={activeView.svgRef}
            chartType={activeView.chartType}
            dataGroupA={activeView.groupA}
            dataGroupB={activeView.groupB}
            title={activeView.title}
            labelA={activeView.labelA}
            labelB={activeView.labelB}
          />
        </div>
      )}

      <footer
        style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #e2e8f0",
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        <p>
          Fuente: Portal de Datos Abiertos de la Comunidad de Madrid |
          Desarrollo: Javier Esmerado Vela
        </p>
      </footer>
    </div>
  );
}
