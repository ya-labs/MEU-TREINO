/** Formata uma duração em segundos para o formato mm:ss (ex.: 95 -> "01:35"). */
export function formatSeconds(totalSegundos: number): string {
  const seguro = Math.max(0, Math.floor(totalSegundos));
  const minutos = Math.floor(seguro / 60);
  const segundos = seguro % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}
