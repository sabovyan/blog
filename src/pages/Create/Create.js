import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import FormTheme from '../../components/FormTheme/FormTheme';

import './Create.css';

class Create extends Component {
  render() {
    return (
      <div className="create">
        <h1 className="create__title">Add your Post</h1>
        <form className="create__form">
          <FormTheme>
            <TextField
              variant="outlined"
              label="title"
              className="create__field create__title"
              style={{
                marginBottom: 10,
                width: '80%',
              }}
            />
            <TextField
              onChange={this.handleKeywordsInput}
              variant="outlined"
              label="keywords"
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Incorrect entry."
              className="create__keywords create__field"
              style={{
                marginBottom: 10,
                width: '80%',
              }}
            />
            <TextareaAutosize
              rowsMin={20}
              rowsMax={30}
              aria-label="maximum height"
              placeholder="Use markdown syntax for your text"
              defaultValue=""
              style={{
                marginBottom: 10,
                fontSize: 20,
                fontFamily: 'Roboto',
                padding: 10,
                width: '100%',
              }}
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
        </form>
      </div>
    );
  }
}

export default Create;
