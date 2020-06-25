import React, { ReactElement, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { writePostAsync } from '../../modules/write';
import WriteActionButtons from '../../components/write/WriteActionButtons';

export default withRouter(function WriteActionButtonsContainer({
	history,
}): ReactElement {
	const dispatch = useDispatch();
	const { title, body, tags, post } = useSelector(({ write }: RootState) => ({
		title: write.title,
		body: write.body,
		tags: write.tags,
		post: write.post,
	}));

	const onPublish = () => {
		dispatch(writePostAsync.request({ title, body, tags }));
	};

	const onCancel = () => {
		history.goBack();
	};

	useEffect(() => {
		if (post && post.data) {
			const { _id, user } = post.data;
			history.push(`/@${user.username}/${_id}`);
		}
		if (post && post.error) {
			console.log(post.error);
		}
	}, [history, post]);
	return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
});
