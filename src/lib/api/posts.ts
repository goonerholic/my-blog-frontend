import client from './client';

interface WritePostArgs {
	title: string;
	body: string;
	tags: string[];
}

interface WriteResponse extends WritePostArgs {
	_id: string;
	user: {
		_id: string;
		username: string;
	};
}

export const writePost = async ({ title, body, tags }: WritePostArgs) => {
	const response = await client.post<WriteResponse>('/api/posts', {
		title,
		body,
		tags,
	});
	console.log(response);
	return response.data;
};
