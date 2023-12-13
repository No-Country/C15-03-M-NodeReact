import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import data from "./localidad.json";
import crudAxios from "../../config/axios";

function ContactInfo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [focusedField, setFocusedField] = useState(null);
  const [addressOption, setAddressOption] = useState("sameAddress");

  const [newAddress, setNewAddress] = useState({
    direccion: "",
    provincia: "",
    localidad: "",
    codigoPostal: "",
  });



  const [nombreFocused, setNombreFocused] = useState(false);
  const [apellidoFocused, setApellidoFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [adressFocused, setAdressFocused] = useState(false);
  const [provinciaFocused, setProvinciaFocused] = useState(false);
  const [localidadFocused, setLocalidadFocused] = useState(false);
  const [codigoPostalFocused, setCodigoPostalFocused] = useState(false);
  const [telefonoFocused, setTelefonoFocused] = useState(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await crudAxios.get("/me");
        setUserData(res.data);
        console.log(userData);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []); // El array vacío indica que se ejecutará solo una vez

  useEffect(() => {
    if (userData) {
      // Establecer los valores en los campos del formulario
      setValue("nombre", userData.nombre || "");
      setValue("apellido", userData.apellido || "");
      setValue("email", userData.email || "");
      setValue("adress", userData.adress || "");
      setValue("provincia", userData.provincia || "");
      setValue("localidad", userData.localidad || "");
      setValue("codigoPostal", userData.codigoPostal || "");
      setValue("phone", userData.telefono || "");
    }
  }, [userData, setValue]);

  useEffect(() => {
    if (data && data.provincias) {
      setProvincias(data.provincias);
    } else {
      console.log("La respuesta no contiene datos de provincias");
    }
  }, []); // El array vacío indica que se ejecutará solo una vez



  const handleProvinciaChange = (e) => {
    setValue("provincia", e.target.value);
    const provincia = provincias.find((p) => p.nombre === e.target.value);
    if (provincia) {
      setLocalidades(provincia.localidades);
    } else {
      console.log("Provincia no encontrada");
      setLocalidades([]); // Limpio las localidades si la provincia no se encuentra
    }
  };


  const handleLocalidadChange = (e) => {
    setValue("localidad", e.target.value);
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleAddressOptionChange = (option) => {
    setAddressOption(option);
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

 



  return (

    <div className="container mx-auto pt-10 pl-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >

        {/*Nombre */}

        <div className="relative z-0 px-2 w-full group">
          <input
            {...register("nombre", { required: true })}
            type="text"
            id="nombre"
            className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-transparent`}
            onFocus={(e) => {
              handleFocus("nombre");
              e.target.placeholder = "Nombre";
              setNombreFocused(true);
            }}
            onFocusCapture={() => handleFocus("nombre")}
            onBlur={handleBlur}
            required
            placeholder=""
          />
          <label
            htmlFor="nombre"
            className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out items-center text-center bg-gray-100 text-gray-800 text-[15px] ${nombreFocused
              ? "-translate-y-2 text-xs text-gray-900"
              : "translate-y-2"
              }`}
              
          > 
            Nombre
          </label>
        </div>


        {/*Apellido */}

        <div className="relative z-0 px-2 w-full group">
          <input
            {...register("apellido", { required: true })}
            type="text"
            id="apellido"
            className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-100 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
             dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-transparent`}
            onFocus={(e) => {
              handleFocus("apellido");
              e.target.placeholder = "Apellido";
              setApellidoFocused(true);
            }}
            onBlur={handleBlur}
            required
            placeholder=""
          />
          <label
            htmlFor="apellido"
            className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out items-center text-center
              bg-gray-100 text-gray-800 text-[15px] ${apellidoFocused
                ? "-translate-y-2 text-xs text-gray-900"
                : "translate-y-2"
              }`}
          >
            Apellido
          </label>
        </div>

        {/*Email*/}

        <div className="relative z-0 px-2 w-full group">
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            id="email"
            className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
              text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-transparent`}
            onFocus={(e) => {
              handleFocus("email");
              e.target.placeholder = "contact@gmail.com";
              setEmailFocused(true);
            }}
            onBlur={handleBlur}
            required
            placeholder=""
          />
          <label
            htmlFor="email"
            className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out items-center text-center bg-gray-100 text-gray-800 text-[15px] ${emailFocused
              ? "-translate-y-2 text-xs text-gray-900"
              : "translate-y-2"
              }`}
          >
            Correo Electrónico
          </label>
        </div>



        <div className="relative z-0 px-2 w-full group">
          <input
            {...register("adress", { required: true })}
            type="adress"
            id="adress"
            className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
              text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-transparent`}
            onFocus={(e) => {
              handleFocus("adress");
              e.target.placeholder = "";
              setAdressFocused(true);
            }}
            onBlur={handleBlur}
            required
            placeholder=""
          />
          <label
            htmlFor="adress"
            className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out items-center text-center bg-gray-100 text-gray-800 text-[15px] ${adressFocused
              ? "-translate-y-2 text-xs text-gray-900"
              : "translate-y-2"
              }`}
          >
            Dirección
          </label>
        </div>



        {/* Provincia */}
        <div className="mb-4 col-span-2 flex space-x-4">
          <div className="relative z-0 px-2 w-full group">
            <select
              {...register("provincia", { required: true })}
              id="provincia"
              onChange={handleProvinciaChange}
              className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
                text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black
                dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-transparent`}
              onFocus={(e) => {handleFocus("provincia");
              e.target.placeholder = "";
              setProvinciaFocused(true);
            }}
              onBlur={handleBlur}
              required
            >
              <option value="">Selecciona una provincia</option>

              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.nombre}>
                  {provincia.nombre}
                </option>
              ))}
            </select>
            <label
              htmlFor="provincia"
              className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out
                items-center text-center bg-gray-100 text-gray-800 text-[15px] ${provinciaFocused
                  ? "-translate-y-2 text-xs text-gray-900"
                  : "translate-y-2"
                }`}
            >
              Provincia
            </label>
          </div>

          {/* Localidad */}
          <div className="relative z-0 px-2 w-full group">
          <select
            {...register("localidad", { required: true })}
            id="localidad"
            className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
   text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
   dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black
   dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-transparent`}
            onFocus={(e) => {handleFocus("localidad")
            e.target.placeholder = "Localidad";
            setLocalidadFocused(true);}}
            onBlur={handleBlur}
            onChange={handleLocalidadChange}
            required
          >
            <option value="">Selecciona una localidad</option>
            {localidades.map((localidad) => (
              <option key={localidad.id} value={localidad.id}>
                {localidad.nombre}
              </option>
            ))}
          </select>
          <label
            htmlFor="localidad"
            className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out
              items-center text-center bg-gray-100 text-gray-800 text-[15px] ${localidadFocused
                ? "-translate-y-2 text-xs text-gray-900"
                : "translate-y-2"
              }`}
          >
            Localidad
          </label>
          </div>
        </div>

        {/*Código Postal */}

        <div className="relative z-0 px-2 w-full group">
          
        <input
            {...register("codigoPostal", { required: true})}
            type="codigoPostal"
            id="codigoPostal"
            className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
              text-gray-100 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5
              dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-blue-500 placeholder-transparent`}
            onFocus={(e) => {
              handleFocus("codigoPostal");
              e.target.placeholder = "";
              setCodigoPostalFocused(true);
            }}
            onBlur={handleBlur}
            required
            placeholder=""
          />
          <label
            htmlFor="codigoPostal"
            className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out items-center text-center bg-gray-100 text-gray-800 text-[15px] ${codigoPostalFocused
              ? "-translate-y-2 text-xs text-gray-900"
              : "translate-y-2"
              }`}
          >
            Código Postal
          </label>
        </div>

        {/*Telefono */}

        <div className="relative z-0 px-2 w-full group">
        <input
            {...register("phone", { required: true, pattern: /^\S+@\S+$/i })}
            type="telefono"
            id="telefono"
            maxLength="10"
            className={`h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
              text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-transparent`}
            onFocus={(e) => {
              handleFocus("telefono");
              e.target.placeholder = "";
              setTelefonoFocused(true);
            }}
            onBlur={handleBlur}
            required
            placeholder=""
          />
          <label
            htmlFor="telefono"
            className={`absolute top-0 left-5 transform transition-all duration-300 ease-in-out items-center text-center bg-gray-100 text-gray-800 text-[15px] ${telefonoFocused
              ? "-translate-y-2 text-xs text-gray-900"
              : "translate-y-2"
              }`}
          >
            Teléfono
          </label>
        </div>

      
         {/* Radio buttons for address options */}
        <div className="mb-4 col-span-2 flex flex-col space-y-4">
          <div className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              id="sameAddress"
              name="addressOption"
              value="sameAddress"
              checked={addressOption === "sameAddress"}
              onChange={() => handleAddressOptionChange("sameAddress")}
            />
            <label htmlFor="sameAddress" className="text-gray-800 text-sm" style={{ color: '#4F4F4F', fontSize: 14, fontFamily: 'Open Sans', fontWeight: '400' }}>
              Mi dirección de contacto es la misma que la de compra
            </label>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              id="newAddress"
              name="addressOption"
              value="newAddress"
              checked={addressOption === "newAddress"}
              onChange={() => handleAddressOptionChange("newAddress")}
            />
            <label htmlFor="newAddress" className="text-gray-800 text-sm" style={{ color: '#4F4F4F', fontSize: 14, fontFamily: 'Open Sans', fontWeight: '400' }}>
              Añadir una nueva dirección de facturación
            </label>
          </div>
        </div>

        {/* Additional input for new address */}
        {addressOption === "newAddress" && (
          <div className="mb-4 col-span-2 flex flex-col space-y-4">
            <input
              type="text"
              {...register("newStreet", { required: true })}
              placeholder="Dirección"
              value={newAddress.street}
              onChange={(e) => handleNewAddressChange("street", e.target.value)}
              className="h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
                text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <input
              type="text"
              {...register("newStreet", { required: true })}
              placeholder="Provincia"
              value={newAddress.street}
              onChange={(e) => handleNewAddressChange("street", e.target.value)}
              className="h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
                text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <input
              type="text"
              {...register("newStreet", { required: true })}
              placeholder="Localidad"
              value={newAddress.street}
              onChange={(e) => handleNewAddressChange("street", e.target.value)}
              className="h-12 text-[18px]text-10 bg-gray-50 border py-55-rem border-gray-300
                text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            
          </div>
        )}

      </form>
    </div>
  );
}

export default ContactInfo;
