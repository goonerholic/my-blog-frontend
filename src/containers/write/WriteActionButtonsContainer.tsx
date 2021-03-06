import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { writePost, updatePost } from '../../modules/write';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { withRouter } from 'react-router-dom';

export default withRouter(function WriteActionButtonsContainer({
	history,
}): ReactElement {
	const dispatch = useDispatch();
	const { title, body, tags, post, originalPostId } = useSelector(
		({ write }: RootState) => ({
			title: write.title,
			body: write.body,
			tags: write.tags,
			post: write.post,
			originalPostId: write.originalPostId,
		}),
	);

	const onPublish = () => {
		if (originalPostId) {
			dispatch(
				updatePost.request({ _id: originalPostId, title, body, tags }),
			);
			return;
		}
		dispatch(writePost.request({ title, body, tags }));
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

	return (
		<WriteActionButtons
			onPublish={onPublish}
			onCancel={onCancel}
			isEdit={!!originalPostId}
			title={title}
			body={body}
			tags={tags}
		/>
	);
});
