import React, {Component} from 'react';
import ClassNames from 'classnames';

const Textarea = ({ input, className, groupClassName, full, modal, placeholder, meta: { touched, error, warning } }) => {
  const formGroupClasses = ClassNames({'textarea-full': full}, {'textarea-modal': modal}, groupClassName);
  const textareaClasses = ClassNames({'textarea-full': full}, className, {"textarea-valid": !error && touched}, {"textarea-error": error && touched});
  return (
    <div className={formGroupClasses}>
      <textarea placeholder={placeholder} className={textareaClasses} {...input} />
    </div>
  );
}

Textarea.defaultProps = {
  full: false,
  className: 'textarea',
  groupClassName: 'form_group',
  placeholder: '',
};

export default Textarea;
