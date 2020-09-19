import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import FormTheme from '../../components/FormTheme/FormTheme';

import './Create.css';

function Create() {
  const [title, setTitle] = useState('');
  const handleTitleInput = ({ target: { value } }) => setTitle(value);

  const [keywords, setKeywords] = useState('');
  const handleKeywordsInput = ({ target: { value } }) => setKeywords(value);

  const [post, setPost] = useState('');
  const handleTextAreaInput = ({ target: { value } }) => setPost(value);

  const [tags, setTag] = useState([]);
  const handleKeywordsEnter = (event) => {
    const { value } = event.target;
    console.log(event.key);
    if (event.key === 'Enter' || event.key === ' ') {
      if (value.trim() !== '') {
        const newTag = {
          id: 0,
          value,
          isEdit: false,
        };
        setTag((t) => [...t, value.trim()]);
        setKeywords('');
      }
    }
  };

  const handleKeywordDelete = () => {};

  return (
    <div className="create">
      <h1 className="create__title">Add your Post</h1>
      <div className="create__form">
        <FormTheme>
          <TextField
            value={title}
            onChange={handleTitleInput}
            variant="outlined"
            label="Title"
            className="create__field create__field-title"
            style={{
              marginBottom: 10,
              width: '80%',
            }}
          />
          <div className="keywords__container">
            <TextField
              value={keywords}
              onChange={handleKeywordsInput}
              onKeyDown={handleKeywordsEnter}
              variant="outlined"
              label="Keywords"
              helperText="#Language #Topic #feature"
              className="create__keywords create__field"
              style={{
                marginBottom: 10,
                width: '50%',
              }}
            />

            <ul className="added-keywords">
              {tags.map((tag) => (
                <li className="added-keyword" key={tag}>
                  <span>{`#${tag}`}</span>
                  <span
                    onClick={handleKeywordDelete}
                    className="delete-keyword"
                  >
                    &#x292B;
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <textarea
            className="create__textarea"
            value={post}
            onChange={handleTextAreaInput}
            rows={20}
            placeholder="Use markdown syntax for your post"
          />

          <ButtonGroup
            aria-label="button group"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 10,
            }}
          >
            <Button
              color="primary"
              style={{
                border: '1px solid',
                flexGrow: 2,
                fontSize: 20,
                borderRadius: 5,
              }}
            >
              Submit
            </Button>
            <Button
              color="default"
              style={{
                flexGrow: 0.9,
                fontSize: 20,
                borderRadius: 5,
              }}
            >
              Preview
            </Button>
          </ButtonGroup>
        </FormTheme>
      </div>
    </div>
  );
}

export default Create;

function getLastWord(value) {
  const temp = value.trim().split(' ');
  const result = temp.slice(-1);

  return result;
}
