import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import uniqueId from 'lodash/uniqueId';
import FormTheme from '../../components/FormTheme/FormTheme';

import Tags from '../../components/Tags/Tags';
import './Create.css';

function Create() {
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [post, setPost] = useState('');
  const [tags, setTags] = useState([]);
  const [keywordError, setKeywordError] = useState(null);

  const handleTitleInput = useCallback(
    ({ target: { value } }) => setTitle(value),
    []
  );

  const handleKeywordsInput = useCallback(
    ({ target: { value } }) => setKeywords(value),
    []
  );

  /* TODO check if this function needs useCallback */
  const handleTextAreaInput = ({ target: { value } }) => setPost(value);

  const handleKeywordsEnter = (event) => {
    setKeywordError(null);

    const { value } = event.target;
    const { key } = event;

    if (key === 'Enter' || key === ' ') {
      if (value.trim() !== '') {
        const newTag = {
          id: uniqueId('tag_'),
          value: value.trim(),
          isEdit: false,
        };
        for (const tag of tags) {
          if (tag.value === value) {
            setKeywordError('there two tags that are the same');
            return;
          }
        }

        if (tags.length <= 2) {
          setTags((t) => [...t, newTag]);
          setKeywords('');
        } else {
          setKeywordError('Only three tags are allowed');
          setKeywords('');
        }
      }
    }
  };

  const handleTagDelete = (id) => () => {
    setTags((tags) => tags.filter((tag) => tag.id !== id));
  };

  const handleTagEdit = (id) => () => {
    setTags((tags) =>
      tags.map((t) =>
        t.id === id ? { ...t, isEdit: !t.isEdit, draftValue: t.value } : t
      )
    );
  };

  const handleTagEditInput = (id) => (event) => {
    const { value } = event.target;
    setTags(
      tags.map((t) => {
        return t.id === id ? { ...t, draftValue: value } : t;
      })
    );
  };

  const handleTagSubmitInput = (id) => (event) => {
    const { value } = event.target;
    const { key } = event;
    console.log(key);

    if (key === 'Enter' || key === ' ') {
      if (value.trim() === '') {
        setTags(
          tags.map((t) => {
            return t.id === id ? { ...t, isEdit: !t.isEdit } : t;
          })
        );
      }
      if (value.trim() !== '') {
        setTags(
          tags.map((t) => {
            return t.id === id
              ? { ...t, value: t.draftValue, isEdit: !t.isEdit }
              : t;
          })
        );
      }
    }
  };
  const handleTagInputBlur = (id) => (event) => {
    setTags((tags) =>
      tags.map((t) => (t.id === id ? { ...t, isEdit: !t.isEdit } : t))
    );
  };

  return (
    <div className="create">
      <h1 className="create__title">Add your Post</h1>
      <div className="create__form">
        <FormTheme>
          <div className="input__container">
            <TextField
              value={title}
              autoFocus
              onChange={handleTitleInput}
              variant="outlined"
              label="Title"
              className="create__field create__field-title"
              style={{
                margin: 10,
                width: '50%',
              }}
            />
            <TextField
              value={keywords}
              onChange={handleKeywordsInput}
              onKeyDown={handleKeywordsEnter}
              variant="outlined"
              label="Keywords"
              color={keywordError ? 'secondary' : 'primary'}
              helperText={
                keywordError === null
                  ? '#Language #Topic #feature'
                  : keywordError
              }
              className="create__keywords create__field"
              style={{
                margin: 10,
                width: '50%',
              }}
            />
          </div>

          <Tags
            tags={tags}
            handleTagEditInput={handleTagEditInput}
            handleTagSubmitInput={handleTagSubmitInput}
            handleTagInputBlur={handleTagInputBlur}
            handleTagEdit={handleTagEdit}
            handleTagDelete={handleTagDelete}
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
