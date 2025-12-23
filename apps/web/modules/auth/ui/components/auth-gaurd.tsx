"use client";

import {AuthLoading,Authenticated,Unauthenticated} from "convex/react";
import React from "react";
import { Authlayout } from "../layouts/auth-layout";

import SignInView from "../views/sign-in-view";


export const AuthGaurd = ({children}:{children:React.ReactNode})=>{
    return(
    <>
    <AuthLoading>
        <Authlayout>
            <p>loading...</p>
        </Authlayout>

    </AuthLoading>
    <Authenticated>
        {children}
    </Authenticated>
    <Unauthenticated>
        <Authlayout>
            <SignInView/>
        </Authlayout>
    </Unauthenticated>
    </>
    )
}