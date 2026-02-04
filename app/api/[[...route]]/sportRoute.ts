import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import z from 'zod';
import { apiClient } from '@/lib/api-client';

const app = new Hono({ strict: false })
    .get('/top/:status',
        zValidator('param', z.object({
            status: z.enum(['live', 'upcoming'])
        })),
        zValidator('query', z.object({
            locale: z.enum(['en', 'bn', 'hi']).default('en').optional()
        })),
        async (c) => {
            const param = c.req.valid('param');
            const { locale } = c.req.valid('query');
            const { data, error } = await apiClient.GET('/sports/top/{status}', {
                params: {
                    query: {
                        locale
                    },
                    path: { ...param }
                }
            })
            if (error) {
                return c.json({
                    error: error.error
                }, 422)
            }
            return c.json({ data })
        })
    .get('/:status',
        zValidator('param', z.object({
            status: z.enum(['live', 'upcoming'])
        })),
        zValidator('query', z.object({
            locale: z.enum(['en', 'bn', 'hi']).default('en').optional()
        })),
        async (c) => {
            const param = c.req.valid('param');
            const { locale } = c.req.valid('query');
            const { data, error } = await apiClient.GET('/sports/{status}', {
                params: {
                    query: {
                        locale
                    },
                    path: { ...param }
                }
            })
            if (error) {
                return c.json({
                    error: error.error
                }, 422)
            }
            return c.json({ data })
        })
    .get('/:status/:sport',
        zValidator('param', z.object({
            status: z.enum(['live', 'upcoming']),
            sport: z.string()
        })),
        zValidator('query', z.object({
            locale: z.enum(['en', 'bn', 'hi']).default('en').optional()
        })),
        async (c) => {
            const param = c.req.valid('param');
            const { locale } = c.req.valid('query');
            const { data, error } = await apiClient.GET('/sports/{status}/{sport}', {
                params: {
                    query: {
                        locale
                    },
                    path: { ...param }
                }
            })
            if (error) {
                return c.json({
                    error: error.error
                }, 422)
            }
            return c.json({ data })
        })
    .get('/:status/:sport/:league',
        zValidator('param', z.object({
            status: z.enum(['live', 'upcoming']),
            sport: z.string(),
            league: z.string()
        })),
        zValidator('query', z.object({
            locale: z.enum(['en', 'bn', 'hi']).default('en').optional()
        })),
        async (c) => {
            const param = c.req.valid('param');
            const { locale } = c.req.valid('query');
            const { data, error } = await apiClient.GET('/sports/{status}/{sport}/{league}', {
                params: {
                    query: {
                        locale
                    },
                    path: { ...param }
                }
            })
            if (error) {
                return c.json({
                    error: error.error
                }, 422)
            }
            return c.json({ data })
        })
    .get('/:status/:sport/:league/:game',
        zValidator('param', z.object({
            status: z.enum(['live', 'upcoming']),
            sport: z.string(),
            league: z.string(),
            game: z.string(),
        })),
        zValidator('query', z.object({
            locale: z.enum(['en', 'bn', 'hi']).default('en').optional()
        })),
        async (c) => {
            const param = c.req.valid('param');
            const { locale } = c.req.valid('query');
            const { data, error } = await apiClient.GET('/sports/{status}/{sport}/{league}/{game}', {
                params: {
                    query: {
                        locale
                    },
                    path: { ...param }
                }
            })
            if (error) {
                return c.json({
                    error: error.error
                }, 422)
            }
            return c.json({ data })
        })

export default app;