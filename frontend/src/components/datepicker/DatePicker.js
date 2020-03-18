import React, { Component } from "react";

class DatePicker extends Component {
  render() {
    const { defaultValue, name, handleChange } = this.props;
    return (
      <label htmlFor={name}>
        <input
          id={name}
          type="date"
          onChange={e => handleChange(e)}
          defaultValue={defaultValue}
          name={name}
        />
      </label>
    );
  }
}

export default DatePicker;
