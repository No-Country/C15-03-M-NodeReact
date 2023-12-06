import React, { useEffect, useState } from "react";
import  {useParams, useNavigate } from 'react-router-dom';
import crudAxios from "../config/axios";


export default function ProductPage() {

    const {id}= useParams()
    const navigate = useNavigate()
    const[product,setProduct] = useState({})
    useEffect(()=>{
        const consultarApi = async() =>{
          try {
     
        
            const res = await crudAxios.get(`/product/${id}`) 
            setProduct(res.data)
            
            
          } catch (error) {
            console.log(error)
            setProduct({})
          } 
     
        }
        consultarApi()
      },[])


      if(Object.keys(product).length < 1 ){

        navigate('/')
      }

    return (
        <>
            <div className="bg-gray-100 ">
                <div className="mx-auto container py-8">
                    <div className="flex flex-wrap items-center lg:justify-between justify-center">
                        
                            <div  className="mx-2 w-72 lg:mb-0 mb-8">
                                <div>
                                    <img src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/productos/${product.imagen}` } className="w-full h-44" />
                                </div>
                                <div className="bg-white">
                                    <div className="p-4">
                                        <div className="flex items-center">
                                            <h2 className="text-lg font-semibold">{product.titulo}</h2>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">{product.descripcion}</p>
                                        <div className="flex mt-4">
                                            
                                            <div className="pl-2">
                                                <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between py-4">
                                            <h3 className="text-indigo-700 text-xl font-semibold">${product.precio}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
