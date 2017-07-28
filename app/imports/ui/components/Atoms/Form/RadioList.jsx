import React, {Component} from 'react';
import ClassNames from 'classnames';

export default class RadioList extends Component {

  render(){
    const { input, title, choices, meta: { touched, error, warning, pristine } } = this.props;
    return (
      <div className='radio'>
        <div className='radio_list'>
        {title ? <span className='radio_title'>{title}</span> : null}
        {choices.map( (choice, index) => (
          <span className='radio_group' key={index} >
            <input {...input} className='radio_input' type='radio' id={input.name+choice.value} value={choice.value} />
            <label className='radio_label' htmlFor={input.name+choice.value}>{choice.label}</label>
          </span>
        ))}
        </div>
      </div>
    )
  }

}
