import React, { ReactElement } from 'react';
import ReactQuill from 'react-quill';
import { TextInput } from 'react-materialize';
import 'react-quill/dist/quill.snow.css';
import './Editor.scss';

interface Props {}

export default function Editor({}: Props): ReactElement {
	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['blockquote', 'code-block', 'link', 'image'],
		],
	};
	return (
		<div className="Editor container">
			<TextInput
				inputClassName="title-input"
				placeholder="제목을 입력하세요"
			/>
			<div className="quill-wrapper">
				<ReactQuill
					theme="snow"
					modules={modules}
					placeholder="내용을 작성하세요"
				/>
			</div>
		</div>
	);
}
