import React, { ReactElement } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from './../containers/posts/PostListContainer';
import PaginationContainer from './../containers/posts/PaginationContainer';

export default function PostListPage(): ReactElement {
	return (
		<div>
			<HeaderContainer />
			<PostListContainer />
			<PaginationContainer />
		</div>
	);
}
