import HeadContent from '../components/layout/Head'
import Heading from '../components/layout/Heading'
import Navigation from '../components/layout/Nav'
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Router from 'next/router';
import FormError from "../utils/FormError";
import { BASE_API, TOKEN_PATH } from "../utils/wordpress";

const url = BASE_API + TOKEN_PATH;

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const {
    	register,
    	handleSubmit,
    	formState: { errors },
  	} = useForm({
    	resolver: yupResolver(schema),
  	});

	async function onSubmit(data) {
		setSubmitting(true);
		setLoginError(null);

		console.log(data);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);

			Router.push({
        		pathname: '/admin'
      		});

		} catch (error) {
			console.log("error", error);
			setLoginError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
		<HeadContent title="Login page" description="This is the login page" />

			<Navigation />
			<Heading title="Login" />
			
			<p className="text">Authorized personnel only!</p>
			
			<form onSubmit={handleSubmit(onSubmit)}>
				{loginError && <FormError>{loginError}</FormError>}
            <label>Username</label>
						<input type="text" name="username" placeholder="Enter your username" {...register('username')} />
						{errors.username && <FormError>{errors.username.message}</FormError>}

            <label>Password</label>
						<input type="password" name="password" placeholder="Enter your password" {...register('password')} />
						{errors.password && <FormError>{errors.password.message}</FormError>}

					<button>{submitting ? "Logging in..." : "Login"}</button>
			</form>
		</>
	);
}