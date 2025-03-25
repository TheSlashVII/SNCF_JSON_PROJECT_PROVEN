// estos comandos son para recoger los horarios de las estaciones de tren de la sncf (trenes nacionales franceses)
// uso writFile para escribir archivos JSON porque el Bun.write no funciona
import { writeFile } from "fs/promises";

const url:string = "https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/horaires-des-gares1/exports/json";
const timeTablesRaw = await fetch(url).then(response => response.json()).catch( error => console.log(error));
const cleanTimeTables = []; // pasar informacion de los timetables de manera filtrada


console.log(timeTablesRaw);
const endConfig = {
    jsonName: "./sncfHoraries.json",
    jsonSource: JSON.stringify(cleanTimeTables),
}
writeFile(endConfig.jsonName, endConfig.jsonSource);

