import React, { ReactElement } from 'react';
import './PostViewer.scss';
import { Post } from './../../lib/api/posts';
import { AsyncState } from '../../lib/reducerUtils';
import { AxiosError } from 'axios';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Preloader } from 'react-materialize';

interface PostViewerWrapperProps {
	children: any;
}

interface Props {
	post: AsyncState<Post, AxiosError> | null;
	actionButtons: ReactElement | false;
}

function PostViewerWrapper({ children }: PostViewerWrapperProps): ReactElement {
	return <div className="PostViewer container">{children}</div>;
}

export default function PostViewer({
	post,
	actionButtons,
}: Props): ReactElement {
	// error handling
	if (post && post.error) {
		const { error } = post;
		if (error.response && error.response.status === 404) {
			return (
				<PostViewerWrapper>
					존재하지 않는 포스트입니다.
				</PostViewerWrapper>
			);
		}
		return <PostViewerWrapper>오류 발생;;</PostViewerWrapper>;
	}

	// on loading
	if ((post && post.loading) || !post) {
		return (
			<PostViewerWrapper>
				<div className="loaderWrapper">
					<Preloader className="loader" active color="blue" />
				</div>
			</PostViewerWrapper>
		);
	}

	const { title, body, user, publishedDate, tags } = post.data as Post;
	return (
		<PostViewerWrapper>
			<div className="post-head">
				<h2>{title}</h2>
				<SubInfo
					username={user.username}
					publishedDate={new Date(publishedDate)}
					hasMarginTop
				/>
				<Tags tags={tags} />
			</div>
			{actionButtons}
			<div
				className="post-content"
				dangerouslySetInnerHTML={{ __html: body }}
			></div>
		</PostViewerWrapper>
	);
}
