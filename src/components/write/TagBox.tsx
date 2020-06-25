import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { Button } from 'react-materialize';
import './TagBox.scss';

interface TagBoxProps {
	tags: string[];
	onChangeTags: (nextTags: string[]) => void;
}

const TagItem = React.memo(
	({ tag, onRemove }: { tag: string; onRemove: (tag: string) => void }) => (
		<div className="tag-item chip" onClick={() => onRemove(tag)}>
			#{tag}
		</div>
	),
);
const TagList = React.memo(
	({
		tags,
		onRemove,
	}: {
		tags: string[];
		onRemove: (tag: string) => void;
	}) => (
		<div className="tag-list">
			{tags.map((tag) => (
				<TagItem key={tag} tag={tag} onRemove={onRemove} />
			))}
		</div>
	),
);

export default function TagBox({
	tags,
	onChangeTags,
}: TagBoxProps): ReactElement {
	const [input, setInput] = useState('');
	const [localTags, setLocalTags] = useState([] as string[]);

	const insertTag = useCallback(
		(tag) => {
			if (!tag) return;
			if (localTags.includes(tag)) return;
			const nextTags = [...localTags, tag];
			setLocalTags(nextTags);
			onChangeTags(nextTags);
		},
		[localTags, onChangeTags],
	);

	const onRemove = useCallback(
		(tag) => {
			const nextTags = localTags.filter((t) => t !== tag);
			setLocalTags(nextTags);
			onChangeTags(nextTags);
		},
		[localTags, onChangeTags],
	);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	}, []);

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();
			insertTag(input.trim());
			setInput('');
		},
		[input, insertTag],
	);

	useEffect(() => {
		setLocalTags(tags);
	}, [tags]);

	return (
		<div className="TagBox">
			<h4>태그</h4>
			<form onSubmit={onSubmit}>
				<div className="row">
					<input
						className="col s8"
						placeholder="태그를 입력하세요"
						value={input}
						onChange={onChange}
					/>
					<div className="col s4">
						<Button small>추가</Button>
					</div>
				</div>
			</form>
			<TagList tags={localTags} onRemove={onRemove} />
		</div>
	);
}
