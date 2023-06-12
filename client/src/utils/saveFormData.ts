import api from '../api';

export interface FormData {
  name: string;
  description: string;
}

export interface SaveFormData extends FormData {
  recordId: string;
}

const saveFormData = async (data: SaveFormData) => {
  const newData: FormData = {
    name: data.name,
    description: data.description
  };

  const record = await api
    .collection('fields')
    .update(data.recordId, newData);

  // TODO: reset IndexedDB here?

  return {
    name: record.name,
    description: record.description,
  }

};

export default saveFormData;
