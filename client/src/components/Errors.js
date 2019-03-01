import React from 'react';

// TODO Add ValidationError component
// TODO Add NotFound component
// TODO Add Forbidden component

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
  const { type, errors }= props;
  return (
    <div className="bounds">
      <h1>{type}</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
    </div>
  )
}
export { ValidationErrors, Error };