import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';

export default function HeaderContainer(): ReactElement {
	const { user } = useSelector(({ user }: RootState) => ({
		user: user.user.data,
	}));
	const dispatch = useDispatch();
	const onLogout = () => {
		dispatch(logout());
	};

	return <Header user={user} onLogout={onLogout} />;
}
