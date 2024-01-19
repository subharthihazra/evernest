import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useSearchParams } from "react-router-dom";

async function authAdmin({ username, password }) {
  return await axios.post(
    `${String(process.env.REACT_APP_BACKEND_URL)}/admin/signin`,
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
  const initRow = { size: "--", originalPrice: "", currentPrice: "", stock: 0 };
  const [productName, setProductName] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [rows, setRows] = useState([{ ...initRow, id: 1 }]);

  const [lastId, setLastId] = useState(null);

  const formRef = useRef(null);

  const handleAddRow = () => {
    const newRow = {
      ...initRow,
      id: rows[rows.length - 1].id + 1,
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

  const handleStockChange = (id, newStock) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, stock: newStock } : row))
    );
  };

  const delRow = (id) => {
    setRows((prevRows) => prevRows.filter((x) => x.id !== id));
  };

  const handleMainImageChange = (event) => {
    const imageFile = event.target.files[0];
    setMainImage(imageFile);
  };

  const clearForm = () => {
    console.log("ss");
    setProductName(null);
    setProductDetails(null);
    setMainImage(null);
    setRows([{ ...initRow, id: 1 }]);
    formRef.current.reset();
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
        `${String(process.env.REACT_APP_BACKEND_URL)}/admin/product/upload`,
        { productName, productDetails, mainImage, variant: rows },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.msg === "success") {
        console.log("Uploaded");
        console.log(data);
        setLastId(data?.data?.id);
        clearForm();
      }
    } catch (error) {}
  }

  return (
    <>
      <p className="mb-5 text-mauve11 text-[15px] leading-normal">
        Add a new Product.
      </p>
      {lastId && (
        <p className="mb-5 text-mauve11 text-[15px] leading-normal">
          Last Added Product's Id: {lastId}
        </p>
      )}
      <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
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
          <div className="mt-4 p-2 border">
            <label className="block mb-2">Product Image</label>
            {mainImage && (
              <img
                src={URL.createObjectURL(mainImage)}
                alt="Uploaded Preview"
                style={{ maxWidth: "100%", maxHeight: "100px" }}
                className="mb-2"
              />
            )}
            <input
              type="file"
              onChange={handleMainImageChange}
              className="w-full"
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
                <th className="border p-2">Stock</th>
                <th className="border p-2">Del</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border p-2">
                    <select
                      onChange={(e) => handleSizeChange(row.id, e.target.value)}
                      className="p-2"
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
                    <input
                      type="number"
                      value={row.stock}
                      onChange={(e) =>
                        handleStockChange(row.id, e.target.value)
                      }
                      className="p-2 border w-full"
                      placeholder="Stock"
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
      </form>
    </>
  );
}

function UpdateProduct() {
  const [prodId, setProdId] = useState(null);
  const [prodData, setProdData] = useState(null);
  const rows = prodData
    ? prodData?.variant?.map((v, id) => ({ ...v, id: id + 1 }))
    : null;
  const setRows = (r) => {
    if (r instanceof Function) {
      setProdData((x) => {
        let newR = r(rows).map((x) => {
          let y = x;
          delete y.id;
          return y;
        });
        return { ...x, variant: newR };
      });
    } else {
      setProdData((x) => ({ ...x, variant: r }));
    }
  };
  const isProd = prodData !== null;
  const [isLoading, setIsLoading] = useState(false);

  const prodIdInput = useRef(null);
  const formRef = useRef(null);
  const [mainImage, setMainImage] = useState(null);

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

  const handleStockChange = (id, newStock) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, stock: newStock } : row))
    );
  };

  const delRow = (id) => {
    setRows((prevRows) => prevRows.filter((x) => x.id !== id));
  };

  const handleMainImageChange = (event) => {
    const imageFile = event.target.files[0];
    setMainImage(imageFile);
  };

  async function fetchProdFromId() {
    try {
      setIsLoading(true);
      setProdData(null);
      setMainImage(null);
      if (formRef.current) formRef.current.reset();
      // console.log(formRef.current, formRef);

      if (!prodId || prodId?.trim() === "") return;
      const { data } = await axios.get(
        `${String(
          process.env.REACT_APP_BACKEND_URL
        )}/admin/product/id/${prodId?.trim()}`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data?.msg === "success") {
        setProdData(data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProdFromId();
  }, [prodId]);

  async function updateProdById() {
    try {
      setIsLoading(true);

      if (!prodId || prodId?.trim() === "") return;
      const { data } = await axios.patch(
        `${String(
          process.env.REACT_APP_BACKEND_URL
        )}/admin/product/id/${prodId?.trim()}`,
        mainImage
          ? {
              ...prodData,
              mainImage,
            }
          : { ...prodData },
        {
          withCredentials: true,
          headers: mainImage
            ? {
                "Content-Type": "multipart/form-data",
              }
            : {},
        }
      );
      console.log(data);
      if (data?.msg === "success") {
        fetchProdFromId();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <p className="mb-5 text-mauve11 text-[15px] leading-normal">
        Change Current Products.
      </p>

      <div className="flex gap-2">
        <input
          ref={prodIdInput}
          className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
          id="productid"
          placeholder="Product Id"
        />

        <button onClick={() => setProdId(prodIdInput.current.value)}>
          Find
        </button>
      </div>

      {isLoading && <div>Loading ...</div>}

      {!isLoading && isProd && (
        <>
          <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()}
            className="mt-3"
          >
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
                defaultValue={prodData?.name}
                onChange={(e) =>
                  setProdData((p) => ({ ...p, name: e.target.value }))
                }
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
                defaultValue={prodData?.description}
                onChange={(e) =>
                  setProdData((p) => ({ ...p, description: e.target.value }))
                }
              />
            </fieldset>
            <fieldset>
              <div className="mt-4">
                <label className="block mb-2">Product Image</label>{" "}
                <img
                  src={
                    mainImage ? URL.createObjectURL(mainImage) : prodData.imgUrl
                  }
                  alt="Uploaded Preview"
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                  className="mb-2"
                />
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
                    <th className="border p-2">Stock</th>
                    <th className="border p-2">Del</th>
                  </tr>
                </thead>
                <tbody>
                  {rows?.map((row) => (
                    <tr key={row.id}>
                      <td className="border p-2">
                        <select
                          onChange={(e) =>
                            handleSizeChange(row.id, e.target.value)
                          }
                          className="p-2"
                          defaultValue={row.size}
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
                          defaultValue={row.originalPrice}
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
                          defaultValue={row.currentPrice}
                          onChange={(e) =>
                            handleCurrentPriceChange(row.id, e.target.value)
                          }
                          className="p-2 border w-full"
                          placeholder="Current Price"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          defaultValue={row.stock}
                          onChange={(e) =>
                            handleStockChange(row.id, e.target.value)
                          }
                          className="p-2 border w-full"
                          placeholder="Stock"
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
            <input
              type="submit"
              onClick={updateProdById}
              value="Update Product"
            />
          </form>
        </>
      )}
    </>
  );
}

function ModProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const curtab = searchParams.get("curtab");
  return (
    <div>
      <Tabs.Root
        defaultValue={curtab ? curtab : "addtab"}
        onValueChange={(v) => setSearchParams({ curtab: v })}
        className="mt-5 lg:w-2/3 mx-3 lg:mx-auto rounded-xl bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(54,54,54)] shadow-[0_0_15px_3px_rgba(0,0,0,0.1),0_0_3px_1px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <Tabs.List className="w-full border-slate-600 dark:border-black border-b-[1px]">
          <Tabs.Trigger
            value="addtab"
            className="py-2 px-4 data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-zinc-600 rounded-lg m-2"
          >
            Add Product
          </Tabs.Trigger>
          <Tabs.Trigger
            value="updatetab"
            className="py-2 px-4 data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-zinc-600 rounded-lg m-2"
          >
            Update Product
          </Tabs.Trigger>
          <Tabs.Trigger
            value="deltab"
            className="py-2 px-4 data-[state=active]:bg-slate-200 dark:data-[state=active]:bg-zinc-600 rounded-lg m-2"
          >
            Remove Product
          </Tabs.Trigger>
        </Tabs.List>
        <div className="m-2">
          <Tabs.Content value="addtab">
            <AddProduct />
          </Tabs.Content>
          <Tabs.Content value="updatetab">
            <UpdateProduct />
          </Tabs.Content>
          <Tabs.Content value="deltab">del</Tabs.Content>
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
