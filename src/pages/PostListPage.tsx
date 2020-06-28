import React, { ReactElement } from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostListContainer from './../containers/posts/PostListContainer';

export default function PostListPage(): ReactElement {
	return (
		<div>
			<HeaderContainer />
			<PostListContainer />
		</div>
	);
}
