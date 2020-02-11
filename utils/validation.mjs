function validation(requiredProps, body) {
	const newArrayRequiredProps = JSON.parse(JSON.stringify(requiredProps));
	const validationMessagesArray = [];
	if (body && typeof body !== 'object') {
		return [
			{
				field: null,
				message: `can not find body object`
			}
		];
	}
	newArrayRequiredProps.forEach(prop => {
		if (body[prop.name] === undefined) {
			validationMessagesArray.push({
				field: prop.name,
				message: `can not find required prop ${prop.name}`
			});
		}
		const currentPropType = typeof body[prop.name];
		if (body[prop.name] && currentPropType !== prop.type) {
			validationMessagesArray.push({
				field: prop.name,
				message: `prop ${prop.name} has incorrect type ${currentPropType}, but it should be ${prop.type}`
			});
		}
	});
	return validationMessagesArray;
}

export default validation;
