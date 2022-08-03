import { CopyBlock, atomOneLight } from 'react-code-blocks';

const EditorCodeSnippet = (props) => {
    return props?.value ? <CopyBlock text={props?.value} language={props?.language} showLineNumbers={!props.installation} theme={atomOneLight} /> : <> </>;
};

export default EditorCodeSnippet;
