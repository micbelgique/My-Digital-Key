import React, {Component} from 'react';

export default class Radio extends Component {

  render() {
    const { error } = this.props;
    if (typeof(error) === 'undefined') {
      return null;
    } else {
      return <div className="form_error">{error}</div>;
    }
	}

}
