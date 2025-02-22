"use client";
import { LoaderTable } from "@/components/Loader";
import { Table } from "@/components/Table";
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
  const [filteredOperators, setFilteredOperators] = useState<OperatorsProps[]>(
    []
  );
  const [filter, setFilter] = useState<string>("Todos");
  const [loader, setLoader] = useState(true);

  const getOperator = async () => {
    setLoader(true);
    try {
      const res = await getAllOperator();
      setOperators(res);
      setFilteredOperators(res);
    } catch (error) {
      console.log(" error ", error);
    } finally {
      setLoader(false);
    }
  };

  const filterStatus = () => {
    if (filter === "Disponibles") {
      setFilteredOperators(operators.filter((op) => op.status === "Available"));
    } else {
      setFilteredOperators(operators);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    getOperator();
  }, []);

  useEffect(() => {
    filterStatus();
  }, [filter, operators]);

  const headerTableOperator = () => {
    return (
      <div>
        <h1 className="text-center py-6 text-black">Operadores</h1>
        <div className="flex items-center text-right justify-end px-6 pb-4 gap-x-4">
          <span className="text-black font-medium">Filtrar por:</span>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1 text-black bg-white"
          >
            <option value="Todos">Todos</option>
            <option value="Disponibles">Disponibles</option>
          </select>
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
    return (
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
                  : "bg-red-200 text-red-800"
              }`}
            >
              {operator.status === "Available" ? "Disponible" : "En llamada"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loader ? (
        <div className="flex justify-center items-center h-50">
          <LoaderTable />
        </div>
      ) : (
        <Table
          renderHeader={headerTableOperator}
          renderItems={renderOperatorItem}
          data={filteredOperators}
        />
      )}
    </div>
  );
};

export default OperatorPage;
