import { useState } from "react";
import "./App.css";
import { defaultMarkdown } from "./assets/DefaultMarkdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Toolbar = ({ icon, text, onClick }) => (
  <div className="toolbar">
    {text}
    <FontAwesomeIcon className="toolbar-icon" icon={icon} onClick={onClick} />
  </div>
);

const Editor = ({ markdown, onChange }) => (
  <textarea
    id="editor"
    value={markdown}
    onChange={onChange}
    type="text"
  ></textarea>
);

const Previewer = ({ markdown }) => (
  <div id="preview">
    <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
  </div>
);

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleEdtorMaximize = () => {
    setEditorMaximized(!editorMaximized);
  };

  const handlePreviewMaximize = () => {
    setPreviewMaximized(!previewMaximized);
  };

  const editorClasses = editorMaximized
    ? "editorWrap maximized"
    : previewMaximized
    ? "editorWrap hide"
    : "editorWrap";
  const previewClasses = previewMaximized
    ? "previewWrap maximized"
    : editorMaximized
    ? "previewWrap hide"
    : "previewWrap";

  return (
    <div>
      <div className={editorClasses}>
        <Toolbar
          text="Editor"
          icon={editorMaximized ? faCompress : faArrowsAlt}
          onClick={handleEdtorMaximize}
        />
        <Editor onChange={handleChange} markdown={markdown} />
      </div>
      <div className="converter"></div>
      <div className={previewClasses}>
        <Toolbar
          text="Previewer"
          icon={previewMaximized ? faCompress : faArrowsAlt}
          onClick={handlePreviewMaximize}
        />
        <Previewer markdown={markdown} />
      </div>
    </div>
  );
}

export default App;
