import React from 'react';
import './style.scss';
import EditorCodeSnippet from '../editorCodeSnippet';
import CopyClipboard from '../../assets/images/copyClipboard.svg';
import ClickableImage from '../clickableImage';

const CodeSnippet = (props) => {
    const { languageOption, codeSnippet, installation } = props;

    return (
        <div className="editor-code-snippet-container">
            <EditorCodeSnippet path={languageOption?.name} language={languageOption?.language} value={codeSnippet} installation />
        </div>
    );
};

export default CodeSnippet;
