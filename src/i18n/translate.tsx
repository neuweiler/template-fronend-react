import React from 'react'
import {FormattedMessage} from "react-intl";

type Props = {
	id: string,
	value?: {}
}

const translate: React.FC<Props> = ({id, value}) => (
	<FormattedMessage id={id} values={{...value}}/>
)

export default translate;
