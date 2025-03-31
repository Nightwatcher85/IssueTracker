'use client';

import { Button, TextField, Callout } from '@radix-ui/themes'
import { useForm, Controller, Form } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import { Label } from '@radix-ui/react-label';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface IssueForm{
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const [error,setError] = useState('');

  return (
    <div  className='max-w-xl space-y-3' >
      {error && <Callout.Root color="red" className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form 
  
      onSubmit={
        handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError('An unexpected error occured.')
        }
      })}>

      <div>
        <Label htmlFor="title">Title</Label>
        <input 
          id="title"
          {...register('title')}
          placeholder="Enter title"
          className="border border-gray-300 rounded p-2 w-full mb-5"
        />
      </div>

        <Controller
          name = 'description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder = 'Description'  {...field} />}
          />
        <Button type="submit">Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage