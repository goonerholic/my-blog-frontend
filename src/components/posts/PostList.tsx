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
	showWriteButton: AsyncState<AuthResponse, AxiosError> | null;
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
			<div className="card-content">
				<h4>
					<Link
						className="black-text"
						to={`/@${user.username}/${_id}`}
					>
						{title}
					</Link>
				</h4>
				<SubInfo
					username={user.username}
					publishedDate={new Date(publishedDate)}
				/>
				<Tags tags={tags} />
				<p className="truncate">{body}</p>
			</div>
		</div>
	);
}

export default function PostList({
	posts,
	showWriteButton,
}: Props): ReactElement {
	if (posts && posts.error) {
		return <PostListWrapper>에러났어요...</PostListWrapper>;
	}

	return (
		<div className="PostList container">
			<div className="write-post-button-wrapper">
				{showWriteButton?.data && (
					<Link
						to="/write"
						className="btn grey darken-3 waves-effect waves-light"
					>
						Write Post
					</Link>
				)}
			</div>
			{posts?.data && (
				<div>
					{posts.data.map((post) => (
						<PostItem post={post} key={post._id} />
					))}
				</div>
			)}
		</div>
	);
}
