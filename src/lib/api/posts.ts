import client from './client';
import qs from 'qs';

export interface WritePostArgs {
	title: string;
	body: string;
	tags: string[];
}

export interface UpdatePostArgs extends WritePostArgs {
	_id: string;
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

export interface Post extends WritePostArgs {
	_id: string;
	user: {
		_id: string;
		username: string;
	};
	publishedDate: Date;
}

export async function writePost({ title, body, tags }: WritePostArgs) {
	const response = await client.post<Post>('/api/posts', {
		title,
		body,
		tags,
	});
	return response;
}

export async function readPost(id: string) {
	const response = await client.get<Post>(`/api/posts/${id}`);
	return response;
}

export async function listPost({ page, username, tag }: ListPostArgs) {
	const queryString = qs.stringify({ page, username, tag });
	const response = await client.get<Post[]>(`/api/posts?${queryString}`);
	return response;
}

export async function updatePost({ _id, title, body, tags }: UpdatePostArgs) {
	const response = await client.patch(`/api/posts/${_id}`, {
		title,
		body,
		tags,
	});
	return response;
}

export async function removePost(postId: string) {
	return await client.delete(`/api/posts/${postId}`);
}
