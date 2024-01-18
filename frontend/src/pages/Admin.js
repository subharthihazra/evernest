import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";

async function authAdmin({ username, password }) {
  return await axios.post(
    "http://localhost:5000/admin/signin",
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );
}
function AdminSignIn({ setIsAuth }) {
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: authAdmin,
    onError: (error, variables, context) => {
      if (error.response?.status === 401) {
        console.log(error.response?.data?.message);
        setError("Invalid Username or Password");
      } else {
        console.log("Error: ", error.message);
        setError("Error Occurred");
      }
    },
    onSuccess: (data, variables, context) => {
      if (data?.data?.success === true) {
        setIsAuth(true);
      } else {
        setError("Error Occurred");
      }
    },
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password },
    } = e.target;
    console.log(username);
    if (username && password) {
      mutation.mutate({ username, password });
    }
  };

  return (
    <div>
      <h2>Admin Sign In</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

function getProduct() {}

function AddProduct() {
  const [productName, setProductName] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [rows, setRows] = useState([
    { id: 1, size: "--", originalPrice: "", currentPrice: "" },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: rows[rows.length - 1].id + 1,
      size: "--",
      originalPrice: "",
      currentPrice: "",
    };
    setRows([...rows, newRow]);
  };

  const handleSizeChange = (id, newSize) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, size: newSize } : row))
    );
  };

  const handleOriginalPriceChange = (id, newOriginalPrice) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, originalPrice: newOriginalPrice } : row
      )
    );
  };

  const handleCurrentPriceChange = (id, newCurrentPrice) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, currentPrice: newCurrentPrice } : row
      )
    );
  };

  const delRow = (id) => {
    setRows((prevRows) => prevRows.filter((x) => x.id !== id));
  };

  const handleMainImageChange = (event) => {
    const imageFile = event.target.files[0];
    setMainImage(imageFile);
  };

  async function addProd() {
    try {
      if (!productName || productName?.trim() === "") return;
      if (!productDetails || productDetails?.trim() === "") return;

      const rowSet = new Set();
      for (const sz of rows.map((x) => x?.size)) {
        if (sz === "--") return;
        if (rowSet.has(sz)) return;
        rowSet.add(sz);
      }

      const { data } = await axios.post(
        "http://localhost:5000/admin/product/upload",
        { productName, productDetails, mainImage, varients: rows },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
  }

  return (
    <>
      <p className="mb-5 text-mauve11 text-[15px] leading-normal">
        Make changes to your account here. Click save when you're done.
      </p>
      <fieldset className="mb-[15px] w-full flex flex-col justify-start">
        <label
          className="text-[13px] leading-none mb-2.5 text-violet12 block"
          htmlFor="name"
        >
          Product Name
        </label>
        <input
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          id="productname"
          onChange={(e) => setProductName(e.target.value)}
        />
      </fieldset>
      <fieldset className="mb-[15px] w-full flex flex-col justify-start">
        <label
          className="text-[13px] leading-none mb-2.5 text-violet12 block"
          htmlFor="details"
        >
          Details
        </label>
        <input
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          id="details"
          onChange={(e) => setProductDetails(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <div className="mt-4">
          <label className="block mb-2">Main Image</label>
          <input
            type="file"
            onChange={handleMainImageChange}
            className="p-2 border w-full"
          />
        </div>
      </fieldset>
      <div className="container mx-auto mt-8">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border p-2">Size</th>
              <th className="border p-2">Original Price</th>
              <th className="border p-2">Current Price</th>
              <th className="border p-2">Del</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="border p-2">
                  <select
                    onChange={(e) => handleSizeChange(row.id, e.target.value)}
                    className="p-2 w-full"
                    defaultValue="-"
                  >
                    <option value="-">--</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                    <option value="XXXL">XXXL</option>
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.originalPrice}
                    onChange={(e) =>
                      handleOriginalPriceChange(row.id, e.target.value)
                    }
                    className="p-2 border w-full"
                    placeholder="Original Price"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.currentPrice}
                    onChange={(e) =>
                      handleCurrentPriceChange(row.id, e.target.value)
                    }
                    className="p-2 border w-full"
                    placeholder="Current Price"
                  />
                </td>
                <td className="border p-2">
                  <button onClick={() => delRow(row.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4">
          <button
            onClick={handleAddRow}
            className="bg-green-500 text-white p-2"
          >
            Add More
          </button>
        </div>
      </div>
      <input type="submit" onClick={addProd} value="Add New Product" />
    </>
  );
}

function UpdateProduct() {
  const [prodId, setProdId] = useState(null);
  const [prodData, setProdData] = useState(null);
  const isProd = prodData !== null;
  const [rows, setRows] = useState([
    { id: 1, size: "small", originalPrice: "", currentPrice: "" },
  ]);
  const prodIdInput = useRef(null);

  const handleAddRow = () => {
    const newRow = { id: Date.now(), size: "small", price: "" };
    setRows([...rows, newRow]);
  };

  const handleSizeChange = (id, newSize) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, size: newSize } : row))
    );
  };

  const handleOriginalPriceChange = (id, newOriginalPrice) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, originalPrice: newOriginalPrice } : row
      )
    );
  };

  const handleCurrentPriceChange = (id, newCurrentPrice) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, currentPrice: newCurrentPrice } : row
      )
    );
  };

  const delRow = (id) => {
    setRows((prevRows) => prevRows.filter((x) => x.id !== id));
  };

  useEffect(() => {
    async function fetchProdFromId() {
      try {
        if (!prodId || prodId?.trim() === "") return;
        const { data } = await axios.get(
          `http://localhost:5000/admin/id/${prodId?.trim()}`,
          {
            withCredentials: true,
          }
        );
        if (data?.msg === "success") {
          setProdData(data?.data);
        }
      } catch (error) {}
    }
    fetchProdFromId();
  }, [prodId]);

  return (
    <>
      <p className="mb-5 text-mauve11 text-[15px] leading-normal">
        Make changes to your account here. Click save when you're done.
      </p>

      <div className="flex gap-2">
        <input
          ref={prodIdInput}
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          id="productid"
          placeholder="Product Id"
        />

        <button onClick={() => setProdId(prodIdInput.current.value?.trim())}>
          Find
        </button>
      </div>

      {isProd && (
        <>
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-violet12 block"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="productname"
            />
          </fieldset>
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-violet12 block"
              htmlFor="details"
            >
              Details
            </label>
            <input
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="details"
            />
          </fieldset>
          <fieldset>
            <div className="container mx-auto mt-8">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="border p-2">Size</th>
                    <th className="border p-2">Original Price</th>
                    <th className="border p-2">Current Price</th>
                    <th className="border p-2">Del</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="border p-2">
                        <select
                          value={row.size}
                          onChange={(e) =>
                            handleSizeChange(row.id, e.target.value)
                          }
                          className="p-2"
                        >
                          <option selected>--</option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="L">L</option>
                          <option value="XL">XL</option>
                          <option value="XXL">XXL</option>
                          <option value="XXXL">XXXL</option>
                        </select>
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.originalPrice}
                          onChange={(e) =>
                            handleOriginalPriceChange(row.id, e.target.value)
                          }
                          className="p-2 border w-full"
                          placeholder="Original Price"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.currentPrice}
                          onChange={(e) =>
                            handleCurrentPriceChange(row.id, e.target.value)
                          }
                          className="p-2 border w-full"
                          placeholder="Current Price"
                        />
                      </td>
                      <td className="border p-2">
                        <button onClick={() => delRow(row.id)}>X</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4">
                <button
                  onClick={handleAddRow}
                  className="bg-green-500 text-white p-2"
                >
                  Add More
                </button>
              </div>
            </div>
          </fieldset>
        </>
      )}
    </>
  );
}

function ModProducts() {
  const [curtab, setCurtab] = useState(null);
  return (
    <div>
      <Tabs.Root
        defaultValue="tab1"
        className="mt-5 lg:w-2/3 mx-3 lg:mx-auto rounded-xl bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(54,54,54)] shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <Tabs.List className="w-full border-slate-600 dark:border-black border-b-[1px]">
          <Tabs.Trigger
            value="tab1"
            className="py-2 px-4 data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-zinc-600 rounded-lg m-2"
          >
            Add Product
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="py-2 px-4 data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-zinc-600 rounded-lg m-2"
          >
            Update Product
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab3"
            className="py-2 px-4 data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-zinc-600 rounded-lg m-2"
          >
            Remove Product
          </Tabs.Trigger>
        </Tabs.List>
        <div className="m-2">
          <Tabs.Content value="tab1">
            <AddProduct />
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <UpdateProduct />
          </Tabs.Content>
          <Tabs.Content value="tab3">del</Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
function Admin() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <>
      <div className="h-[84px] sm:h-32"></div>
      {isAuth ? <ModProducts /> : <AdminSignIn setIsAuth={setIsAuth} />}
    </>
  );
}

export default Admin;
