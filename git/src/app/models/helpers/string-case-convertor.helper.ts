import { camelCase, kebabCase, lowerCase, snakeCase, startCase, upperCase, upperFirst } from "lodash";

export const StringCaseConvertor = {
	camelCase: (str: string) => camelCase(str),
	titleCase: (str: string) => startCase(camelCase(str)),
	pascalCase: (str: string) => startCase(camelCase(str)).replace(/ /g, ""),
	constantCase: (str: string) => upperCase(str).replace(/ /g, "_"),
	dotCase: (str: string) => lowerCase(str).replace(/ /g, "."),
	kebabCase: (str: string) => kebabCase(str),
	lowerCase: (str: string) => lowerCase(str).replace(/ /g, ""),
	pathCase: (str: string) => lowerCase(str).replace(/ /g, "/"),
	snakeCase: (str: string) => snakeCase(str),
	sentenceCase: (str: string) => upperFirst(lowerCase(str))
};

/*
	To explain StringCaseConvertor: lets consider the following as the variable:
	const str = 'lives-Down_by the.River';

	Outputs Examples:
		camelCase (livesDownByTheRiver)
		Title Case (Lives Down By The River)
		PascalCase (LivesDownByTheRiver)
		CONSTANT_CASE (LIVES_DOWN_BY_THE_RIVER)
		dot.case (lives.down.by.the.river)
		kebab-case (lives-down-by-the-river)
		lowercase (livesdownbytheriver)
		path/case (lives/down/by/the/river)
		snake_case (lives_down_by_the_river)
*/
