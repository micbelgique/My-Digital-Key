import React, {Component} from 'react';
import ClassNames from 'classnames';
import RadioList from './RadioList.jsx';

export default class Radio extends Component {

  render() {
    const { input, choices, title, meta } = this.props;
    return (
      <div className="reservations_radio">
        <RadioList input={input} meta={meta} choices={choices} title={title} />
      </div>
    )

	}

}
