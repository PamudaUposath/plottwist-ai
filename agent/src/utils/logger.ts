export function logInfo(eventName: string, data: Record<string, any>) {
  console.log(JSON.stringify({
    level: 'INFO',
    eventName,
    timestamp: new Date().toISOString(),
    ...data,
  }));
}

export function logError(eventName: string, error: any, data?: Record<string, any>) {
  console.error(JSON.stringify({
    level: 'ERROR',
    eventName,
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
    ...data,
  }));
}
