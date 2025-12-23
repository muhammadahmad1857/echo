"use client";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { OrganizationSwitcher, SignInButton, UserButton } from "@clerk/nextjs";
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh bg-gradient-to-br from-gray-300 via-gray-200 to-gray-1i00 p-8">
        <Authenticated>
          <div className="bg-white/10 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
            <div className="flex w-full justify-between">
              <h1 className="text-3xl font-bold text-white mb-4 tracking-tight drop-shadow">
                User List
              </h1>
              <UserButton />
              {/* <Button onClick={() => addUser()}>Add a User</Button> */}
            </div>
            <OrganizationSwitcher hidePersonal={true}/>
            <p className="text-gray-300 mb-6">
              Welcome to{" "}
              <span className="font-semibold text-white">app/web</span>
            </p>
            {users ? (
              <ul className="space-y-4 w-full">
                {users.map((user) => (
                  <li
                    key={user._id}
                    className="bg-black/80 rounded-lg px-5 py-3 text-xl text-white flex items-center shadow hover:bg-black/90 transition-colors"
                  >
                    <span className="truncate">{user.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center items-center h-24">
                <span className="text-gray-400 animate-pulse">
                  Loading users...
                </span>
              </div>
            )}
          </div>
        </Authenticated>
        <Unauthenticated>
          <p>Please log in to view the user list.</p>
          <SignInButton />
        </Unauthenticated>
      </div>
    </>
  );
}
