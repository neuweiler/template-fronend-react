import React, {Fragment} from "react";
import {IntlProvider} from "react-intl";

import {LOCALES} from './locales';
import {messages} from './messages';

type Props = {
	locale?: string
}

const I18nProvider: React.FC<Props> = ({locale = LOCALES.ENGLISH, children}) => (
	<IntlProvider locale={locale} textComponent={Fragment} messages={messages[locale]}>
		{children}
	</IntlProvider>
);

export default I18nProvider;
