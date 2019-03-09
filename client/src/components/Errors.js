import React from 'react';

/**
 * Componet for "in-line" error rendering.
 * @param {array} errors
 */
const ValidationErrors = ({ errors }) => {
  return (
    <div>
      <h2 className={'validation--errors--label'}>
        We've hit some problems...
      </h2>
      <div className={'validation-errors'}>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * Sets error message based on the route.
 * @param {string} url
 * @returns Error object.
 */
const setError = url => {
  if (url === 'notfound') {
    return {
      message: `You haven't found what you're looking for, but you have found our secret lair. You really shouldn't be here.`,
      status: 404,
      statusText: 'Not Found',
    };
  }

  if (url === 'forbidden') {
    return {
      message: `You're not allowed to do that.`,
      status: 401,
      statusText: 'Forbidden',
    };
  }

  return {
    message:
      'This is embarrassing, but something went wrong. Not really sure what...',
    status: 500,
    statusText: 'Uh-oh',
  };
};

/**
 * The Error component.
 * Used for error routes.
 * @param {string} error - The type of error to render.
 */
const Error = ({ error }) => {
  const errorMessage = setError(error);

  return (
    <div className="bounds">
      <h1>
        {errorMessage.statusText} ({errorMessage.status})
      </h1>
      <p>{errorMessage.message}</p>
    </div>
  );
};

export { ValidationErrors, Error };
