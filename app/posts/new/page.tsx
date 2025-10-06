'use client';

import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { createPostSchema } from '@/app/posts/schema';
import {z} from 'zod';
import FrontendErrorMessage from '@/app/components/frontend-error-message';
import Spinner from '@/app/components/spinner';

import dynamic from "next/dynamic";

const SimpleMDE = dynamic(
	() => import("react-simplemde-editor"),
	{ ssr: false }
);
import 'easymde/dist/easymde.min.css';

type PostForm = z.infer<typeof createPostSchema>;
// interface PostForm {
//     title: String,
//     content: String,
// }

const NewPostPage = () => {    
    
    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors }} = useForm<PostForm>({
        resolver: zodResolver(createPostSchema)
    });
    const [error, setError] = useState('');
    const [ isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
    try {
        setSubmitting(true);
        const response = await fetch(
            `/api/posts`,
            {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
            }
        );

        if (response.status >= 400) {
            setSubmitting(false);
            // handle error
            console.log(response);
            setError('Error occurred');   
        }
        else {
            router.push('/posts');
        }        
        } catch (error) { 
            setSubmitting(false);
            // handle error
            console.log(error);
            setError('Exception occurred'); 
        }
    });    

    return (
        <div className='max-w-xl '>
            { error && <Callout.Root color='red' className='mb-5'>
                <Callout.Text> {error} </Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={onSubmit}>
            <TextField.Root placeholder="Title" {...register('title')}>
            </TextField.Root>
            <FrontendErrorMessage> {errors.title?.message} </FrontendErrorMessage>            
            <Controller 
                name = "content" 
                control= {control}
                defaultValue = '' 
                render = { ( {field} )=> <SimpleMDE placeholder='Content...' {...field} /> }
            />            
            <FrontendErrorMessage> {errors.content?.message} </FrontendErrorMessage>
            <Button disabled={isSubmitting}> Submit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>

    );
}    

export default NewPostPage;

