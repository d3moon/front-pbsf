import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"

const SignUp = () => {
  const [formData, setFormData] = useState({
    nome: "",
    publico_alvo: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8000/vacinas/`, formData)
      toast.success("Dados enviados com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao enviar os dados.")
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
          Cadastre uma Vacina
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
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
              Sign Up
            </button>
          </div>
        </form>
        <ToastContainer position="bottom-right" />

        <p className="mt-10 text-center text-sm text-gray-500">
          Deseja visualizar todas as vacinas?
          <Link
            to="/home"
            className="ml-1 font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            Clique aqui
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
