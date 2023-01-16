import { css } from 'lit';

export const styles = css`
	:host {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;

		--color: #a38d6d;
		--color-hover: #fff;
		--button-color-text: var(--color);

		color: var(--color);
	}

	:host([post-style='normal']),
	:host([post-style='full']) {
		gap: 1.2rem;
	}

	.text {
		margin-bottom: 0px;
		color: var(--color);
		font-size: 1.6rem;
		margin-top: 0;
	}

	[part='button'] {
		padding: 0.4rem 0.8rem;
		color: var(--button-color-text);
		font: inherit;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 0.2rem;
		background-color: transparent;
		border: 1px solid var(--button-color-text);
		transition: all 0.3s ease;
	}

	:host [part='button']:hover {
		--button-color-text: var(--color-hover);
	}

	:host([post-style='full']) [part='button'] {
		background-color: var(--color);
		color: #000;
	}

	:host([post-style='full']) [part='button']:hover {
		color: var(--color-hover);
		background-color: transparent;
	}

	:host([post-style='strict']) [part='button'] {
		padding: 0;
		padding-block: 0;
		border: none;
	}

	:host([post-style='min']) [part='button'] {
		padding: 0;
		padding-block: 0;
		border: none;
		opacity: 90%;
		text-transform: none;
	}

	:host([post-style='none']) {
		display: none;
	}

	[part='icons'] {
		display: flex;
		align-items: center;
		gap: 2px;
		justify-content: center;
	}

	:host([post-style='normal']) [part='icons'] {
		font-size: 27px;
	}

	:host([post-style='full']) [part='icons'] {
		font-size: 27px;
	}

	[part='icons']:not(:has(icon-monkey)) {
		transform: translateX(3px);
	}
`;
