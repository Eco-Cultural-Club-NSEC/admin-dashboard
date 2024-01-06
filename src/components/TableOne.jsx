import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Modal from "./Modal";
import Searchbar from "./Searchbar";

export function TableOne() {
  const [data, setData] = useState([]);
  const [reg, setReg] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const singleColRef = collection(db, "singleReg");
  const multiColRef = collection(db, "multiReg");

  const getData = async () => {
    try {
      let info = [];
      if (!reg) {
        const userData = await getDocs(singleColRef);
        userData.docs.forEach((doc) => {
          info.push({ ...doc.data(), id: doc.id });
        });
        info.sort((a, b) => {
          return a.payment_verified - b.payment_verified;
        });
        setData(info);
        setIsSearch(false);
      } else {
        const userData = await getDocs(multiColRef);
        userData.docs.forEach((doc) => {
          info.push({ ...doc.data(), id: doc.id });
        });
        info.sort((a, b) => {
          return a.payment_verified - b.payment_verified;
        });
        setData(info);
        setIsSearch(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [reg]);

  return (
    <>
      <div className="flex justify-evenly items-center m-[40px]">
        <button
          className={
            reg === !false
              ? "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
          onClick={() => setReg(false)}
        >
          Single
        </button>
        <button
          className={
            reg === false
              ? "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
          onClick={() => setReg(true)}
        >
          Multiple
        </button>
      </div>
      {!reg ? (
        <h1 className="flex text-purple-700 justify-center text-4xl">
          SOLO EVENTS
        </h1>
      ) : (
        <h1 className="flex text-purple-700 justify-center text-4xl">
          GROUP EVENTS
        </h1>
      )}
      <div className="flex justify-center p-7">
        <Searchbar
          data={data}
          setSearchData={setSearchData}
          setIsSearch={setIsSearch}
          reg={reg}
        />
      </div>
      <section className="mx-auto w-auto max-w-[1500px] px-4 py-4 ">
        <div className="mt-6 flex flex-col h-[600px]">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Event Name
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        College Name
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Payment Id
                      </th>
                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {!isSearch
                      ? data.map((e) => (
                          <tr key={e.id}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {Array.isArray(e.Name) ? e.Name[0] : e.Name}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {e.Email}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {e.Whatsapp_Number}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <div className="text-sm text-gray-900 ">
                                {e.Event}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <div className="text-sm text-wrap text-gray-900 ">
                                {e.College_Name}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              {e.payment_verified ? (
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  Verified
                                </span>
                              ) : (
                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                  Not Verified
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {e.Payment_id}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              {!e.payment_verified ? (
                                <a className="text-gray-700 cursor-pointer">
                                  <Modal
                                    user={e.Name}
                                    payment_id={e.Payment_id}
                                    id={e.id}
                                    email={e.Email}
                                    paymentUrl={e.paymentUrl}
                                    userData={data}
                                    setUserData={setData}
                                    reg={reg}
                                  />
                                </a>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))
                      : searchData.map((e) => (
                          <tr key={e.id}>
                            <td className="whitespace-nowrap px-4 py-4">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {Array.isArray(e.Name) ? e.Name[0] : e.Name}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {e.Email}
                                  </div>
                                  <div className="text-sm text-gray-700">
                                    {e.Whatsapp_Number}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <div className="text-sm text-gray-900 ">
                                {e.Event}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-12 py-4">
                              <div className="text-sm text-wrap text-gray-900 ">
                                {e.College_Name}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-4">
                              {e.payment_verified ? (
                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                  Verified
                                </span>
                              ) : (
                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                  Not Verified
                                </span>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                              {e.Payment_id}
                            </td>
                            <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                              {!e.payment_verified ? (
                                <a className="text-gray-700 cursor-pointer">
                                  <Modal
                                    user={e.Name}
                                    payment_id={e.Payment_id}
                                    id={e.id}
                                    email={e.Email}
                                    paymentUrl={e.paymentUrl}
                                    userData={data}
                                    setUserData={setData}
                                    reg={reg}
                                  />
                                </a>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
