import React, { useContext, useEffect } from 'react';
import { Result, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../util/auth-context';


const NoMatchRedirect = ({history}) => {

  const { user, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    clearErrorMessage();
  }, []);

  const backToHomePage = () => {
    return user.authenticated ? history.push('/view') : history.push('/');
  }
  return (
      <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary" onClick={backToHomePage}>Back Home</Button>}
      />
  )
}

export default withRouter(NoMatchRedirect);