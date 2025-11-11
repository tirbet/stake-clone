import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator';
import { API_URL, sportIds } from '@/lib/config';

import { fetchSportsData, transformGet1x2_VZip, transformSports } from '@/lib/sport/transform-sports';
import { Get1x2_VZip, GetGameZip, GetSportsShortZip } from "@/types/sport.row";
import { transformEvent } from '@/lib/sport/transform-event';


const allowedIds = sportIds();
const app = new Hono({ strict: false })
    .get(
        '/',
        zValidator(
            'query',
            z.object({
                lng: z.string().optional().default('en'),
            })
        ),
        async (c) => {
            const { lng } = c.req.valid('query');
            try {
                // ✅ construct URL with proper query encoding
                const url = new URL(`${API_URL}/LineFeed/GetSportsShortZip`);
                url.search = new URLSearchParams({
                    sports: allowedIds.join(','),
                    lng,
                    withCountries: 'true',
                    country: '19',
                    partner: '152',
                    virtualSports: 'true',
                    gr: '526',
                    groupChamps: 'true',
                }).toString();

                // ✅ fetch data with timeout & proper error handling
                const rawData = await fetchSportsData<GetSportsShortZip>({ url: url.toString() });
                if (!rawData?.Value) return c.json({ error: 'No sports found' }, 404);
                const sports = transformSports(rawData);
                return c.json({ data: sports });
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    return c.json({ error: 'Request timed out' }, 408);
                }
                console.error('Fetch error:', err);
                return c.json({ error: 'Internal Server Error' }, 500);
            }
        }
    )
    .get('/:id',
        zValidator('param',
            z.object({
                id: z.coerce.number().positive()
            })
        ),
        zValidator(
            'query',
            z.object({
                lng: z.string().optional().default('en'),
            })
        ),
        async (c) => {
            const { lng } = c.req.valid('query');
            const { id } = c.req.valid('param');
            // ✅ construct URL with proper query encoding
            const url = new URL(`${API_URL}/LineFeed/Get1x2_VZip`);
            url.search = new URLSearchParams({
                sports: id.toString(),
                count: '50',
                lng,
                mode: '4',
                country: '19',
                partner: '152',
                getEmpty: 'true',
                virtualSports: 'true',
            }).toString();

            const rawData = await fetchSportsData<Get1x2_VZip>({ url: url.toString() });
            if (!rawData?.Value) return c.json({ error: 'No sports found' }, 404);

            const sports = transformGet1x2_VZip(rawData);
            return c.json({ data: sports });
        }
    )
    .get('/:id/leagues', async (c) => {
        return c.json({ data: "all leagues from sport id" + c.req.path })
    })
    .get(
        '/:id/leagues/:leagueId',
        zValidator(
            'query',
            z.object({
                lng: z.string().optional().default('en'),
            })
        ),
        zValidator('param',
            z.object({
                id: z.coerce.number().positive().refine(
                    (val) => allowedIds.includes(val),
                    { message: 'Invalid sport ID' }
                ),
                leagueId: z.coerce.number().positive(),
            })
        ),
        async (c) => {
            const { id, leagueId } = c.req.valid('param');
            const { lng } = c.req.valid('query');
            // ✅ construct URL with proper query encoding
            //Get1x2_VZip?sports=1&champs=118587&count=50&lng=en&mode=4&country=19&partner=152&getEmpty=true&virtualSports=true
            const url = new URL(`${API_URL}/LineFeed/Get1x2_VZip`);
            url.search = new URLSearchParams({
                sports: id.toString(),
                champs: leagueId.toString(),
                count: '50',
                lng,
                mode: '4',
                country: '19',
                partner: '152',
                getEmpty: 'true',
                virtualSports: 'true'
            }).toString();

            const rawData = await fetchSportsData<Get1x2_VZip>({ url: url.toString() });
            if (!rawData?.Value) return c.json({ error: 'No sports found' }, 404);
            const sports = transformGet1x2_VZip(rawData);
            return c.json({ data: sports });

        })
    .get(
        '/game/:gameId',
        zValidator(
            'query',
            z.object({
                lng: z.string().optional().default('en'),
            })
        ),
        zValidator('param',
            z.object({
                gameId: z.coerce.number().positive(),
            })
        ),
        async (c) => {
            const { gameId } = c.req.valid('param');
            const { lng } = c.req.valid('query');
            // ✅ construct URL with proper query encoding
            //partner=152&topGroups=&country=19&marketType=1&isNewBuilder=true
            const url = new URL(`${API_URL}/LineFeed/GetGameZip`);
            url.search = new URLSearchParams({
                id: gameId.toString(),
                lng,
                isSubGames: 'true',
                GroupEvents: 'true',
                countevents: '250',
                grMode: '4',
                partner: '152',
                topGroups: '',
                country: '19',
                marketType: '1',
                isNewBuilder: 'true'
            }).toString();

            const rawData = await fetchSportsData<GetGameZip>({ url: url.toString() });
            if (!rawData?.Value) return c.json({ error: 'No game found' }, 404);
            const event = transformEvent(rawData.Value);
            return c.json({ data: event });

        })
   
export default app;

