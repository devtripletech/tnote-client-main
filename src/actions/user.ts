"use server"

import { redirect } from "next/navigation"

// export const verifyEmailAction = async ({
//   email,
// }: {
//   email: string
// })  => {
//   try {
//     console.log("recover password")

//     const res = await fetch(`http://apptnote.eastus.cloudapp.azure.com:3000/recoverpassword`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: email }),
//     })
//     if (res.status === 401 || res.status === 400) redirect("/")

//     const data = await res.json()
//     console.log(data)

//     if (data?.error) throw new Error(data?.error)

//     return data
//   } catch (error) {
//     console.log(error)
//     throw error
//     //throw new Error("Um erro ocorreu na geração do token")
//   }
// }

export const verifyEmailAction = async ({ email }: { email: string }) => {
  try {
    console.log("recover password")

    const res = await fetch(
      `http://apptnote.eastus.cloudapp.azure.com:3000/recoverpassword`,
      {
        cache: 'no-store' ,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      },
    )


    
    if (res.status === 401 || res.status === 400) redirect("/")

    const data = await res.json()
    console.log(data)

    if (data?.error) throw new Error(data?.error)

    return data
  } catch (error) {
    console.log(error)
    throw error
    //throw new Error("Um erro ocorreu na geração do token")
  }
}

export const changePasswordAction = async ({
  password,
  token,
}: {
  password: string
  token: string
}) => {
  try {
    const res = await fetch(
      `http://apptnote.eastus.cloudapp.azure.com:3000/changepassword?id=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: password }),
      }
    )
    if (res.status === 401 || res.status === 400) redirect("/")

    const data = await res.json()

    if (data?.error) throw new Error(data?.error)

    return data
  } catch (error) {}
}
