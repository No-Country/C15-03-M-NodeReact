import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import crudAxios from "../../config/axios";

export default function HomeCards() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const consultarApi = async () => {
      const link = slug ? "/get/" + slug : "";

      console.log(slug);
      try {
        const res = await crudAxios.get(`/product${link}`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    consultarApi();
  }, []);

  return (
    <div className="">
      <h2 className="mt-20 md:mt-5 text-[2.3rem] font-[600] text-center mb-6">
        Nuestros productos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mx-auto md:pb-20 max-w-[300px] md:max-w-[1200px]">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-[6px] shadow-md hover:shadow-lg transition duration-300 ease-in-out transform w-[284px] max-w-[284px] h-[469px] max-h-[469px]"
          >
            <div className="w-[250px] h-[286px] mx-auto flex items-center">
              <Link to={`/product/${product.id}`} key={product.id} className="w-full">
                <img
                  src={`${
                    import.meta.env.VITE_APP_BACKEND_URL
                  }/uploads/productos/${product.imagen}`}
                  alt={product.titulo}
                  className=" bg-white w-auto h-auto object-cover"
                />
              </Link>
            </div>
            <hr className="bg-gray-300" />
            <div className="p-4">
              {product["mas-vendidos"] ? (
                <span className="bg-[#ff7733] text-white rounded-sm px-[5px] py-[1px] uppercase text-[.75rem] font-[600] ">
                  Más vendido
                </span>
              ) : (
                ""
              )}
              <h3 className="font-[400] text- text-[.95rem] text-[rgba(0,0,0,.8)]">
                {product.titulo}
              </h3>
              <div>
                {product.descuento.descuento ? (
                  <p className="line-through text-[rgba(0,0,0,.55)] text-[12px]">
                    ${product.descuento.antiguo}
                  </p>
                ) : (
                  ""
                )}
                <div className="flex">
                  <p className="text-2xl">${product.precio}</p>
                  {product.descuento.descuento ? (
                    <p className="text-[#00a650] flex items-center pl-1 text-[.9rem]">
                      {product.descuento.porcentaje}% OFF
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <p className="text-[#00a650] font-[600] text-[14px]">
                {product.envioGratis ? "Envío gratis" : "Sin envío incluido"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

