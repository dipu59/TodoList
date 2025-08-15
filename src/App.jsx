import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [disc, setDisc] = useState("");
  const [mainTask, setMainTask] = useState([]);


 // Submit Handeler
  const handelSUbmit = (e) => {
    e.preventDefault(); //remove default Reload Browser
    setMainTask([...mainTask, { title, disc }]);

    // if the input area is emty it will be error / alert 
    const t = title.trim();
    const d = disc.trim();
    if (!t || !d) {
      alert("Emty todo will not add. ");
    }

    setTitle("");
    setDisc("");
  };

  // Delete Handeler
  const handleDelete = (index) => {
    let copymain = [...mainTask];
    copymain.splice(index, 1);
    setMainTask(copymain);
  };

  return (
    <>
      <main className="h-auto">
        <h1 className="mainHeading">
          My Todos
          <p className="text-xl md:text-lg  tracking-wider text-green-400 my-2 ">
            Here Is My Daily Activity.
          </p>
        </h1>

        <div className="maindiv">

          <form onSubmit={handelSUbmit}>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10">
              <div>
                <p className="text-[#fbf6f8] text-sm md:text-lg font-semibold pb-2">
                  Title
                </p>

                <input
                  type="text"
                  className="titleInput "
                  placeholder="Enter Your Title here..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <p className="text-[#fbf6f8] text-sm md:text-base font-semibold pb-2  ">
                  Description
                </p>
                <input
                  type="text"
                  className="descriptionInput"
                  placeholder="Enter Your Discription here..."
                  value={disc}
                  onChange={(e) => setDisc(e.target.value)}
                />
                <button className="addTaskButton">
                  Add Task
                </button>
              </div>
            </div>
          </form>

          {/* Horizontal Row */}
          <div className="w-full h-[0.5px] mb-5 bg-gray-400"></div>

          <div className="flex flex-wrap mb-4 mt-8">
            <div className="todoButton">
              Todo
            </div>
            <div className="completedButton">
              Completed
            </div>
          </div>

          <div className="">
            {mainTask.length > 0 ? (
              (mainTask.map((i, index) => (
                <ul key={index}>
                  <li className="flex justify-between gap-3 px-5 mb-4 bg-[#404040]  rounded py-6 md:py-6 ">
                    <div>
                      <h1 className=" text-xl md:text-3xl font-semibold  text-[#01e57e]">
                        {i.title}
                      </h1>
                      <h3 className=" text-sm text-[#989898] ">{i.disc}</h3>
                    </div>
                    <p className="text-[#b4b1b1] text-xs flex justify-self-end items-center ">
                      Time: {}
                    </p>
                    <div className="flex gap-2 md:gap-4">
                      <button
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 stroke-red-400 hover:stroke-red-500 cursor-pointer active:animate-ping"
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
                </ul>
              )))
            ) : (
              <h1 className=" notusk ">No Task Here. Please Add a task.. </h1>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
