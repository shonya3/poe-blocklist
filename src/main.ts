import { Name } from './content-scripts/name';

export {};

// name.change('SHONYA3');

class Author {
	name?: Name;
	constructor() {
		this.name = new Name({
			value: 'SHONYA3#2011',
			onChange: ({ discriminated, indiscriminated }) => {
				console.log(`[name change] discriminated: ${discriminated}. without dicr: ${indiscriminated}`);
			},
		});
	}
}

new Author();
