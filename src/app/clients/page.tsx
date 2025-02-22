"use client";

import { LoaderTable } from "@/components/Loader";
import { Table } from "@/components/Table";
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
  const getClient = async () => {
    setLoader(true);
    try {
      const resp = await getAllClient();
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
    getClient();
  }, []);

  return (
    <div>
      {Loader ? (
        <LoaderTable />
      ) : (
        <Table
          renderItems={renderClientItem}
          data={client ?? []}
          renderHeader={headerTableClient}
        />
      )}
    </div>
  );
};

export default ClientsPage;
