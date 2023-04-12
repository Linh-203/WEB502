// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Form, Input, Modal, Select, Upload } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import type { RcFile, UploadProps } from 'antd/es/upload';
// import type { UploadFile } from 'antd/es/upload/interface';
// import { getAllCate } from '../../api/category';

// const { Option } = Select;

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 16,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 16,
//   },
// };
// const UpdateProductPage = (props) => {
//   const { id } = useParams();
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [previewTitle, setPreviewTitle] = useState('');
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const [category, setCate] = useState([]);
//   useEffect(() => {
//     getAllCate().then(({ data }) => setCate(data));
//   }, [props]);
//   console.log(category);
//   const [product, setProduct] = useState({});
//   const navigate = useNavigate();
//   useEffect(() => {
//     const currentProduct = props.products.find((product) => product._id == id);
//     setProduct(currentProduct);
//   }, [props]);
//   const getBase64 = (file: RcFile): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as RcFile);
//     }

//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//     setPreviewTitle(
//       file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
//     );
//   };

//   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
//     setFileList(newFileList);

//   const setFields = () => {
//     // hàm này để set lại giá trị cho các input
//     form.setFieldsValue({
//       // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
//       id: product?._id,
//       name: product?.name,
//       price: product?.price,
//       desc: product?.desc,
//       categoryId: product?.categoryId._id,
//     });
//   };
//   const onFinish = (values) => {
//     const { name, price, desc, image, categoryId } = { ...product, ...values };
//     props.onUpdate(id, { name, price, desc, image, categoryId }); //gọi hàm onUpdate từ props truyền vào
//     //     navigate('/admin/products');
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };
//   return (
//     <div>
//       <Form
//         {...layout}
//         name="basic"
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//       >
//         <Form.Item
//           label="Username"
//           name="name"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your username!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Price"
//           name="price"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your product price!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Image"
//           name="image"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your product product image!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Desc"
//           name="desc"
//           rules={[
//             {
//               required: true,
//               message: 'Please input your product product desc!',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="categoryId"
//           label="category"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Select
//             placeholder="Select a option and change input text above"
//             allowClear
//           >
//             {category.map((cate) => {
//               return (
//                 <Option value={cate._id} key={cate._id}>
//                   {cate.name}
//                 </Option>
//               );
//             })}
//           </Select>
//         </Form.Item>

//         <Form.Item {...tailLayout}>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default UpdateProductPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Image, Input, Select, Upload, UploadFile } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { IProduct } from '../../types/products';
import { PlusOutlined } from '@ant-design/icons';
import { getAllCate } from '../../api/category';
interface IProps {
  products: IProduct[];
  onUpdate: (id, product: IProduct) => void;
}
const UpdateProductPage = (props: IProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [cate, setCate] = useState([]);
  const getCate = async () => {
    const res = await getAllCate();
    setCate(res.data);
  };

  useEffect(() => {
    getCate();
  }, []);
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct>(); // khởi tạo biến state product có kiểu dữ liệu là IProduct
  useEffect(() => {
    // khi props thay đổi thì sẽ chạy useEffect này
    const currentProduct = props.products.find(
      (product: IProduct) => product._id == id
    );
    // tìm trong mảng props.products có phần tử nào có id trùng với id trên url không
    setProduct(currentProduct); // nếu có thì set lại giá trị cho biến product
  }, [props]);
  useEffect(() => {
    // khi biến product thay đổi thì sẽ chạy useEffect này
    setFields(); // gọi hàm setFields để set lại giá trị cho các input
  }, [product]);
  console.log(product);

  const [form] = Form.useForm();
  // khởi tạo một instance của Form và gán vào biến form
  // Instance của form là một đối tượng được tạo ra bởi Ant Design để thực hiện các chức năng của form trong React
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const setFields = () => {
    // hàm này để set lại giá trị cho các input
    form.setFieldsValue({
      // gọi hàm setFieldsValue của instance form để set lại giá trị cho các input dựa vào giá trị của biến product
      id: product?._id,
      name: product?.name,
      price: product?.price,
      desc: product?.desc,
      categoryId: product?.categoryId._id,
    });
  };

  const onFinish = (values: any) => {
    console.log(values.image === undefined);
    const prdUpdate = {
      id: values.id,
      name: values.name,
      price: values.price,
      desc: values.desc,
      image:
        values.image === undefined
          ? product?.image
          : values.image?.file.thumbUrl,
      categoryId: values.categoryId,
    };

    props.onUpdate(id, prdUpdate);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Product Image" name="image">
          <Upload
            // action="http://localhost:3000/products"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal> */}
        </Form.Item>
        <Form.Item label="Current Image" name="currentImage">
          <Image src={product?.image} />
        </Form.Item>
        <Form.Item
          label="Desc"
          name="desc"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="CategoryId"
          name="categoryId"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Select placeholder="please choose category">
            {cate?.map((cateOb) => (
              <Select.Option key={cateOb._id} value={cateOb._id}>
                {cateOb.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
