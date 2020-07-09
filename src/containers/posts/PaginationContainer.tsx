import React, { ReactElement } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { RootState } from '../../modules/index';
import Pagination from '../../components/posts/Pagination';

export default withRouter(function PaginationContainer({
	location,
	match,
}): ReactElement {
	const { username } = match.params;
	const { lastPage, posts } = useSelector(({ posts }: RootState) => ({
		lastPage: posts.posts?.lastPage,
		posts: posts.posts,
	}));

	if (!posts || posts.loading) return <div></div>;
	if (posts && posts.error) return <div></div>;

	const { tag, page = 1 } = qs.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	return (
		<Pagination
			page={parseInt(page as string, 10)}
			lastPage={lastPage as number}
			username={username}
			tag={tag as string}
		/>
	);
});
