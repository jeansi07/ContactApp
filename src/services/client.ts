import axios from "axios";

interface ClientResponse {
  name: string;
  image: string;
  time: string;
  id: string;
}
export const getAllClient = async (
  name?: string
): Promise<ClientResponse[]> => {
  const resp = await axios.get<ClientResponse[]>(
    `${process.env.NEXT_PUBLIC_API_URL}clients`,
    {
      params: {
        name,
      },
    }
  );
  if (resp.data && resp.status === 200) {
    return resp.data;
  }
  throw new Error("fallido");
};
