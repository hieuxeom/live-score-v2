export const sliceText = (text: string, numsSlice: number = 4): string => {
	const parseText = text.toString();

	try {
		return parseText.length <= numsSlice ? parseText : parseText.slice(0, numsSlice) + "...";
	} catch (error) {
		return "error";
	}
};
