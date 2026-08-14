import { describe, it, expect, vi } from 'vitest';
import { handler } from '../src/handler.js';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Lambda Handler Integration', () => {
  it('handles OPTIONS preflight request', async () => {
    const event = {
      httpMethod: 'OPTIONS',
    } as unknown as APIGatewayProxyEvent;

    const res = await handler(event);
    expect(res.statusCode).toBe(200);
    expect(res.headers).toHaveProperty('Access-Control-Allow-Origin');
  });

  it('returns 405 for unsupported HTTP methods', async () => {
    const event = {
      httpMethod: 'GET',
    } as unknown as APIGatewayProxyEvent;

    const res = await handler(event);
    expect(res.statusCode).toBe(405);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('METHOD_NOT_ALLOWED');
  });

  it('returns 400 for invalid payload', async () => {
    const event = {
      httpMethod: 'POST',
      body: JSON.stringify({ action: 'invalid_action' }),
    } as unknown as APIGatewayProxyEvent;

    const res = await handler(event);
    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(false);
    expect(body.error.code).toBe('INVALID_REQUEST');
  });
});
