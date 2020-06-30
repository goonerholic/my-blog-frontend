import React, { ReactElement, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { postAsyncActions, unloadPost } from './../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/write';

export default withRouter(function PostViewerContainer({
	match,
	history,
}): ReactElement {
	const { postId } = match.params;
	const dispatch = useDispatch();
	const { post, user } = useSelector(({ post, user }: RootState) => ({
		post: post.post,
		user: user.user,
	}));

	useEffect(() => {
		dispatch(postAsyncActions.request(postId));
		return () => {
			dispatch(unloadPost());
		};
	}, [dispatch, postId]);

	const onEdit = () => {
		dispatch(setOriginalPost(post?.data));
		history.push('/write');
	};

	const isOwnPost =
		(user && user.data?._id) === (post && post.data?.user._id);
	return (
		<PostViewer
			post={post}
			actionButtons={isOwnPost && <PostActionButtons onEdit={onEdit} />}
		/>
	);
});
