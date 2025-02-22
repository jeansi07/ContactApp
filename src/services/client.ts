import axios from "axios";

interface ClientResponse {
  name: string;
  image: string;
  time: string;
  id: string;
}
export const getAllClient = async (): Promise<ClientResponse[]> => {
  const resp = await axios.get<ClientResponse[]>(
    "https://293mw169-7269.use2.devtunnels.ms/api/clients"
  );
  if (resp.data && resp.status === 200) {
    return resp.data;
  }
  throw new Error("fallido");
};
