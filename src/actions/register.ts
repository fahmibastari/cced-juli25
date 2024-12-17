"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";


export const register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateField = RegisterSchema.safeParse(data);
    if(!validateField.success){
        return {error: "Please fill all the fields"};
    }
    if(data.password !== data.confirmPassword){
        return {error: "Password and Confirm Password must be the same"};
    }

    const { fullname, email, password } = validateField.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const emailExists = await getUserByEmail(email);
    if(emailExists){
        return {error: "Email already exists"};
    }

    await db.user.create({
        data : {
            name : fullname,
            email,
            password: hashedPassword
        }
    })

    return {success: "Your account has been created"};
}