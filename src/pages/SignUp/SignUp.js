import React from 'react';

import { withFirebase } from '../../libraries/Firebase';
import Register from '../../components/Register/Register';

export default function SignUpPage() {
  return (
    <div>
      <h1>SignUp</h1>
      <Register />
    </div>
  );
}
