import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { changeField } from '../../modules/write';
import TagBox from '../../components/write/TagBox';

export default function TagBoxContainer(): ReactElement {
	const dispatch = useDispatch();
	const tags = useSelector(({ write }: RootState) => write.tags);

	const onChangeTags = (nextTags: string[]) => {
		dispatch(changeField({ key: 'tags', value: nextTags }));
	};
	return <TagBox onChangeTags={onChangeTags} tags={tags} />;
}
