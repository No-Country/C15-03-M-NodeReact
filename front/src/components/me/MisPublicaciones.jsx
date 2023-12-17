import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crudAxios from '../../config/axios';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line, RiDeleteBin7Fill, RiDeleteBin6Line } from "react-icons/ri";


export default function MisPublicaciones() {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({
        id: "", // Added id to track which product is being edited
        titulo: "",
        precio: "",
        category:"",
        marca: "",
        envio: "",
        descripcion: "",
        imagen: ""
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await crudAxios.get('/product');
                setProducts(res.data);
                if (res.data.length > 0) {
                    setEditProduct({
                        id: res.data[0].id,
                        titulo: res.data[0].titulo,
                        precio: res.data[0].precio,
                        descripcion: res.data[0].descripcion,
                        imagen: res.data[0].imagen
                    });
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update product request
            await crudAxios.put("/product/update", editProduct);
            // Refresh products list after update
            const res = await crudAxios.get('/product');
            setProducts(res.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    }

   return (
        <div className="container mx-auto p-4 w-[1000px]">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
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
                    <button className=" w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Guardar Cambios
                    </button>
                    <button className=" w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                    </button>
                </div>
            </form>
            ) : (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <ul>
                    {products.map((product) => (
                        <li key={product.id} className="mb-4">
                            <div className="flex items-center justify-between">
                            <Link to={`/product/${product.id}`} className="flex items-center space-x-4">
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

                                <div className="flex items-center space-x-2">
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
                                        className=""
                                        onClick={() => handleRemove(product.id)}
                                    >
                                        <RiDeleteBin7Line />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);
}