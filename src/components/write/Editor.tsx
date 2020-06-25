import React, { ReactElement } from 'react';
import ReactQuill from 'react-quill';
import { TextInput } from 'react-materialize';
import 'react-quill/dist/quill.snow.css';
import './Editor.scss';

interface ChangeFieldArgs {
	key: string;
	value: string;
}

interface Props {
	title: string;
	body: string;
	onChangeField: (args: ChangeFieldArgs) => void;
}

export default function Editor({ title, onChangeField }: Props): ReactElement {
	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['blockquote', 'code-block', 'link', 'image'],
		],
	};

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeField({ key: 'title', value: e.target.value });
	};

	return (
		<div className="Editor">
			<TextInput
				inputClassName="title-input"
				placeholder="제목을 입력하세요"
				onChange={onChangeTitle}
				value={title}
			/>
			<div className="quill-wrapper">
				<ReactQuill
					theme="snow"
					modules={modules}
					placeholder="내용을 작성하세요"
					onChange={(content, delta, source) => {
						if (source === 'user') {
							onChangeField({ key: 'body', value: content });
						}
					}}
				/>
			</div>
		</div>
	);
}
