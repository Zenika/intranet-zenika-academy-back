import React from 'react';
import bulmaCollapsible from '@creativebulma/bulma-collapsible';
import './Program.scss';
import '../layout/Layout.scss';

class AddSequence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title,
    };
  }

  componentDidMount() {
    this.collapsibles = bulmaCollapsible.attach('.is-collapsible', {
      // eslint-disable-next-line react/no-string-refs
      container: this.refs.collapsibles,
      collapsed: false,
      allowMultiple: true,
    });
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

  render() {
    const { handleChange, deleteSequence, deleteIt } = this.props;

    const { id, title } = this.state;

    return (
      <div id={`sequenceBox-${id}`} className="box mtmd">
        {/* eslint-disable-next-line react/no-string-refs */}
        <div ref="collapsibles" id={`accordionSeq${id}`}>
          <div className="root">
            <h5 id="sequenceTitle" className="title is-6 is-pulled-left">
              Séquence n°
              {id + 1}: &nbsp;
              <span>{title}</span>
            </h5>
            <a
              href={`#collapsible-sectionSeq${id}`}
              data-action="collapse"
              className="is-pulled-right is-active"
            >
              <i className="fas fa-chevron-up" />
            </a>
          </div>
          <div
            id={`collapsible-sectionSeq${id}`}
            className="is-collapsible is-active"
            aria-expanded="true"
            data-parent={`accordionSeq${id}`}
          >
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Nom de la séquence n°
                  {id + 1}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <label htmlFor="title" className="label">
                    <input
                      className="input"
                      name="title"
                      type="text"
                      placeholder="Nom de la séquence"
                      id={id}
                      defaultValue={title}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </div>
              </div>
              <footer className="card-footer">
                <button
                  className="button is-danger card-footer-item"
                  id="deleteSequence"
                  onClick={() => deleteSequence(deleteIt, id)}
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
      </div>
    );
  }
}

export default AddSequence;
