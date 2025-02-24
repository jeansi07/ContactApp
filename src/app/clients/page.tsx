"use client";

import { LoaderTable } from "@/components/Loader";
import { Table } from "@/components/Table";
import useWebSocket from "@/hooks/useWebSocket";
import { getAllClient } from "@/services/client";
import { useEffect, useState } from "react";

interface ClientProps {
  name: string;
  image: string;
  time: string;
  id: string;
}
const ClientsPage = () => {
  const [client, setClient] = useState<ClientProps[]>();
  const [Loader, setLoader] = useState(true);
  const [search, setSearch] = useState<string | undefined>();
  const { data, error, isConnected, currentSocket } = useWebSocket(
    "wss://293mw169-7269.use2.devtunnels.ms/ws"
  );

  const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const getClient = async (name?: string) => {
    setLoader(true);
    try {
      const resp = await getAllClient(name);
      setClient(resp);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const headerTableClient = () => {
    return (
      <div>
        <h1 className="text-center py-6 text-black">Clientes</h1>
        <div className=" flex items-center px-6 pb-4 gap-x-4">
          <input
            value={search ?? ""}
            type="text"
            placeholder="Buscar por nombre"
            onChange={handleSearchName}
            className="w-full max-w-60 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
          />
          <button
            onClick={() => getClient(search)}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Buscar cliente
          </button>
        </div>
        <div className=" grid grid-cols-2 items-center text-center pl-6">
          <span className="text-black text-left">Nombre</span>
          <span className="text-black">Tiempo de espera</span>
        </div>
      </div>
    );
  };

  const renderClientItem = (client: ClientProps) => {
    return (
      <div key={client.id} className="w-full px-4">
        <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white">
          <div className="grid grid-cols-2 items-center text-center">
            <div className="flex items-center gap-x-3">
              <img
                className="w-10 h-10 rounded-full"
                src={client.image}
                alt={client.name}
              />
              <p className="text-gray-800 font-medium">{client.name}</p>
            </div>
            <p className="text-gray-600 font-semibold">{client.time} min</p>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isConnected) {
      console.log(data);
    }
  }, [isConnected, data]);

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div>
      {Loader ? (
        <LoaderTable />
      ) : (
        <Table
          renderNotItems={() => (
            <p className="text-center text-red-500">
              No hay clientes disponibles
            </p>
          )}
          key="client"
          renderItems={renderClientItem}
          data={client ?? []}
          renderHeader={headerTableClient}
        />
      )}
    </div>
  );
};

export default ClientsPage;
