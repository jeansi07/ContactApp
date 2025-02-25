import axios from "axios";

interface OperatorsResponse {
  name: string;
  image: string;
  time: string;
  id: string;
  status: string;
}
export const getAllOperator = async (
  name?: string
): Promise<OperatorsResponse[]> => {
  const resp = await axios.get<OperatorsResponse[]>(
    `${process.env.NEXT_PUBLIC_API_URL}operators`,
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
