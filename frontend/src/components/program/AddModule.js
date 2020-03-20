import React from 'react';
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import SubModule from './AddSubModule';
import './Program.scss';
import '../layout/Layout.scss';

class AddModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      subModules: [],
      module: {
        title: '',
        type: 2,
        content: props.content,
      },
      idSubModules: 0,
    };
    this.addSubModule = this.addSubModule.bind(this);
  }

  componentDidMount() {
    this.collapsibles = bulmaCollapsible.attach('.is-collapsible', {
      // eslint-disable-next-line react/no-string-refs
      container: this.refs.collapsibles,
      collapsed: false,
      allowMultiple: true,
    });

    const { module } = this.state;
    const createSubModules = module.content.map((node, i) => ({
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
      subModules: createSubModules,
      idSubModules: createSubModules.length,
    }));
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.title !== prevState.title && nextProps.id !== prevState.id) {
      return { ...prevState, title: nextProps.title, id: nextProps.id };
    }
    if (nextProps.title !== prevState.title) {
      return { title: nextProps.title };
    }
    if (nextProps.id !== prevState.id) {
      return { id: nextProps.id };
    }
    return null;
  }

  deleteSubModule = async (key, id) => {
    await this.setState((prevState) => {
      const newId = prevState.idSubModules > 0 ? prevState.idSubModules - 1 : 0;
      const newItems = prevState.module.content;
      newItems.splice(id, 1);
      const newSequenceArray = prevState.subModules.filter(
        (node) => node.key !== key,
      );
      newSequenceArray.forEach((node, index) => {
        newSequenceArray[index].id = index;
      });
      return {
        subModules: newSequenceArray,
        module: { ...prevState.module, content: newItems },
        idSubModules: newId,
      };
    });
  };

  addSubModule = async () => {
    const { idSubModules } = this.state;
    const { handleAddSubModuleContent, id: idProps } = this.props;
    const key =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const newSubModule = {
      id: idSubModules,
      key,
    };
    await this.setState((prevState) => ({
      ...prevState,
      module: {
        ...prevState.module,
        content: [
          ...prevState.module.content,
          { title: '', type: 3, content: [] },
        ],
      },
    }));
    await this.setState(
      (prevState) => ({
        ...prevState,
        subModules: [...prevState.subModules, newSubModule],
        idSubModules: prevState.idSubModules + 1,
      }),
      () => {
        const { module } = this.state;
        handleAddSubModuleContent(module.content[idSubModules], idProps);
      },
    );
  };

  handleChange = async (e) => {
    const { value, id } = e.target;
    await this.setState((prevState) => {
      const newItems = [...prevState.module.content];
      newItems[id].title = value;
      return { module: { ...prevState.module, content: newItems } };
    });
  };

  render() {
    const {
      handleChange,
      deleteModule,
      deleteIt,
      handleAddSequenceContent,
      id: propsId,
    } = this.props;
    const { subModules, id, title, module } = this.state;

    return (
      <div id={`moduleBox-${id}`} className="box mtmd">
        {/* eslint-disable-next-line react/no-string-refs */}
        <div ref="collapsibles" id={`accordion${id}`}>
          <div className="root">
            <h3 id="moduleTitle" className="title is-4 is-pulled-left">
              Module n°
              {id + 1}: &nbsp;
              <span>{title}</span>
            </h3>
            <a
              href={`#collapsible-section${id}`}
              data-action="collapse"
              className="is-pulled-right is-active"
            >
              <i className="fas fa-chevron-up" />
            </a>
          </div>
          <div
            id={`collapsible-section${id}`}
            className="is-collapsible is-active"
            aria-expanded="true"
            data-parent={`accordion${id}`}
          >
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Module n°
                  {id + 1}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <label htmlFor="title" className="label">
                    <input
                      className="input"
                      id={id}
                      name="title"
                      type="text"
                      placeholder="Nom du module"
                      defaultValue={title}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </div>
              </div>
              <footer className="card-footer">
                <button
                  className="button is-success card-footer-item"
                  id="addSubModule"
                  onClick={() => this.addSubModule()}
                  type="button"
                >
                  <span className="icon is-small">
                    <i className="fas fa-plus" />
                  </span>
                  &nbsp; &nbsp;Sous-Module
                </button>
                <button
                  className="button is-danger card-footer-item"
                  id="deleteModule"
                  onClick={() => deleteModule(deleteIt, id)}
                  type="button"
                >
                  <span className="icon is-small">
                    <i className="fas fa-minus" />
                  </span>
                </button>
              </footer>
            </div>
          </div>
        </div>
        <div className="field">
          {subModules.map((node) => (
            <SubModule
              id={node.id}
              key={node.key}
              deleteIt={node.key}
              idModule={propsId}
              title={module.content[node.id].title}
              content={module.content[node.id].content}
              handleChange={this.handleChange}
              handleAddSequenceContent={handleAddSequenceContent}
              deleteSubModule={this.deleteSubModule}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AddModule;
