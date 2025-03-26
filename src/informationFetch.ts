// estos comandos son para recoger los horarios de las estaciones de tren de la sncf (trenes nacionales franceses)
// uso writFile para escribir archivos JSON porque el Bun.write no funciona
import { writeFile } from "fs/promises"; // primero de debe instalar los paquetes de @types/node con bun o npm
import {Ajv} from "ajv"; // validador
export type relevantFields = {
    nom_normal: string, // nombre de la estacion
    jour:string, // dia de la semana
    horaire_normal: string, // horarios normales
    horaire_ferie:string, // horarios festivos
}

const url:string = "https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/horaires-des-gares1/exports/json";
const timeTablesRaw = await fetch(url).then(response => response.json()).catch( error => console.log(error));
const cleanTimeTables:relevantFields[] = []; // pasar informacion de los timetables de manera filtrada
timeTablesRaw.forEach((station:relevantFields) => {
    // creamos un objeto local que contenga los campos que nos interesen
    let filteredStations:relevantFields = {
        nom_normal: station.nom_normal,
        jour: station.jour,
        horaire_normal: station.horaire_normal,
        horaire_ferie: station.horaire_ferie,
    };
    cleanTimeTables.push(filteredStations);
})

// validacion del JSON

const relevantFieldsSchema = {
    type: "object",
    properties: {
        nom_normal: { type: "string" },
        jour: { type: "string" },
        horaire_normal: { type: "string" },
        // horaire_ferie: { type: "string"  } ,
    },
    required: ["nom_normal", "jour", "horaire_normal"],
}
type objectValidates = {
    stationName: string,
    testPassed: boolean,
}
const validationTestList:objectValidates[] = [];
const ajv = new Ajv();
const validation = ajv.compile(relevantFieldsSchema);
// hare una lista que guarde el nombre de cada objeto de la estacion en una lista
// para ver el resultado de todos los objetos disponibles
cleanTimeTables.forEach(currentStation => {
    let result:objectValidates = {
        stationName: currentStation.nom_normal,
        testPassed:false,
    }
    // si pasa la prueba añadimos un objeto que tenga el nombre de la estacion actual
    // lo añadimos a la lista con el campo de testPassed como true
    // por defecto es falso asi que si no lo pasa siempre sera mentira se campo
    if (validation(currentStation)){
        result.testPassed = true;
        validationTestList.push(result);
    } else {
        validationTestList.push(result);
    }

})
// printamos los resultados
validationTestList.forEach(currentStation => {
    console.log(currentStation);
})

// console.log(timeTablesRaw); // comprobar si se ha filtrado correctamente
// hacemos un mini objeto para configurar
const endConfig = {
    jsonName: "./sncfHoraries.json",
    jsonSource: JSON.stringify(cleanTimeTables),
}
writeFile(endConfig.jsonName, endConfig.jsonSource);

