import React, { ReactElement } from 'react';
import HeaderContainer from './../containers/common/HeaderContainer';
import PostViewerContainer from './../containers/post/PostViewerContainer';

export default function PostPage(): ReactElement {
	return (
		<div>
			<HeaderContainer />
			<PostViewerContainer />
		</div>
	);
}
