import { Hono } from 'hono';
import {
    deleteCookie,
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    generateCookie,
    generateSignedCookie,
} from 'hono/cookie'
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
                },
                next: { revalidate: param.status === 'live' ? 10 : 20 }
            })
            if (error) {
                return c.json({
                    error: error.error
                }, 422)
            }
            return c.json({ data })
        })
    .get('/recommendations/:status',
        zValidator('param', z.object({
            status: z.enum(['live', 'upcoming'])
        })),
        zValidator('query', z.object({
            locale: z.enum(['en', 'bn', 'hi']).default('en').optional()
        })),
        async (c) => {
            const param = c.req.valid('param');
            const { locale } = c.req.valid('query');
            const { data, error } = await apiClient.GET('/sports/recommendations/{status}', {
                params: {
                    query: {
                        locale
                    },
                    path: { ...param }
                },
                next: { revalidate: param.status === 'live' ? 10 : 20 }
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
                },
                next: { revalidate: param.status === 'live' ? 10 : 20 }
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
                },
                next: { revalidate: param.status === 'live' ? 10 : 20 }
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
                },
                next: { revalidate: param.status === 'live' ? 10 : 20 }
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
                },
                next: { revalidate: param.status === 'live' ? 10 : 20 }
            })
            if (error) {
                return c.json({
                    error: error.error
                }, 422)
            }
            return c.json({ data })
        })

    .post('/',
        zValidator('json', z.object({
            coupon: z.array(z.object({
                GameId: z.number(),
                Type: z.number(),
                Coef: z.number(),
                Param: z.number().default(0),
                PV: z.number().nullable().default(0),
                PlayerId: z.number().default(0),
                Kind: z.number(),
                InstrumentId: z.number().default(0),
                Seconds: z.number().default(0),
                Price: z.number().default(0),
                Expired: z.number().default(0),
                PlayersDuel: z.array(z.any()).default([])
            }))
        })),
        async (c) => {
            const body = c.req.valid('json');
            const { data, error } = await apiClient.POST('/sports/coupon', {
                body: {
                    Events: body.coupon
                }
            });
            if (error) {
                return c.json(error.error, 422);
            }
            setCookie(c, 'sport_coupon', JSON.stringify(data.data))
            return c.json(data)
        })


export default app;