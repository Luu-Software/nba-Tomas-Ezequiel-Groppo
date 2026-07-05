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
  nuevoRoster=roster
  let restantes: number[]=[];
  
   if (nuevoRoster.length>0){
    while (0<nuevoRoster.length){
      let m:number=nuevoRoster.length-1
      if (nuevoRoster[m] !== id){
        restantes.push(nuevoRoster[m])
        nuevoRoster.pop()
      }
      else{
        nuevoRoster.pop()
      }
      
    }
    while (0<restantes.length){
      let s: number=restantes.length-1
      nuevoRoster.push(restantes[s]);
      restantes.pop()
    }
   }
   else{
     nuevoRoster=roster;
   }

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
