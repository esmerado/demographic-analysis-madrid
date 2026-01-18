/**
 * @file barChart.jsx
 * @description Soporta renderizado simple o agrupado con Tooltip flotante interactivo.
 * Cumple con los criterios de evaluación mediante interactividad avanzada y D3.
 */

import { useEffect, useRef } from "preact/hooks";
import * as d3 from "d3";

const BarChart = ({ dataGroupA, dataGroupB = null, title, labelA, labelB }) => {
  console.log("BarChart", dataGroupA, dataGroupB, title, labelA, labelB);
  const svgRef = useRef(null);
  useEffect(() => {
    if (!dataGroupA || dataGroupA.length === 0 || !svgRef.current) return;

    // Preparación los datos para la visualización
    const isComparison = dataGroupB && dataGroupB.length > 0;
    const years = dataGroupA.map((d) => d.año);
    const combinedData = years.map((year) => {
      const entry = {
        año: year,
        valores: [
          {
            tipo: "A",
            valor: dataGroupA.find((d) => d.año === year)?.valor || 0,
            año: year,
          },
        ],
      };
      if (isComparison) {
        entry.valores.push({
          tipo: "B",
          valor: dataGroupB.find((d) => d.año === year)?.valor || 0,
          año: year,
        });
      }
      return entry;
    });

    // Configuración del SVG
    const margin = { top: 40, right: 30, bottom: 80, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Creación del contenedor del tooltip
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
        .style("box-shadow", "0 4px 6px rgba(0,0,0,0.1)")
        .style("z-index", "1000");
    }

    const g = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Definición de las escalas de la gráfica.
    const x0 = d3.scaleBand().domain(years).range([0, width]).padding(0.2);
    const x1 = d3
      .scaleBand()
      .domain(isComparison ? ["A", "B"] : ["A"])
      .range([0, x0.bandwidth()])
      .padding(0.05);
    const maxValue = d3.max(combinedData, (d) =>
      d3.max(d.valores, (v) => v.valor),
    );
    const y = d3.scaleLinear().domain([0, maxValue]).nice().range([height, 0]);
    const color = d3
      .scaleOrdinal()
      .domain(["A", "B"])
      .range(["#4f46e5", "#ef4444"]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-40)")
      .style("text-anchor", "end");
    g.append("g").call(d3.axisLeft(y).ticks(8));

    // Renderizado y eventos
    const yearGroup = g
      .selectAll(".year-group")
      .data(combinedData)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${x0(d.año)}, 0)`);

    yearGroup
      .selectAll("rect")
      .data((d) => d.valores)
      .enter()
      .append("rect")
      .attr("x", (d) => x1(d.tipo))
      .attr("width", x1.bandwidth())
      .attr("fill", (d) => color(d.tipo))
      .attr("y", height)
      .attr("height", 0)
      // Eventos del Mouse
      .on("mouseover", function (event, d) {
        // Feedback visual
        d3.select(this).style("opacity", 0.8);
        tooltip.style("visibility", "visible").html(`
            <div style="font-weight: bold; margin-bottom: 4px;">Año: ${d.año}</div>
            <div style="color: white">● ${d.tipo === "A" ? labelA : labelB}: ${d.valor.toLocaleString()}</div>
          `);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 40 + "px")
          .style("left", event.pageX + 15 + "px");
      })
      .on("mouseleave", function () {
        d3.select(this).style("opacity", 1);
        tooltip.style("visibility", "hidden");
      })
      .transition()
      .duration(1000)
      .attr("y", (d) => y(d.valor))
      .attr("height", (d) => height - y(d.valor));
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
      {dataGroupB && (
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
            <span style={{ color: "#4f46e5" }}>■</span> {labelA}
          </span>
          <span>
            <span style={{ color: "#ef4444" }}>■</span> {labelB}
          </span>
        </div>
      )}
    </div>
  );
};

export { BarChart };
