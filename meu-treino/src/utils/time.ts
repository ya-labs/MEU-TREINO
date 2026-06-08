/** Formata uma duração em segundos para o formato mm:ss (ex.: 95 -> "01:35"). */
export function formatSeconds(totalSegundos: number): string {
  const seguro = Math.max(0, Math.floor(totalSegundos));
  const minutos = Math.floor(seguro / 60);
  const segundos = seguro % 60;
  return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

/** Formata uma duração em segundos como rótulo curto (ex.: 3138 -> "52 min"). */
export function formatDuracaoMin(totalSegundos: number): string {
  const minutos = Math.max(0, Math.round(totalSegundos / 60));
  return `${minutos} min`;
}

/** Descreve quando algo ocorreu de forma relativa a hoje (ex.: "Hoje", "Ontem", "Há 3 dias"). */
export function formatDiaRelativo(epochMs: number): string {
  const inicioHoje = new Date();
  inicioHoje.setHours(0, 0, 0, 0);

  const inicioData = new Date(epochMs);
  inicioData.setHours(0, 0, 0, 0);

  const dias = Math.round((inicioHoje.getTime() - inicioData.getTime()) / 86400000);

  if (dias <= 0) return 'Hoje';
  if (dias === 1) return 'Ontem';
  if (dias < 7) return `Há ${dias} dias`;

  return new Date(epochMs).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
