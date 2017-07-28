import React from 'react';
import { Field } from 'redux-form';

const Dropdown = ({fields, placeholder, deployed, deploy, list, meta: { touched, error, warning, pristine, form }}) => {
  return (
    <div className='dropdown' onClick={e => e.stopPropagation()}>
      <input type='checkbox' checked={deployed} className='dropdown_checkbox' onClick={deploy} />
      <label className='dropdown_head'>
        <span>{placeholder}</span>
        <i className='dropdown_arrow'></i>
      </label>
      <div className='dropdown_elWrapper'>
          {fields.map( (field, index) => (
              <div className='dropdown_el' key={index}>
                <Field component={DropdownEl} name={field} label={list[index]} placeholder={index} />
              </div>
            )
          )}
      </div>
    </div>
  );
}

const DropdownEl = ({ input, label, placeholder, meta: { touched, error, warning, pristine, form } }) => {
  return (
    <div>
      <label htmlFor={form+input.name} className={input.value ? 'dropdown_label dropdown_label-current' : 'dropdown_label'}>{label.name}</label>
      <input checked={input.value} {...input} type="checkbox" id={form+input.name} className="dropdown_checkbox" />
    </div>
  )
};

export default Dropdown;
