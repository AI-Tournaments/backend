import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { corsAll as headers } from '../_shared/responseHeaders.ts'

serve(async (req) => {
	if(req.method === 'OPTIONS'){
		return new Response('ok', { headers: headers })
	}

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
			...headers
		}
	})
})
