import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  tagInput: {
    fontSize: '1rem',
  },
});

function Tags({
  handleTagEditInput,
  handleTagSubmitInput,
  handleTagInputBlur,
  handleTagEdit,
  handleTagDelete,
  tags,
}) {
  const classes = useStyles();

  return (
    <ul className="added-keywords">
      {tags.map(({ value, draftValue, id, isEdit }) =>
        isEdit ? (
          <TextField
            value={draftValue}
            autoFocus
            className={classes.tagInput}
            onChange={handleTagEditInput(id)}
            onKeyDown={handleTagSubmitInput(id)}
            onBlur={handleTagInputBlur(id)}
            variant="outlined"
            key={`input${id}_`}
          />
        ) : (
          <li className="added-keyword" key={id}>
            <span onClick={handleTagEdit(id)}>{`#${value}`}</span>
            <span onClick={handleTagDelete(id)} className="delete-keyword">
              &#x292B;
            </span>
          </li>
        )
      )}
    </ul>
  );
}

export default Tags;
