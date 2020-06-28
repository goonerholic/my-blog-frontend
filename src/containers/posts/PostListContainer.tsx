import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules/index';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import { listPostsActions } from './../../modules/posts';
import PostList from './../../components/posts/PostList';

export default withRouter(function PostListContainer({
	location,
	match,
}): ReactElement {
	const dispatch = useDispatch();
	const { posts, user } = useSelector(({ posts, user }: RootState) => ({
		posts: posts.posts,
		user: user.user,
	}));
	useEffect(() => {
		const { username } = match.params;
		const { tag, page } = qs.parse(location.search, {
			ignoreQueryPrefix: true,
		}) as { tag: string; page: string };

		dispatch(listPostsActions.request({ username, tag, page }));
	}, [dispatch, location.search, match.params]);
	return (
		<div>
			<PostList posts={posts} showWriteButton={user} />
		</div>
	);
});
