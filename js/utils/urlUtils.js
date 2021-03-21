export function getQuery(key) {
	return new URLSearchParams(document.location.search).get(key);
}
