import PropTypes from 'prop-types';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

import './editor.css';

const TINY_MCE_API_KEY = import.meta.env.VITE_TINY_MCE_API_KEY;

const EDITOR_AVAILABLE_PLUGINS = [
    'advlist',
    'autolink',
    'lists',
    'link',
    'autoresize',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'help',
    'wordcount',
];

const EDITOR_AVAILABLE_TOOLS =
    'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'table | removeformat | help';

const INITIAL_CONTENT_STYLE =
    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }';

export const Editor = (props) => {
    const { initialValue, onInit, onEditorChange, onUploadImage } = props;

    return (
        <TinyMCEEditor
            onInit={onInit}
            apiKey={TINY_MCE_API_KEY}
            onEditorChange={onEditorChange}
            initialValue={initialValue}
            init={{
                menubar: false,
                automatic_uploads: true,
                images_upload_handler: onUploadImage,
                plugins: EDITOR_AVAILABLE_PLUGINS,
                toolbar: EDITOR_AVAILABLE_TOOLS,
                content_style: INITIAL_CONTENT_STYLE,
                statusbar: true,
                branding: false,
                elementpath: false,
            }}
        />
    );
};

Editor.propTypes = {
    initialValue: PropTypes.string,
    onInit: PropTypes.func,
    onEditorChange: PropTypes.func,
    onUploadImage: PropTypes.func,
};
