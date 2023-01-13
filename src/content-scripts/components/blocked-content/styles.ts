import { css } from 'lit';

export const styles = css`
	:host {
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: center;

		--color: #a38d6d;
		--color-hover: #fff;
		--button-color-text: var(--color);

		color: var(--color);
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
		padding-block: 0;
		border: none;
	}

	:host([post-style='min']) [part='button'] {
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
		gap: 5px;
		justify-content: center;
	}
`;
