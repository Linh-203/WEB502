// import React, { useEffect } from 'react';
// import { useState } from 'react';

// const Register = ({ signUp, err }) => {
//   const [valueInput, setValueInput] = useState({});
//   const [errs, setErrs] = useState('');

//   const onHandChange = (e) => {
//     const value = e.target.value;
//     const name = e.target.name;
//     setValueInput({ ...valueInput, [name]: value });
//   };
//   const onHandSubmit = (e) => {
//     e.preventDefault();
//     signUp(valueInput);
//   };
//   return (
//     <div className="containerSignUp">
//       <div className="left-signUp">
//         <img
//           src="https://thumbs.dreamstime.com/z/death-skull-crossbones-smatphone-screen-bones-internet-phishing-hacked-login-password-computer-network-security-concept-118843392.jpg"
//           alt=""
//         />
//       </div>
//       <div className="right-signUp">
//         <form onSubmit={onHandSubmit}>
//           <h1>Register</h1>
//           <em style={{ color: 'red' }}>
//             {err}
//             {errs}
//           </em>

//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               name="name"
//               onChange={onHandChange}
//               className="form-control"
//               aria-describedby="emailHelp"
//             />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="text"
//               name="email"
//               onChange={onHandChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               onChange={onHandChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Res_Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               onChange={onHandChange}
//               className="form-control"
//             />
//           </div>
//           <button type="submit" className="btn btn-signUp btn-primary">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const Register = ({ signUp, err }) => {
  const [errs, setErrs] = useState('');

  // const navigate = useNavigate();
  const onFinish = async (values) => {
    await signUp(values);
    // navigate('/admin/products');
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="containerSignUp">
      <div className="left-signUp">
        <img
          src="https://b-f8-zpc.zdn.vn/4319651230645055608/ee62705f615ebd00e44f.jpg"
          alt=""
        />
      </div>
      <div className="right-signUp">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your confirm password!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
