"use client";

import React from "react";
import AuthForm from "@/src/components/organisms/authentication/auth-form";

const AuthenticationTemplate = () => {
  return (
    <main
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dn9dkcxvs/image/upload/v1734379774/freepik__upload__86387_usfbsr.jpg')`,
      }}
    >
      <AuthForm />
    </main>
  );
};

export default AuthenticationTemplate;
