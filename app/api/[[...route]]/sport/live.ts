import { Hono } from 'hono';
import z from 'zod';
import { zValidator } from '@hono/zod-validator';
import { API_URL, sportIds } from '@/lib/config';
import { fetchSportsData, transformGet1x2_VZip, transformSports } from '@/lib/sport/transform-sports';
import { Get1x2_VZip, GetSportsShortZip } from '@/types/sport.row';



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
                const url = new URL(`${API_URL}/LiveFeed/GetSportsShortZip`);
                url.search = new URLSearchParams({
                    sports: allowedIds.join(','),
                    lng,
                    gr: '1184',
                    withCountries: 'true',
                    country: '19',
                    partner: '152',
                    virtualSports: 'true',
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
            const url = new URL(`${API_URL}/LiveFeed/Get1x2_VZip`);
            url.search = new URLSearchParams({
                sports: id.toString(),
                count: '50',
                lng,
                gr: '526',
                mode: '4',
                country: '19',
                partner: '152',
                getEmpty: 'true',
                virtualSports: 'true',
                noFilterBlockEvent: 'true',
            }).toString();

            const rawData = await fetchSportsData<Get1x2_VZip>({ url: url.toString() });
            if (!rawData?.Value) return c.json({ error: 'No sports found' }, 404);

            const sports = transformGet1x2_VZip(rawData);
            return c.json({ data: sports });
        }
    )
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
            //LiveFeed/Get1x2_VZip?sports=1&champs=2590430&count=40&lng=en&gr=526&mode=4&country=19&partner=152&getEmpty=true&virtualSports=true&noFilterBlockEvent=true
            const url = new URL(`${API_URL}/LiveFeed/Get1x2_VZip`);
            url.search = new URLSearchParams({
                sports: id.toString(),
                champs: leagueId.toString(),
                count: '50',
                lng,
                gr: '526',
                mode: '4',
                country: '19',
                partner: '152',
                getEmpty: 'true',
                virtualSports: 'true',
                noFilterBlockEvent: 'true'
            }).toString();

            const rawData = await fetchSportsData<Get1x2_VZip>({ url: url.toString() });
            if (!rawData?.Value) return c.json({ error: 'No sports found' }, 404);
            const sports = transformGet1x2_VZip(rawData);
            return c.json({ data: sports });

        })

    .get('/:id/test', async (c) => {

        const body = {
            "Events": [
                {
                    "GameId": 668362977,
                    "Type": 1,
                    "Coef": 1.23,
                    "Param": 0,
                    "PV": null,
                    "PlayerId": 0,
                    "Kind": 1,
                    "InstrumentId": 0,
                    "Seconds": 0,
                    "Price": 0,
                    "Expired": 0,
                    "PlayersDuel": []
                }
            ],
            "Vid": 0,
            "partner": 152,
            "Lng": "bn",
            "CfView": 0,
            "CalcSystemsMin": false,
            "Group": 526,
            "Country": 19,
            "Currency": 115,
            "SaleBetId": 0,
            "IsPowerBet": false,
            "WithLobby": false
        }

        const req = await fetch("https://betwinner.ng/service-api/LiveBet-update/Open/UpdateCoupon", {
            method: 'POST', // 'POST' is more conventional than 'post'
            headers: {
                'Content-Type': 'application/json',
                // Add other headers if required by the API
                // 'Authorization': 'Bearer your-token',
                // 'User-Agent': 'Your-App-Name'
            },
            body: JSON.stringify(body)
        });

        if (!req.ok) {
            throw new Error(`HTTP error! status: ${req.status}`);
        }

        const res = await req.json(); // Don't forget await here!

        return c.json({ data: res });
    })
export default app;