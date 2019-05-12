import React from 'react';
import TextField from '@material-ui/core/TextField';

const SimpleTextField = ({ props: { autoFocus = false, input, label, type, touched, error, custom } }) => {
  return (
    <div className="text-field">
      <TextField
        error={touched && error !== undefined}
        label={label}
        autoFocus={autoFocus}
        className={"label-text-field"}
        disabled={input.disabled}
        placeholder={label}
        type={type}
        {...input}
        {...custom}
        helperText={touched && error !== undefined ? error : ""}
      />
    </div>
  )
}

export default SimpleTextField;
