import { useEffect, useRef, useState } from 'react';
import api from '../api';
import { STATUS } from '../consts.ts';

const useFormData = () => {
  const [recordId, setRecordId] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [status, setStatus] = useState<STATUS>(STATUS.SAVED);
  const [initialState, setInitialState] = useState({
    name,
    description,
  });

  const isMounted = useRef(true);

  useEffect(() => {
    // TODO: access IndexedDB here to check if name or description are present
    //  if so, set them to the state variables and don't make the API call
    //  if not, make the API call and set the state variables

    const fetchData = async () => {
      const { items } = await api.collection('fields').getList();

      setName(items[0].name);
      setDescription(items[0].description);
      setRecordId(items[0].id);

      setInitialState({
        name: items[0].name,
        description: items[0].description,
      });
    };

    if (isMounted.current) {
      fetchData();
      isMounted.current = false;
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  // TODO: save drafts to IndexedDB here when name or description changes

  useEffect(() => {
    if (name === initialState.name && description === initialState.description) {
      setStatus(STATUS.SAVED);
    } else {
      setStatus(STATUS.DRAFT);
    }
  }, [name, description]);


  const resetForm = () => {
    // TODO: reset IndexedDB here
    setName(initialState.name);
    setDescription(initialState.description);
  }

  return {
    recordId,
    name,
    setName,
    description,
    setDescription,
    status,
    setStatus,
    resetForm,
    setInitialState,
  };
};

export default useFormData;
