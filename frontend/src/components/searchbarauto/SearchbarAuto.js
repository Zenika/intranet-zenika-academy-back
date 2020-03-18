import React, { Component } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

class SearchbarAuto extends Component {
  render() {
    const {
      options,
      defaultValue,
      handleChange,
      isMulti,
      name,
      defaultLabel,
      className
    } = this.props;

    return (
      <Select
        name={name}
        components={animatedComponents}
        options={options}
        isMulti={isMulti}
        className={className}
        placeholder={defaultLabel}
        onChange={e => handleChange(e)}
        defaultValue={defaultValue}
        closeMenuOnSelect={!isMulti}
        noOptionsMessage={inputValues =>
          `${inputValues.inputValue} n'est pas trouvé, demandez au canard !`
        }
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
      />
    );
  }
}

export default SearchbarAuto;
