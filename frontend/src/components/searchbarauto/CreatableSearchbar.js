import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

class CreatableSearchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      optionsToSave: props.options,
    };
  }

  handleCreate = (inputValue) => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      const { optionsToSave } = this.state;
      const newOption = createOption(inputValue);
      optionsToSave.push(newOption);
      this.setState({
        isLoading: false,
        optionsToSave,
      });
    }, 1000);
  };

  render() {
    const {
      options,
      defaultValue,
      handleChange,
      isMulti,
      name,
      defaultLabel,
    } = this.props;
    const { isLoading } = this.state;
    return (
      <CreatableSelect
        isClearable
        isCreatable
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => handleChange(e)}
        formatCreateLabel={(inputValue) =>
          `Créer un nouveau  ${defaultLabel} : ${inputValue}`
        }
        placeholder={defaultLabel}
        options={options}
        isMulti={isMulti}
        isDisabled={isLoading}
        isLoading={isLoading}
        onCreateOption={this.handleCreate}
      />
    );
  }
}

export default CreatableSearchbar;
