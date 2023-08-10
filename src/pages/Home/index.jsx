import React, { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { useVaccineId } from "../../hooks/useVaccine"
import Chart from "chart.js/auto"

const Home = () => {
  const [vacinaData, setVacinaData] = useState([])

  const { setVaccineId } = useVaccineId()
  const navigateTo = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/vacinas/")
        setVacinaData(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [])

  const handleDelete = async (vacinaId) => {
    try {
      await axios.delete(`http://localhost:8000/vacinas/${vacinaId}/`)
      toast.success("Vacina deletada com sucesso!")
      navigateTo("/")
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro ao deletar a vacina.")
    }
  }

  const handleEdit = (vacinaId) => {
    setVaccineId(vacinaId)
    navigateTo("/edit")
  }

  useEffect(() => {
    renderPieChart()
  }, [vacinaData])

  const renderPieChart = () => {
    const publicoAlvoA = vacinaData.filter(
      (vacina) => vacina.publico_alvo === "A",
    ).length
    const publicoAlvoC = vacinaData.filter(
      (vacina) => vacina.publico_alvo === "C",
    ).length

    const existingChart = Chart.getChart("pieChart") 
    if (existingChart) {
      existingChart.destroy() 
    }

    const ctx = document.getElementById("pieChart").getContext("2d")
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Vacinas para Adultos", "Vacinas para Crianças "],
        datasets: [
          {
            data: [publicoAlvoA, publicoAlvoC],
            backgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      },
      options: {
        aspectRatio: 6,
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <h1 className="mt-10 text-center text-4xl font-bold leading-10">
        Vacinas disponíveis
      </h1>

      <canvas id="pieChart" width="200" height="200"></canvas>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {vacinaData.map((vacina) => (
          <div className="h-24 bg-slate-100 rounded" key={vacina.id}>
            <p className="justify-between my-1 text-lg text-center font-medium text-blue-950">
              {vacina.nome}
            </p>
            <div className="flex mt-6 justify-end">
              <Link
                to="/edit"
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-8 rounded mr-2"
                onClick={() => handleEdit(vacina.id)}
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(vacina.id)}
                className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-8 rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="bottom-right" />

      <p className="mt-10 text-center text-sm text-gray-500">
        Deseja cadastrar mais vacinas?
        <Link
          to="/"
          className="ml-1 font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
        >
          Clique aqui
        </Link>
      </p>
    </div>
  )
}

export default Home
