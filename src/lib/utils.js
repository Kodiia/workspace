export const serializeNonPOJOs = (obj) => {
	//return JSON.stringify(JSON.parse(obj));
	return JSON.parse(JSON.stringify(obj))
	// return structuredClone(obj)
};