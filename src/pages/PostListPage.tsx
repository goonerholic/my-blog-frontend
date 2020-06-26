import React, { ReactElement } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostList from '../components/posts/PostList';

export default function PostListPage(): ReactElement {
	return (
		<div>
			<HeaderContainer />
			<PostList />
		</div>
	);
}
