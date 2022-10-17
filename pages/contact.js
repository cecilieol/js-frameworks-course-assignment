import HeadContent from '../components/layout/Head'
import Heading from '../components/layout/Heading'
import Navigation from '../components/layout/Nav'
import { DEFAULT_VALUES_CONTACT } from '../utils/form';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  firstname: yup
      .string()
      .required("Please enter your first name")
      .min(3, "First name must be at least 3 characters"),
  lastname: yup
      .string()
      .required("Please enter your last name")
      .min(4, "Last name must be at least 4 characters"),
  email: yup
      .string()
      .required("Please enter you email address")
      .email("Please enter a valid email address"),
  subject: yup
      .string()
      .required("Please select a subject"),
  message: yup
      .string()
      .required("Please enter a message")
      .min(10, "Message must be at least 10 characters")
});

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

  function onSubmit(data) {
      console.log(data);
      setSubmitted(true);
      reset(DEFAULT_VALUES_CONTACT);
  }

  return (
    <>
      <HeadContent title="Contact" description="This is the contact page" />

      <Navigation />
      <Heading title="Contact" />

      <p className="text">Do you have any intel on the characters that might be useful to us, please reach out through the form below.</p>

      {submitted && <div className="success">Your message has been sent</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
            <label>First Name</label>
            <input type="text" placeholder="Enter your first name" {...register("firstname")}/>
            {errors.firstname && <span className="text-danger">{errors.firstname.message}</span>}
            
            <label>Last Name</label>
            <input type="text" placeholder="Enter your last name" {...register("lastname")}/>
            {errors.lastname && <span className="text-danger">{errors.lastname.message}</span>}

            <label>Email Address</label>
            <input type="email" placeholder="Enter your email address" {...register("email")}/>
            {errors.email && <span className="text-danger">{errors.email.message}</span>}

            <label>Subject</label>
            <select {...register("subject")}>
              <option value="" selected disabled>Select subject</option>
              <option value="location">Location</option>
              <option value="status">Status</option>
              <option value="other">Other</option>
            </select>
            {errors.subject && <span className="text-danger">{errors.subject.message}</span>}

            <label>Message</label>
            <textarea type="text" placeholder="Enter your message" {...register("message")}/>
            {errors.message && <span className="text-danger">{errors.message.message}</span>}

            <button>Send</button>
      </form>
    </>
  )
}