import Button from "@/src/components/atoms/button/button";
import InputField from "@/src/components/atoms/Input/input-field";
// import Axiosauth from "@/lib/http-auth";
// import Axios from "@/lib/http-client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/userStore";
import { useEffect } from "react";
import { signInAction } from "@/src/app/actions/actions";

interface FormData {
  email: string;
  password: string;
}

export default function AuthForm() {
  const router = useRouter();
  const setRole = useUserStore((state) => state.setRole);
  const user = useUserStore((state) => state.user);

  //   const fetchUser = async () => {
  //  const

  //     // try {
  //     //   const response = await Axios.post("/role", {
  //     //     role: "Admin",
  //     //   });
  //     //   console.log("todo created", response);
  //     //   return response.data;
  //     // } catch (error: any) {
  //     //   console.error("Signup failed:", error.response?.data || error.message);
  //     // }

  //     // try {
  //     //   const response = await Axiosauth.post("/token?grant_type=password", {
  //     //       email: 'ajayiezekiel559@gmail.com',
  //     //     password: 'example-password'
  //     //   });

  //     //   console.log("user login", response);
  //     //   return response.data;
  //     // } catch (error: any) {
  //     //   console.error("Signup failed:", error.response?.data || error.message);
  //     // }
  //     };

  const { control, handleSubmit, trigger, getValues } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    user !== null && router.push("/dashboard");
  }, [user]);

  const submitForm = async (data: FormData) => {
    const form = new FormData();
    form.append("email", "ajayiezekiel559@gmail.com");
    form.append("password", "example-password");
    await signInAction(form);
    // try {
    //   const response = await Axiosauth.post("/token?grant_type=password", {
    //     email: data.email,
    //     password: data.password,
    //   });
    //   const getRole = await Axios.get("/role", {
    //     params: { user_id: `eq.${response.data.user.id}` },
    //   });
    //   console.log(getRole);

    //   setRole(getRole.data[0].role);

    //   if (response.status === 200 && getRole.status === 200) {
    //     toast.success("Signin Successful");
    //     router.replace("/dashboard");
    //   }
    // } catch (error) {
    //   if (error) {
    //     toast.error("Signin Failed");
    //     console.log(error);
    //   }
    // }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-cyan-700 rounded-lg flex flex-col items-start justify-start gap-5 p-10"
    >
      <h1 className="text-white text-center w-full my-2 text-2xl font-semibold">
        Lily Hospital M.S
      </h1>

      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <InputField
          id="email"
          type="text"
          name="email"
          placeholder="Enter your email"
          className="w-[400px] h-[50px] px-4 rounded-lg outline-none border-none"
          control={control}
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-2">
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <InputField
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-[400px] h-[50px] px-4 rounded-lg outline-none border-none"
          control={control}
        />
      </div>

      <Button
        value="Signin"
        type="submit"
        className="bg-white text-black hover:bg-cyan-300 hover:text-white font-medium text-sm text-center no-underline px-4 py-2 rounded-2xl mt-2 mx-auto w-[30%]"
      />
    </form>
  );
}
