import React from 'react';
import Axios from 'axios';
import './Program.scss';
import '../layout/Layout.scss';
import ProgramForm from './ProgramForm';
import RecapProgramForm from './RecapProgramForm';

class ProgramFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
      edit: 0,
      program: {
        title: '',
        type: 1,
        content: [],
      },
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      const url = `/api/programs/${parseInt(match.params.id, 10)}/details`;
      return Axios.get(url)
        .then((result) => {
          document.title = 'Admin / Programme édition';
          this.setState({
            program: result.data,
            step: 0,
            edit: 1,
          },
          () => this.forceUpdate(),
        );
      });
    }
    this.setState({ step: 0 });
    document.title = 'Admin / Programme création';
    return true;
  }

  handleChange = (e, program) => {
    const { value } = e.target;
    this.setState({ step: parseInt(value, 10), program });
  };

  render() {
    const { step, program, edit } = this.state;
    return (
      <>
        {step === 0 ? (
          <ProgramForm
            program={program}
            edit={edit}
            handleChange={this.handleChange}
          />
        ) : (
          <RecapProgramForm
            program={program}
            edit={edit}
            handleChange={this.handleChange}
          />
        )}
      </>
    );
  }
}

export default ProgramFormContainer;
