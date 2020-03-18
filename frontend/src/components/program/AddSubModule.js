import React from "react";
import bulmaCollapsible from "@creativebulma/bulma-collapsible";
import Sequence from "./AddSequence";
import "./Program.scss";
import "../layout/Layout.scss";

class AddSubModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
      sequences: [],
      subModule: {
        title: "",
        type: 3,
        content: props.content
      },
      idSequence: 0
    };
    this.addSequence = this.addSequence.bind(this);
  }

  componentDidMount() {
    this.collapsibles = bulmaCollapsible.attach(".is-collapsible", {
      // eslint-disable-next-line react/no-string-refs
      container: this.refs.collapsibles,
      collapsed: false,
      allowMultiple: true
    });

    const { subModule } = this.state;
    const createSequences = subModule.content.map((node, i) => ({
      id: i,
      key:
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
    }));
    this.setState(prev => ({
      prev,
      sequences: createSequences,
      idSequence: createSequences.length
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

  handleChange = async e => {
    const { value, id } = e.target;
    await this.setState(prevState => {
      const newItems = [...prevState.subModule.content];
      newItems[id].title = value;
      return { subModule: { ...prevState.subModule, content: newItems } };
    });
  };

  deleteSequence = async (key, id) => {
    await this.setState(prevState => {
      const newId = prevState.idSequence > 0 ? prevState.idSequence - 1 : 0;
      const newItems = prevState.subModule.content;
      newItems.splice(id, 1);
      const newSequenceArray = prevState.sequences.filter(
        node => node.key !== key
      );
      newSequenceArray.forEach((node, index) => {
        newSequenceArray[index].id = index;
      });
      return {
        sequences: newSequenceArray,
        subModule: { ...prevState.subModule, content: newItems },
        idSequence: newId
      };
    });
  };

  addSequence = async () => {
    const { idSequence } = this.state;
    const key =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    const newSequence = {
      id: idSequence,
      key
    };
    await this.setState(prevState => ({
      ...prevState,
      subModule: {
        ...prevState.subModule,
        content: [
          ...prevState.subModule.content,
          { title: "", type: 4, content: [] }
        ]
      }
    }));
    await this.setState(
      prevState => ({
        ...prevState,
        sequences: [...prevState.sequences, newSequence],
        idSequence: prevState.idSequence + 1
      }),
      () => {
        const { handleAddSequenceContent, idModule, id } = this.props;
        const { subModule } = this.state;
        handleAddSequenceContent(subModule.content[idSequence], id, idModule);
      }
    );
  };

  render() {
    const { handleChange, deleteSubModule, deleteIt } = this.props;
    const { sequences, id, title, subModule } = this.state;

    return (
      <div id={`subModuleBox-${id}`} className="box mtmd">
        {/* eslint-disable-next-line react/no-string-refs */}
        <div ref="collapsibles" id={`accordionSub${id}`}>
          <div className="root">
            <h4 id="subModuleTitle" className="title is-5 is-pulled-left">
              Sous-Module n°
              {id + 1}: &nbsp;
              <span>{title}</span>
            </h4>
            <a
              href={`#collapsible-sectionSub${id}`}
              data-action="collapse"
              className="is-pulled-right is-active"
            >
              <i className="fas fa-chevron-up" />
            </a>
          </div>
          <div
            id={`collapsible-sectionSub${id}`}
            className="is-collapsible is-active"
            aria-expanded="true"
            data-parent={`accordionSub${id}`}
          >
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Nom du sous-module n°
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
                      placeholder="Nom du sous-module"
                      defaultValue={title}
                      onChange={e => handleChange(e)}
                    />
                  </label>
                </div>
              </div>
              <footer className="card-footer">
                <button
                  className="button is-success card-footer-item"
                  id="addSequence"
                  onClick={() => this.addSequence()}
                  type="button"
                >
                  <span className="icon is-small">
                    <i className="fas fa-plus" />
                  </span>
                  &nbsp; &nbsp;Séquence
                </button>
                <button
                  className="button is-danger card-footer-item"
                  id="deleteSubModule"
                  onClick={() => deleteSubModule(deleteIt, id)}
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
          {sequences.map(node => (
            <Sequence
              id={node.id}
              key={node.key}
              deleteIt={node.key}
              title={subModule.content[node.id].title}
              content={subModule.content[node.id].content}
              handleChange={this.handleChange}
              deleteSequence={this.deleteSequence}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AddSubModule;
