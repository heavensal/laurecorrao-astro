const CLOSING_CLASS = 'site-dialog-closing';

export function closeDialogAnimated(dialog: HTMLDialogElement) {
	if (!dialog.open || dialog.classList.contains(CLOSING_CLASS)) return;
	dialog.classList.add(CLOSING_CLASS);
	dialog.addEventListener(
		'animationend',
		() => {
			dialog.classList.remove(CLOSING_CLASS);
			dialog.close();
		},
		{ once: true },
	);
}