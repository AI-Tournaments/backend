import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'

const workaroundHeaders = { // Work around for: https://github.com/supabase/supabase/issues/6267
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "POST",
	"Access-Control-Expose-Headers": "Content-Length, X-JSON",
	"Access-Control-Allow-Headers": "apikey, X-Client-Info, Content-Type, Authorization, Accept, Accept-Language, X-Authorization",
}

serve(async (req) => {
	if(req.method === 'OPTIONS'){ // Work around for: https://github.com/supabase/supabase/issues/6267
		return new Response('ok', {
			headers: workaroundHeaders
		});
	}else{
		const { oAuthCode, client_id } = await req.json()

		const fetchResponse = await fetch(new Request('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				code: oAuthCode,
				client_id: client_id,
				client_secret: Deno.env.get('github.clientSecret')
			})
		}))

		return new Response((await fetchResponse.json()).access_token, {
			headers: {
				'Content-Type': 'text/plain',
				...workaroundHeaders
			}
		})
	}
})
