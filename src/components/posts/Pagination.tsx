import React, { ReactElement } from 'react';
import qs from 'qs';
// import { Pagination } from 'react-materialize'
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
import './Pagination.scss';

interface Props {
	page: number;
	lastPage: number;
	username: string;
	tag: string;
}

function buildLink({
	username,
	tag,
	page,
}: {
	username: string;
	tag: string;
	page: number;
}) {
	const query = qs.stringify({ tag, page });
	return username ? `/@${username}?${query}` : `/?${query}`;
}

export default function Pagination({
	page,
	lastPage,
	username,
	tag,
}: Props): ReactElement {
	return (
		<div className="Pagination container">
			<ul className="pagination">
				{page === 1 ? (
					<li className="left-btn disabled">
						<Icon>chevron_left</Icon>
					</li>
				) : (
					<li className="left-btn">
						<Link to={buildLink({ username, tag, page: page - 1 })}>
							<Icon>chevron_left</Icon>
						</Link>
					</li>
				)}
				{Array(lastPage)
					.fill(0)
					.map((value, index) => (
						<li
							key={index}
							className={`waves-effect${
								index + 1 === page
									? ' grey darken-3 active'
									: ''
							}`}
						>
							<Link
								to={buildLink({
									username,
									tag,
									page: index + 1,
								})}
							>
								{index + 1}
							</Link>
						</li>
					))}
				{page === lastPage ? (
					<li className="right-btn disabled">
						<Icon>chevron_right</Icon>
					</li>
				) : (
					<li className="right-btn">
						<Link to={buildLink({ username, tag, page: page + 1 })}>
							<Icon>chevron_right</Icon>
						</Link>
					</li>
				)}
			</ul>

			{/* <Pagination
				activePage={page}
				items={lastPage}
				leftBtn={
					page === 1 ? (
						<Icon>chevron_left</Icon>
					) : (
						<Link
							to={
								page === lastPage
									? ''
									: buildLink({
											username,
											tag,
											page: page - 1,
									  })
							}
						>
							<Icon>chevron_left</Icon>
						</Link>
					)
				}
				rightBtn={
					page === lastPage ? (
						<Icon>chevron_right</Icon>
					) : (
						<Link
							to={
								page === lastPage
									? ''
									: buildLink({
											username,
											tag,
											page: page + 1,
									  })
							}
						>
							<Icon>chevron_right</Icon>
						</Link>
					)
				}
			/> */}
			{/* <Link
				className={`btn${page === 1 ? ' disabled' : ''}`}
				to={
					page === 1
						? ''
						: buildLink({ username, tag, page: page - 1 })
				}
			>
				<i className="material-icons">chevron_left</i>
			</Link>
			<div className="page-number">{page}</div>
			<Link
				className={`btn${page === lastPage ? ' disabled' : ''}`}
				to={
					page === lastPage
						? ''
						: buildLink({ username, tag, page: page + 1 })
				}
			>
				<i className="material-icons">chevron_right</i>
			</Link> */}
		</div>
	);
}
