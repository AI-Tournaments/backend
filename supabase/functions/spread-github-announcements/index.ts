import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { corsAll as headers } from '../_shared/responseHeaders.ts'

serve(async (req) => {
	if(req.method === 'OPTIONS'){
		return new Response('ok', { headers: headers })
	}

	const { action, discussion } = await req.json()

	const isCreated = action === 'created'
	const isAnnouncement = discussion.category.id === 37846981

	if(isCreated && isAnnouncement){
		fetch(new Request('https://discord.com/api/webhooks/1000065546252992602/F9dp4eUOMwe7MqRJCr6dyT8Y8Luzh72lWt9rnfwf5jR_8QqX3jNzPm1wPSm9rRCtxkJh', {
			method: 'POST',
			headers: new Headers({
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				content: '**'+discussion.title+'**\n'+discussion.body
			})
		}))
	}

	return new Response(null, {headers: {...headers}})
})
