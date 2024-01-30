function Validate(values) {
  let errors = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (values.email === "") {
    errors.email = "Email can't be empty";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Please enter a valid email";
  } else {
    errors.email = "";
  }

  if (values.password === "") {
    errors.password = "Password can't be empty";
  } else if (values.password.length < 5) {
    errors.password = "Password must be greater than 5 character";
  } else if (values.password.length > 15) {
    errors.password = "Password must be less than 15 character";
  } else {
    errors.password = "";
  }

  return errors;
}

export default Validate;
