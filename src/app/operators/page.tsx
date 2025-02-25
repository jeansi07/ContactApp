"use client";
import { LoaderTable } from "@/components/Loader";
import { Table } from "@/components/Table";
import useWebSocket from "@/hooks/useWebSocket";
import { getAllOperator } from "@/services/operator";
import { useEffect, useState } from "react";

interface OperatorsProps {
  name: string;
  image: string;
  time: string;
  id: string;
  status: string;
}

const OperatorPage = () => {
  const [operators, setOperators] = useState<OperatorsProps[]>([]);
  const [search, setSearch] = useState<string | undefined>();

  const [filter, setFilter] = useState<string>("Todos");
  const [loader, setLoader] = useState(true);

  const { data, isConnected } = useWebSocket<{
    type: string;
    data: { id: number; Status: string };
  }>("wss://293mw169-7269.use2.devtunnels.ms/ws");

  const getOperator = async (name?: string) => {
    setLoader(true);
    try {
      const res = await getAllOperator(name);
      setOperators(res);
    } catch (error) {
      console.log(" error ", error);
    } finally {
      setLoader(false);
    }
  };

  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filterStatus = () => {
    switch (filter) {
      case "Todos":
        return operators;
      case "Llamada":
        return operators.filter((op) => op.status === "InCall");
      case "Disponibles":
        return operators.filter((op) => op.status === "Available");
      case "Pausa":
        return operators.filter((op) => op.status === "Pause");
      default:
        return operators;
    }
  };

  const filteredOperators = filterStatus();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    if (isConnected) {
      setOperators((prev) =>
        prev.map((op) => {
          if (
            data?.type === "OPERATOR_STATUS_UPDATE" &&
            data.data.id.toString() === op.id
          ) {
            return {
              ...op,
              status: data.data.Status,
            };
          }
          return op;
        })
      );
    }
  }, [isConnected, data]);

  useEffect(() => {
    getOperator();
  }, []);

  useEffect(() => {
    filterStatus();
  }, [filter, operators]);

  const headerTableOperator = () => {
    return (
      <div key="operatorsHeader">
        <h1 className="text-center py-6 text-black">Operadores</h1>

        <div className="w-full flex max-sm:flex-col items-center text-right justify-between px-6 pb-4 gap-x-4">
          <div className=" flex items-center px-6 pb-4 gap-x-4">
            <input
              value={search ?? ""}
              type="text"
              placeholder="Buscar por nombre"
              onChange={handleSearchName}
              className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
            />
            <button
              onClick={() => getOperator(search)}
              className="px-2 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Buscar operador
            </button>
          </div>
          <div className="flex items-center gap-x-4">
            <span className="text-black font-medium">Filtrar por:</span>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-1 text-black bg-white"
            >
              <option value="Todos">Todos</option>
              <option value="Disponibles">Disponibles</option>
              <option value="Llamada">En llamada</option>
              <option value="Pausa">En pausa</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center text-center pl-6">
          <span className="text-black text-left">Nombre</span>
          <span className="text-black">Tiempo de espera</span>
          <span className="text-black">Disponibilidad</span>
        </div>
      </div>
    );
  };

  const renderOperatorItem = (operator: OperatorsProps) => {
    console.log("operator", filteredOperators.length);

    return (
      <>
        <div key={operator.id} className="w-full px-4">
          <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
            <div className="grid grid-cols-3 items-center text-center">
              <div className="flex items-center gap-x-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={operator.image}
                  alt={operator.name}
                />
                <p className="text-gray-800 font-medium">{operator.name}</p>
              </div>
              <p className="text-gray-600">{operator.time}</p>
              <p
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  operator.status === "Available"
                    ? "bg-green-200 text-green-800"
                    : operator.status === "InCall"
                    ? "bg-red-200 text-red-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {operator.status === "Available"
                  ? "Disponible"
                  : operator.status === "InCall"
                  ? "En llamada"
                  : "En pausa"}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {loader ? (
        <LoaderTable />
      ) : (
        <Table
          renderNotItems={() => (
            <p className="text-center text-red-500">
              No hay operadores disponibles
            </p>
          )}
          key="operators"
          renderHeader={headerTableOperator}
          renderItems={renderOperatorItem}
          data={filteredOperators}
        />
      )}
    </div>
  );
};

export default OperatorPage;
