export const COLOMBIA_TZ = 'America/Bogota';

/** Fecha actual en Colombia (YYYY-MM-DD) */
export function todayColombia(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: COLOMBIA_TZ }).format(new Date());
}

/** Inicio del día en Colombia */
export function colombiaDayStart(dateStr: string): Date {
  return new Date(`${dateStr}T00:00:00-05:00`);
}

/** Fin del día en Colombia */
export function colombiaDayEnd(dateStr: string): Date {
  return new Date(`${dateStr}T23:59:59.999-05:00`);
}

export function todayRangeColombia(): { start: Date; end: Date } {
  const today = todayColombia();
  return { start: colombiaDayStart(today), end: colombiaDayEnd(today) };
}

export function dateRangeColombia(
  from: string,
  to: string,
): { start: Date; end: Date } {
  return { start: colombiaDayStart(from), end: colombiaDayEnd(to) };
}

/** Convierte un instante a fecha calendario en Colombia (YYYY-MM-DD) */
export function toColombiaDateString(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: COLOMBIA_TZ }).format(date);
}
