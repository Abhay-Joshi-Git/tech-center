import React, { Component } from 'react';
import './FloatingLabelInputText.scss';

class FloatingLabelInputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: this.props.inputVal
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputVal !== this.state.inputVal) {
      this.setState({ inputVal: nextProps.inputVal });
    }
  }

  onInputChange = e => {
    this.setState({
      inputVal: e.target.value
    });
    this.props.onInputChange(e.target.value);
  };
  blur = e => {
    if (this.props.blur) {
      this.props.blur(e.target.value);
    }
  };
  render() {
    const { inputId, inputLabel, inputNote, errorNote, showError, inputType, minVal } = this.props;
    const errorText = showError ? 'error-text' : '';
    const placeholderClassName = `${
      this.state.inputVal !== ''
        ? 'form-control-placeholder placeholder-valid'
        : 'form-control-placeholder'
    }  ${errorText} `;
    let borderClassName = showError ? 'error-border no-spinner' : '';
    borderClassName = borderClassName + ' form-control no-spinner';

    return inputType === 'password' ? (
      <div className="form-group">
        <input
          type="password"
          id={inputId}
          className={borderClassName}
          value={this.state.inputVal}
          onChange={this.onInputChange}
          onBlur={this.blur}
        />
        <label className={placeholderClassName} htmlFor={inputId}>
          {inputLabel}
        </label>
        {!showError && inputNote && inputNote.length > 0 ? (
          <span className="form-control-input-note">{inputNote}</span>
        ) : null}
        {showError ? <span className="form-control-input-note error-text">{errorNote}</span> : null}
      </div>
    ) : (
      <div className="form-group">
        <input
          type="text"
          id={inputId}
          className={borderClassName}
          value={this.state.inputVal}
          onChange={this.onInputChange}
          onBlur={this.blur}
        />
        <label className={placeholderClassName} htmlFor={inputId}>
          {inputLabel}
        </label>
        {!showError && inputNote && inputNote.length > 0 ? (
          <span className="form-control-input-note">{inputNote}</span>
        ) : null}
        {showError ? <span className="form-control-input-note error-text">{errorNote}</span> : null}
      </div>
    );
  }
}

export default FloatingLabelInputText;
