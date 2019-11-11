import React, {Component} from 'react';
import './LabelSelectable.scss';

class LabelSelectable extends Component {
  
  tagSelected = (itemClicked) => {
    this.props.onClick(itemClicked);
  };

  render() {
    const { displayLabel } = this.props;
    const selectableLabelClassName = ' selected';
    return (
      <span className={ "selectable-label d-inline-block pl-4 pr-4 p-1 mr-2 mb-2" + selectableLabelClassName } 
           onClick={ () => this.tagSelected(displayLabel) }>
        <span className="selectable-label-text fs-12">
          { displayLabel }
        </span>
      </span>
    );
  }
}

export default LabelSelectable;
