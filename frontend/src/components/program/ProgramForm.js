import React from 'react';
import Module from './AddModule';
import './Program.scss';
import '../layout/Layout.scss';

class ProgramForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: [],
      program: props.program,
      idModules: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.generateModule();
  }

  handleChangeTitleProgram = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      program: {
        ...prevState.program,
        title: value,
      },
    }));
  };

  handleChange = async (e) => {
    const { value, id } = e.target;
    await this.setState((prevState) => {
      const newItems = [...prevState.program.content];
      newItems[id].title = value;
      return {
        program: {
          ...prevState.program,
          content: newItems,
        },
      };
    });
  };

  handleAddSubModuleContent = async (value, idModule) => {
    await this.setState((prevState) => {
      const newItems = [...prevState.program.content];
      newItems[idModule].content.push(value);
      return {
        program: {
          ...prevState.program,
          content: newItems,
        },
      };
    });
    return true;
  };

  handleAddSequenceContent = async (value, idSubModule, idModule) => {
    await this.setState((prevState) => {
      const moduleContent = [...prevState.program.content];
      moduleContent[idModule].content[idSubModule].content.push(value);
      return {
        program: {
          ...prevState.program,
          content: moduleContent,
        },
      };
    });
    return true;
  };

  clearProgram = () => {
    this.setState(() => ({
      modules: [],
      program: {
        title: '',
        type: 1,
        content: [],
      },
      idModules: 0,
    }));
  };

  addModule = async () => {
    const { idModules } = this.state;
    const key =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const newModule = {
      id: idModules,
      key,
    };
    await this.setState((prevState) => ({
      ...prevState,
      program: {
        ...prevState.program,
        content: [
          ...prevState.program.content,
          {
            title: '',
            type: 2,
            content: [],
          },
        ],
      },
    }));
    await this.setState(
      (prevState) => ({
        ...prevState,
        modules: [...prevState.modules, newModule],
        idModules: prevState.idModules + 1,
      }),
      () => {
        this.forceUpdate();
      },
    );
  };

  deleteModule = async (key, id) => {
    await this.setState(
      (prevState) => {
        const newId = prevState.idModules > 0 ? prevState.idModules - 1 : 0;
        const newItems = [...prevState.program.content];
        newItems.splice(id, 1);
        const newModuleArray = prevState.modules.filter(
          (node) => node.key !== key,
        );
        newModuleArray.forEach((node, index) => {
          newModuleArray[index].id = index;
        });
        return {
          idModules: newId,
          modules: newModuleArray,
          program: { ...prevState.program, content: newItems },
        };
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  generateModule() {
    const { program } = this.state;
    if (program.content instanceof Array) {
      const createModules = program.content.map((node, i) => ({
        id: i,
        key:
          Math.random()
            .toString(36)
            .substring(2, 15) +
          Math.random()
            .toString(36)
            .substring(2, 15),
      }));
      this.setState((prev) => ({
        prev,
        modules: createModules,
        idModules: createModules.length,
      }));
    }
  }

  render() {
    const { program, modules } = this.state;
    const { handleChange, edit } = this.props;
    let titleForm;

    if (edit === 0) {
      titleForm = (
        <h1 className="title is-2 is-spaced">Création d&lsquo;un programme</h1>
      );
    } else {
      titleForm = (
        <h1 className="title is-2 is-spaced">Edition d&lsquo;un programme</h1>
      );
    }
    const buttonForm = (
      <div className="field is-grouped">
        <div className="control">
          <button
            className="button is-success"
            id="validateProgramForm"
            value={1}
            onClick={(e) => handleChange(e, program)}
            type="button"
          >
            Valider
          </button>
        </div>
        <div className="control">
          <a
            href="/home/admin/"
            id="cancelButton"
            type="button"
            className="button is-danger"
          >
            Annuler
          </a>
        </div>
      </div>
    );

    return (
      <article className="div box">
        {titleForm}
        <form>
          <h2 className="title is-3">
            Programme&nbsp;
            <span>{program.title}</span>
          </h2>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Nom du programme</p>
            </header>
            <div className="card-content">
              <div className="content">
                <label htmlFor="title" className="label">
                  <input
                    className="input"
                    name="title"
                    type="text"
                    id="programTitle"
                    placeholder="Nom du programme"
                    value={program.title}
                    onChange={(e) => this.handleChangeTitleProgram(e)}
                  />
                </label>
              </div>
            </div>
            <footer className="card-footer">
              <button
                className="button is-success card-footer-item"
                id="addModule"
                onClick={() => this.addModule()}
                type="button"
              >
                <span className="icon is-small">
                  <i className="fas fa-plus" />
                </span>
                &nbsp; &nbsp;Module
              </button>
              <button
                className="button is-danger card-footer-item"
                id="clearProgram"
                onClick={() => this.clearProgram()}
                type="submit"
              >
                <span className="icon is-small">
                  <i className="fas fa-undo" />
                  &nbsp; &nbsp;Vider
                </span>
              </button>
            </footer>
          </div>

          <div className="field">
            {modules.map((node) => (
              <Module
                id={node.id}
                key={node.key}
                deleteIt={node.key}
                title={program.content[node.id].title}
                content={program.content[node.id].content}
                handleChange={this.handleChange}
                handleAddSubModuleContent={this.handleAddSubModuleContent}
                handleAddSequenceContent={this.handleAddSequenceContent}
                deleteModule={this.deleteModule}
              />
            ))}
          </div>

          {buttonForm}
        </form>
      </article>
    );
  }
}

export default ProgramForm;
