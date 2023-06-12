import { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { STATUS } from './consts.ts';
import { useFormData } from './hooks';
import saveFormData from './utils';

function App() {
  const {
    recordId,
    name,
    setName,
    description,
    setDescription,
    status,
    setStatus,
    resetForm,
    setInitialState,
  } = useFormData();


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(STATUS.SAVING);

    saveFormData({ recordId, name, description })
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setInitialState(data);
        setStatus(STATUS.SAVED);
      })
      .catch(() => setStatus(STATUS.ERROR));
  };

  // Submit form on Ctrl/Cmd + Enter
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.currentTarget.form?.requestSubmit();
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleReset = () => {
    resetForm();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Form with draft autosave
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>

            <div className="mt-2">
              <input
                id="name"
                type="text"
                name="name"
                value={name ?? ''}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
            </div>

            <div className="mt-2">
              <input
                id="description"
                type="text"
                name="description"
                value={description ?? ''}
                onChange={handleDescriptionChange}
                onKeyDown={handleKeyDown}
                autoComplete="description"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>

          <div className="flex w-full justify-between">
            <span className="text-sm">
              Status: {status}
            </span>

            <div className="text-sm">
              <button
                onClick={handleReset}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
