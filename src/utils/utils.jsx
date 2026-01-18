// Vendors
import * as d3 from "d3";

/**
 * @file utils.jsx
 * @description Archivo encargado de gestionar las utilidades de la aplicación.
 * Contiene funciones auxiliares para el procesamiento y manipulación de datos o visualizaciones.
 */

// Función para encontrar columnas que tengan carácteres extraños en el nombre.
const findDataValue = (row, keyPart) => {
  const key = Object.keys(row).find((k) =>
    k.toLowerCase().includes(keyPart.toLowerCase()),
  );
  return row[key];
};

// Función para la limpieza y mapeado de los datos.
const cleanRows = ({ rawData }) =>
  rawData
    .map((d) => ({
      concepto: findDataValue(d, "concepto") || "Desconocido",
      nombre: findDataValue(d, "territorio") || "Desconocido",
      año: findDataValue(d, "año"),
      valor: +findDataValue(d, "valor") || 0,
    }))
    // Filtramos filas vacías o totales que no nos interesan para nuestra visualización.
    .filter((d) => d.nombre !== "" && d.nombre !== "Total");

// Función para obtener todos los conceptos únicos que existen en el dataset.
const getUniqueConcepts = (rawData) => {
  if (!rawData || rawData.length === 0) return [];

  // Identificamos la columna "Concepto" para evitar fallos de encoding.
  const conceptoKey = Object.keys(rawData[0]).find((k) =>
    k.toLowerCase().includes("concepto"),
  );

  if (!conceptoKey) return [];

  // Extraemos valores únicos.
  const conceptosUnicos = [...new Set(rawData.map((d) => d[conceptoKey]))];

  // Filtramos por si exsiten valores vacíos y ordenamos alfabéticamente.
  return conceptosUnicos.filter((c) => c && c.trim() !== "").sort();
};

// Función para obtener un objeto con las claves de los conceptos.
const getConceptKeysObject = (rawData) =>
  // Mapeamos los conceptos únicos a un objeto con arrays vacíos.
  getUniqueConcepts(rawData).reduce((acc, concept) => {
    acc[concept] = [];
    return acc;
  }, {});

// Organiza todo el dataset agrupándolo por el campo Concepto.
const groupDataByConcept = (rawData) => {
  if (!rawData || rawData.length === 0) return [];
  // Identificación dinámica de llaves.
  const conceptoKey = Object.keys(rawData[0]).find((k) =>
    k.toLowerCase().includes("concepto"),
  );

  // Agrupamos con D3 y convertimos inmediatamente a Array
  const groupedMap = d3.group(rawData, (d) => d[conceptoKey]);

  // Transformamos el Map en un Array de objetos estructurados
  return Array.from(groupedMap, ([nombre, lista]) => ({
    concepto: nombre,
    registros: lista,
  }));
};

export {
  getUniqueConcepts,
  getConceptKeysObject,
  findDataValue,
  cleanRows,
  groupDataByConcept,
};
