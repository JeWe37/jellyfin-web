import { appRouter } from './router/appRouter';
import browser from '../scripts/browser';
import dialog from './dialog/dialog';
import globalize from '../scripts/globalize';

export default async function (text, title) {
    // Modals seem to be blocked on Web OS and Tizen 2.x
    const canUseNativeAlert = !!(
        !browser.web0s
        && !(browser.tizenVersion && browser.tizenVersion < 3)
        && browser.tv
        && window.alert
    );

    const options = typeof text === 'string' ? { title, text } : text;

    await appRouter.ready();

    if (canUseNativeAlert) {
        alert((options.text || '').replaceAll('<br/>', '\n'));

        return Promise.resolve();
    }

    const items = [
        {
            name: globalize.translate('ButtonGotIt'),
            id: 'ok',
            type: 'submit'
        }
    ];

    options.buttons = items;

    return dialog.show(options);
}
