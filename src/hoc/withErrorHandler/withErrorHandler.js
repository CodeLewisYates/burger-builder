import React, { useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    useEffect(() => {
      const reqIntercept = axios.interceptors.request.use(
        (req) => {
          setError(null);
          return req;
        },
        (error) => {
          setError(error);
        }
      );
      const resIntercept = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          setError(error);
        }
      );
      return () => {
        axios.interceptors.request.eject(reqIntercept);
        axios.interceptors.response.eject(resIntercept);
      };
    }, []);
    const errorConfirmedHandler = () => {
      setError(null);
    };
    return (
      <React.Fragment>
        <Modal modalClosed={errorConfirmedHandler} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
