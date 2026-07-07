import { cuandoPasa, enviarAlFrontend, iniciar } from './lib/ui.ts';
import { cargarJugadores, obtenerDato, obtenerJugadoresPorIds } from './lib/jugadores.ts';

const ids: number[] = cargarJugadores();
let roster: number[] = [];

export function filtrarPorPosicion(jugadores: number[], posicion: string): number[] {
  let idsFiltrados: number[] = [];
  idsFiltrados=jugadores
  idsFiltrados=cargarJugadores()
  let filtrados: number [] = [];
      if (posicion!==""){

       if (posicion==="G"){
       while(idsFiltrados.length>0){
        let n: number=idsFiltrados.length-1;
         if(obtenerDato(idsFiltrados[n], "posicion")==="G" || obtenerDato(idsFiltrados[n], "posicion")==="G-F" || obtenerDato(idsFiltrados[n], "posicion")==="F-G"){
          filtrados.push(idsFiltrados[n]);
          idsFiltrados.pop();
         }
         else{
          idsFiltrados.pop();
         }
       }
       }
        else if(posicion==="F"){

          while(idsFiltrados.length>0){
        let n: number=idsFiltrados.length-1;
         if(obtenerDato(idsFiltrados[n],"posicion")==="F" || obtenerDato(idsFiltrados[n],"posicion")==="F-G" || obtenerDato(idsFiltrados[n],"posicion")==="G-F" || obtenerDato(idsFiltrados[n],"posicion")==="F-C" || obtenerDato(idsFiltrados[n],"posicion")==="C-F"){
          filtrados.push(idsFiltrados[n]);
          idsFiltrados.pop();
         }
         else{
          idsFiltrados.pop();
         }
       }
        }
        else if(posicion=="C"){

          while(idsFiltrados.length>0){
        let n: number=idsFiltrados.length-1;
         if(obtenerDato(idsFiltrados[n],"posicion")==="C" || obtenerDato(idsFiltrados[n],"posicion")==="F-C" || obtenerDato(idsFiltrados[n],"posicion")==="C-F"){
          filtrados.push(idsFiltrados[n]);
          idsFiltrados.pop();
         }
         else{
          idsFiltrados.pop();
         }
       }

        }
        while(filtrados.length>0){
          let m: number=filtrados.length-1
          idsFiltrados.push(filtrados[m])
          filtrados.pop()
        }
      }
      else{
        idsFiltrados=cargarJugadores()
      
  }
  return idsFiltrados;
}

export function obtenerMejorJugador(jugadores: number[], caracteristica: string): number {
  let mejorId: number = -1;
  let m: number =1000;
  let n: number= 0;
  let ids: number [ ]= jugadores;
  const original: number [] = jugadores;
  
  while (0<original.length){
    if (caracteristica==="pts"){
    while (n<ids.length){
      if (m===Number(obtenerDato(ids[n], "pts"))){
        mejorId=ids[n]
      }
      else{
        ids.pop()
      }
      n++;
    }
  }
  else if (caracteristica==="reb"){
    while (n<ids.length){
      if (m===Number(obtenerDato(ids[n], "reb"))){
        mejorId=ids[n]
      }
      else{
        ids.pop()
      }
    }
    n++;
  }
  else if (caracteristica==="ast"){
    while (n<ids.length){
      if (m===Number(obtenerDato(ids[n], "ast"))){
        mejorId=ids[n]
      }
      else{
        ids.pop()
      }
    }
  }
  else{
    mejorId=-1
  }
  m=m-0.1
}
    
 
  return mejorId;
}

cuandoPasa('filtrar', ({ posicion }: Record<string, string>) => {
  let idsFiltrados: number[] = filtrarPorPosicion(ids, posicion);
  enviarAlFrontend('jugadores', obtenerJugadoresPorIds(idsFiltrados));
});

cuandoPasa('agregar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  let estaEn: boolean = false;
  for (let i: number = 0; i < roster.length; i++) {
    if (roster[i] === idNumero) {
      estaEn = true;
    }
  }
  if (roster.length < 5 && !estaEn) {
    let nuevoRoster: number[] = [];
    for (let i: number = 0; i < roster.length; i++) {
      nuevoRoster.push(roster[i]);
    }
    nuevoRoster.push(idNumero);
    roster = nuevoRoster;
  }
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('quitar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  roster = roster.filter((rid: number) => rid !== idNumero);
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('limpiarRoster', () => {
  roster = [];
  enviarAlFrontend('roster', []);
});

// ---- Zona de pruebas ----
// Podés probar obtenerMejorJugador acá antes de arrancar el servidor.
// Usá ids directamente o filtrá por posición ('G', 'F', 'C').
let idsPrueba: number[] = ids; // COMPLETAR
let mejorJugador: number = obtenerMejorJugador(idsPrueba, 'pts'); // COMPLETAR
console.log(mejorJugador);
// -------------------------

iniciar();
