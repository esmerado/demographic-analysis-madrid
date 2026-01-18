/**
 * @file handlers.jsx
 * @description Archivo encargado de gestionar los handlers de la aplicación.
 * A partir de los datos procesados, se encarga de gestionar las acciones del usuario.
 */

// Vendors
import * as d3 from "d3";
// Utils
import { cleanRows, groupDataByConcept } from "../utils/utils";

/**
 * PROCESAMIENTO DE DATOS CRUDOS.
 * Este bloque gestiona la carga y limpieza del dataset de la Comunidad de Madrid.
 */
const getDataHandlers = ({ setData }) => {
  // Utilizaresmo d3 blobl para cargar el archivo sin procesar ya que contiene carácteres especiales y necesitan ser tratados.
  d3.blob("/data/migration-data-madrid.csv")
    .then(async (blob) => {
      // Convertimos nuestro arhcivos blobl sin procesar a ArrayBuffet para controlar la codificación de los carácteres y decodificarlo para poner utilizar carácteres especiales.
      const buffer = await blob.arrayBuffer();
      const decoder = new TextDecoder("iso-8859-1");
      const text = decoder.decode(buffer);

      // Ahora le daremos formato al texto decodificado utlizando el separados ;.
      const rawData = d3.dsvFormat(";").parse(text);

      // Limpiamos y mapeamos los datos.
      const cleanedRows = cleanRows({ rawData });
      const groupedData = groupDataByConcept(cleanedRows);

      setData(groupedData);
    })
    .catch((err) => {
      console.error("Error cargando el CSV:", err);
    });
};

const DataHandlers = ({ setData }) => ({
  handleGetData: () => getDataHandlers({ setData }),
});

export { DataHandlers };
