/**
 * @file lineChart.jsx
 * @description Gráfico de líneas interactivo para visualizar tendencias temporales.
 * Permite comparar dos series (A y B) mediante el trazado de líneas y nodos.
 */

import { useEffect, useRef } from "preact/hooks";
import * as d3 from "d3";

const LineChart = ({
  dataGroupA,
  dataGroupB = null,
  title,
  labelA,
  labelB,
}) => {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!dataGroupA || dataGroupA.length === 0 || !svgRef.current) return;

    // Preparación los datos para la visualización
    const isComparison = dataGroupB && dataGroupB.length > 0;
    const parseData = (raw) =>
      raw
        .map((d) => ({ año: +d.año, valor: +d.valor }))
        .sort((a, b) => a.año - b.año);

    const seriesA = parseData(dataGroupA);
    const seriesB = isComparison ? parseData(dataGroupB) : [];

    // Configuración del SVG
    const margin = { top: 40, right: 30, bottom: 80, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Reutilización del Tooltip
    let tooltip = d3.select("#tooltip");
    if (tooltip.empty()) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background", "rgba(15, 23, 42, 0.9)")
        .style("color", "white")
        .style("padding", "8px 12px")
        .style("border-radius", "6px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "1000");
    }

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Definición de las escalas de la gráfica.
    const x = d3
      .scaleLinear()
      .domain(d3.extent(seriesA, (d) => d.año))
      .range([0, width]);

    const yDomain = d3.max([...seriesA, ...seriesB], (d) => d.valor);
    const y = d3.scaleLinear().domain([0, yDomain]).nice().range([height, 0]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d"))); // Formato de año sin comas

    g.append("g").call(d3.axisLeft(y));

    // Definimos el generador de líneas.
    const lineGenerator = d3
      .line()
      .x((d) => x(d.año))
      .y((d) => y(d.valor))
      .curve(d3.curveMonotoneX);

    // Función para dibujar línea con animación
    const drawLine = (data, color, label) => {
      const path = g
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 3)
        .attr("d", lineGenerator);

      // Animación de trazado (Dash-array transition)
      const totalLength = path.node().getTotalLength();
      path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(1500)
        .attr("stroke-dashoffset", 0);

      // Nodos interactivos para el Tooltip
      g.selectAll(`.dot-${label}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.año))
        .attr("cy", (d) => y(d.valor))
        .attr("r", 5)
        .attr("fill", color)
        .attr("stroke", "white")
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
          tooltip.style("visibility", "visible").html(`
            <div style="font-weight: bold;">Año: ${d.año}</div>
            <div>● ${label}: ${d.valor.toLocaleString()}</div>
          `);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("top", event.pageY - 40 + "px")
            .style("left", event.pageX + 15 + "px");
        })
        .on("mouseleave", () => tooltip.style("visibility", "hidden"));
    };

    // Dibujar Series
    drawLine(seriesA, "#4f46e5", labelA || "Serie A");
    if (isComparison) drawLine(seriesB, "#ef4444", labelB || "Serie B");
  }, [dataGroupA, dataGroupB, labelA, labelB]);

  return (
    <div
      className="chart-wrapper"
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <h3
        style={{ textAlign: "center", color: "#1e293b", marginBottom: "15px" }}
      >
        {title}
      </h3>
      <svg ref={svgRef}></svg>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          fontSize: "12px",
          marginTop: "10px",
        }}
      >
        <span>
          <span style={{ color: "#4f46e5" }}>━</span> {labelA}
        </span>
        {dataGroupB && (
          <span>
            <span style={{ color: "#ef4444" }}>━</span> {labelB}
          </span>
        )}
      </div>
    </div>
  );
};

export { LineChart };
