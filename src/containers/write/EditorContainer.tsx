import React, { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules/index';
import { initialize, changeField } from '../../modules/write';
import Editor from '../../components/write/Editor';

interface Props {}

export default function EditorContainer(): ReactElement {
	const dispatch = useDispatch();
	const { title, body } = useSelector(({ write }: RootState) => ({
		title: write.title,
		body: write.body,
	}));

	const onChangeField = useCallback(
		(payload) => dispatch(changeField(payload)),
		[dispatch],
	);

	// clean up write state when unmount.
	useEffect(() => {
		return () => {
			dispatch(initialize());
		};
	}, [dispatch]);
	return <Editor onChangeField={onChangeField} title={title} body={body} />;
}
