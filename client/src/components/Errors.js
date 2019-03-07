import React from 'react';

const ValidationErrors = (props) => {
  const { errors } = props;
  return (
    <div>
      <h2 className={"validation--errors--label"}>We've hit some problems...</h2>
      <div className={"validation-errors"}>
        <ul>
          { errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      </div>
    </div>
  )
};

const Error = (props) => {
  const { message, status, statusText } = props.error;
  return (
    <div className="bounds">
      <h1>{statusText} ({status})</h1>
      <p>{message}</p>
    </div>
  )
};

export { ValidationErrors, Error };