import React, { ReactElement, useCallback, useState } from 'react';
import { TextInput, Button } from 'react-materialize';
import './TagBox.scss';

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
				<TagItem tag={tag} onRemove={onRemove} />
			))}
		</div>
	),
);

export default function TagBox(): ReactElement {
	const [input, setInput] = useState('');
	const [localTags, setLocalTags] = useState([] as string[]);

	const insertTag = useCallback(
		(tag) => {
			if (!tag) return;
			if (localTags.includes(tag)) return;
			setLocalTags([...localTags, tag]);
		},
		[localTags],
	);

	const onRemove = useCallback(
		(tag) => {
			setLocalTags(localTags.filter((t) => t !== tag));
		},
		[localTags],
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

	return (
		<div className="TagBox container">
			<h4>태그</h4>
			<form onSubmit={onSubmit}>
				<div className="row valign-wrapper">
					<TextInput
						placeholder="태그를 입력하세요"
						value={input}
						onChange={onChange}
					/>
					<Button>추가</Button>
				</div>
			</form>
			<TagList tags={localTags} onRemove={onRemove} />
		</div>
	);
}
