import { useEffect, useRef, useState } from 'react';

/**
 * Cronômetro regressivo simples. Conta de `duracaoSegundos` até 0 e dispara
 * `onComplete` uma única vez ao chegar no fim.
 */
export function useRestTimer(duracaoSegundos: number, onComplete: () => void) {
  const [restante, setRestante] = useState(duracaoSegundos);
  const onCompleteRef = useRef(onComplete);
  const concluidoRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (restante <= 0) {
      if (!concluidoRef.current) {
        concluidoRef.current = true;
        onCompleteRef.current();
      }
      return;
    }
    const timer = setTimeout(() => setRestante((valor) => valor - 1), 1000);
    return () => clearTimeout(timer);
  }, [restante]);

  return restante;
}
