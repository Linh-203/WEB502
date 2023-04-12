import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/Product';
import React, { useEffect, useState } from 'react';
import ProductDetailPage from './pages/ProductDetail';
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from './api/product';
import Dashboard from './pages/admin/Dashboard';
import ProductManagementPage from './pages/admin/ProductManagement';
import AddProductPage from './pages/admin/AddProduct';
import UpdateProductPage from './pages/admin/UpdateProduct';
import WebsiteLayout from './pages/layouts/WebsiteLayout';
import AdminLayout from './pages/layouts/AdminLayout';
import Login from './LogIn';
import Register from './Register';
import axios from 'axios';
import {
  createCategory,
  deleteCate,
  getAllCate,
  updateCate,
} from './api/category';
import CategoryManagementPage from './pages/admin/CategoryManagementPage';
import AddCategory from './pages/admin/AddCategory';
import UpdateCategoryPage from './pages/admin/UpdateCategory';
import Logout from './Logout';

function App() {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getAllProduct()
      .then(({ data }) => setProduct(data))
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }, []);
  useEffect(() => {
    getAllCate()
      .then(({ data }) => setCategory(data))
      .catch(({ response }) => {
        alert(response.data.message);
      });
  }, []);
  const onHandleRemove = async (id) => {
    // fetch('http://localhost:3000/products/' + id, {
    //   method: 'DELETE'
    // }).then(() => setProduct(products.filter(product => product.id !== id)))
    await deleteProduct(id)
      .then(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  const onHandleAdd = (product) => {
    addProduct(product)
      .then(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        alert('successfully added');
        navigate('/admin/products');
      })
      .catch(({ response }) => alert(response.data.message));
  };
  const onHandleUpdate = async (id, product) => {
    await updateProduct(id, product)
      .then(() => {
        getAllProduct().then(({ data }) => setProduct(data));
        alert('successfully updated');
        navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  const onHandSignUp = (user) => {
    axios
      .post('http://localhost:8080/api/signup', user)
      .then(() => {
        alert('successfully signUp');
        navigate('/admin/login');
      })
      .catch(({ response }) => {
        setErr(response.data.message);
        // toast.error(response.data.message)
        alert(response.data.message);
      });
  };
  const onHandLogin = (user) => {
    axios
      .post('http://localhost:8080/api/signin', user)
      .then((response) => {
        const token = response.data.accessToken;
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
        alert('successfully logIn');
        navigate('/admin/products');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };

  const onHandLogout = () => {
    localStorage.removeItem('token'); // Xóa mã token khỏi localStorage
    // Thực hiện các công việc liên quan khi đăng xuất
  };
  // ------------------------------CATE---------------------
  const onHandleRemoveCate = async (id) => {
    await deleteCate(id)
      .then(() => {
        getAllCate().then(({ data }) => setCategory(data));
        navigate('/admin/category');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  const onHandleAddCategory = (cate) => {
    createCategory(cate)
      .then(() => {
        getAllCate().then(({ data }) => setCategory(data));
        navigate('/admin/category');
      })
      .catch(({ response }) => alert(response.data.message));
  };
  const onHandleUpdateCategory = (id, product) => {
    console.log(id, product);

    updateCate(id, product)
      .then(() => {
        getAllCate().then(({ data }) => setCategory(data));
        navigate('/admin/category');
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  return (
    <div className="App">
      <Routes>
        {/* -------------------------------------HOME-------------------------------------------- */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={<Register err={err} signUp={onHandSignUp} />}
          ></Route>
          <Route
            path="login"
            element={<Login login={onHandLogin} err={err} />}
          ></Route>
          <Route path="products">
            <Route
              index
              element={
                <ProductPage
                  products={products}
                  onRemove={onHandleRemove}
                  // onLogout={onHandLogout}
                />
              }
            ></Route>
            <Route
              path=":id"
              element={<ProductDetailPage products={products} />}
            ></Route>
          </Route>
        </Route>

        {/* -------------------------------------ADMIN-------------------------------------------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route
            path="register"
            element={<Register err={err} signUp={onHandSignUp} />}
          ></Route>
          <Route
            path="login"
            element={<Login login={onHandLogin} err={err} />}
          ></Route> */}
          <Route
            path="logout"
            element={<Logout onLogout={onHandLogout} />}
          ></Route>
          <Route path="products">
            <Route
              index
              element={
                <ProductManagementPage
                  products={products}
                  onRemove={onHandleRemove}
                />
              }
            />
            <Route
              path=":id/update"
              element={
                <UpdateProductPage
                  products={products}
                  onUpdate={onHandleUpdate}
                />
              }
            />
            <Route
              path="add"
              element={<AddProductPage onAdd={onHandleAdd} />}
            />
          </Route>
          <Route path="category">
            <Route
              index
              element={
                <CategoryManagementPage
                  category={category}
                  onRemoveCate={onHandleRemoveCate}
                />
              }
            />
            <Route
              path="add"
              element={<AddCategory onAddCategory={onHandleAddCategory} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateCategoryPage
                  category={category}
                  onUpdateCate={onHandleUpdateCategory}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
