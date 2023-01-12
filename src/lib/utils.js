export const serializeNonPOJOs = (obj) => {
	//return JSON.stringify(JSON.parse(obj));
	return structuredClone(obj)
};