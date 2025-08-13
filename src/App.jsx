import React, { useEffect, useState } from "react";

export default function App() {
  const STORAGE_KEY = "todo_tasks_v1";

  const [title, setTitle] = useState("");
  const [disc, setDisc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  // 1) Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setMainTask(parsed);
      }
    } catch (err) {
      console.error("Failed to load tasks from localStorage", err);
    }
  }, []);

  // 2) Save to localStorage whenever mainTask changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mainTask));
    } catch (err) {
      console.error("Failed to save tasks to localStorage", err);
    }
  }, [mainTask]);

  const handleDelete = (id) => {
    setMainTask((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const t = title.trim();
    const d = disc.trim();

    if (!t || !d) {
      alert(
        "Empty todo will not be added. Please enter title and description."
      );
      return;
    }

    const newTask = { id: Date.now(), title: t, disc: d };
    setMainTask((prev) => [...prev, newTask]);

    setTitle("");
    setDisc("");
  };

  return (
    <main className="w-[80%] mx-auto h-auto">
      <h1 className=" text-4xl md:text-5xl bg-gray-950 p-3 rounded-2xl text-white my-5 text-center font-semibold   ">
        Todo List
        <p className="text-xl md:text-2xl text-gray-300 my-2 ">
          Save Here your Daily Work
        </p>
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="border-2 border-gray-700 text-lg md:text-xl p-2 m-3 rounded-xl w-full md:w-auto "
          placeholder="Enter Your Title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="border-2 border-gray-700 text-lg md:text-xl p-2 m-3 rounded-xl w-full md:w-auto "
          placeholder="Enter Your Discription here..."
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-gradient-to-b mx-3 mb-6 from-green-600 to-green-400 px-4 py-2 rounded-xl text-lg  font-semibold cursor-pointer active:scale-95 transition-all"
        >
          Add Task
        </button>
      </form>

      <div className=" bg-violet-200 rounded-2xl p-4  ">
        {mainTask.length === 0 ? (
          <h1 className="font-semibold text-xl text-center py-2 text-rose-500">
            No Task Here. Please Add a task..
          </h1>
        ) : (
          <ul className="space-y-3">
            {mainTask.map((i) => (
              <li
                key={i.id}
                className="flex justify-between gap-3 px-5 mb-4 bg-gradient-to-r from-white to-gray-100  rounded-xl py-3 "
              >
                <div>
                  <h1 className=" text-xl font-semibold  text-gray-800">
                    {i.title}
                  </h1>
                  <h3 className=" text-lg text-gray-900 ">{i.disc}</h3>
                </div>

                <div className="flex gap-2 md:gap-4 items-center">
                  <button
                    onClick={() => handleDelete(i.id)}
                    aria-label={`Delete ${i.title}`}
                    className="p-2 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 size-6 stroke-red-400 hover:stroke-red-500 cursor-pointer active:animate-ping"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
