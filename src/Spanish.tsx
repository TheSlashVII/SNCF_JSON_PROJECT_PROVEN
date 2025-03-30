// import timeTables from './sncfHoraries.json';
import {relevantFields} from "./informationFetch.ts";
import {useState} from "react";

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
function Spanish() {
    const [filterLetter, setFilterLetter] = useState("");
    const filteredList = cleanTimeTables.filter((item) =>
        item.nom_normal.toLowerCase().startsWith(filterLetter.toLowerCase()) // con esto comprobamos si lo que esta dentro de la caja de buscar coincide con alguna estacion
    );
    return (
        <div>
            <header>
                <img
                    src="data:image/png;base64,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"
                    alt="sncf logo"/>
                <div id="subDivisionH">
                    <h2>Horarios de las estaciones</h2>
                </div>
            </header>

            <main>
                <section className="TimeTablesSection">
                    <div className="subContainerA">
                        <h3>Seleccione el día para visualizar los horarios de las estaciones</h3>
                        <div className="subContainerAB">
                            <input type="text" value={filterLetter} onChange={(e) => setFilterLetter(e.target.value)} placeholder="Busca una estacion"/>
                        </div>
                    </div>
                </section>
                <section id="JSON_display">
                    <div className="divContainer">
                        {filteredList.map((item) => (
                            <div>
                                <h3>Nombre de la estación</h3>
                                <h4> {item.nom_normal}</h4>
                                <p>Dia de la semana : {item.jour}</p>
                                <p> <strong>Horario normal</strong> {item.horaire_normal}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

        </div>
    )
}

export default Spanish;