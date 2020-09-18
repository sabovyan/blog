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

  const handleKeywordsEnter = () => {};

  return (
    <div className="create">
      <h1 className="create__title">Add your Post</h1>
      <div className="create__form">
        <FormTheme>
          <TextField
            value={title}
            onChange={handleTitleInput}
            variant="outlined"
            label="title"
            className="create__field create__title"
            style={{
              marginBottom: 10,
              width: '80%',
            }}
          />
          <TextField
            value={keywords}
            onChange={handleKeywordsInput}
            onKeyDown={handleKeywordsEnter}
            variant="outlined"
            label="keywords"
            helperText="#Language #Topic #feature"
            className="create__keywords create__field"
            style={{
              marginBottom: 10,
              width: '80%',
            }}
          />
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
