/** Vercel reserva TZ; usar APP_TIMEZONE si necesitas override */
export function getAppTimezone(): string {
  return process.env.APP_TIMEZONE ?? 'America/Bogota';
}

export function applyProcessTimezone(): void {
  process.env.TZ = getAppTimezone();
}
