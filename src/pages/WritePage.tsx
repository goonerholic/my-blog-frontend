import React, { ReactElement } from 'react';
import Editor from './../components/write/Editor';
import TagBox from './../components/write/TagBox';

interface Props {}

export default function WritePage({}: Props): ReactElement {
	return (
		<div>
			<Editor />
			<TagBox />
		</div>
	);
}
