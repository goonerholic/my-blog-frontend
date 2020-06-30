import React, { ReactElement, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { postAsyncActions, unloadPost } from './../../modules/post';
import PostViewer from '../../components/post/PostViewer';

export default withRouter(function PostViewerContainer({
	match,
}): ReactElement {
	const { postId } = match.params;
	const dispatch = useDispatch();
	const { post } = useSelector(({ post }: RootState) => ({
		post: post.post,
	}));

	useEffect(() => {
		dispatch(postAsyncActions.request(postId));
		return () => {
			dispatch(unloadPost());
		};
	}, [dispatch, postId]);
	return <PostViewer post={post} />;
});
