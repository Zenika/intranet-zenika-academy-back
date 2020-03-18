import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import CsvPickerButton from "./CsvPickerButton";
import "./CsvPicker.scss";

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  encoding: "UTF-8"
};

export default class CsvPicker extends Component {
  /**
   * Allows to call the props function handleCSVImport
   * @param {*} e event trigger by the onFileLoaded method
   */
  onDataImport(e) {
    const { handleCSVImport, name } = this.props;
    handleCSVImport(name, e);
  }

  render() {
    /* Name of the input */
    const { name, selected } = this.props;
    return (
      <>
        <CSVReader
          id="csvPicker"
          name={name}
          parserOptions={papaparseOptions}
          onFileLoaded={e => this.onDataImport(e)}
        />
        <div className="csvPickerControls">
          <CsvPickerButton selected={selected} />
        </div>
      </>
    );
  }
}
