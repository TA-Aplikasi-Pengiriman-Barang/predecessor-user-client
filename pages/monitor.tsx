import { useEffect } from "react";

export default function monitor() {

  let i = 0;
  // useEffect(() => {
    

  // })

  useEffect(() => {
    const interval = setInterval(() => {
      i=i+1;
      console.log('This will run every second!');
      console.log(i);
    }, 15000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <p className="text-white text-8xl">
              akan tiba - <span className="font-semibold"> 08:37</span>{" "}
            </p>
          </div>
        </div>
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <p className="text-white text-8xl">
              akan tiba - <span className="font-semibold"> 08:37</span>{" "}
            </p>
          </div>
        </div>{" "}
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <p className="text-white text-8xl">
              akan tiba - <span className="font-semibold"> 08:37</span>{" "}
            </p>
          </div>
        </div>
      </div>{" "}

      <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <p className="text-white text-8xl font-semibold">10 Menit </p>
          </div>
        </div>{" "}
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <p className="text-white text-8xl font-semibold">10 Menit </p>
          </div>
        </div>{" "}
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <p className="text-white text-8xl font-semibold">10 Menit </p>
          </div>
        </div>
      </div>

      <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <div className="bg-red-primary px-16 py-4 rounded-2xl">
              <p className="text-white text-8xl">Rute lurus </p>
            </div>
          </div>
        </div>{" "}
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <div className="bg-red-primary px-16 py-4 rounded-2xl">
              <p className="text-white text-8xl">Rute lurus </p>
            </div>
          </div>
        </div>{" "}
        <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
          <div className="w-1/5 flex space-x-2">
            <div>asd</div>
            <div className="bg-white rounded-xl px-12 py-2">
              <p className="text-black text-8xl">2</p>
            </div>
          </div>
          <div className="w-4/5 flex justify-end">
            <div className="bg-red-primary px-16 py-4 rounded-2xl">
              <p className="text-white text-8xl">Rute lurus </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
