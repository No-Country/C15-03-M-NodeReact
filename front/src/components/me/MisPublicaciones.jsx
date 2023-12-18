import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import crudAxios from "../../config/axios";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line, RiDeleteBin7Fill } from "react-icons/ri";

export default function MisPublicaciones() {
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false); // State to track if adding a new product
  const [editProduct, setEditProduct] = useState({
    id: "", // Added id to track which product is being edited or added
    titulo: "",
    precio: "",
    category: "",
    marca: "",
    envio: "",
    descripcion: "",
    imagen: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await crudAxios.get("/product");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        // Add new product request
        await crudAxios.post("/product/add", editProduct);
      } else if (isEditing) {
        // Update product request
        await crudAxios.put("/product/update", editProduct);
      }
      // Refresh products list after update or add
      const res = await crudAxios.get("/product");
      setProducts(res.data);
      setIsEditing(false);
      setIsNew(false);
    } catch (error) {
      console.error("Error updating/adding product:", error);
    }
  };

  const handleAddNew = () => {
    setIsNew(true);
    setIsEditing(false);
    setEditProduct({
      id: "",
      titulo: "",
      precio: "",
      category: "",
      marca: "",
      envio: "",
      descripcion: "",
      imagen: "",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20 h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 w-[450px] md:w-[1000px]">
      {isNew || isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
        >
          <div className="mb-4">
            <h1>Producto</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="titulo"
              placeholder="Title"
              value={editProduct.titulo}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <h1>Precio</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="precio"
              placeholder="Price"
              value={editProduct.precio}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <h1>Marca</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="marca"
              placeholder="Brand"
              value={editProduct.marca}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <h1>Envío</h1>
            <select
              className=" bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="envio"
              onChange={handleInputChange}
              value={editProduct.envio ? "Envío Gratis" : "Sin Envío Incluido"}
            >
              <option value="Envío Gratis">Envío Gratis</option>
              <option value="Sin Envío Incluido">Sin Envío Incluido</option>
            </select>
          </div>

          <div className="mb-4">
            <h1>Categoría</h1>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="category"
              placeholder="Category"
              value={editProduct.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <h1>Descripción</h1>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="descripcion"
              placeholder="Description"
              value={editProduct.descripcion}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col items-center justify-between space-y-2">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isNew ? "Add Product" : "Save Changes"}
            </button>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                setIsEditing(false);
                setIsNew(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
         <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold ">Lista de Productos</h2>
          <button
            onClick={handleAddNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            Subir Producto
          </button>
        </div>

          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <ul>
              {products.map((product) => (
                <li key={product.id} className="mb-4">
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center space-x-4"
                    >
                      <img
                        className="w-20 h-20 object-cover rounded"
                        src={`/images/products/${product.titulo}.png`}
                        alt={product.titulo}
                      />
                      <div>
                        <h3 className="text-lg font-bold">{product.titulo}</h3>
                        <p className="text-gray-600">${product.precio}</p>
                      </div>

                    </Link>
                    
                    <div className="flex items-center space-x-2 text-indigo-600">
                      <button
                        className=""
                        onClick={() => {
                          setIsEditing(true);
                          setEditProduct(product);
                        }}
                      >
                        <FaRegEdit />
                      </button>

                      <button
                        className="text-red-500"
                        onClick={() => handleRemove(product.id)}
                        onMouseEnter={() => setHoveredItemId(product.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                      >
                        {hoveredItemId === product.id ? (
                          <RiDeleteBin7Fill />
                        ) : (
                          <RiDeleteBin7Line />
                        )}
                      </button>
                    </div>
                    
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
