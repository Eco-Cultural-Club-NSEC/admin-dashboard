import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

const Stats = () => {
  const [data, setData] = useState([]);
  const [groupData, setGroupData] = useState({});
  const [verified,setVerified] = useState(0);

  const singleColRef = collection(db, "singleReg");
  const multiColRef = collection(db, "multiReg");

  const getData = async () => {
    try {
      let info = [];
      let userData = await getDocs(singleColRef);
      userData.docs.forEach((doc) => {
        info.push({ ...doc.data(), id: doc.id });
      });
      info.sort((a, b) => {
        return a.payment_verified - b.payment_verified;
      });
      userData = await getDocs(multiColRef);
      userData.docs.forEach((doc) => {
        info.push({ ...doc.data(), id: doc.id });
      });
      const groupedByEvents = info.reduce((result, item) => {
        const eventName = item.Event;
        if (!result[eventName]) {
          result[eventName] = [];
        }
        result[eventName].push(item);
        return result;
      }, {});
      let temp = 0;
      info.map((e)=>{
        e.payment_verified ? temp++ : temp
      });
      setVerified(temp);
      setData(info);
      setGroupData(groupedByEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col justify-between items-center m-[40px] h-[400px]">
      <h1 className="text-3xl text-blue-500">
        Total Registration: {data.length}
      </h1>
      <h1 className="text-3xl text-green-500">
        Payment Verified:  {verified}
      </h1>
      <h1 className="text-3xl text-red-500">
        Payment Not Verified:  {data.length - verified}
      </h1>
      <div className="flex flex-col justify-evenly items-start w-full">
        {Object.entries(groupData).map(([key, value]) => {
          return(<h1 key={key} className="text-2xl p-2 text-green-600">{key} :  {value.length}</h1>)
        })}
      </div>
    </div>
  );
};

export default Stats;
