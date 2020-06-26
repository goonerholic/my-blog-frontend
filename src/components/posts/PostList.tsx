import React, { ReactElement } from 'react';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import { Button } from 'react-materialize';
import './PostList.scss';

interface PostItemProps {}
interface Props {}

function PostItem({}: PostItemProps): ReactElement {
	return (
		<div className="post-item">
			<h2>제목</h2>
			<SubInfo username="goonerholic" publishedDate={new Date()} />
			<Tags tags={['태그1', '태그2', '태그3']} />
			<p>포스트 내용의 일부분</p>
		</div>
	);
}

export default function PostList({}: Props): ReactElement {
	return (
		<div className="PostList container">
			<div className="write-post-button-wrapper">
				<Button>Write Post</Button>
			</div>
			<div>
				<PostItem />
				<PostItem />
				<PostItem />
			</div>
		</div>
	);
}
