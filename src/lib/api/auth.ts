import client from './client';

interface FormInput {
	username: string;
	password: string;
}

export function login({ username, password }: FormInput) {
	client.post('/api/auth/login', { username, password });
}

export function register({ username, password }: FormInput) {
	client.post('/api/auth/register', { username, password });
}

export function check() {
	client.get('/api/auth/check');
}
