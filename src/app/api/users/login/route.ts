import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { NextRequest , NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        const {email, password} = reqBody;
        if(!email || !password){
            return NextResponse.json({ error: "Please provide the required feilds.."},{status:400})
        }

        //find user based on email
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        //validate password
        const validatePassword = await bcryptjs.compare(password,user.password);
        if(!validatePassword) {
            return NextResponse.json({error: "Invalid Password.."},{status: 400})
        }

        //if both user and password are correctly founded then send the jwt token with in response in the cookie
        
        //create token
        
        const tokenData = {
            id: user._id,
            email:user.email,
            username:user.username
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login Successfull",
            success: true
        })
        response.cookies.set("token", token, { httpOnly: true })

        return response;

    } catch (error: any) {
        return NextResponse.json({ error:error.message },{status:500});
    }
}