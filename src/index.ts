import { cuandoPasa, enviarAlFrontend, iniciar } from './lib/ui.ts';
import { cargarJugadores, obtenerJugadoresPorIds } from './lib/jugadores.ts';

const ids: number[] = cargarJugadores();
let roster: number[] = [];

export function estaEnRoster(roster: number[], id: number): boolean {
   let n: number=0;
   let esta:boolean=false;
   while (n<roster.length){
    
    if (roster[n]===id){
      esta=true
    }
    else{
      esta=false
    }
      n++;
   }
   
  
  return esta;
}

export function agregarAlRoster(roster: number[], id: number): number[] {
  let nuevoRoster: number[] = [];
  if (roster.length<5){
  nuevoRoster=roster;
  nuevoRoster.push(id);
  }
  else{
    nuevoRoster=roster;
  }
   
  return nuevoRoster;
}

export function quitarDelRoster(roster: number[], id: number): number[] {
  let nuevoRoster: number[] = []; 
  let n: number = 0;
  let restantes: number[]=[];
  let m:number=5
  nuevoRoster=roster
  
   if (nuevoRoster.length>0){
    while (0<nuevoRoster.length){
      if (nuevoRoster[m] !== id){
        restantes.push(nuevoRoster[m])
        nuevoRoster.pop
        m=m-1;
      }
      else{
        nuevoRoster.pop 
      }
      
    }
    while (n<m){
      nuevoRoster.push(restantes[n]);
      n++;
    }
   }
   else{
     nuevoRoster=nuevoRoster;
   }
  // COMPLETAR
  return nuevoRoster;
}

cuandoPasa('filtrar', () => {
  enviarAlFrontend('jugadores', obtenerJugadoresPorIds(ids));
});

cuandoPasa('agregar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  if (roster.length < 5 && !estaEnRoster(roster, idNumero)) {
    roster = agregarAlRoster(roster, idNumero);
  }
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('quitar', ({ id }: Record<string, string>) => {
  let idNumero: number = Number(id);
  roster = quitarDelRoster(roster, idNumero);
  enviarAlFrontend('roster', obtenerJugadoresPorIds(roster));
});

cuandoPasa('limpiarRoster', () => {
  roster = [];
  enviarAlFrontend('roster', []);
});

iniciar();
