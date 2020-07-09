import React, { ReactElement } from 'react';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Post } from '../../lib/api/posts';
import { AsyncState } from '../../lib/reducerUtils';
import { AxiosError } from 'axios';
import { AuthResponse } from '../../lib/api/auth';
import { Link } from 'react-router-dom';
import './PostList.scss';

interface PostItemProps {
	post: Post;
}
interface Props {
	posts: AsyncState<Post[], AxiosError> | null;
	showWriteButton: AuthResponse | null;
}

interface WrapperProps {
	children: any;
}

function PostListWrapper({ children }: WrapperProps): ReactElement {
	return <div className="PostList container">{children}</div>;
}

function PostItem({ post }: PostItemProps): ReactElement {
	const { _id, title, body, tags, publishedDate, user } = post;
	return (
		<div className="PostItem white black-text card hoverable">
			<Link className="black-text" to={`/@${user.username}/${_id}`}>
				<div className="card-content">
					<h5>{title}</h5>
					<p className="truncate">{body}</p>
				</div>
			</Link>
			<div className="sub-area">
				<SubInfo
					username={user.username}
					publishedDate={new Date(publishedDate)}
				/>
				<Tags tags={tags} />
			</div>
		</div>
	);
}

export default function PostList({
	posts,
	showWriteButton,
}: Props): ReactElement {
	if (posts && posts.error) {
		return (
			<PostListWrapper>
				<h2>Error</h2>
				<p>Something went wrong...</p>
			</PostListWrapper>
		);
	}

	return (
		<PostListWrapper>
			<div className="write-post-button-wrapper">
				{showWriteButton && (
					<Link
						to="/write"
						className="btn grey darken-3 waves-effect waves-light"
					>
						Write Post
					</Link>
				)}
			</div>
			<div className="cards">
				{posts?.data &&
					posts.data.map((post) => (
						<PostItem post={post} key={post._id} />
					))}
			</div>
		</PostListWrapper>
	);
}
