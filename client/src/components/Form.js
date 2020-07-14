import React from "react";
// import ErrorDisplay from './ErrorDisplay';

export default (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <React.Fragment>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="grid-100 pad-bottom">
          <button className="button margin-bottom" type="submit">
            {submitButtonText}
          </button>
          <button
            className="button button-secondary margin-bottom"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  );

  // Render any validation errors from API
  function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
      errorsDisplay = (
        <React.Fragment>
          <h2 className="validation-errors-label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) => (
                <li key={i}>{`${i + 1}.) ${error}`}</li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      );
    }

    return errorsDisplay;
  }
};
