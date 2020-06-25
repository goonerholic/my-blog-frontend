import React, { ReactElement } from 'react';
import EditorContainer from './../containers/write/EditorContainer';
import TagBoxContainer from './../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from './../containers/write/WriteActionButtonsContainer';

interface Props {}

export default function WritePage({}: Props): ReactElement {
	return (
		<div className="container">
			<EditorContainer />
			<TagBoxContainer />
			<WriteActionButtonsContainer />
		</div>
	);
}
