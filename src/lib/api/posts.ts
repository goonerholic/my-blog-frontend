import client from './client';
import qs from 'qs';

export interface WritePostArgs {
	title: string;
	body: string;
	tags: string[];
}

export interface WriteResponse extends WritePostArgs {
	_id: string;
	user: {
		_id: string;
		username: string;
	};
}

export interface ListPostArgs {
	page: string;
	username: string;
	tag: string;
}

export interface Post {
	_id: string;
	title: string;
	body: string;
	tags: string[];
	user: {
		_id: string;
		username: string;
	};
	publishedDate: Date;
}

export async function writePost({ title, body, tags }: WritePostArgs) {
	const response = await client.post<WriteResponse>('/api/posts', {
		title,
		body,
		tags,
	});
	return response.data;
}

export async function readPost(id: string) {
	const response = await client.get<Post>(`/api/posts/${id}`);
	return response.data;
}

export async function listPost({ page, username, tag }: ListPostArgs) {
	const queryString = qs.stringify({ page, username, tag });
	const response = await client.get<Post[]>(`/api/posts?${queryString}`);
	return response.data;
}
