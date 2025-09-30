import React from "react";
import Head from "next/head";
const Waitlist = () => {
  return (
    <>
      {" "}
      <Head>
        <title>Waitlist</title>
      </Head>
      <div className="mt-20 fixed w-full">
        <div className="aspect-video w-full">
          <iframe
            style={{ width: "100%" }}
            height="79%"
            src="https://vehiql-waitlist-form-353.created.app"
            title="Vehiql Waitlist Form"
            frameBorder="0"
            allow="frame-ancestors 'self' https://vehiql-waitlist-form-353.created.app"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Waitlist;
