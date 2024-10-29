

const EmailValidate = (values, error) => {
  const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
  const errors = {};

  if (!emailReg.test(values.email)) {
    errors.email = "Please use a valid email like example@exmple.com";
  }
  error(errors);
};

export default EmailValidate;