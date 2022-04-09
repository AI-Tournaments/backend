const defaults = {
	'Access-Control-Allow-Methods': 'POST',
	'Access-Control-Allow-Headers': 'apikey, Authorization, X-Client-Info'
}
export const corsAll = {
	...defaults,
	'Access-Control-Allow-Origin': '*'
}
export const corsAITournaments = {
	...defaults,
	'Access-Control-Allow-Origin': 'https://ai-tournaments.github.io'
}
