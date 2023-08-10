import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import { useVaccineId } from "../../hooks/useVaccine"

const Edit = () => {
  const navigateTo = useNavigate()
  const { vaccineId } = useVaccineId()
  const [vacinaData, setVacinaData] = useState({})
  const [formData, setFormData] = useState({
    nome: "",
    publico_alvo: "",
  })

  useEffect(() => {
    if (vaccineId) {
      const fetchVacinaData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/vacinas/${vaccineId}/`,
          )
          console.log(response.data)
          setVacinaData(response.data)
        } catch (error) {
          console.error(error)
        }
      }

      fetchVacinaData()
    }
  }, [vaccineId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8000/vacinas/${vaccineId}/`, formData)
      toast.success("Dados atualizados com sucesso!")
      navigateTo("/")
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao atualizar os dados.")
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://pbsf.com.br/wp-content/uploads/2023/03/logo-pbsf-vetorizado-sem-slogan-1-web-min.png"
          alt="PBSF Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edite suas informações
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handleUpdate}>
          <div>
            <label
              for="nome"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="nome"
                type="text"
                placeholder={vacinaData.nome}
                value={formData.nome}
                onChange={handleChange}
                required
                className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="publico"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Público Alvo
              </label>
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="publico_alvo"
                  value="A"
                  checked={formData.publico_alvo === "A"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-cyan-600"
                />
                <span className="ml-2">Adulto</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="publico_alvo"
                  value="C"
                  checked={formData.publico_alvo === "C"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-cyan-600"
                />
                <span className="ml-2">Criança</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="publico_alvo"
                  value=""
                  checked={formData.publico_alvo === ""}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-cyan-600"
                />
                <span className="ml-2">Não especificado</span>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Editar
            </button>
          </div>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  )
}

export default Edit
