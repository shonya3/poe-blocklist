import { css } from 'lit';

export const styles = css`
	:host {
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: center;

		--color: #b3a794;
		--button-text-color: var(--color);

		color: var(--color);
	}

	.button:hover {
		--button-text-color: #fff;
	}

	.text {
		margin-bottom: 0px;
		color: var(--color);
		font-size: 1.6rem;
		margin-top: 0;
	}

	.button {
		padding: 0.4rem 0.8rem;
		color: #333;
		font: inherit;
		text-transform: uppercase;
		cursor: pointer;
		border-radius: 0.2rem;
		border: 1px solid var(--button-text-color);
		background-color: var(--button-text-color);
		transition: all 0.3s ease;
	}
	.button:hover {
		background-color: transparent;
		color: var(--button-text-color);
	}

	:host([post-style='normal']) .button {
		background: transparent;
		color: var(--button-text-color);
	}

	:host([post-style='normal']):hover .button {
		color: #fff;
		border-color: #fff;
	}

	:host([post-style='strict']) .button {
		background: transparent;
		color: var(--button-text-color);
		border: none;
	}

	:host([post-style='strict']):hover .button {
		color: #fff;
	}

	:host([post-style='min']) .button {
		background-color: transparent;
		color: var(--button-text-color);
		border: none;
		text-transform: none;
		font-weight: lighter;
		opacity: 60%;
	}

	:host([post-style='min']):hover .button {
		color: #fff;
	}

	:host([post-style='none']) {
		display: none;
	}

	.icons {
		display: flex;
		align-items: center;
		gap: 5px;
		justify-content: center;
	}
`;
