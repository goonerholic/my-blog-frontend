import React, { ReactElement } from 'react';
import '../../global';
import ReactQuill, { Quill } from 'react-quill';
import { TextInput } from 'react-materialize';
import MarkdownShortcuts from 'quill-markdown-shortcuts';

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

const hljs = (window as any).hljs as HLJSApi;

hljs.configure({
	languages: ['python', 'ts', 'js'],
});

export default function Editor({
	title,
	body,
	onChangeField,
}: Props): ReactElement {
	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['blockquote', 'code-block', 'link', 'image'],
		],
		syntax: true,
		clipboard: {
			matchVisual: false,
		},
	};

	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChangeField({ key: 'title', value: e.target.value });
	};

	Quill.register('modules/markdownShortcuts', MarkdownShortcuts);

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
					defaultValue={body}
					tabIndex={0}
				/>
			</div>
		</div>
	);
}
